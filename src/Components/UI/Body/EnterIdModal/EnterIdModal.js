import { useEffect, useState } from "react";

const EnterIdModal = (props) => {
  const [fplId, SetFplId] = useState("");
  const [IsfplIdValid, SetfplIdValid] = useState(true);
  const [fplPlayerData, SetFplData] = useState([
    {
      id: 0,
      player_first_name: "",
      player_last_name: "",
      summary_overall_points: 0,
      summary_overall_rank: 0,
      summary_event_points: 0,
      summary_event_rank: 0,
      current_event: 0,
      player_region_name: "",
      leagues: [],
      name: "",
    },
  ]);
  const closeModalHandler = (event) => {
    props.onClose(fplPlayerData, true);
  };
  const inputTextClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white";
  const inputTextDangerClass =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  const baseURL = "https://fpl-api-handler.herokuapp.com/?eventType=";
  async function fetchFPLDetails() {
    const requestURL = baseURL + "entry/" + fplId + "/";
    await fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          SetfplIdValid(false);
          throw new Error(response.status);
        } else {
          SetfplIdValid(true);
          return response.json();
        }
      })
      .then((result) => {
        SetFplData({
          id: result.id,
          player_first_name: result.player_first_name,
          player_last_name: result.player_last_name,
          summary_overall_points: result.summary_overall_points,
          summary_overall_rank: result.summary_overall_rank,
          summary_event_points: result.summary_event_points,
          summary_event_rank: result.summary_event_rank,
          current_event: result.current_event,
          player_region_name: result.player_region_name,
          leagues: result.leagues,
          name: result.name,
        });
      });
    // if (IsfplIdValid) {
    //   props.onClose(fplPlayerData);
    // }
  }
  const fplIdHandler = (event) => {
    SetfplIdValid(true);
    SetFplId(event.target.value);
  };
  const checkKeyPressed = (event) => {
    if (event.key === "Enter") {
      fetchFPLDetails();
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (fplPlayerData.id !== undefined && fplPlayerData.id !== 0) {
      props.onClose(fplPlayerData, false);
    }
  }, [fplPlayerData]);
  return (
    <form onSubmit={submitHandler}>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" fixed top-1/3 left-1/3 right-1/3 bottom-1/3 w-full  "
      >
        <div className="p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={closeModalHandler}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your FPL Id
                  </label>
                  <input
                    type="number"
                    name="id"
                    id="id"
                    onChange={fplIdHandler}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    onKeyDown={checkKeyPressed}
                    className={
                      IsfplIdValid ? inputTextClass : inputTextDangerClass
                    }
                    placeholder="5284163"
                    required
                  />
                  {!IsfplIdValid && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span class="font-medium">
                        Please enter a valid FPL ID.
                      </span>{" "}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={fetchFPLDetails}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EnterIdModal;
