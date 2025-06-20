import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/*" element={<UserRoute />} />
      </Routes>
    </>
  );
}

export default App;
