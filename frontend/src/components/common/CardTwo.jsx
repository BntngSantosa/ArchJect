import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetUsername from "../../hooks/useGetUsernmae";
import useGetCountProjects from "../../hooks/useGetCountProject";
import useGetCountProjectInProgress from "../../hooks/useGetCountProjectInProgress";
import React from "react";
import useGetCountProjectCompletion from "../../hooks/useGetCountProjectCompletion";

export default function CardTwo() {
  const username = useGetUsername();
  const {
    count: countProject,
    loading: loadingProject,
    error: errorProject,
  } = useGetCountProjects();
  const {
    count: countProjectCompletion,
    loading: loadingProjectCompletion,
    error: errorProjectCompletion,
  } = useGetCountProjectCompletion();
  const {
    count: countProjectInProgress,
    loading: loadingProjectInProgress,
    error: errorProjectInProgress,
  } = useGetCountProjectInProgress();


  return (
    <div className="px-[20px] py-[16px] bg-[#FFEDF3] rounded-[14px] flex flex-col items-center gap-5 justify-between">
      <FontAwesomeIcon
        icon={faUserCircle}
        className="text-[#56df94] text-5xl sm:text-6xl lg:text-7xl"
      />
      <h1 className="text-[14px] font-Poppins font-semibold sm:text-[15px] lg:text-[16px]">
        {username}
      </h1>
      <div className="flex items-center justify-evenly gap-10 w-full">
        <div className="text-center">
          <h1 className="text-[12px] font-Poppins font-normal sm:text-[13px]">
            Project
          </h1>
          <span className="text-[12px] font-semibold font-Poppins sm:text-[16px] md:-text-[20px] lg-text-[24px]">
            {countProject}
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-[12px] font-Poppins font-normal sm:text-[13px]">
            completed
          </h1>
          <span className="text-[12px] font-semibold font-Poppins sm:text-[16px] md:-text-[20px] lg-text-[24px]">
            {countProjectCompletion}
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-[12px] font-Poppins font-normal sm:text-[13px]">
            Progress
          </h1>
          <span className="text-[12px] font-semibold font-Poppins sm:text-[16px] md:-text-[20px] lg-text-[24px]">
            {countProjectInProgress}
          </span>
        </div>
      </div>
    </div>
  );
}
