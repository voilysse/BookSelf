import { useRef, useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookCardLarge from "./BookCardLarge";

export default function BookCardWrapper({ book }) {
  const wrapperRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);

  useEffect(() => {
    function handleResizeOrHover() {
      const rect = wrapperRef.current?.getBoundingClientRect();
      const largeCardWidth = 576;
      const spacing = 16;

      if (rect) {
        const spaceRight = window.innerWidth - rect.right;
        const spaceLeft = rect.left;

        if (spaceRight < largeCardWidth && spaceLeft >= largeCardWidth + spacing) {
          setShowLeft(true);
        } else {
          setShowLeft(false);
        }
      }
    }

    const node = wrapperRef.current;
    if (node) {
      node.addEventListener("mouseenter", handleResizeOrHover);
    }

    return () => {
      if (node) {
        node.removeEventListener("mouseenter", handleResizeOrHover);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative group w-fit">
      <BookCard book={book} />

      <div
        className={`absolute top-0 z-30 hidden group-hover:block w-max ${
          showLeft ? "right-full mr-4" : "left-full ml-4"
        }`}
      >
        <BookCardLarge book={book} />
      </div>
    </div>
  );
}
