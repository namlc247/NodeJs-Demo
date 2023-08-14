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

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

require('./routes/category')(app);
require('./routes/api-category')(app);
require('./routes/api-product')(app);
require('./routes/api-account')(app);
require('./routes/api-favourite')(app);

app.listen(3000, () => {
	console.log('Server: http://localhost:' + 3000);
});
