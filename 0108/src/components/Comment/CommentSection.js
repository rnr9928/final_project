import { useState } from "react";
import WriteSection from "./WriteSection";
import Comment from "./Comment";
import {
  createComment ,
  _updateComment ,
  _deleteComment ,
} from "../../api";



// 현재유저
const CommentSection = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  // 답글 , 수정  댓글  
  const [actionComment, setActionComment] = useState([]);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
    // 다음댓글은 아래에서 시작하기
  ).sort((a,b) => new Date(a.day) - new Date(b.day));

  // 답글
  const getReply = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort((a,b) => new Date(a.day) - new Date(b.day)) 

      // 댓글추가
  const addComment = (text, parentId) => {
    createComment(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActionComment(null);
    });
  };

  // 수정하기
  const updateComment = (text, commentId) => {
    _updateComment(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActionComment(null);
    });
  };

  // 삭제하기
  const deleteComment = (commentId) => {
    if (window.confirm("정말로 삭제할까요?")) {
      _deleteComment().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };
  

  return (
    <div className="comments">
    
      <div className="comments_container">
      <details>
        <summary className="folder">댓글 &nbsp;
        {
        backendComments.length===0? <div>댓글없음</div>       
          : backendComments.length
        } 
        </summary>
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            reply={getReply(rootComment.id)}
            actionComment={actionComment}
            setActionComment={setActionComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}          
          />
        ))}</details>
      </div>
      
      <WriteSection submitLabel="등록" handleSubmit={addComment} />
    </div>
  );
};

export default CommentSection;
