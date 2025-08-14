import moroccobanner from "../../assets/images/moroccobanner.jpeg";

const BannerBill = () => {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center"
        style={{
          height: "44rem",
          backgroundImage: `url(${moroccobanner})`, // Use the imported image
        }}
      >
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
          <div className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerBill;
