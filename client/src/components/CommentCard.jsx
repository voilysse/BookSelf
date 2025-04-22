function CommentCard({ comment, height, width }) {
  return (
    <>
      I am a comment card
      <div className="Container">
        <div className="username">{comment.username}</div>
        <div className="content">{comment.content}</div>
      </div>
    </>
  );
}
export default CommentCard;
