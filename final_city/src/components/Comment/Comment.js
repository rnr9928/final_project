import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  reply,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete =
    currentUserId === comment.userId && reply.length === 0 
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId 
  const replyId = parentId ? parentId : comment.id;
  const day = new Date(comment.day).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      
      <div className="comment_detail">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{day}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="수정"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              답글달기
            </div>
          )}
          {canEdit && (
            <div className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              수정
            </div>
          )}
          {canDelete && (
            <div className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              삭제
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="답글등록"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {reply.length > 0 && (
          <div className="reply">
            {reply.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                reply={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
