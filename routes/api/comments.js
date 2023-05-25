const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');

router.post('/', commentsCtrl.create);
router.get('/:animeId/:episodeId', commentsCtrl.getComments);
router.put('/:id', commentsCtrl.update);
router.delete('/:id', commentsCtrl.deleteComment);
router.patch('/:id/like', commentsCtrl.like);

module.exports = router;