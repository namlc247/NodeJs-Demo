const conn = require('../connect');

module.exports = (app) => {
  app.get('/category', (req, res) => {
    let sql = 'SELECT * FROM category ORDER BY id DESC';

    conn.query(sql, (err, result) => {
      res.render('category/category-list', { data: result });
    });
  });

  var checkError = (err) => {
    if (err.errno == 1451) {
      return 'This category has products, cannot be deleted';
    } else if (err.errno == 1062) {
      return 'This name already exits, choose another name';
    }

    return 'Something went wrong!';
  };

  app.get('/category-delete/:id', (req, res) => {
    let id = req.params.id;
    let sql_delete = 'DELETE FROM category WHERE id = ?';

    conn.query(sql_delete, [id], (err, result) => {
      if (err) {
        let msg = checkError(err);
        res.render('error', { code: err.errno, message: msg });
      } else {
        res.redirect('/category');
      }
    });
  });

  app.get('/category-add', (req, res) => {
    res.render('category/category-add');
  });

  app.post('/category-add/create', (req, res) => {
    let sql_insert = 'INSERT INTO category SET ?';

    conn.query(sql_insert, [req.body], (err, result) => {
      if (err) {
        let msg = checkError(err);
        res.render('error', { code: err.errno, message: msg });
      } else {
        res.redirect('/category');
      }
    });
  });

  app.get('/category-edit/:id', (req, res) => {
    let id = req.params.id;
    let sql_getInfo = 'SELECT * FROM category WHERE id = ?';

    conn.query(sql_getInfo, [id], (err, result) => {
      if (result.length > 0) {
        res.render('category/category-edit', { obj: result[0] });
      } else {
        res.render('error', { code: 404, message: 'Page not found' });
      }
    });
  });

  app.post('/category-edit/update/:id', (req, res) => {
    let id = req.params.id;
    let sql_update = 'UPDATE category SET ? WHERE id = ?';

    conn.query(sql_update, [req.body, id], (err, result) => {
      if (err) {
        let msg = checkError(err);
        res.render('error', { code: err.errno, message: msg });
      } else {
        res.redirect('/category');
      }
    });
  });
};
