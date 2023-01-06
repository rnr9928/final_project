import WriteSection from "./WriteSection";


const Comment = ({
  comment,
  reply,
  setActionComment,
  actionComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    actionComment &&
    actionComment.id === comment.id &&
    actionComment.type === "Edit";

  const isReplying =
    actionComment &&
    actionComment.id === comment.id &&
    actionComment.type === "Reply";

  const isDelete = currentUserId === comment.userId && reply.length === 0 
  const isReply = Boolean(currentUserId);
  const isEdit = currentUserId === comment.userId 
  const replyId = parentId ? parentId : comment.id;
  const day = new Date(comment.day).toISOString();
 

  return (
    <div key={comment.id} className="comment">
      
      <div className="comment_detail">
        <div className="comment-content">
          <div className="comment-writer">{comment.username}</div>
          <div>{day}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <WriteSection
            submitLabel="수정"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActionComment(null);
            }}
            
          />
          
        )}
        
        <div className="comment-actions">
          {isReply && (
            <div className="comment-action"
              onClick={() =>
                setActionComment({ id: comment.id, type: "Reply" })
              }
            >
              답글달기
            </div>
          )}

          {isEdit && (
            <div className="comment-action"
              onClick={() =>
                setActionComment({ id: comment.id, type: "Edit" })
              }
            >
              수정
            </div>
          )}

          {isDelete && (
            <div className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              삭제
            </div>
          )}
        </div>
        {isReplying && (
          <WriteSection
            submitLabel="답글"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {reply.length > 0 && (
          <div className="reply">
            {
            reply.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActionComment={setActionComment}
                actionComment={actionComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                reply={[]}
                currentUserId={currentUserId}
              />
            ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
