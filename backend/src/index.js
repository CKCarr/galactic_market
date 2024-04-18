const express = require('express');

const mysql = require('mysql');

const body_parser = require('body-parser');

const session = require('express-session');

const app = express();

app.use(body_parser.urlencoded({ extended : false }));

app.use(body_parser.json());

//middleware for serving static file
app.use(express.static('public'));

//Set up EJS as template engine
app.set('view engine', 'ejs');

//Make MySQL Database Connection
const connection = mysql.createConnection({
	host : 'localhost',
	database : 'mysql_galactic_db',
	user : 'galactic_user',
	password : 'mysqlpass'
});

//Check MySQL Database Connection
connection.connect((error) => {
	console.log('MySQL Database is connected Successfully');
});

//Set up Session Middleware
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));

//Create Route for Load Product Data
app.get("/", (request, response) => {

	const query = `SELECT * FROM destinations`;

	//Execute Query
	connection.query(query, (error, result) => {

		if(!request.session.cart)
		{
			request.session.cart = [];
		}

		response.render('Destination', { Destination : result, Cart : request.session.cart });

	});

});

//Create Route for Add Item into Cart
app.post('/add_cart', (request, response) => {

	const dest_id = request.body.dest_id;

	const dest_name = request.body.dest_name;

	const dest_price = request.body.dest_price;

	let count = 0;

	for(let i = 0; i < request.session.cart.length; i++)
	{

		if(request.session.cart[i].dest_id === id)
		{
			request.session.Cart[i].quantity += 1;

			count++;
		}

	}

	if(count === 0)
	{
		const cart_data = {
			id : id,
			name : name,
			price : parseFloat(price),
			quantity : 1
		};

		request.session.cart.push(cart_data);
	}

	response.redirect("/");

});

//Create Route for Remove Item from Shopping Cart
app.get('/remove_item', (request, response) => {

	const product_id = request.query.id;

	for(let i = 0; i < request.session.cart.length; i++)
	{
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart.splice(i, 1);
		}
	}

	response.redirect("/");

});

app.listen(3000, () => {

	console.log('Server has started on port number 3000');

});
