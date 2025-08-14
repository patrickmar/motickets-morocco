import HeroBanner from "../../components/HeroBanner";
import CardBlogAction from "../../components/CardBlogAction";
import { ToastContainer } from "react-toastify";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <HeroBanner />
      <CardBlogAction />
      {/* <Offers /> */}
      {/* <Trending /> */}
      {/* <PastEvent /> */}
      {/* <TopRated /> */}
      <ToastContainer />
    </div>
  );
};

export default Home;
