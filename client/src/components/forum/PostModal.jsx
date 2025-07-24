import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as BoldIcon } from "../assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "../assets/underline-solid.svg";
import { useCreatePostMutation } from "../../features/forumApi.js";
import { useSelector } from "react-redux";

import { ReactComponent as MyIcon } from "../assets/star-solid.svg";


const PostModal = ({ isOpen, onClose, onSubmit, threadId }) => {
    const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();

    const [text, setText] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setText("");
                onClose();
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setText("");
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async () => {
        try {
            await createPost({
                threadId: threadId._id,
                text: text.trim(),
            }).unwrap();
            setText("");
            onClose();
        } catch (err) {
            console.error("Post submission failed", err);
        }
    };

    const handleClose = async () => {
        setText("");
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl transition-all duration-200 ease-in-out"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reply</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Your Post</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rat_base"
                        rows={6}
                        placeholder="Share your thoughts..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3 text-gray-400">
                        <BoldIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
                        <ItalicIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
                        <UnderlineIcon className="w-4 h-4 hover:text-gray-700 cursor-pointer" />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-lg bg-rat_base text-white text-sm font-medium hover:bg-opacity-90 disabled:opacity-50"
                            disabled={text.trim() === ""}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PostModal;
