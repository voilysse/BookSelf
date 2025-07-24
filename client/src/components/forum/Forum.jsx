import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import ThreadModal from "./ThreadModal";
import { useSearchParams } from "react-router-dom";
const tags = ["Question", "Review", "Off-Topic", "Discussion"];
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

const CategoryButtons = ({ placeholder, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-[200px] h-10 mt-4 flex gap-3 justify-center items-center">
      <DropdownMenu
        itemInfo={categories}
        activeItem={selectedCategory}
        setActiveItem={setSelectedCategory}
        placeholder={placeholder}
      />
    </div>
  );
};

const TagsButtons = ({ placeholder, selectedTag, setSelectedTag }) => {
  return (
    <div className="w-[200px] h-10 mt-4 flex gap-3 justify-center items-center">
      <DropdownMenu
        itemInfo={tags}
        activeItem={selectedTag}
        setActiveItem={setSelectedTag}
        placeholder={placeholder}
      />
    </div>
  );
};

export default function Forum() {
const [searchParams, setSearchParams] = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const { data, isLoading } = useGetAllThreadsQuery();

  useEffect(() => {
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    if (category) setSelectedCategory(category);
    if (tag) setSelectedTag(tag);
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;

  const filteredThreads = data.threads.filter((thread) => {
    const categoryMatch = selectedCategory ? thread.category === selectedCategory : true;
    const tagMatch = selectedTag ? thread.tags.includes(selectedTag) : true;
    return categoryMatch && tagMatch;
  });

  return (
    <div className="p-6 px-32">
      <div className="flex justify-between">
        <div className="flex justify-end gap-4">
          <CategoryButtons
            placeholder={"All categories"}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <TagsButtons
            placeholder={"All tags"}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
          <div className="h-10 mt-4 flex gap-3 justify-center items-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-rat_base text-white rounded-lg hover:bg-opacity-90"
          >
            Create Thread
          </button>
          <ThreadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <p className="uppercase font-bold text-rat_dark">Topic</p>
        <div className="flex justify-end gap-5">
          <p className="uppercase font-bold text-rat_dark">Replies</p>
          <p className="uppercase font-bold text-rat_dark">Activity</p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow h-0.5 border-t-0 bg-rat_lightest" />
      </div>

      <div>
        {filteredThreads.length === 0 ? (
          <p className="text-gray-500 italic">The void.</p>
        ) : (
          filteredThreads.map((t) => (
            <>
              <ForumCard key={t._id} thread={t} />
              <div className="flex items-center my-4">
                <hr className="flex-grow h-[1px] border-t-0 bg-rat_lightest" />
              </div></>
          ))
        )}
      </div>
    </div>
  );
}


