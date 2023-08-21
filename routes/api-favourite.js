const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/favourite/:account_id', function (req, res) {
    let acc_id = req.params.account_id;

    let sql = `
      SELECT
        p.*, f.created_at AS f_created_at,
        (p.price - p.sale_price) AS final_price
      FROM product AS p
      JOIN favourite AS f ON f.product_id = p.id`;

    sql += acc_id ? ` WHERE f.account_id = ${acc_id}` : '';

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.get('/api/total-favourite/:account_id', function (req, res) {
    let acc_id = req.params.account_id;

    let sql = `SELECT COUNT(*) AS total FROM favourite WHERE account_id = ${acc_id}`;

    conn.query(sql, function (err, result) {
      res.send({
        result: result[0].total,
        status: 200,
      });
    });
  });

  app.get('/api/check-favourite/:account_id/:product_id', function (req, res) {
    let account_id = req.params.account_id;
    let product_id = req.params.product_id;

    let sqlCheck = 'SELECT * FROM favourite WHERE account_id = ? AND product_id = ?';

    conn.query(sqlCheck, [account_id, product_id], (err, data) => {
      res.send({
        result: data.length > 0 ? true : false,
      })
    });
  });

  app.post('/api/add-favourite', function (req, res) {
    let sqlInsert = 'INSERT INTO favourite SET ?';

    conn.query(sqlInsert, req.body, (err, result) => {
      if (!err) {
        res.send({
          result: 'Add to favourite',
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

  app.delete('/api/remove-favourite', function (req, res) {
    let sqlDelete = 'DELETE FROM favourite WHERE account_id = ? AND product_id = ?';

    conn.query(sqlDelete, [req.body.account_id, req.body.product_id], (err, result) => {
      if (!err) {
        res.send({
          result: 'Remove from favourite',
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
};
