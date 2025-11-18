import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import ContentWrapper from "../ContentWrapper";
import Img from "../LazyLoadImage";
import PosterFallback from "../../assets/images/no-poster.png";
import "./styles.scss";
import moment from "moment";
import Tags from "../Tags";
import { PriceSelection, getCurrency, getTags } from "../../utils/functions";

type Props = {
  data: any;
  loading: boolean;
  title?: string;
};

interface EventStatus {
  status: string;
  text: string;
  color: string;
  bgColor: string;
}

interface FormattedDate {
  day: string;
  month: string;
  year: string;
  full: string;
}

const Card = ({ data, loading, title }: Props) => {
  const imageURL = process.env.REACT_APP_IMAGEURL;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 12;

  const currency = data && data.length > 0 ? getCurrency(data[0]) : "";

  // Pagination logic
  const totalPages = Math.ceil((data?.length || 0) / eventsPerPage);

  const currentEvents = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * eventsPerPage;
    return data.slice(startIndex, startIndex + eventsPerPage);
  }, [data, currentPage, eventsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons: number[] = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisibleButtons; i++) {
          buttons.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          buttons.push(i);
        }
      }
    }

    return buttons;
  };

  // Check if event is upcoming or past
  const getEventStatus = (item: any): EventStatus => {
    const eventDate = moment(item.from_date);
    const today = moment();

    if (eventDate.isBefore(today, "day")) {
      return {
        status: "past",
        text: "Event Ended",
        color: "text-white",
        bgColor: "bg-gray-500",
      };
    }
    if (eventDate.isSame(today, "day")) {
      return {
        status: "today",
        text: "Live Today",
        color: "text-white",
        bgColor: "bg-[#c10006]",
      };
    }
    if (eventDate.diff(today, "days") <= 7) {
      return {
        status: "soon",
        text: "Coming Soon",
        color: "text-white",
        bgColor: "bg-[#25aae1]",
      };
    }
    return {
      status: "upcoming",
      text: "Upcoming",
      color: "text-white",
      bgColor: "bg-[#25aae1]",
    };
  };

  // Format date with more visual appeal
  const formatEventDate = (date: string): FormattedDate => {
    return {
      day: moment(date).format("DD"),
      month: moment(date).format("MMM"),
      year: moment(date).format("YYYY"),
      full: moment(date).format("MMM D, YYYY"),
    };
  };

  // Helper function to check if price is free
  const isFreeEvent = (priceInfo: any): boolean => {
    if (typeof priceInfo === "string") {
      return priceInfo.toLowerCase().includes("free");
    }

    if (priceInfo && typeof priceInfo === "object" && "props" in priceInfo) {
      const priceText =
        priceInfo.props.children?.toString().toLowerCase() || "";
      return priceText.includes("free");
    }

    return false;
  };

  // Helper to get price text for free event check
  const getPriceText = (priceInfo: any): string => {
    if (typeof priceInfo === "string") {
      return priceInfo;
    }

    if (priceInfo && typeof priceInfo === "object" && "props" in priceInfo) {
      return priceInfo.props.children?.toString() || "";
    }

    return "";
  };

  const SkItem = () => {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="relative h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-20"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-32"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="cardsGrid">
      <ContentWrapper>
        {title && <div className="cardsTitle">{title}</div>}

        {/* Page Info */}
        {!loading && data && data.length > 0 && (
          <div className="pageInfo mb-6 text-center text-gray-600 dark:text-gray-300">
            Showing {(currentPage - 1) * eventsPerPage + 1} -{" "}
            {Math.min(currentPage * eventsPerPage, data.length)} of{" "}
            {data.length} events
          </div>
        )}

        {!loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentEvents
                ?.slice()
                .sort(
                  (a: any, b: any) =>
                    moment(b.from_date).valueOf() -
                    moment(a.from_date).valueOf()
                )
                .map((item: any, i: number) => {
                  const posterUrl = item?.imgs[0]?.img
                    ? imageURL + item.imgs[0].img
                    : PosterFallback;

                  const eventStatus = getEventStatus(item);
                  const formattedDate = formatEventDate(item.from_date);
                  const priceInfo = (
                    <PriceSelection
                      ticketCategories={item.ticketCategories}
                      currency={currency as string}
                    />
                  );

                  const priceText = getPriceText(priceInfo);
                  const isFree = isFreeEvent(priceInfo);

                  return (
                    <div
                      key={i}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
                      onClick={() => navigate(`/details/${item.slug}`)}
                    >
                      {/* Event Status Badge */}
                      <div
                        className={`absolute top-4 left-4 z-20 ${eventStatus.bgColor} ${eventStatus.color} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-opacity-95 shadow-lg`}
                      >
                        {eventStatus.text}
                      </div>

                      {/* Favorite Button */}
                      <button
                        className="absolute top-4 right-4 z-20 w-8 h-8 bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add favorite functionality here
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-300 hover:text-[#c10006]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      {/* Image Container */}
                      <div className="block relative overflow-hidden">
                        <div className="relative h-64 overflow-hidden">
                          <Img
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            src={posterUrl}
                            alt={item.title || "Event Image"}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Date Badge */}
                          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-3 text-center min-w-16 transform group-hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-600">
                            <div className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                              {formattedDate.day}
                            </div>
                            <div className="text-xs text-[#25aae1] font-semibold uppercase">
                              {formattedDate.month}
                            </div>
                          </div>

                          {/* View Details Button */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg flex items-center gap-2 border border-gray-200">
                              View Details
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Category Tag */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-[#25aae1] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                            {item.event_cat || "Event"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.venue
                              ? item.venue.split(",")[0]
                              : "Venue TBA"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#25aae1] transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Description Preview */}
                        {item.tagline && (
                          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4 line-clamp-2">
                            {item.tagline}
                          </p>
                        )}

                        {/* Tags */}
                        {item.tags && (
                          <div className="mb-4">
                            <Tags data={getTags(item.tags).slice(0, 2)} />
                          </div>
                        )}

                        {/* Price and Action Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex flex-col">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {priceInfo}
                            </div>
                            {isFree && (
                              <span className="text-xs text-[#25aae1] font-medium">
                                No fees included
                              </span>
                            )}
                          </div>

                          <button className="bg-gradient-to-r from-[#25aae1] to-[#1e8fc5] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:from-[#1e8fc5] hover:to-[#25aae1]">
                            Get Tickets
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Additional Info */}
                        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {moment(
                              item.from_date + " " + item.from_time
                            ).format("hh:mm A")}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {item.venue ? item.venue.split(",")[0] : "Online"}
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#25aae1]/20 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="pageInfo text-sm text-gray-600 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="paginationButton prevNext bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="paginationNumbers flex items-center gap-1">
                    {renderPaginationButtons().map((pageNum: number) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`paginationButton w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[#25aae1] to-[#1e8fc5] text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="paginationButton prevNext bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <SkItem />
            <SkItem />
            <SkItem />
            <SkItem />
            <SkItem />
            <SkItem />
            <SkItem />
            <SkItem />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Card;
