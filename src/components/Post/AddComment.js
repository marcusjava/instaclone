import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import { saveComment } from "../../services/firebase";

// import { Container } from './styles';

function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comments.length >= 1) {
      setComments([{ displayName, comment }, ...comments]);
      setComment("");
    }

    return await saveComment(docId, { displayName, comment });
  };

  return (
    <div className="border-t border-gray-primary ">
      <form className="flex justify-between pl-0 pr-5">
        <input
          aria-label="Add a comment"
          ref={commentInput}
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          type="button"
          className={`text-sm font-bold text-blue-medium ${
            !comment && `opacity-25`
          }`}
          disabled={comment.length < 1}
          onClick={handleSubmit}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};

export default AddComment;
