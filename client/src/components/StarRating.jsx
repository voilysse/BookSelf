import "./StarRating.css";
import { ReactComponent as MyIcon } from "./assets/star-solid.svg";
function StarRating({ rating, size }) {
  const w = size;
  const r = rating;
  console.log(rating);
  return (
    <>
      <div className="Stars" style={{ width: `${w}px` }}>
        <div className="GreyStars">
          <MyIcon className="GreyStar" />
          <MyIcon className="GreyStar" />
          <MyIcon className="GreyStar" />
          <MyIcon className="GreyStar" />
          <MyIcon className="GreyStar" />
        </div>
        <div className="GoldStars" style={{ width: `${r * 20}%` }}>
          <MyIcon className="GoldStar" style={{ width: `${w / 5}px` }} />
          <MyIcon className="GoldStar" style={{ width: `${w / 5}px` }} />
          <MyIcon className="GoldStar" style={{ width: `${w / 5}px` }} />
          <MyIcon className="GoldStar" style={{ width: `${w / 5}px` }} />
          <MyIcon className="GoldStar" style={{ width: `${w / 5}px` }} />{" "}
        </div>
      </div>
    </>
  );
}
export default StarRating;
