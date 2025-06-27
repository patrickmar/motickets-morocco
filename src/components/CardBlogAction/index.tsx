import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import Img from "../LazyLoadImage";
import PosterFallback from "../../assets/images/no-poster.png";
import { PriceSelection, getCurrency } from "../../utils/functions";
import { Link } from "react-router-dom";

export default function CardBlogAction() {
  const currency = process.env.REACT_APP_CURRENCY;
  const [endpoint, setEndpoint] = useState(`/eventspercurrency/${currency}`);

  const { data, loading } = useFetch(endpoint);
  const eventData = data?.data;
  const imageURL = process.env.REACT_APP_IMAGEURL;

  return (
    <div className="bg-[#f9f9f9] py-12 px-4 sm:px-8">
      <h3 className="text-3xl font-bold text-dark mb-8 px-4 sm:px-0">
        Upcoming Events
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-0">
        {!loading
          ? eventData?.map((item: any, index: number) => {
              const posterUrl = item?.imgs[0]?.img
                ? imageURL + item.imgs[0].img
                : PosterFallback;

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[500px]"
                >
                  {/* Ribbon for featured/popular events (optional) */}
                  {item.isFeatured && (
                    <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}

                  <Link
                    to={`/details/${item.slug}`}
                    className="block flex-[0_0_70%]"
                  >
                    <div className="relative overflow-hidden h-full">
                      <Img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={posterUrl}
                        alt={item.title || "Event Image"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-medium">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-lg font-bold text-dark line-clamp-2">
                        {item.title}
                      </h5>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {moment(item.from_date).format("ddd, MMM D, YYYY")}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 py-2">
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-primary-500">
                          <PriceSelection
                            ticketCategories={item.ticketCategories}
                            currency={getCurrency(item)}
                          />
                        </div>
                        <Link
                          to={`/details/${item.slug}`}
                          className="text-sm font-medium text-primary-500 hover:text-primary-700 transition-colors"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow overflow-hidden flex flex-col h-full"
              >
                <div className="flex-[0_0_50%] bg-gray-200"></div>
                <div className="p-5 flex-1 flex flex-col space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="mt-auto pt-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
