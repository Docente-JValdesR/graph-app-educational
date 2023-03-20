import { Outlet } from "react-router-dom";
import StatusGraph from "../components/StatusGraph";
function GraphLayout() {
  return (
    <div className="bg-black text-white">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          <Outlet />
        </div>
        <div className="col-12 col-md-4">
          <StatusGraph />
        </div>
      </div>
    </div>
    </div>
  );
}

export default GraphLayout;
