var myWork = ['Art',
				'Design',
				'Web Front End'	]



exports.contact = function(){console.log('this is a contact page');
var index = Math.floor(Math.random() * myWork.length);
return myWork[index];}