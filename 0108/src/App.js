import CommentSection from "./components/Comment/CommentSection";
import "./components/styles/comment.css"
import "./components/styles/board.css"

const App = () => {
  return (
    <div> 
      
      <h1>이슈게시판-상세</h1>
      <div className="board_Content">
        <div className="board_title">
          <h2>제목</h2>
        </div>
        <div className="board_write">
          <h2>내용</h2>
        </div>
        <div className="board_btn">
          <button>삭제하기</button>
          <button>목록보기</button>
          <button>수정하기</button>
        </div>
      </div>
      <CommentSection 
        currentUserId="1"
      />
     
    </div>
  );
};

export default App;
