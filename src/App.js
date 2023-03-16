import { VerticalBar } from "./Models/VerticalBar";
import { HorizontalBar } from "./Models/HorizontalBar";
import { StackerBar } from "./Models/StackerBar";
import { Area } from "./Models/Area";
import { LineChart } from "./Models/LineChart";
import { MutiAxisLine } from "./Models/MultiAxisLine";
import { PieChart } from "./Models/PieChart";
import { DoughnutChart } from "./Models/DoughnutChart";
import { PolarAreaChart } from "./Models/PolarAreaChart";
import { RadarChart } from "./Models/RadarChart";
import { ScatterChart } from "./Models/ScatterChart";
import { BubbleChart } from "./Models/BubbleChart";

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col-8">
          <VerticalBar />
        </div>
        <div className="col-8">
          <HorizontalBar />
        </div>
        <div className="col-8">
          <StackerBar />
        </div>
        <div className="col-8">
          <Area />
        </div>
        <div className="col-8">
          <LineChart />
        </div>
        <div className="col-8">
          <MutiAxisLine />
        </div>
        <div className="col-6">
          <PieChart />
        </div>
        <div className="col-6">
          <DoughnutChart />
        </div>
        <div className="col-6">
          <PolarAreaChart />
        </div>
        <div className="col-6">
          <RadarChart />
        </div>
        <div className="col-8">
          <ScatterChart />
        </div>
        <div className="col-8">
          <BubbleChart />
        </div>
        <div className="col-8"></div>
      </div>
    </div>
  );
}

export default App;
