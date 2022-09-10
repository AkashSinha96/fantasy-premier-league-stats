import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
const HistoryChart = (props) => {
  const [playerId] = useState(props.id);
  const [currentFplData, setCurrentFplData] = useState();
  const [pastFplData, setPastFplData] = useState();
  const [chartVisible, setChartVisible] = useState(false);
  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        type: "area",
        fontFamily: "Inter, sans-serif",
        foreColor: "#6B7280",
        height: "50%",
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        labels: {
          style: {
            colors: ["#6B7280"],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        title: {
          text: "",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#6B7280"],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        title: {
          text: "",
        },
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: 0.3,
      },
    },
    series: [
      {
        name: "overall-rank",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        fillColor: "#17e3e3",
      },
    ],
  });

  useEffect(() => {
    const LoadPlayerData = () => {
      const baseURL = "https://fpl-api-handler.herokuapp.com/?eventType=";
      const requestURL = baseURL + "entry/" + props.id + "/history/";
      fetch(requestURL, { timeout: 6000 })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((result) => {
          setCurrentFplData(result.current);
          setPastFplData(result.past);
        });
    };
    if (playerId !== undefined && playerId !== 0) {
      LoadPlayerData();
    }
  }, [playerId, props.id]);
  useEffect(
    () => {
      if (currentFplData !== undefined && pastFplData !== undefined) {
        let [xAxisData] = [];
        let [yAxisData] = [];
        let xAxisLabel = "";
        let yAxisLabel = "";
        if (currentFplData.length !== 0 && pastFplData.length !== 0) {
          if (props.pastData) {
            xAxisData = pastFplData.map((x) => x.season_name);
            yAxisData = pastFplData.map((x) => x.rank);
            xAxisLabel = "Season";
            yAxisLabel = "Rank";
          } else {
            xAxisData = currentFplData.map((x) => x.event);
            yAxisData = currentFplData.map((x) => x.overall_rank);
            xAxisLabel = "Gameweek";
            yAxisLabel = "Rank";
          }
          setChartVisible(true);
          setState({
            options: {
              chart: {
                id: "apexchart-example",
                type: "area",
                fontFamily: "Inter, sans-serif",
                foreColor: "#6B7280",
                height: "50%",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: xAxisData,
                labels: {
                  style: {
                    colors: ["#6B7280"],
                    fontSize: "14px",
                    fontWeight: 500,
                  },
                },
                title: {
                  text: xAxisLabel,
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: ["#6B7280"],
                    fontSize: "14px",
                    fontWeight: 500,
                  },
                },
                title: {
                  text: yAxisLabel,
                },
              },
              stroke: {
                curve: "smooth",
              },
              fill: {
                type: "solid",
                opacity: 0.3,
              },
              grid: {
                show: false,
              },
            },
            series: [
              {
                name: "overall-rank",
                data: yAxisData,
                fillColor: "#17e3e3",
              },
            ],
          });
        }
      }
    },
    [currentFplData, pastFplData, props.pastData],
  );
  return (
    <div>
      {chartVisible && (
        <Chart options={state.options} series={state.series} height="300" />
      )}
      {!chartVisible && (
        <div role="status" className="mt-2 flex justify-center items-center">
          <svg
            className="inline mr-2 sm:w-10 sm:h-10 md:w-28 md:h-16  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    </div>
  );
};

export default HistoryChart;
