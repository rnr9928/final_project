import CommentSection from "./components/Comment/CommentSection";
import "./components/styles/comment.css"

const App = () => {
  return (
    <div>
      <h1>이슈게시판-상세</h1>
      <CommentSection
        currentUserId="1"
      />
    </div>
  );
};

export default App;
