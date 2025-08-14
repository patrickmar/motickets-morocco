import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../ContentWrapper";
import bg from "../../assets/images/moticket-bg2.png";
import BannerBill from "./banner";

type Props = {};
const HeroBanner = (props: Props) => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const currency = process.env.REACT_APP_CURRENCY;
  const { data, loading } = useFetch(`/eventspercurrency/${currency}`);

  useEffect(() => {
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event: any) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    } else if (event.type === "click" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner ">
      {!loading && (
        <div className="backdrop-img">
          <BannerBill />
        </div>
      )}
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Débloquez le plaisir.</span>
          <span className="subTitle">
            Votre billet pour des événements inoubliables.
          </span>
          <div className="searchInput">
            <input
              type="text"
              value={query}
              placeholder="Recherchez la scène, les événements, les lieux, les artistes et bien plus encore...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              className="text-black dark:text-white"
            />
            <button onClick={searchQueryHandler}>Rechercher</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
