var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');
var myWork = require('./lib/myWork.js');

app.set ('port', process.env.PORT ||3000);


//handlebars view engine
var handlebars = require('express-handlebars')
	.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//static files directory description
app.use(express.static(__dirname + '/public'));
//querystring used for testing
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
});
//routes
//home
app.get('/',function(req,res){
	res.render('sitehome');
});
// about with function to pull myWork Array
app.get('/about',function(req,res){
	res.render('about', {fortune: fortune.getFortune()});
	console.log('about');
});

//contact
app.get('/contact',function(req,res){
	res.render('contact', { myWork: myWork.contact()});
	console.log('contact');
});





//custom 404 page
app.use(function(req,res){
	
	res.status(404);
	res.render('404');

});

// custom 500 page
app.use(function(res,req,next){
	
	res.status(500);
	res.render('500');
});

//start server
app.listen(app.get('port'), function(){
	console.log('i am listening now');
});