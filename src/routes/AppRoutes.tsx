import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Debounce from "../components/Debounce";
import { Timer } from "../components/Timer";
import  HomePage  from "../components/Home";
import ThrottleScroll from "../components/ThrottleScroll";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/debounce" element={<Debounce />} />
        <Route path="/throttle-scroll" element={<ThrottleScroll />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
