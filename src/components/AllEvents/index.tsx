import { useState } from "react";
import useFetch from "../../hooks/useFetch";
// import Card from "../Card";
import AllEventRevamp from "../AllEventRevamp";
// import CardBlogAction from "../CardBlogAction";
// import AllEventRevamp from "../AllEventRevamp";

type Props = {};

const AllTickets = (props: Props) => {
  const currency = process.env.REACT_APP_CURRENCY;
  const [endpoint, setEndpoint] = useState(`/alleventspercurrency/${currency}`);
  const { data, loading } = useFetch(endpoint);
  console.log(setEndpoint);

  // const onTabChange = (tab: string) => {
  //   setEndpoint(
  //     tab === "This Week" ? `/eventspercurrency/${currency}` : `/weekly/events`
  //   );
  // };
  // return <Card title="All Events" data={data?.data} loading={loading} />;
  return <AllEventRevamp />;
};

export default AllTickets;
