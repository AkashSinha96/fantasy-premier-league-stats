import { useEffect, useState } from "react";
import HistoryChart from "./HistoryChart/HistoryChart";
import InformationTable from "./Information Table/InformationTable";

const DataDashboard = (props) => {
  const basicFplData = props.data;
  const [chartVisible, setChartVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [userName, setUserName] = useState("");
  
  
  useEffect(() => {
    if (basicFplData.id !== undefined && basicFplData.id !== 0) {
      setChartVisible(true);
      setTableVisible(true);
      setUserName(basicFplData.player_first_name + ' ' + basicFplData.player_last_name)
    }
  }, [basicFplData]);

  return (
    <div className="pt-6 px-4 pb-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className=" bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-black dark:text-white">
                {userName}
              </span>
            </div>
          </div>
         { tableVisible && <InformationTable data={basicFplData}/>}
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-black dark:text-white">
                Season History
              </span>
            </div>
          </div>
          <div >
          {chartVisible && (
            <HistoryChart id={basicFplData.id} pastData = {true} currentData = {false}/>
          )}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full grid grid-cols-1 gap-4">
        <div className=" bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-black dark:text-white">
                {userName}
              </span>
            </div>
          </div>
         { tableVisible && <InformationTable data={basicFplData}/>}
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 items-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-black dark:text-white">
                Season History
              </span>
            </div>
          </div>
          <div className="">
          {chartVisible && (
            <HistoryChart id={basicFplData.id} pastData = {false} currentData = {true} />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;
