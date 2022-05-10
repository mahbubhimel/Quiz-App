import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          next={() => setPage(page + 8)}
        >
          {videos.map((video, index) =>
            video.noq > 0 ? (
              <Link
                to={`/quiz/${video.youtubeID}`}
                state={{
                  videoTitle: video.title,
                }}
                key={index}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                ></Video>
              </Link>
            ) : (
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={video.youtubeID}
              ></Video>
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && (
        <div className="">No Data Found!</div>
      )}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading....</div>}
    </div>
  );
}
