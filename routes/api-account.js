const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/account', function (req, res) {
    let sql = 'SELECT * FROM account';

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.post('/api/login', function (req, res) {
    let sql = 'SELECT * FROM account WHERE email = ? AND password = ?';

    conn.query(sql, [req.body.email, req.body.password], function (err, result) {
      if (!err && result.length > 0) {
        res.send({
          result: result[0],
          status: 200
        })
      } else {
        res.send({
          result: null,
          status: 404
        })
      }

    });
  });

  app.post('/api/register', function (req, res) {
    let sql = 'INSERT INTO account SET ?';

    conn.query(sql, req.body, function (err, result) {
      if (!err) {
        res.send({
          status: 200
        })
      } else {
        res.send({
          status: 404
        })
      }
    });
  });
};
