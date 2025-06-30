import { useState, useEffect, Fragment, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import "./styles.scss";
import ContentWrapper from "../../components/ContentWrapper";
import Img from "../../components/LazyLoadImage";
import PosterFallback from "../../assets/images/no-poster.png";
// import Tags from "../Tags";
import {
  convertHTMLCode,
  getCurrency,
  getCurrencyName,
  // getTags,
} from "../../utils/functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  id: any;
  data: any;
  loading: boolean;
  error?: any;
};

const DetailsBanner = ({ id, data, loading, error }: Props) => {
  const newData = data?.data[0];
  const imageURL = process.env.REACT_APP_IMAGEURL;
  const [selectedImage, setSelectedImage] = useState(
    newData ? newData?.imgs[0]?.img : ""
  );
  // console.log(newData?.enableseat);
  const enableSeat = newData?.enableseat;
  const [tickets, setTickets] = useState<any>([]);
  const [bookFees, setbookFees] = useState<any>([]);
  const [ticketsQty, setTicketsQty] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (newData) {
      setSelectedImage(newData?.imgs[0]?.img);
      setTickets(
        newData.ticketCategories.map((category: any) => ({
          price: category.price,
          discount_price: category.discount_price,
          event_id: category.event_id,
          id: category.id,
          name: category.name,
          booking_fee: category.booking_fee,
          qty: 0,
          issued_qty: category.quantity,
        }))
      );

      setTicketsQty(
        newData.ticketCategories.map((category: any) => ({
          qty: category.quantity,
        }))
      );

      setbookFees(
        newData.ticketCategories.map((category: any) => ({
          booking_fee: category.booking_fee,
        }))
      );
    }
  }, [data, newData]);

  const eventInfo = (newData: any) => {
    const options = [
      // {
      //   name: "Status",
      //   value: newData?.status,
      // },
      {
        name: "Lieu",
        value: newData?.venue,
      },
      {
        name: "Catégorie",
        value: newData?.event_cat,
      },
      // {
      //   name: "Jours",
      //   value: differenceInDays(newData),
      // },
    ];
    return options;
  };

  // const dateInfo = (newData: any) => {
  //   const options = [
  //     {
  //       name: "Date de début",
  //       value: moment(newData?.from_date).format("MMM D, YYYY."),
  //     },
  //     {
  //       name: "Date de fin",
  //       value: newData?.to_date
  //         ? moment(newData?.to_date).format("MMM D, YYYY.")
  //         : "",
  //     },
  //     {
  //       name: "Heure",
  //       value: moment(newData?.from_date + " " + newData?.from_time).format(
  //         "hh:mmA"
  //       ),
  //     },
  //   ];
  //   return options;
  // };

  // const differenceInDays = (newData: any) => {
  // const startDateMoment = newData?.from_date
  // ? moment(newData?.from_date)
  // : moment();
  // const endDateMoment =
  // newData?.to_date && newData?.to_date !== ""
  // ? moment(newData?.to_date)
  // : moment(newData?.from_date);

  // Calculate the difference in days
  // return endDateMoment.diff(startDateMoment, "days") + 1;
  // };
  //console.log(tickets);
  const currency = getCurrency(newData);
  const currencyName = getCurrencyName(newData);
  const isButtonEnabled = tickets.some((item: any) => item.qty > 0);
  // console.log(currencyName);
  const increment = (index: number) => {
    const updatedCategories = [...tickets];
    const updatedQty = [...ticketsQty];

    if (updatedCategories[index].qty >= updatedQty[index].qty) {
      toast(
        "Vous ne pouvez pas acheter plus que le nombre de billets restants. ( " +
          updatedQty[index].qty +
          " ), Veuillez acheter un autre type de billet."
      );
    } else {
      updatedCategories[index].qty += 1;
      setTickets(updatedCategories);
    }
  };

  const decrement = (index: number) => {
    const updatedCategories = [...tickets];
    if (updatedCategories[index].qty > 0) {
      updatedCategories[index].qty -= 1;
      setTickets(updatedCategories);
    }
  };
  const handleQuantity = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedCategories = [...tickets];
    const updatedQty = [...ticketsQty];
    // console.log(updatedQty);
    updatedCategories[index].qty = Number(e.target.value);

    setTickets(updatedCategories);
  };

  const calculateTotalPrice = (category: any, index: number) => {
    const updatedCategories = [...tickets];
    const updatedBookFees = [...bookFees];
    //console.log(updatedBookFees);
    const qty = category.qty > 0 ? category.qty : 1;
    const bookFee = updatedBookFees[index].booking_fee;
    //console.log(updatedBookFees[index].booking_fee);
    const newBookFee = bookFee * qty;
    const newPrice = category.price * qty;
    const totalPrice = newBookFee + newPrice;
    //console.log(totalPrice);
    //updatedCategories[index].booking_fee = newBookFee;
    //setbookFees(newBookFee);
    updatedCategories[index].booking_fee = newBookFee;
    //setbookFees(updatedCategories);
    // console.log(totalPrice);
    return newPrice;
  };

  const goToCheckout = () => {
    //console.log(tickets);
    const { currency, title } = newData;
    navigate("/checkout", {
      state: { tickets: tickets, data: { currency, title } },
    });
  };

  return (
    <div className="detailsBanner  ">
      {!loading ? (
        <>
          {!!data && (
            <Fragment>
              {/* <div className="">
                <Img src={imageURL + newData?.imgs[0]?.img} />
              </div> */}
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content w-full h-full">
                  <div className="left">
                    {newData?.imgs[0]?.img ? (
                      <Img
                        className="posterImg"
                        src={imageURL + selectedImage}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                    <div className="w-full hidden my-6 max-w-10 lg:max-w-none mx-auto lg:block">
                      <div className="grid gap-6 grid-cols-4">
                        {newData?.imgs?.map((item: any, i: number) => (
                          <button
                            key={i}
                            className="uppercase text-customBlack font-medium text-sm bg-white rounded-md items-center justify-center cursor-pointer h-24 flex relative"
                            type="button"
                            onClick={() => setSelectedImage(item.img)}
                          >
                            <span>Vue de l'image</span>
                            <span className="rounded-md overflow-hidden inset-0 absolute">
                              <Img
                                className="object-center object-cover w-full h-full"
                                alt={`${newData.title} ${item.sn}`}
                                src={imageURL + item.img}
                              />
                            </span>
                            <span
                              className={`${
                                selectedImage === item.img
                                  ? "ring-2 ring-offset-2 "
                                  : ""
                              }  ring-red-600 ring-offset-current rounded-md inset-0 absolute pointer-events-none`}
                            ></span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="right">
                    {/* <div className="title">{`${newData.title}`}</div> */}
                    {/* <div className="subtitle">{newData.tagline}</div> */}
                    {/* <Tags data={getTags(newData?.tags)} /> */}

                    <div className="leading-30  text-[#25aae1] md:text-3xl text-xl text-center py-8 px-1.5 ">
                      {newData.title}
                    </div>

                    <div className="info">
                      {eventInfo(newData).map((item: any, i: number) => {
                        return (
                          item.value != null &&
                          item.value !== "" && (
                            <div className="infoItem" key={i}>
                              <span className="text bold">{item.name}: </span>
                              <span className="text">{item.value}</span>
                            </div>
                          )
                        );
                      })}
                    </div>

                    <div className="info">
                      {/* {dateInfo(newData).map((item: any, i: number) => {
                        return (
                          item.value != null &&
                          item.value !== "" && (
                            <div className="infoItem" key={i}>
                              <span className="text bold">{item.name}: </span>
                              <span className="text">{item.value}</span>
                            </div>
                          )
                        );
                      })} */}
                    </div>
                    <div className="overview">
                      <div className="heading">Description</div>
                      <div
                        className="description text-black"
                        style={{
                          textAlign: "left",
                          padding: "0 10px",
                          wordBreak: "break-word",
                          lineHeight: "1.5",
                          fontSize: "1rem",
                        }}
                      >
                        {convertHTMLCode(newData?.des)}
                      </div>
                    </div>

                    {/* {tags?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Tags: </span>
                        <span className="text">
                          {tags?.map((d: any, i: number) => (
                            <span key={i}>
                              {d.name}
                              {tags.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )} */}

                    <div className="pointer-events-auto">
                      <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6">
                          <div className="flex items-start justify-between">
                            <h2
                              className="text-lg font-medium text-white"
                              id="slide-over-title"
                            >
                              Admission
                            </h2>
                          </div>
                          <span className="text-sm font-small p-4 text-red-600  ">
                            *Inclut les frais de réservation
                          </span>
                          <div className="mt-8">
                            <div className="flow-root">
                              {enableSeat === 0 ? (
                                <>
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "black",
                                    }}
                                  >
                                    L'événement n'est plus disponible.
                                  </span>
                                </>
                              ) : (
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {tickets.map((item: any, index: number) => (
                                    <li key={index} className="flex py-3">
                                      {/* { item.qty} */}
                                      <div className="flex flex-1 flex-col">
                                        <div>
                                          <div className="flex px-4 items-center text-base font-medium text-gray-600 ">
                                            <h3 className="w-28 ">
                                              {item.name}
                                            </h3>
                                            {/* <span className="text-xs italic font-small text-red-600  ">*Incl. {currency}{item.booking_fee} booking fees per ticket</span> */}

                                            <form className="max-w-xs mx-auto">
                                              <label
                                                htmlFor="quantity"
                                                className="block text-sm font-medium  text-gray-600 dark:text-white"
                                              ></label>
                                              {item.issued_qty <= 0 ? (
                                                <div className="">
                                                  <div className="relative flex items-center mx-auto max-w-[8rem]">
                                                    <button
                                                      type="button"
                                                      id="decrement-button"
                                                      className="relative md:text-sm text-xs  bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:border-gray-600 hover:bg-black-100 border border-gray-200 rounded-s-lg rounded-e-lg px-5 py-2  focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none"
                                                    >
                                                      Complet
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="">
                                                  <div className="relative flex items-center mx-auto max-w-[8rem]">
                                                    <button
                                                      type="button"
                                                      id="decrement-button"
                                                      onClick={() =>
                                                        decrement(index)
                                                      }
                                                      className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-red-700 border border-gray-200 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none"
                                                    >
                                                      <svg
                                                        className="w-3 h-3 text-gray-900 dark:text-white"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 18 2"
                                                      >
                                                        <path
                                                          stroke="currentColor"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M1 1h16"
                                                        />
                                                      </svg>
                                                    </button>
                                                    <input
                                                      type="text"
                                                      id="quantity"
                                                      value={item.qty}
                                                      className="border bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-red-600 focus:border-red-600 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-600 dark:focus:border-red-600"
                                                      onChange={(e) =>
                                                        handleQuantity(index, e)
                                                      }
                                                    />
                                                    <button
                                                      type="button"
                                                      id="increment-button"
                                                      onClick={() =>
                                                        increment(index)
                                                      }
                                                      className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-blue-700 border border-gray-100 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none"
                                                    >
                                                      <svg
                                                        className="w-3 h-3 text-gray-900 dark:text-white"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 18 18"
                                                      >
                                                        <path
                                                          stroke="currentColor"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M9 1v16M1 9h16"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                              )}
                                            </form>

                                            <p className="ml-8 w-[120px]">
                                              {`${currency}${calculateTotalPrice(
                                                item,
                                                index
                                              )}`}{" "}
                                              <br />
                                              <span className="text-xs italic font-small text-red-600">
                                                {" "}
                                                +{" "}
                                                <NumericFormat
                                                  value={Number(
                                                    item.booking_fee
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={`${currency}`}
                                                />{" "}
                                                Frais de réservation
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4">
                          <div className="mt-6">
                            <button
                              onClick={goToCheckout}
                              disabled={!isButtonEnabled}
                              className={`${
                                !isButtonEnabled ? "disabled" : ""
                              } flex w-full items-center justify-center  rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700`}
                            >
                              Acheter des billets
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                <div key={i} className="row skeleton"></div>
              ))}
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
