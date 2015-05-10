exports.question = function(req, res) {
	models.Quiz.findAll().succes(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};


exports.answer = function (req, res) {
	models.Quiz.findAll().succes(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})	
};