var express = require('express');
var app = express();

app.set ('port', process.env.PORT ||3000);
var mywork = [  "Web Design",
				"Database Design",
				"Other Stuff",
				"New Things",
				"A lot of drinking"
];

//handlebars view engine
var handlebars = require('express-handlebars')
	.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//static files directory description
app.use(express.static(__dirname + '/public'));

//routes
//home
app.get('/',function(req,res){
	res.render('sitehome');
});
// about
app.get('/about',function(req,res){
	var myWorkRandom = mywork[Math.floor(Math.random() * mywork.length)];
	res.render('about',{mywork: myWorkRandom});
	console.log('about');
});

//contact
app.get('/contact',function(req,res){
	res.render('contact');
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