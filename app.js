var bodyParser     = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose       = require("mongoose"),
	express        = require("express"),
	app 		   = express(),
	Quiz           = require("./models/quiz"),
	seedDB         = require("./seed");

// APP CONFIG
mongoose.connect("mongodb://localhost/quiz_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Refresh the DB and insert the seed data
//seedDB();

// ROUTING

//Counter to count the number of questions
var countQuestion = 0;

//Counter to store the total score
var totalScore = 0;

//Counter to store the total correct score
var correctScore = 0;

//Counter to store the total incorrect score
var incorrectScore = 0;

// ROUTE - HOMEPAGE
app.get("/", function(req, res){	
	res.render("home");
});

app.get("/quizzes", function(req, res){
	//Reset the counter on quiz start
	countQuestion = 0;
	//Reset the total score on quiz start
	totalScore = 0;
	
	//Reset the total correct score on quiz start
	correctScore = 0;
	
	//Reset the total incorrect score on quiz start
	incorrectScore = 0;
	
	//Render the quiz choosing screen
	res.render("choose");
});


//ROUTE TO DISPLAY EACH QUESTION
app.get("/quizzes/:genre/:quesNum", function(req, res){
	var questionNumber = req.params.quesNum;
	//Find the quiz questions as per the quiz type
	Quiz.find({genre: req.params.genre}, function(err, quizzes){
		if(err){
			console.log(err);
		}else{
			res.render("index", {quizzes: quizzes, questionNumber: questionNumber, totalScore: totalScore, correctScore: correctScore, incorrectScore: incorrectScore});
		}
	});
});

//ROUTE TO VALIDATE ANSWERS AS PER GENRE
app.post("/validateQuiz/:id/:genre", function(req, res){
	//Increase the counter to correspond to the question number
	countQuestion = countQuestion + 1;
	var selectedOption = req.body.optradio;
	Quiz.findById(req.params.id, function(err, foundQuiz){
		if(err){
			console.log(err);
		}else{
			//If the quiz is found, check if the answer is correct
			if(foundQuiz.answer === selectedOption){
				// console.log("Correct");
				totalScore = totalScore + 1;
				correctScore = correctScore + 1;
				res.redirect("/quizzes/" + req.params.genre + "/" + countQuestion);
			}
			else{
				// console.log("Wrong");
				totalScore = totalScore - 1;
				incorrectScore = incorrectScore + 1;
				res.redirect("/quizzes/" + req.params.genre + "/" + countQuestion);
			}
		}
	});
});


// EXPRESS SERVER
app.listen(3000, process.env.IP, function(){
	console.log("Server is starting!!!");
})