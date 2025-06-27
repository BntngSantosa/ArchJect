import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Table from "../components/common/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useGetAllProjects } from "../hooks/useGetAllProjects";

export default function Project() {
  const { loading, error } = useGetAllProjects();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-4xl text-black/70"
        />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
    {/* <ModalProject /> */}
      <div className="p-5 md:p-10">
        <Header />
        <div className="flex gap-5 mt-10">
          <Navbar />
          <div className="w-full overflow-hidden">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
