import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";
import ThreadModal from "./ThreadModal";
import { useSearchParams } from "react-router-dom";
import DropdownMenu from "../DropdownMenu.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForumSideMenu from "./ForumSideMenu.jsx";

const tags = ["Question", "Review", "Off-Topic", "Discussion"];
const categories = ["General", "Announcements", "Help", "Discussion", "Reviews", "Off-Topic"];

export default function Forum() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const { data, isLoading } = useGetAllThreadsQuery();

  useEffect(() => {
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    setSelectedCategory(category);
    setSelectedTag(tag);
  }, [searchParams]);

  const updateSearch = (category, tag) => {
    const params = {};
    if (category) params.category = category;
    if (tag) params.tag = tag;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchParams({});
  };

  if (isLoading) return <div>Loading...</div>;

  const filteredThreads = data.threads.filter((thread) => {
    const categoryMatch = selectedCategory ? thread.category === selectedCategory : true;
    const tagMatch = selectedTag ? thread.tags.includes(selectedTag) : true;
    return categoryMatch && tagMatch;
  });

  return (
    <div className="p-8 mx-20 grid grid-cols-6 gap-6">

      {/* Side menu */}
      <div className="col-span-1">
        <ForumSideMenu categories={categories} tags={tags}/>
      </div>

      <div className="col-span-5">
        <div className="sticky top-0 bg-white z-10 pb-2">
          <div className="flex justify-between">
            <div className="flex justify-end gap-4">
              <div className="w-[200px] h-10 mt-4 flex gap-3 justify-center items-center">
                <DropdownMenu
                  itemInfo={categories}
                  activeItem={selectedCategory}
                  setActiveItem={(item) => {
                    setSelectedCategory(item);
                    updateSearch(item, selectedTag);
                  }}
                  placeholder="All categories"
                />
              </div>
              <div className="w-[200px] h-10 mt-4 flex gap-3 justify-center items-center">
                <DropdownMenu
                  itemInfo={tags}
                  activeItem={selectedTag}
                  setActiveItem={(item) => {
                    setSelectedTag(item);
                    updateSearch(selectedCategory, item);
                  }}
                  placeholder="All tags"
                />
              </div>
              <div className="h-10 mt-4 flex gap-3 justify-center items-center">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    setModalOpen(true);
                  }
                }}
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
        </div>

        <div>
          {filteredThreads.length === 0 ? (
            <p className="text-gray-500 italic text-center">The void.</p>
          ) : (
            filteredThreads.map((t) => (
              <div key={t._id}>
                <ForumCard thread={t} />
                <div className="flex items-center my-1">
                  <hr className="flex-grow h-[1px] border-t-0 bg-rat_lightest" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}