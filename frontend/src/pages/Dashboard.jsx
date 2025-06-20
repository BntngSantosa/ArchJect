import {
  faBell,
  faChartLine,
  faCircleCheck,
  faCommentDots,
  faDollar,
  faFolderClosed,
  faSpinner,
  faSplotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import CardOne from "../components/common/CardOne";
import useGetCountProject from "../hooks/useGetCountProject";
import useGetUsername from "../hooks/useGetUsernmae";

export default function Dashboard() {
  const {
    count: countProject,
    loading: loadingProject,
    error: errorProject,
  } = useGetCountProject();
  const username = useGetUsername();
  
  return (
    <>
      <div className="p-5 md:p-10">
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faSplotch}
              className="text-4xl text-black/70 md:text-6xl"
            />
            <div className="grid grid-cols-1">
              <h1 className="text-[14px] text-black font-semibold font-Poppins md:text-[16px]">
                Hallo, {username}
              </h1>
              <p className="text-[8px] text-black font-normal font-Poppins md:text-[14px]">
                Explore information and activity about your project.
              </p>
            </div>
          </div>
          <div className="hidden md:flex md:gap-5">
            <Link to="/chat">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-2xl text-black/70"
              />
            </Link>
            <Link to="/chat">
              <FontAwesomeIcon
                icon={faBell}
                className="text-2xl text-black/70"
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-5 mt-10">
          <Navbar />
          <div className="w-full grid grid-cols-1 gap-5">
            <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-4">
              <CardOne
                title={"Project completed"}
                icon={faCircleCheck}
                desc={"32"}
              />
              <CardOne
                title={"Project in progress"}
                icon={faSpinner}
                desc={"32"}
              />
              <CardOne
                title={"All projects"}
                icon={faFolderClosed}
                desc={loadingProject ? "Loading..." : countProject}
              />
              <CardOne
                title={"Spent this month"}
                icon={faChartLine}
                desc={"Rp.32"}
                bg={"bg-gradient-to-br from-[#0ABAB5] to-[#FFEDF3]"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
