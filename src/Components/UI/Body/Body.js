import { useState } from "react";
import DataDashboard from "./DataDashboard/DataDashboard";
import LandingPage from "./LandingPage/LandingPage";

const Body = (props) => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [userFplData, setUserFplData] = useState();

  const closeLandingPageHandler = (data) => {
    setShowLandingPage(false);
    setUserFplData(data);
  };
  return (
    <div className=" bg-slate-50 dark:bg-gray-900 h-screen w-full overflow-y-auto">
      {showLandingPage && (
        <LandingPage onCloseLandingPage={closeLandingPageHandler} />
      )}
      {!showLandingPage && <DataDashboard data={userFplData}/>}
    </div>
  );
};

export default Body;
