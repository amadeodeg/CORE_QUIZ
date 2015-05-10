var models = require('../models/models.js');

exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz});
	})
};


exports.answer = function (req, res) {
	console.log("MIRA AQUI");
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		console.log("Respuesta recibida---"+ req.query.respuesta);
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}
	})	
};


exports.index = function (req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	})
};


// // GET /quizes/question
// exports.question = function(req, res) {
//   models.Quiz.findAll().success(function(quiz) {
//     res.render('quizes/question', { pregunta: quiz[0].pregunta});
//   })
// };

// // GET /quizes/answer
// exports.answer = function(req, res) {
//   models.Quiz.findAll().success(function(quiz) {
//     if (req.query.respuesta === quiz[0].respuesta) {
//       res.render('quizes/answer', { respuesta: 'Correcto' });
//     } else {
//       res.render('quizes/answer', { respuesta: 'Incorrecto'});
//     }
//   })
// };