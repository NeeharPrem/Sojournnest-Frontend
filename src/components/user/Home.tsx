import { useInfiniteQuery } from "@tanstack/react-query";
import { allListings } from "../../api/userapi";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./HomeSkeleton";
import { useRef, useEffect } from "react";

const HomePage = () => {
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["roomData"],
    queryFn: ({ pageParam = 1 }) => allListings(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight || !hasNextPage || isError
      ) return;

      fetchNextPage();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isError, fetchNextPage]);

  const rooms = data?.pages.flatMap(page => page.data) || [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-4 items-center">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)
        ) : (
          rooms.map(room => (
            <div key={room._id} onClick={() => navigate(`/details/${room._id}`)} className="w-full cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden rounded-sm">
              <img src={room.images[0]} alt="card" className="w-full h-40 object-cover" />
              <div className="flex flex-col p-4">
                <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                <p className="text-gray-700">{room.state}, {room.district}</p>
                <p className="text-gray-700">₹ {room.rent} / night</p>
              </div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && !isLoading && (
        <div ref={observerRef} className="h-10"></div>
      )}
    </>
  );
};

export default HomePage;