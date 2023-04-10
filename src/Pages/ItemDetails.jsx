import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetails() {
  let { id, media_type } = useParams();
  let [itemDetails, setItemDetails] = useState({});

  async function handleItemDetails(id, media_type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=d3ae77f34fe98eac394d73b253537542&language=en-US`
    );
    setItemDetails(data);
  }
  useEffect(() => {
    handleItemDetails(id, media_type);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4 py-2">
          <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/w500/${
              itemDetails.poster_path || itemDetails.profile_path
            } `}
          ></img>
          {/* <h2>{itemDetails.title}</h2> */}
        </div>
        <div className="col-md-6">
          <h3 className="fs-1 h-1 mt-4 ">{itemDetails.title}</h3>
          <p className="text-muted">
            Set more than a decade after the events of the first film
          </p>
          <div className="col-md-6 d-flex justify-content-around mt-4">
            {itemDetails.genres?.map((genre) => (
              <span
                className="bg-primary p-1 rounded-3 fw-light"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="vote_detalis d-flex flex-column mt-3">
            {/* release_date, vote_count ,vote_average */}

            <span className="lh-lg  pt-5">
              {" "}
              {itemDetails.vote_average
                ? "Vote:"(itemDetails.vote_average)
                : ""}
            </span>
            <span className="lh-lg  pt-2">
              {itemDetails.vote_average
                ? " Vote Count:"(itemDetails.vote_count)
                : ""}
            </span>
            <span className="lh-lg py-1 ">
              {itemDetails.vote_average
                ? " release Date:"(itemDetails.vote_count)
                : ""}
            </span>
          </div>
          <div className="movi_overview mt-5">
            <p className="text-muted fs-4">
              {itemDetails.overview.split(" ", 10) || itemDetails.biography}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
