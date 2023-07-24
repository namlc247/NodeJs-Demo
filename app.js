const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

require('./routes/category')(app);
require('./routes/api-category')(app);
require('./routes/api-product')(app);

app.listen(3000, () => {
  console.log('Server: http://localhost:' + 3000);
});
