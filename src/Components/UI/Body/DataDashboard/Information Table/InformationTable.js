const InformationTable = (props) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Country
            </th>
            <td className="py-4 px-6">{props.data.player_region_name}</td>
          </tr>
          <tr className="bg-gray-50 border-b dark:bg-slate-800 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Overall Points
            </th>
            <td className="py-4 px-6">{props.data.summary_overall_points}</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Overall Rank
            </th>
            <td className="py-4 px-6">{props.data.summary_overall_rank}</td>
          </tr>
          <tr className="bg-gray-50 border-b dark:bg-slate-800 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Gameweek Points
            </th>
            <td className="py-4 px-6">{props.data.summary_event_points}</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Gameweek Rank
            </th>
            <td className="py-4 px-6">{props.data.summary_event_rank}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InformationTable;
