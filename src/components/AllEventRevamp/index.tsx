import { useState, useMemo } from "react";
// import ContentWrapper from "../components/ContentWrapper";
import Card from "../Card";
import useFetch from "../../hooks/useFetch";
import "./allEvents.scss";
import ContentWrapper from "../ContentWrapper";

const AllEvents = () => {
  const currency = process.env.REACT_APP_CURRENCY;

  // Fetch both trending and past events
  const { data: trendingData, loading: trendingLoading } = useFetch(
    `/eventspercurrency/${currency}`
  );
  const { data: pastData, loading: pastLoading } = useFetch(
    `/pasteventspercurrency/${currency}`
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 12;

  // Combine and label the events
  const allEvents = useMemo(() => {
    const trendingEvents = (trendingData?.data || []).map((event: any) => ({
      ...event,
      type: "trending",
      typeLabel: "Trending",
    }));

    const pastEvents = (pastData?.data || []).map((event: any) => ({
      ...event,
      type: "past",
      typeLabel: "Past Event",
    }));

    // Combine and sort by date (most recent first)
    return [...trendingEvents, ...pastEvents].sort(
      (a, b) =>
        new Date(b.from_date).getTime() - new Date(a.from_date).getTime()
    );
  }, [trendingData, pastData]);

  // Pagination logic
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return allEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [allEvents, currentPage, eventsPerPage]);

  const loading = trendingLoading || pastLoading;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Group events by type for display
  const groupedEvents = useMemo(() => {
    const trending = currentEvents.filter((event) => event.type === "trending");
    const past = currentEvents.filter((event) => event.type === "past");

    return { trending, past };
  }, [currentEvents]);

  // Generate pagination buttons with proper typing
  const renderPaginationButtons = () => {
    const buttons: number[] = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Logic for showing limited pages with ellipsis
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= maxVisibleButtons; i++) {
          buttons.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          buttons.push(i);
        }
      } else {
        // Show pages around current page
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          buttons.push(i);
        }
      }
    }

    return buttons;
  };

  return (
    <div className="allEventsSection">
      <ContentWrapper>
        <div className="allEventsHeader">
          <h1 className="allEventsTitle">Tous les événements</h1>
          <p className="allEventsSubtitle">
            Parcourez les événements tendance et passés{" "}
          </p>
        </div>

        {!loading ? (
          <div className="eventsContent">
            {/* Trending Events Section */}
            {groupedEvents.trending.length > 0 && (
              <div className="eventsSection">
                <h2 className="sectionTitle">Événements tendance</h2>
                <Card data={groupedEvents.trending} loading={false} title="" />
              </div>
            )}

            {/* Past Events Section */}
            {groupedEvents.past.length > 0 && (
              <div className="eventsSection">
                <h2 className="sectionTitle">Événements passés</h2>
                <Card data={groupedEvents.past} loading={false} title="" />
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="paginationButton prevNext"
                >
                  Précédent
                </button>

                <div className="paginationNumbers">
                  {renderPaginationButtons().map((pageNum: number) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`paginationButton ${
                        currentPage === pageNum ? "active" : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="paginationButton prevNext"
                >
                  Suivant
                </button>
              </div>
            )}

            {/* Page Info */}
            {allEvents.length > 0 && (
              <div className="pageInfo">
                Affichage {(currentPage - 1) * eventsPerPage + 1} -{" "}
                {Math.min(currentPage * eventsPerPage, allEvents.length)} of{" "}
                {allEvents.length} événements
              </div>
            )}
          </div>
        ) : (
          <div className="loadingState">
            <Card data={[]} loading={true} title="" />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default AllEvents;
