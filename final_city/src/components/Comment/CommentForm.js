import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {
  const [text, setText] = useState("");
  const emptyTextarea = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment_textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment_button" disabled={emptyTextarea}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment_button comment_cancel_button"
          onClick={handleCancel}
        >
          취소
        </button>
      )}
    </form>
  );
};

export default CommentForm;
