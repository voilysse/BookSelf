import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
  cards = [],
  cardWidth = 150,
  cardHeight = 220,
  gap = 10,
  cardsToShow = 4,
  speed = 3000,
}) => {
  const containerWidth = cardWidth * cardsToShow + (cardsToShow - 1) * gap;
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(cardsToShow); // start from first real card
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalCards = cards.length;

  // Extended cards: clone first and last few cards to create the seamless loop
  const extendedCards = [
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
  ];

  // Function to slide to the current card index
  const slideTo = (index) => {
    if (trackRef.current) {
      if (isTransitioning) {
        trackRef.current.style.transition =
          "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
      } else {
        trackRef.current.style.transition = "none";
      }
      trackRef.current.style.transform = `translateX(-${
        index * (cardWidth + gap)
      }px)`; // adjusted for margin
    }
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsTransitioning(true);
  };

  const slideLeft = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setIsTransitioning(true);
  };

  // Update the carousel position based on the current index
  useEffect(() => {
    slideTo(currentIndex);
  }, [currentIndex, isTransitioning]);

  const handleTransitionEnd = () => {
    if (trackRef.current) {
      if (currentIndex === extendedCards.length - cardsToShow) {
        // Jump to first real card
        setIsTransitioning(false);
        setCurrentIndex(cardsToShow);
      } else if (currentIndex === 0) {
        // Jump to last real card
        setIsTransitioning(false);
        setCurrentIndex(totalCards);
      }
    }
  };

  // Reset position after transition ends to avoid clipping
  useEffect(() => {
    const node = trackRef.current;
    node.addEventListener("transitionend", handleTransitionEnd);
    return () => node.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, cardsToShow, totalCards, extendedCards.length]);

  // Autoscroll when not hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        slideRight();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isHovered, speed]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: `${containerWidth}px`,
        position: "relative",
        margin: "0 auto",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          <button onClick={slideLeft} style={arrowStyle("left")}>
            ◀
          </button>
          <button onClick={slideRight} style={arrowStyle("right")}>
            ▶
          </button>
        </>
      )}

      <div
        ref={trackRef}
        style={{
          display: "flex",
          transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        {extendedCards.map((card, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              marginRight:
                index === extendedCards.length - 1 ? "0" : `${gap}px`, // no margin for last card
              flexShrink: 0,
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: "10px",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  fontSize: "20px",
  cursor: "pointer",
  zIndex: 2,
});

export default Carousel;
