var restify = require('restify');
var builder = require('botbuilder');
var request  = require('request');
var http = require('http');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, function (session) {
    console.log('Commnad from skype : - '+session.message.text);
    var command = session.message.text;
    if(command == 'hello'){
       session.send("hi, how are you?");
	}
	else if(command == 'i am fine'){
		session.send("That's great. How can I help you ?");
	}
    else if(command == 'jokes'){
			session.send('jokes are working');
		  var urlw = 'http://api.icndb.com/jokes/random';
          request.get(urlw,function(error,response,body){
               var jokes = JSON.parse(body);
			   var joke = jokes.value.joke;
			   session.send('JOKE - ' + joke);
                     
                            
        });
	}
	else if(command == 'fine'){
	session.send('good!');	
	}
	else if(command == 'quotes'){
		session.send("quotes are working");
		var urlw = 'https://talaikis.com/api/quotes/random/';
				request.get(urlw,function(error,response,body){
					var quotes = JSON.parse(body);
					var title = quotes.quote;
					var content = quotes.author;
					session.send('QUOTE - ' + title);
					session.send('AUTHOR - ' + content);
				});
			}
	else if(command == 'news'){
		session.send("news is working");
		var urlw = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=3ab4d46734bf495083ae1b7ce72ec8f3';
				request.get(urlw,function(error,response,body){
					var news = JSON.parse(body);
					var i = Math.floor(Math.random() * 10) + 0											
					var title = news.articles[i].title;
					var description = news.articles[i].description;
					session.send('NEWS TITLE - ' + title);
					session.send('NEWS DESCRIPTION -' + description); 
					
				});
					
		}
		else if(command == 'weather'){
						session.send('weather is working');
						var urlw = 'http://api.openweathermap.org/data/2.5/weather?q=NewDelhi&appid=f7b3612af22ebce536967b084c1b86e3';
						request.get(urlw,function(error,response,body){
						var weather = JSON.parse(body);
						var temp = weather.main.temp;
						var pressure = weather.main.pressure;
						var humidity = weather.main.humidity;
						temp = temp - 273.15;
						session.send('Temperature in New Delhi is '+ temp + ' degrees');
						session.send('Pressure in New Delhi is '+ pressure + ' Pascal');
						session.send('Humidity in New Delhi is '+ humidity);
			 
			});
		}
				
    			else{
    			session.send("Don't know the command");
			session.send("Example Commands: weather,jokes,quotes,news");
    			    }

    
		

    
});
