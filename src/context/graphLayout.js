import { Outlet } from "react-router-dom";
import StatusGraph from "../components/StatusGraph";
function GraphLayout() {
  return (
    <div className="container-lg d-flex">
      <div className="col-12 col-md-7">
        <Outlet />
      </div>
      <div className="col-md-4">
        <StatusGraph />
      </div>
    </div>
  );
}

export default GraphLayout;
