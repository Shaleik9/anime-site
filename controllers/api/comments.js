const Comment = require('../../models/comments');
const User = require('../../models/user');

module.exports = {
  create,
  getComments,
  update,
  deleteComment,
  like
};

async function create(req, res) {
  try {
    const { text, userId, animeId, episodeId } = req.body;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const comment = await Comment.create({
      text,
      user: userId,
      anime: animeId,
      episode: episodeId,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getComments(req, res) {
  try {
    const { animeId, episodeId } = req.params;
    const comments = await Comment.find({ anime: animeId, episode: episodeId }).populate('user');
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );
    comment ? res.json(comment) : res.status(404).json('Could not find comment');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    comment ? res.sendStatus(204) : res.status(404).json('Could not find comment');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function like(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json('Could not find comment');
    comment.likes += 1;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}