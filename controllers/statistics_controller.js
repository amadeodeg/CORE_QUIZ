var models = require('../models/models.js');

exports.showAll = function(req, res, next){

	models.Quiz.findAll().then(function(preguntas){
		var nPreguntas = preguntas.length;
		models.Comment.findAll().then(function(commentarios){
			var nComentarios = commentarios.length;
			var media = nComentarios/nPreguntas;
			var conComentarios = 0;
			for (i in preguntas){
				for (j in commentarios){
					//console.log(commentarios[j].);
					//console.log("hola" + commentarios[j].id);
					if(commentarios[j].QuizId == i){
						conComentarios++;
						continue;
					}
				}
			}
			var sinComentarios = nComentarios - conComentarios;
			res.render('statistics.ejs', {
				nPreguntas: nPreguntas,
				nComentarios: nComentarios,
				media: media,
				conComentarios: conComentarios,
				sinComentarios: sinComentarios,
				errors: []
			});
		});
	});
};