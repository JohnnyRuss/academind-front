import React from 'react';
import { Link } from 'react-router-dom';
import { CommentIcon } from '../../../Layouts/Icons/icons';

function CommentBTN({ redirect = false, commentsAmount, setShowCommnents, handleShowComment }) {
  return (
    <button onClick={setShowCommnents ? handleShowComment : null}>
      {redirect && (
        <Link to={{ pathname: '/blog/id', query: { user: 'daniel' } }} target='_blank'>
          <CommentIcon /> <span>({commentsAmount})</span>
        </Link>
      )}
      {!redirect && (
        <>
          <CommentIcon /> <span>({commentsAmount})</span>
        </>
      )}
    </button>
  );
}

export default CommentBTN;
