import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

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

export default DropdownMenu;
