import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as BoldIcon } from "../assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "../assets/underline-solid.svg";
import { useCreateReviewMutation } from "../../features/bookApi.js";
import { useSelector } from "react-redux";

import "./StarRating.css";
import { ReactComponent as MyIcon } from "../assets/star-solid.svg";

const StarRating = ({ rating, setRating, size = 120 }) => {
    const [hovered, setHovered] = useState(0);
    const stars = [1, 2, 3, 4, 5];

    const starSize = size / 5;

    return (
        <div className="flex gap-1 cursor-pointer">
            {stars.map((star) => (
                <MyIcon
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className={`transition fill-current ${(hovered || rating) >= star ? "text-star" : "text-gray-300"
                        }`}
                    style={{ width: starSize, height: starSize }}
                />
            ))}
        </div>
    );
};

const ReviewModal = ({ isOpen, onClose, onSubmit, bookId }) => {
    const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setText("");
                setRating(0);
                onClose();
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setText("");
                setRating(0);
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
        if (!text.trim() || rating === 0) return;
        try {
            await createReview({
                book: bookId,
                rating,
                text: text.trim(),
            }).unwrap();

            setText("");
            setRating(0);
            onClose();
        } catch (err) {
            console.error("Review submission failed", err);
        }
    };

    const handleClose = async () => {
        setText("");
        setRating(0);
        onClose();
    };


    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl transition-all duration-200 ease-in-out"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Your Rating</label>
                    <StarRating rating={rating} setRating={setRating} size={150} />
                    <p className="text-xs text-gray-400 mt-1">Click a star to rate</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Your Review</label>
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
                            disabled={rating === 0 || text.trim() === ""}
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

export default ReviewModal;
