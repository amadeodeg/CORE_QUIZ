var models = require('../models/models.js');


exports.load = function (req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else {next(new Error('No existe el quizId' + quizId));}
		}
	).catch(function(error){next(error);});
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
		});//.catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		});//.catch(function(error){next(error);});
	}
};



exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};


exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};


exports.new = function (req, res) {
	var	quiz = models.Quiz.build(
			{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};


exports.create = function (req, res){
	console.log("hasta aqui");
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
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