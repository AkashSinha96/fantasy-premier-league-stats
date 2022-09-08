import { useEffect, useState } from "react";
import EnterIdModal from "../EnterIdModal/EnterIdModal";

const LandingPage = (props) => {
  const [isModalVisible, SetModalVisible] = useState(false);
  const [fplPlayerDataMain, SetFplDataMain] = useState([
    {
      id: 0,
      player_first_name: "",
      player_last_name: "",
      summary_overall_points: 0,
      summary_overall_rank: 0,
      summary_event_points: 0,
      summary_event_rank: 0,
      current_event: 0,
      leagues: [],
      name: "",
    },
  ]);
  const GetStartedHandler = (event) => {
    if (isModalVisible) {
      SetModalVisible(false);
    } else {
      SetModalVisible(true);
    }
  };
  const onCloseModal = (data, calledFromCloseButton) => {
    if(calledFromCloseButton){
      SetModalVisible(false);
    }
    if (data.id !== undefined && data.id !== 0) {
      SetModalVisible(false);
      SetFplDataMain(data);
    }
  };
  useEffect(() => {
    if (fplPlayerDataMain.id !== undefined && fplPlayerDataMain.id !== 0) {
      props.onCloseLandingPage(fplPlayerDataMain);
    }
  }, [fplPlayerDataMain]);
  return (
    <div>
      {isModalVisible && <EnterIdModal onClose={onCloseModal} />}
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl  md:grid md:grid-cols-2 lg:grid-cols-2 sm:py-16 lg:px-6">
        <img
          className="w-full dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
          alt="dashboard"
        />
        <img
          className="w-full hidden dark:block lg:grid-cols-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
          alt="dashboard"
        />

        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            View your fantasy premier league statistics.
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            This website helps you visualize your past and current fantasy
            premier league data
          </p>
          <button
            onClick={GetStartedHandler}
            className="inline-flex items-center text-black dark:text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
