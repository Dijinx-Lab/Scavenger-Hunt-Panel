import React, { useState } from 'react';
const CurrentChallenges = ({ currentPage, recordsPerPage }) => {

    const [tableData, setTableData] = useState([
        {
          name: 'Team Unicorn',
          totalChallenges: 'ESCO154-5571',
          totalPoints: 1,
          coordinates: 308,
          welcomeMessage: 'It’s time to explore Fort Howel, a significant Civil War landmark',
          
        },
        {
            name: 'Team Unicorn',
            totalChallenges: 'ESCO154-5571',
            totalPoints: 1,
            coordinates: 308,
            welcomeMessage: 'It’s time to explore Fort Howel, a significant Civil War landmark',
            
          },
        // Add more data objects as needed
      ]);

      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const currentData = tableData.slice(startIndex, endIndex);
    return (
      <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream shadow-md rounded-xl bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black">
                  Name
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                 Total Challenges
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                Total Points
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                Coordinates
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                Welcome Message
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td className="p-4  border border-gray-300">
                <p className="block  font-sans text-base text-left font-normal leading-normal sh-graph-black">
                  {row.name}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.totalChallenges}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.totalPoints}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.coordinates}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.welcomeMessage}
                </p>
              </td>
            </tr>
          ))}
          <tr className="border-b-0">
                    <td className="md:py-8 py-5 border-r border-gray-300 w-[100px]"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5  border-gray-300"></td>
                  </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CurrentChallenges;