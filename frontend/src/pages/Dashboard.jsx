import {
  faCalendarCheck,
  faChartLine,
  faCircleCheck,
  faFolderClosed,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Navbar from "../components/common/Navbar";
import CardOne from "../components/common/CardOne";
import useGetCountProject from "../hooks/useGetCountProject";
import useGetCountProjectCompletion from "../hooks/useGetCountProjectCompletion";
import useGetCountProjectInProgress from "../hooks/useGetCountProjectInProgress";
import usegetIncomeThisMonth from "../hooks/useGetIncomeThisMonth";
import CardChart from "../components/common/CardChart";
import useGetMonthlyIncome from "../hooks/useGetMonthlyIncome";
import useGetNewProjectThisMonth from "../hooks/useGetNewProjectThisMonth";
import useGetProjectCompletedThisMonth from "../hooks/useGetProjectCompletedThisMonth";
import useGetMonthlyProject from "../hooks/useGetMonthlyProject";
import Header from "../components/common/Header";
import CardTwo from "../components/common/CardTwo";

export default function Dashboard() {
  const {
    count: countProject,
    loading: loadingProject,
    error: errorProject,
  } = useGetCountProject();
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
  const {
    count: countIncomeThisMonth,
    loading: loadingIncomeThisMonth,
    error: errorIncomeThisMonth,
  } = usegetIncomeThisMonth();
  const {
    monthlyData,
    loading: loadingMonthlyData,
    error: errorMonthlyData,
  } = useGetMonthlyIncome();
  const {
    count: countNewProjectThisMonth,
    loading: loadingNewProjectThisMonth,
    error: errorNewProjectThisMonth,
  } = useGetNewProjectThisMonth();
  const {
    count: countProjectCompletedThisMonth,
    loading: loadingProjectCompletedThisMonth,
    error: errorProjectCompletedThisMonth,
  } = useGetProjectCompletedThisMonth();
  const {
    monthlyData: MonthlyProject,
    loading: loadingMonthlyProject,
    error: errorMonthlyProject,
  } = useGetMonthlyProject();

  if (
    loadingProject ||
    loadingProjectCompletion ||
    loadingProjectInProgress ||
    loadingIncomeThisMonth ||
    loadingMonthlyData ||
    loadingNewProjectThisMonth ||
    loadingProjectCompletedThisMonth ||
    loadingMonthlyProject
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-4xl text-black/70"
        />
      </div>
    );
  }

  return (
    <>
      <div className="p-5 md:p-10">
        <Header />
        <div className="flex gap-5 mt-20 md:mt-10">
          <Navbar />
          <div className="w-full ">
            <div className="w-full grid grid-cols-2 gap-5 mb-5 lg:grid-cols-4">
              <CardOne
                title={"Project completed"}
                icon={faCircleCheck}
                desc={
                  loadingProjectCompletion
                    ? "Loading..."
                    : countProjectCompletion
                }
              />
              <CardOne
                title={"Project in progress"}
                icon={faSpinner}
                desc={
                  loadingProjectInProgress
                    ? "Loading..."
                    : countProjectInProgress
                }
              />
              <CardOne
                title={"All projects"}
                icon={faFolderClosed}
                desc={loadingProject ? "Loading..." : countProject}
              />
              <CardOne
                title={"Spent this month"}
                icon={faChartLine}
                desc={
                  loadingIncomeThisMonth
                    ? "Loading..."
                    : "Rp." + countIncomeThisMonth?.toLocaleString("id-ID")
                }
                bg={"bg-gradient-to-br from-[#0ABAB5] to-[#FFEDF3]"}
              />
            </div>
            <div className="w-full grid grid-cols-1 gap-5 mb-5 md:flex">
              <CardChart
                title={"Income diagram"}
                data={loadingMonthlyData ? [] : monthlyData}
                label={"Income per month"}
                dataItem={"income"}
              />
              <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
                <CardOne
                  title={"New project this month on year"}
                  icon={faPlus}
                  desc={
                    loadingNewProjectThisMonth
                      ? "Loading..."
                      : countNewProjectThisMonth
                  }
                />
                <CardOne
                  title={"Project completed this month"}
                  icon={faCalendarCheck}
                  desc={
                    loadingProjectCompletedThisMonth
                      ? "Loading..."
                      : countProjectCompletedThisMonth
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-5 md:flex">
              <CardChart
                title={"Projects diagram"}
                data={loadingMonthlyProject ? [] : MonthlyProject}
                label={"Project per month"}
                dataItem={"totalProjects"}
              />
              <CardTwo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
