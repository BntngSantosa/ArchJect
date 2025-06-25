import Header from "../components/common/Header";
import MobileTable from "../components/common/MobileTable";
import Navbar from "../components/common/Navbar";

export default function Project() {

  return (
    <div className="p-5 md:p-10">
      <Header />
      <div className="flex gap-5 mt-20 md:mt-10">
        <Navbar />
        <div className="w-full overflow-hidden">
          <MobileTable />
        </div>
      </div>
    </div>
  );
}
