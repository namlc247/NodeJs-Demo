const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/favourite', function (req, res) {
    let sql = 'SELECT * FROM favourite';

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.post('/api/favourite', function (req, res) {
    let sqlCheck = 'SELECT * FROM favourite WHERE account_id = ? AND product_id = ?';

    conn.query(sqlCheck, [req.body.account_id, req.body.product_id], (err, data) => {
      if (data.length > 0) {
        let sqlDelete = 'DELETE FROM favourite WHERE account_id = ? AND product_id = ?';

        conn.query(sqlDelete, [req.body.account_id, req.body.product_id], (err, result) => {
          res.send({
            result: 'Remove from favourite',
            status: 200
          })
        })
      } else {
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
      }
    });

  });
};
