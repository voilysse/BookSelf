import { useGetAllThreadsQuery } from "../../features/forumApi";
import ForumCard from "./ForumCard";
import { useState, useEffect } from "react";
import ThreadModal from "./ThreadModal";
import { useSearchParams } from "react-router-dom";
import DropdownMenu from "../DropdownMenu.jsx";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ForumSideMenu = ({ categories, tags }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    setSelectedCategory(category);
    setSelectedTag(tag);
  }, [searchParams]);

  const navigate = useNavigate();
  const location = useLocation();

  const updateSearch = (category, tag) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);

    if (!location.pathname.startsWith("/forum") || location.pathname.includes("/thread/")) {
      navigate(`/forum?${params.toString()}`);
    } else {
      setSearchParams(params);
    }
  };

  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    updateSearch(newCategory, selectedTag);
  };

  const handleTagClick = (tag) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    updateSearch(selectedCategory, newTag);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    navigate("/forum");
  };

  return (
    <div className="sticky top-20 space-y-4 pr-12">
      <div>
        <p
          onClick={clearFilters}
          className="cursor-pointer px-3 py-1 text-base text-rat_dark rounded-md hover:bg-rat_base hover:text-white"
        >
          All
        </p>
      </div>
      <div>

        <p className="uppercase text-sm font-semibold text-rat_dark mb-2">Categories</p>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer px-3 py-1 rounded-md duration-200 ${selectedCategory === category
                ? "bg-rat_base text-white"
                : "hover:bg-rat_light hover:text-rat_darkest text-rat_dark"
                }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="uppercase text-sm font-semibold text-rat_dark mb-2">Tags</p>
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer px-3 py-1 rounded-md duration-200 ${selectedTag === tag
                ? "bg-rat_base text-white"
                : "hover:bg-rat_light hover:text-rat_darkest text-rat_dark"
                }`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ForumSideMenu