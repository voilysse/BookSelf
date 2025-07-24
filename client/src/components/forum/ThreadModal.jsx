import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as BoldIcon } from "../assets/bold-solid.svg";
import { ReactComponent as ItalicIcon } from "../assets/italic-solid.svg";
import { ReactComponent as UnderlineIcon } from "../assets/underline-solid.svg";
import { useCreateThreadMutation } from "../../features/forumApi.js";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";

const availableTags = ["Question", "Review", "Off-Topic", "Discussion"];
const categories = ["General", "Announcements", "Help", "Discussion", "Reviews", "Off-Topic"];

//DROP DOWN MENU
const MenuItem = ({ item, activeItem, setActiveItem, setActiveMenu }) => {
    return (
        <li
            onClick={() => {
                if (item != activeItem) {
                    setActiveItem(item);
                } else {
                    setActiveItem(null);
                }
                setActiveMenu(false);
            }}
            className={`${item === activeItem
                ? "bg-rat_base text-rat_darkest"
                : "hover:bg-rat_light"
                } px-3 py-1 rounded-md text-rat_dark
        hover:text-rat_darkest 
       duration-200 cursor-pointer`}
        >
            {item === activeItem ? (
                <>
                    <i>{item}</i>
                </>
            ) : (
                item
            )}
        </li>
    );
};
const DropdownMenu = ({ itemInfo, activeItem, setActiveItem, placeholder }) => {
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <div
            className={`${activeMenu
                ? "rounded-br-none rounded-bl-none"
                : "rounded-br-md rounded-bl-md"
                } ${activeItem
                    ? "text-white border-rat_darkest bg-rat_dark"
                    : "text-rat_dark border-rat_dark"
                } rounded-tl-md border border-solid rounded-tr-md p-2 w-full flex justify-between items-center relative duration-200`}
        >
            {activeItem === null ? (
                <p className="text-rat_dark">{placeholder}</p>
            ) : (
                <p>
                    <i>{activeItem}</i>
                </p>
            )}
            <button
                onClick={() => {
                    setActiveMenu(!activeMenu);
                }}
                className="bg-rat_dark h-6 w-6 rounded-md grid place-items-center text-white hover:bg-rat_darkest duration-200"
            >
                <FaChevronDown />
            </button>

            {/* menu */}
            <div
                className={`${activeMenu ? "top-full" : "top-1/2 opacity-0 pointer-events-none"
                    } w-full border-2 border-solid border-rat_dark bg-white absolute left-0 duration-200 rounded-bl-md rounded-br-md`}
            >
                <ul className="p-1">
                    {itemInfo.map((item, index) => {
                        return (
                            <MenuItem
                                item={item}
                                key={index}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                setActiveMenu={setActiveMenu}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const CategoryButtons = ({ category, setCategory, placeholder }) => {
    return (
        <div className="w-full h-10 mt-2">
            <DropdownMenu
                itemInfo={categories}
                activeItem={category}
                setActiveItem={setCategory}
                placeholder={placeholder}
            />
        </div>
    );
};

const ThreadModal = ({ isOpen, onClose }) => {
    const [createThread, { isLoading: isSubmitting }] = useCreateThreadMutation();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleClose();
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
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
        
    }, [isOpen]);
    

    const toggleTag = (tag) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async () => {
        try {
            console.log(tags)
            await createThread({
                title: title.trim(),
                text: text.trim(),
                category,
                tags,
            }).unwrap();
            handleClose();
        } catch (err) {
            console.error("Thread submission failed", err);
        }
    };

    const handleClose = () => {
        setTitle("");
        setText("");
        setCategory("");
        setTags([]);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl transition-all duration-200 ease-in-out"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Thread</h2>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rat_base"
                        placeholder="Enter your thread title"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                    <CategoryButtons
                        placeholder={"Select category"}
                        category={category}
                        setCategory={setCategory}
                    />

                </div>

                {/* Tag Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 text-sm rounded-full border ${tags.includes(tag)
                                        ? "bg-rat_base text-white text-xs font-medium px-2 py-1 rounded-xl"
                                        : "hover:bg-rat_base hover:text-white text-xs font-medium px-2 py-1 rounded-xl bg-rat_lightest text-rat_darkest"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Text Area */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rat_base"
                        rows={6}
                        placeholder="Start the discussion..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                {/* Icons + Submit */}
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
                            disabled={
                                isSubmitting ||
                                title.trim() === "" ||
                                text.trim() === "" ||
                                category === ""
                            }
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ThreadModal;

