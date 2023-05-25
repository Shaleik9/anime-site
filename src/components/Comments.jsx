import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comment({ episodeId, animeId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [episodeId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${animeId}/${episodeId}`);
      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/comments`, {
        text: newComment,
        animeId,
        episodeId,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.text}</p>
              <button onClick={() => handleCommentDelete(comment._id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}