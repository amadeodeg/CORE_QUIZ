var models = require('../models/models.js');

exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz});
	})
};


exports.answer = function (req, res) {
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
	if(req.query.search!==undefined){
		var patron = '%'+req.query.search.replace(' ','%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", patron]}).then(function(quizes){
			quizes.sort(
			//	function(x,y){
			// 	if(x.pregunta>y.pregunta) return 1;
			// 	if(x.pregunta<y.pregunta) return -1;
			// 	return 0;
			// }
			);
			res.render('quizes/index', {quizes: quizes});
		});
	}else{
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		});
	}
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