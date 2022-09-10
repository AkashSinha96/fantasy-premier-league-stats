import { useEffect, useState } from "react";

const DynamicTable = (props) => {
  const [playerLeagueData] = useState(props.leagueData);
  const [displayTable, setDisplayTable] = useState(false);
  useEffect(() => {
    if (playerLeagueData !== undefined && playerLeagueData.length > 0) {
      setDisplayTable(true);
    }
  }, [playerLeagueData]);
  return (
    <div>
      {displayTable && (
        <div classNameName="overflow-auto relative shadow-md sm:rounded-md h-64">
          <table classNameName="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  League Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {playerLeagueData.map((item) => (
                <tr
                  classNameName="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={item.id}
                >
                  <th
                    scope="row"
                    classNameName="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td classNameName="py-4 px-6">{item.entry_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
