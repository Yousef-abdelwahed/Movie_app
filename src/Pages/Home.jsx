import axios from "axios";
import React, { useEffect, useState } from "react";

import "../index";
import MediaItem from "../Component/MediaItem";
export default function Home() {
  let [trindingMovies, setTrindingMovies] = useState([]);
  let [trindingTv, setTrindingTv] = useState([]);
  let [trindingPerson, setTrindingPeople] = useState([]);

  //
  const api_key = "d3ae77f34fe98eac394d73b253537542";
  const Base_ImagUrl = "https://image.tmdb.org/t/p/w500/";

  async function getTrinding(mediaType, callback) {
    let { data } = await axios.get(
      `http://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${api_key}`
    );
    callback(data.results);
  }
  useEffect(() => {
    getTrinding("movie", setTrindingMovies);
    getTrinding("tv", setTrindingTv);
    getTrinding("person", setTrindingPeople);
  }, []);
  return (
    <>
      <div className="row">
        <div className="row py-5">
          <div className="col-md-4  d-flex align-items-center">
            <div>
              <div className="borderLine w-25 mt-3"></div>
              <h2 className="h4 pt-4 lh-lg fs-2">
                Trending Movie
                <br /> to Watch Right Now{" "}
              </h2>
              <p className="text-muted py-2 fs-4">Most watch movies by day </p>
              <div className="borderLine w-100 mb-3 "></div>
            </div>
          </div>

          {trindingMovies.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item} imagesPath={Base_ImagUrl} />
          ))}
        </div>
        <div className="row py-5">
          <div className="col-md-4  d-flex align-items-center">
            <div>
              <div className="borderLine w-25 mt-3"></div>
              <h2 className="fs-2 pt-4 lh-base ">
                Trending TV
                <br /> to Watch Right Now{" "}
              </h2>
              <p className="text-muted py-2 fs-3">Most watch Tv show by day </p>
              <div className="borderLine w-100 mb-3 "></div>
            </div>
          </div>

          {trindingTv.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item} imagesPath={Base_ImagUrl} />
          ))}
        </div>
        <div className="row py-5">
          <div className="col-md-4  d-flex align-items-center">
            <div>
              <div className="borderLine w-25 mt-3"></div>
              <h2 className="h4 pt-4 lh-lg fs-2">
                Trending People
                <br /> to Watch Right Now{" "}
              </h2>
              <p className="text-muted py-2 fs-3">Most watch Tv show by day </p>
              <div className="borderLine w-100 mb-3 "></div>
            </div>
          </div>

          {trindingPerson
            .filter((person) => person.profile_path !== null)
            .slice(0, 10)
            .map((item, index) => (
              <MediaItem key={index} item={item} imagesPath={Base_ImagUrl} />
            ))}
        </div>
      </div>
    </>
  );
}
