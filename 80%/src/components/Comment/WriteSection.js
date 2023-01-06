import { useState } from "react";

const WriteSection = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {
  const [text, setText] = useState("");
  const emptyInput = text.length === 0;
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="comment_input"
        placeholder="댓글을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment_button" disabled={emptyInput}>
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

export default WriteSection;
