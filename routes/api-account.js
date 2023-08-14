const conn = require('../connect');

module.exports = function (app) {
  app.post('/api/account', function (req, res) {
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
};
