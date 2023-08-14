const conn = require('../connect');
const util = require('node:util');
const query = util.promisify(conn.query).bind(conn);

module.exports = function (app) {
  app.get('/api/product', function (req, res) {
    let limit = req.query.limit;
    let sort = req.query.sort;
    let order = req.query.order;
    let cat_id = req.query.cat_id;
    let search = req.query.search ? req.query.search : '';

    let sql = `
      SELECT 
        *, (price - sale_price) AS final_price
      FROM product`;

    sql += ` WHERE name LIKE '%${search}%'`;
    sql += cat_id ? ` && category_id = ${cat_id}` : '';
    sql += sort ? ` ORDER BY ${sort} ${order}` : ` ORDER BY id ASC`;
    sql += limit ? ` LIMIT ${limit}` : '';

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
