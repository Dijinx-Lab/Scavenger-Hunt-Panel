import React, { useState } from 'react';
const VideosTable = ({ currentPage, recordsPerPage }) => {

    const [tableData, setTableData] = useState([
        {
            type: 'WELCOME',
            challengeType: 'Slider',
            message: "Watch a video and learn more about summary of your route",


        },
        {
            type: 'WELCOME',
            challengeType: 'Mutliple Choice',
            message: "Watch a video and learn more about summary of your route",


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
        <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream  rounded-sm ">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr className='text-sh-graph-black text-opacity-80'>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block text-base  font-medium leading-none text-sh-graph-black">
                                Type
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Video
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Message
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Action
                            </p>
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index} className='text-opacity-50 text-black'>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[12%]`}>

                                <p className="block   text-base text-left font-normal leading-normal sh-graph-black">
                                    {row.type}
                                </p>
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[12%]`}>
                                {!row.empty && (
                                    <p className="block text-sh-blue underline text-base font-normal leading-normal sh-graph-black">
                                        VIEW
                                    </p>
                                )}
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                                <p className="block  text-base font-normal leading-normal sh-graph-black">
                                    {row.message}
                                </p>
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[25%]`}>
                                {/* <p className="block   text-base font-normal leading-normal sh-graph-black"> */}
                                {!row.empty && (
                                    <button className="py-4 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        CHANGE
                                    </button>
                                )}
                            </td>
                            {/* <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
              {!row.empty && (
              <button  class=" py-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  DELETE</button>
                )}
              </td> */}
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

export default VideosTable;