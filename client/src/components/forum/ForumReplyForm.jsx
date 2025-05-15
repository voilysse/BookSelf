import React, { useState } from "react";
import { useAddReplyToForumMutation } from "../../redux/api/forumApi";

const ForumReplyForm = ({ forumId }) => {
  const [text, setText] = useState("");
  const [addReply, { isLoading }] = useAddReplyToForumMutation();

  const handleReply = async (e) => {
    e.preventDefault();
    await addReply({ id: forumId, body: { text } });
    setText("");
  };

  return (
    <form onSubmit={handleReply}>
      <h4>Add Reply</h4>
      <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      <button type="submit" disabled={isLoading}>Reply</button>
    </form>
  );
};

export default ForumReplyForm;

