import { useState, useRef } from "react";
import ContentWrapper from "../ContentWrapper";
import useFetch from "../../hooks/useFetch";
import Img from "../LazyLoadImage";
import PosterFallback from "../../assets/images/no-poster.png";
import "./style.scss";
import { offers } from "../../constant";
import { HashLink } from "react-router-hash-link";

const SkItem = () => {
  return (
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  );
};

const Offers = () => {
  const carouselContainer = useRef({});
  const currency = process.env.REACT_APP_CURRENCY;
  const [endpoint, setEndpoint] = useState(currency);
  console.log(setEndpoint);
  const { loading } = useFetch(`/eventspercurrency/${endpoint}`);

  // const onTabChange = (tab: string) => {
  //   // setEndpoint(tab === "Weekly" ? "weekly" : "monthly");
  //   setEndpoint(tab === "This Week" ? endpoint : endpoint);
  // };

  //const OffersData = data?.data.slice(0).reverse(); //slice(-5)

  // const navigate= useNavigate();
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What we offer</span>
      </ContentWrapper>
      <div className="carousel">
        <ContentWrapper>
          {!loading ? (
            <div className="carouselItems" ref={carouselContainer as any}>
              {offers?.map((item: any, i: number) => {
                const posterUrl = item?.imgs ? item?.imgs : PosterFallback;

                return (
                  <div key={i} className="carouselItem">
                    <HashLink smooth to={item.url}>
                      <div className="posterBlock">
                        <Img src={posterUrl} />
                        {/* <Tags data={getTags(item?.tags).slice(0, 2)} /> */}
                      </div>
                    </HashLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loadingSkeleton">
              {<SkItem />}
              {<SkItem />}
              {<SkItem />}
              {<SkItem />}
              {<SkItem />}
            </div>
          )}
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Offers;
