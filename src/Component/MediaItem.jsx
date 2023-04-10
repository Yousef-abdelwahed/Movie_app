import React from "react";
import { Link } from "react-router-dom";

export default function MediaItem({ item, imagesPath }) {
  return (
    <div className="col-md-2 d-flex flex-row ">
      <Link
        className="text-decoration-none f-white"
        to={`/details/${item.id}/${item.media_type}`}
      >
        <div className="movie position-relative">
          <img
            className="w-100"
            src={imagesPath + (item.poster_path || item.profile_path)}
            alt=""
          />

          <h3 className="h6 my-2 text-link text-decoration-none ">
            {item.title || item.name}
          </h3>
          {item.vote_average && (
            <div className="vote position-absolute top-0 end-0"></div>
          )}
          {/* <div className="vote position-absolute top-0 end-0">
          {item.vote_average?.toFixed(1)}
        </div> */}
        </div>
      </Link>
    </div>
  );
}
