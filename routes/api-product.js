const conn = require('../connect');

module.exports = function (app) {
  app.get('/api/product', function (req, res) {
    let sql = `
      SELECT
      p.*, c.name AS category_name
      FROM category AS c
      JOIN product AS p ON p.category_id = c.id
    `;

    conn.query(sql, function (err, result) {
      res.send({
        result: result,
        status: 200,
      });
    });
  });

  app.post('/api/product', function (req, res) {
    let sql = 'INSERT INTO product SET ?';
    conn.query(sql, req.body, function (err, result) {
      req.body.id = result.insertId;
      res.send({
        result: req.body,
        status: 200,
      });
    });
  });

  // hiển thị form chỉnh sửa khi click vào nút Sửa trên danh sách
  app.get('/api/product/:id', function (req, res) {
    let id = req.params.id;
    let sql = `
      SELECT
      p.*, c.name AS category_name
      FROM category AS c
      JOIN product AS p ON p.category_id = c.id
      WHERE p.id = ?
    `;
    conn.query(sql, [id], function (err, data) {
      res.send({
        result: data.length ? data[0] : '',
        status: 200,
      });
    });
  });

  // hiển thị form chỉnh sửa khi click vào nút Sửa trên danh sách
  app.delete('/api/product/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'DELETE FROM product WHERE id = ?';
    conn.query(sql, [id], function (err, data) {
      res.send({
        result: data,
        status: 200,
      });
    });
  });

  app.put('/api/product/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'UPDATE product SET ? WHERE id = ?';
    conn.query(sql, [req.body, id], function (err, result) {
      req.body.id = id;
      res.send({
        result: req.body,
        status: 200,
      });
    });
  });
};
