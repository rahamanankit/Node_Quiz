var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
	question: String,
	answer: String,
	genre: String,
	options:[
		{
			content: String
		}
	]
});

module.exports = mongoose.model("Quiz", quizSchema);