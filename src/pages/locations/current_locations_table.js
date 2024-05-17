import React, { useState } from 'react';
const CurrentLocations = ({ currentPage, recordsPerPage }) => {

    const [tableData, setTableData] = useState([
        {
          name: 'Fort Howell',
          latitude: 32.2332466372599,
          longitude: -80.69384960400781,
          status: 'Start',
          totalTime: '01:29:00',
          
        },
        {
            name: 'Fort Howell',
            latitude: 32.2332466372599,
            longitude: -80.69384960400781,
            status: 'Start',
            totalTime: '01:29:00',

            
          },
        // Add more data objects as needed
      ]);

      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const currentData = tableData.slice(startIndex, endIndex);
      
      while (currentData.length < 10) {
        currentData.push({ name: '', id: '', email: '', empty: true });
      }
      return (
      <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream rounded-sm ">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
          <tr className='text-sh-graph-black text-opacity-80'>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none text-sh-graph-black">
                  Name
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block text-base  font-medium leading-none text-sh-graph-black ">
                 Total Challenges
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Total Points
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Coordinates
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Welcome Message
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className='text-opacity-50 text-black'>
               <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[30%]`}>
                <p className="block  text-base text-left font-normal leading-normal sh-graph-black">
                  {row.name}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.latitude}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.longitude}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.status}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.totalTime}
                </p>
              </td>
            </tr>
          ))}
          {/* <tr className="border-b-0">
                    <td className="md:py-8 py-5 border-r border-gray-300 w-[100px]"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5  border-gray-300"></td>
                  </tr> */}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CurrentLocations;