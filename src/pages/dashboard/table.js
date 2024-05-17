import React, { useState } from 'react';
const RecentCreatedTeams = ({ currentPage, recordsPerPage,totalRecords  }) => {

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
    
  while (currentData.length < 5) {
    currentData.push({ name: '', id: '', email: '', empty: true });
  }
  return (
      <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream  rounded-sm ">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr className='text-sh-graph-black text-opacity-80'>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none ">
                  Name
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  ID
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  Members
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  Rank
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  Email
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className='text-opacity-50 text-black'>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[40%]`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.name}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal ">
                  {row.id}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.members}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.rank}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.email}
                </p>
              </td>
            </tr>
          ))}
          {/* <tr className="border-b-0">
                    <td className="md:py-8 py-5 border border-gray-300 w-[100px]"></td>
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
  
  export default RecentCreatedTeams;