var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

var commentController = require('../controllers/comment_controller');

var sessionController = require('../controllers/session_controller');

var statisticsController = require('../controllers/statistics_controller');

var userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});


router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);

router.get('/login',		sessionController.new);
router.post('/login',		sessionController.create);
router.get('/logout',		sessionController.destroy);

router.get('/user',			userController.new);
router.post('/user',		userController.create);
router.get('/user/:userId(\\d+)/edit',		sessionController.loginRequired, userController.edit);
router.put('/user/:userId(\\d+)',			sessionController.loginRequired, userController.update);
router.delete('/user/:userId(\\d+)', 		sessionController.loginRequired, userController.destroy);



router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);

router.get('/quizes/new' 					,sessionController.loginRequired,		quizController.new);
router.post('/quizes/create' 				,sessionController.loginRequired,		quizController.create);
router.get('/quizes/:quizId(\\d+)/edit' 	,sessionController.loginRequired,		quizController.edit);
router.put('/quizes/:quizId(\\d+)' 			,sessionController.loginRequired,		quizController.update);
router.delete('/quizes/:quizId(\\d+)' 		,sessionController.loginRequired,		quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

router.get('/quizes/statistics'			,statisticsController.showAll);

router.get('/author', function(req,res){
	res.render('author', {errors: []});
});

module.exports = router;
