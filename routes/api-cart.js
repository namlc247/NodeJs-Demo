const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/cart/:account_id', function (req, res) {
    let acc_id = req.params.account_id;

    let sql = `
      SELECT
        p.*,
        (p.price - p.sale_price) AS final_price,
        quantity
      FROM product AS p
      JOIN cart AS ct ON ct.product_id = p.id`;

    sql += acc_id ? ` WHERE ct.account_id = ${acc_id}` : '';

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.get('/api/total-cart/:account_id', function (req, res) {
    let acc_id = req.params.account_id;

    let sql = `SELECT SUM(quantity) AS total FROM cart WHERE account_id = ${acc_id}`;

    conn.query(sql, function (err, result) {
      res.send({
        result: result[0].total,
        status: 200,
      });
    });
  });

  app.get('/api/check-cart/:account_id/:product_id', function (req, res) {
    let account_id = req.params.account_id;
    let product_id = req.params.product_id;

    let sqlCheck = 'SELECT * FROM cart WHERE account_id = ? AND product_id = ?';

    conn.query(sqlCheck, [account_id, product_id], (err, data) => {
      res.send({
        result: data.length > 0 ? true : false,
      })
    });
  });

  app.post('/api/add-cart', function (req, res) {
    let sqlInsert = 'INSERT INTO cart SET ?';

    conn.query(sqlInsert, req.body, (err, result) => {
      if (!err) {
        res.send({
          result: 'Add to cart',
          status: 200
        })
      } else {
        res.send({
          result: null,
          status: 500
        })
      }
    })
  });

  app.delete('/api/remove-cart', function (req, res) {
    let sqlDelete = 'DELETE FROM cart WHERE account_id = ? AND product_id = ?';

    conn.query(sqlDelete, [req.body.account_id, req.body.product_id], (err, result) => {
      if (!err) {
        res.send({
          result: 'Remove from cart',
          status: 200
        })
      } else {
        res.send({
          result: 'Error',
          status: 500
        })
      }
    })
  });

  app.put('/api/update-cart', function (req, res) {
    let sqlUpdate = `
      UPDATE cart
      SET quantity = ${req.body.quantity}
      WHERE account_id = ${req.body.account_id} AND product_id = ${req.body.product_id}
    `;

    conn.query(sqlUpdate, (err, result) => {
      if (!err) {
        res.send({
          result: 'Update Success!',
          status: 200
        })
      } else {
        res.send({
          result: null,
          status: 500
        })
      }
    })
  });
};
