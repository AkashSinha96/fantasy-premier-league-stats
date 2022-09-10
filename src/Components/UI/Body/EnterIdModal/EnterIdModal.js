import { useEffect, useState } from "react";

const EnterIdModal = (props) => {
  const [fplId, SetFplId] = useState("");
  const [IsfplIdValid, SetfplIdValid] = useState(true);
  const [loadingIconVisible, setLoadingIconVisible] = useState(false);
  const [responseCode, setResponseCode] = useState(0);
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
    setLoadingIconVisible(true);
    const requestURL = baseURL + "entry/" + fplId + "/";
    await fetch(requestURL)
      .then((response) => {
        if (response.status === 503){
          SetfplIdValid(false);
          setLoadingIconVisible(false);
          setResponseCode(503);
        }
        else if (!response.ok) {
          SetfplIdValid(false);
          setLoadingIconVisible(false);
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
  useEffect(
    () => {
      if (fplPlayerData.id !== undefined && fplPlayerData.id !== 0) {
        props.onClose(fplPlayerData, false);
      }
    },
    [fplPlayerData, props],
    props
  );
  return (
    <form onSubmit={submitHandler}>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" fixed md:top-1/3 md:left-1/3 md:right-1/3 bottom-1/3 w-full  "
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
                  {!loadingIconVisible && (
                    <input
                      type="number"
                      name="id"
                      id="id"
                      onChange={fplIdHandler}
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      onKeyDown={checkKeyPressed}
                      className={
                        IsfplIdValid ? inputTextClass : inputTextDangerClass
                      }
                      placeholder={IsfplIdValid ? "5284163" : ""}
                      required
                    />
                  )}
                  {loadingIconVisible && (
                    <div
                      role="status"
                      className="mt-2 flex justify-center items-center"
                    >
                      <svg
                        className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 "
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {!IsfplIdValid && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        {responseCode !== 503 ? 'Please enter a valid FPL ID.' : 'Service is unavailable as game is being updated'}
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
