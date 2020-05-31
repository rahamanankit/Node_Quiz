var mongoose = require("mongoose");
var Quiz = require("./models/quiz");

//Sample questions and answers to be inserted to DB
var quizData = [
	{
		question: "Where was the 1986 World Cup held?",
		answer: "Mexico",
		genre: "Sports",
		options: [
			{content: "India"}, 
			{content: "Dubai"}, 
			{content: "Mexico"}
		]
	},
	{
		question: "What football club did Gordon Banks play for when he won his 1966 World Cup medal?",
		answer: "Leicester City",
		genre: "Sports",
		options: [
			{content: "Manchester United"}, 
			{content: "Leicester City"}, 
			{content: "Tottenham Hotspur"}
		]
	},
	{
		question: "How many places were allocated to African teams for the 2006 World Cup?",
		answer: "Five",
		genre: "Sports",
		options: [
			{content: "Five"}, 
			{content: "Four"}, 
			{content: "Two"}
		]
	},
	{
		question: "Ordinary table salt is sodium chloride. What is baking soda?",
		answer: "Sodium bicarbonate",
		genre: "Biology",
		options: [
			{content: "Potassium hydroxide"}, 
			{content: "Sodium bicarbonate"}, 
			{content: "Potassium chloride"}
		]
	},
	{
		question: "The Homolographic projection has the correct representation of?",
		answer: "area",
		genre: "Geography",
		options: [
			{content: "Shape"}, 
			{content: "Area"}, 
			{content: "Baring"}
		]
	},
	{
		question: "What is part of a database that holds only one type of information?",
		answer: "Field",
		genre: "Technology",
		options: [
			{content: "Report"}, 
			{content: "File"}, 
			{content: "Field"}
		]
	},
	
];

//To clear the DB and add the sample quizzes
function seedDB(){
	//Delete all the data from DB
	Quiz.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			//If deleted, add the new data
			console.log("DB was refreshed!!");
			//Loop over the array and add each quiz to the DB
			quizData.forEach(function(newQuiz){
				//Add the quiz to the DB
				Quiz.create(newQuiz, function(err, quiz){
					if(err){
						console.log(err);
					}else{
						console.log("Data was created successfully!!");
						//console.log(quiz);
					}
				});
			});
		}
	});	
}

//Export the function 
module.exports = seedDB;
