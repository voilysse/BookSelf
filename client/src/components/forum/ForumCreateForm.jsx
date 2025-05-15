import React, { useState } from "react";
import { useCreateThreadMutation } from "../../features/forumApi";
import { useNavigate } from "react-router-dom";

const ForumCreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createForum, { isLoading }] = useCreateThreadMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createForum({ title, description });
    navigate("/forums");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Forum</h2>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit" disabled={isLoading}>Create</button>
    </form>
  );
};

export default ForumCreateForm;
