import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/DetailsBanner";

import useFetch from "../../hooks/useFetch";

type Props = {};

const Details = (props: Props) => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/event_slug/${id}`);
  return (
    <div className="">
      <DetailsBanner id={id} data={data} loading={loading} error={error} />
      {/* <Speakers data={[]} title={"Speakers /Artists"} /> */}
      {/* <Similar /> */}
      {/* <OtherOrganizerEvents info={data} /> */}
    </div>
  );
};

export default Details;
