import { use, useEffect, useState } from "react";
import picSrc from "../assets/profile-picture.jpg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as NotificationsIcon } from "../assets/notifications.svg";
import { ReactComponent as ShelfIcon } from "../assets/book-shelf.svg";
import { ReactComponent as GroupIcon } from "../assets/group-solid.svg";
import { ReactComponent as ForumIcon } from "../assets/forum.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as LogOutIcon } from "../assets/log-out.svg";
import { ReactComponent as DownArrowIcon } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/up-arrow.svg";

function ExpandableItem({
  item,
  selectedExpandableItem,
  setSelectedExpandableItem,
  parentItem,
  setSelectedItem,
}) {
  const [selected, setSelected] = useState(false);

  const handleSelection = () => {
    setSelectedItem(parentItem);
    setTimeout(() => {
      setSelectedExpandableItem(item);
    }, 0);
  };
  useEffect(() => {
    setSelected(selectedExpandableItem === item);
  }, [selectedExpandableItem, item]);

  return (
    <div
      className="expandableItemText"
      style={{
        color: `${selected ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"}`,
        position: "relative",
        fontSize: "11px",
        fontWeight: "600",
      }}
    >
      <div style={{ marginLeft: "35px", position: "relative" }}>
        <div
          style={{
            borderLeft: "2px solid rgb(200,200,200)",
            borderBottom: "2px solid rgb(200,200,200)",
            width: "16px",
            height: "20px",
            position: "absolute",
            left: -20,
            top: -12,
            borderRadius: "0 0 0 5px",
          }}
        ></div>
        <div
          onClick={() => {
            handleSelection();
          }}
        >
          {item}
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  item,
  selectedItem,
  setSelectedItem,
  expandedItemName,
  setExpandedItemName,
  selectedExpandableItem,
  setSelectedExpandableItem,
}) {
  const [selected, setSelected] = useState(false);
  const expanded = expandedItemName === item.name;
  const handleSelection = () => {
    setSelectedItem(item);
  };
  const listen = useEffect(() => {
    const isCurrentItem = selectedItem?.name === item.name;
    setSelected(isCurrentItem);

    if (!isCurrentItem && item.expandable) {
      setSelectedExpandableItem(null);
    }
  }, [selectedItem]);
  const toggleExpanded = () => {
    setExpandedItemName(expanded ? null : item.name);
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSelection();
        }}
        style={{
          backgroundColor: `${
            selected ? "rgba(255, 150, 30, 1)" : "rgba(255, 150, 30, 0)"
          }`,
          border: "none",
          width: "100%",
          height: 30,
          borderRadius: 6,
          display: "flex",
        }}
      >
        <div
          className="ItemContainer"
          style={{
            width: "100%",
            height: 30,
            borderRadius: 6,
            display: "flex",
          }}
        >
          <div
            className="IconContainer"
            style={{
              width: 30,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <item.icon
              className="icon"
              style={{
                fill: `${selected ? "white" : "rgba(0, 0, 0, 0.3)"}`,
                width: "50%",
                height: "50%",
              }}
            />
          </div>
          <div
            className="Text"
            style={{
              fontSize: 12,
              alignSelf: "center",
              color: `${selected ? "white" : "rgba(0, 0, 0, 0.3)"}`,
            }}
          >
            {item.name}
          </div>
          {item.numberVisible && item.number !== 0 && (
            <div
              className="Number"
              style={{
                width: 12,
                height: 16,
                backgroundColor: "rgba(255, 165, 0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                color: "white",
                alignSelf: "center",
                marginLeft: 4,
                fontSize: 13,
              }}
            >
              {item.number}
            </div>
          )}
          {item.expandable && (
            <div
              className="DownArrow"
              style={{
                width: 12,
                height: 8,
                alignSelf: "center",
                marginLeft: 5,
                justifySelf: "end",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded();
                }}
                className="arrowButton"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                }}
              >
                {expanded && (
                  <UpArrowIcon
                    width="16"
                    height="12"
                    style={{
                      fill: `${selected ? "white" : "rgba(0, 0, 0, 0.3)"}`,
                    }}
                  />
                )}
                {!expanded && (
                  <DownArrowIcon
                    width="16"
                    height="12"
                    style={{
                      fill: `${selected ? "white" : "rgba(0, 0, 0, 0.3)"}`,
                    }}
                  />
                )}
              </button>
            </div>
          )}
        </div>
      </button>
      {expanded && (
        <div
          className="scroll-container"
          style={{
            width: "100%",
            maxHeight: "40%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "orange rgba(0,0,0,0.05)",
          }}
        >
          {item.expandableList.map((i, index) => (
            <ExpandableItem
              item={i}
              selectedExpandableItem={selectedExpandableItem}
              setSelectedExpandableItem={setSelectedExpandableItem}
              parentItem={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      )}
    </>
  );
}
function Divider() {
  return (
    <div
      className="MenuContainer"
      style={{
        borderRadius: "1px",
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "90%",
        height: "2px",
      }}
    ></div>
  );
}
function MenuFooter({
  items,
  setSelectedItem,
  selectedItem,
  selectedExpandableItem,
  setSelectedExpandableItem,
}) {
  return (
    <div
      className="MenuContainer"
      style={{
        width: "80%",
        height: "60px",
      }}
    >
      {items.map((i, index) => (
        <MenuItem
          item={i}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedExpandableItem={selectedExpandableItem}
          setSelectedExpandableItem={setSelectedExpandableItem}
        />
      ))}
    </div>
  );
}
function Menu({
  items,
  setSelectedItem,
  selectedItem,
  selectedExpandableItem,
  setSelectedExpandableItem,
}) {
  const [expandedItemName, setExpandedItemName] = useState(null);
  return (
    <div
      className="MenuContainer"
      style={{
        width: "80%",
        height: "50%",
        minHeight: "250px",
      }}
    >
      {items.map((i, index) => {
        return (
          <MenuItem
            item={i}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            expandedItemName={expandedItemName}
            setExpandedItemName={setExpandedItemName}
            selectedExpandableItem={selectedExpandableItem}
            setSelectedExpandableItem={setSelectedExpandableItem}
          />
        );
      })}
    </div>
  );
}
function Profile({ pic, name }) {
  const y = 40;
  const x = 1 * y;
  return (
    <div
      className="ProfileContainer"
      style={{
        width: "80%",
        height: "44px",
        display: "flex",
        justifyItems: "center",
      }}
    >
      <div
        className="Picture"
        style={{
          width: `${y + 4}px`,
          height: "100%",
          border: "2px solid orange",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={pic}
          style={{
            borderRadius: "8px",
            border: "2px solid white",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        className="Text"
        style={{
          width: "68%",
          height: `${x}px`,
          alignSelf: "end",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: 0,
            marginLeft: 4,
            marginBottom: 3,
            fontWeight: "600",
            color: "rgba(0,0,0,0.2)",
            height: "12px",
            display: "flex",
            fontSize: "12px",
          }}
        >
          Hello
        </div>
        <strong
          style={{
            padding: 0,
            marginLeft: 4,
            color: "grey",
            fontSize: `${x / 3.5}px`,
            overflow: "hidden",
            textWrap: "no-wrap",
            lineHeight: "1",
            fontWeight: 600,
          }}
        >
          @{name}
        </strong>
      </div>
    </div>
  );
}
function SidebarNavigation({
  username = "username",
  profilePicture = picSrc,
  actions = [
    {
      name: "Home",
      action: () => {
        window.alert("Home");
      },
    },
    {
      name: "Notifications",
      action: () => {
        window.alert("Notification");
      },
    },
    {
      name: "Bookshelves",
      action: () => {
        window.alert("Bookshelves");
      },
    },
    {
      name: "Groups",
      action: () => {
        window.alert("Groups");
      },
    },
    {
      name: "Forum",
      action: () => {
        window.alert("Forum");
      },
    },
    {
      name: "Settings",
      action: () => {
        window.alert("Settings");
      },
    },
    {
      name: "Log Out",
      action: () => {
        window.alert("Log Out");
      },
    },
    {
      name: "Bookshelf",
      action: () => {
        window.alert("Bookshelf");
      },
    },
    {
      name: "Group",
      action: () => {
        window.alert("Group");
      },
    },
  ],
  item,
  setItem,
  dropDownItem,
  setDropDownItem,
  data: defaultSelected = 0,
  bookshelves = ["Favorites", "Want To Read", "Reading", "Read"],
  groups = ["My Group"],
  notificationNumber = 0,
  groupNumber = 0,
  forumNUmber = 0,
}) {
  const [expanded, setExpanded] = useState(true);
  const [expanding, setExpanding] = useState(false);

  const footerContents = [
    {
      icon: SettingsIcon,
      name: "Settings",
      expandable: false,
      expandableList: [],
      number: 0,
      numberVisible: false,
    },
    {
      icon: LogOutIcon,
      name: "Log Out",
      expandable: false,
      expandableList: [],
      number: 0,
      numberVisible: false,
    },
  ];
  const contents = [
    {
      icon: HomeIcon,
      name: "Home",
      expandable: false,
      expandableList: [],
      number: 0,
      numberVisible: false,
    },
    {
      icon: NotificationsIcon,
      name: "Notifications",
      expandable: false,
      expandableList: [],
      number: notificationNumber,
      numberVisible: true,
    },
    {
      icon: ShelfIcon,
      name: "Bookshelves",
      expandable: true,
      expandableList: bookshelves,
      number: 0,
      numberVisible: false,
    },
    {
      icon: GroupIcon,
      name: "Groups",
      expandable: true,
      expandableList: groups,
      number: groupNumber,
      numberVisible: false,
    },
    {
      icon: ForumIcon,
      name: "Forum",
      expandable: false,
      expandableList: [],
      number: forumNUmber,
      numberVisible: false,
    },
  ];
  const [selectedExpandableItem, setSelectedExpandableItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(
    () => contents[defaultSelected]
  );
  const handleSelection = useEffect(() => {
    for (const key in actions) {
      if (selectedItem.name === actions[key].name) {
        actions[key].action();
      }
    }
  }, [selectedItem]);
  return (
    <>
      <div
        className="SidebarContainer"
        style={{
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: "white",
          width: "180px",
          height: "100%",
          padding: "36px 0 36px 0",
          boxShadow: "0 0 3px rgba(0,0,0,0.3)",
          borderRadius: "0 16px 16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Profile pic={profilePicture} name={username} />
        {Divider()}
        <Menu
          items={contents}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedExpandableItem={selectedExpandableItem}
          setSelectedExpandableItem={setSelectedExpandableItem}
        />
        {Divider()}
        <MenuFooter
          items={footerContents}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedExpandableItem={selectedExpandableItem}
          setSelectedExpandableItem={setSelectedExpandableItem}
        />
      </div>
      <style>{`.scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background-color: orange;
    border-radius: 999px; /* round */
  }
      *{
      .arrowButton:hover{
      cursor:pointer;
      }
      .expandableItemText{
        color: rgba(0,0,0,0.3);
      }
      .expandableItemText:hover{
        cursor: pointer;
        color: rgba(0,0,0,0.55);
      }
      .DownArrow:hover{
       scale: 1.1
      }
      box-sizing: border-box;
      }
      .Text{
      color: rgba(0,0,0,0.3);
      font-weight: 600;
      }
      .ItemContainer{
        background-color: rgba(255, 150, 30, 0);
      }
      .ItemContainer:hover{
        cursor: pointer;
        background-color: rgba(255, 150, 30, 0.2);
      }
      `}</style>
    </>
  );
}
export default SidebarNavigation;
