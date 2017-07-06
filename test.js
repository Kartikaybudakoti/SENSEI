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
    if(command == 'hello' || command == 'Hello'){
       session.send("hi, how are you?");
	}
	
	else if(command == 'hi' || command == 'Hi'){
		session.send('Hello'); 
	}
	
	else if(command =='how are you' || command =='How are you'){
		session.send('I am good. How about you?');
	}
	else if(command =='who made you' || command =='who is your creator' || command =='you are created by whom'){
		session.send('I m created by group of four people');
	}
    else if(command == 'i am fine' || command == 'I am fine' ||  command == 'I m fine' || command == 'i m fine' || command == 'fine'){
		session.send("That's great. How can I help you ?");
	}
	else if(command =='how many countries are there in the world' || command =='Countries' || command =='countries'){
		session.send('As per the WORLD COUNTRY  infomation statistics there are 196 countries in the world today. Taiwan is not considered an official country by many, which would bring the count down to 195 countries. ');
	}
	
	else if(command == 'who are you' || command == 'Who are you')
	{
		session.send('I am SENSEI, your virtual assistant. how can i help you ');
	}
	else if(command == 'I love you' || command == 'I like you' ||  command == 'i like you' ||  command == 'i love you'){
		session.send('Thank you!'); 
	}
	
    
	else if(command == 'jokes' || command == 'Jokes'){
			session.send('Jokes are working');
		  var urlw = 'http://api.icndb.com/jokes/random';
          request.get(urlw,function(error,response,body){
               var jokes = JSON.parse(body);
			   var joke = jokes.value.joke;
			   session.send('JOKE - ' + joke);
			});
		}
	else if(command == 'quotes' || command == 'Quotes'){
		session.send("Quotes are working");
		var urlw = 'https://talaikis.com/api/quotes/random/';
				request.get(urlw,function(error,response,body){
					var quotes = JSON.parse(body);
					var title = quotes.quote;
					var content = quotes.author;
					session.send('QUOTE - ' + title);
					session.send('AUTHOR - ' + content);
			});
		}
	else if(command == 'news' || command == 'News'){
		session.send("News is working");
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
		else if(command == 'weather' || command == 'Weather' || command =='what is the weather' || command =='what is the weather today'){
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
    			session.send("Please type an option below. ");
			session.send("like: weather,jokes,quotes,news");
    			    }

    
		

    
});
