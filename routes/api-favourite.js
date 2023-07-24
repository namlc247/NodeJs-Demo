const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/favourite', function (req, res) {
    let sql = 'SELECT * FROM favourite ORDER BY id DESC';

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.post('/api/favourite', function (req, res) {
    let sql = 'INSERT INTO favourite SET ?';

    conn.query(sql, req.body, function (err, result) {
      req.body.id = result.insertId;
      res.send({
        result: req.body,
        status: 200,
      });
    });
  });

  app.get('/api/favourite/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'SELECT * FROM favourite WHERE id = ?';

    conn.query(sql, [id], function (err, data) {
      res.send({
        result: data.length ? data[0] : '',
        status: 200,
      });
    });
  });

  app.delete('/api/favourite/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'DELETE FROM favourite WHERE id = ?';

    conn.query(sql, [id], function (err, data) {
      res.send({
        result: data,
        status: 200,
      });
    });
  });

  app.put('/api/favourite/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'UPDATE favourite SET ? WHERE id = ?';

    conn.query(sql, [req.body, id], function (err, result) {
      req.body.id = id;
      res.send({
        result: req.body,
        status: 200,
      });
    });
  });
};
