import React, { useState } from 'react';
const CreatedTeams =({ currentPage, recordsPerPage }) => {

    const [tableData, setTableData] = useState([
        {
          name: 'Team Unicorn',
          id: 'ESCO154-5571',
          members: 1,
          rank: 308,
          email: 'random@gmail.com',
          
        },
        {
            name: 'Team Unicorn',
            id: 'ESCO154-5571',
            members: 1,
            rank: 308,
            email: 'random@gmail.com',
            
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
                  ID
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                  Members
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                  Rank
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                  Email
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.name}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.id}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.members}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.rank}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.email}
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
  
  export default CreatedTeams;