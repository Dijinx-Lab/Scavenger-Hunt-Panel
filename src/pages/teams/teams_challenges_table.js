import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TeamsChallenges = ({ currentPage, recordsPerPage, allQuestions }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(allQuestions);

  useEffect(() => {
    setTableData(allQuestions);
  }, [allQuestions]);
  // const [tableData, setTableData] = useState([
  //   {
  //     question: 'FT. Howell was built by two infantry units. Add the nu',
  //     points: '123',
  //     answer: "TRUE",
  //     status: "CORRECT",
  //     scored: '123',

  //   },
  //   {
  //     question: 'FT. Howell was built by two infantry units. Add the nu',
  //     points: '123',
  //     answer: "TRUE",
  //     status: "CORRECT",
  //     scored: '123',

  //   },
  //   // Add more data objects as needed
  // ]);

 
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);
  let paddedData = [...currentData];
  while (paddedData.length < 10) {
    paddedData = [...paddedData, { name: '', questions: '', total_score: '', longitude: '', latitude: '', description: '', empty: true }];
  }
  return (
    <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream rounded-sm">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className='text-sh-graph-black text-opacity-80'>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black">
              Question
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black ">
              Points
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black ">
              Answer
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black ">
              Correct/Wrong
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black ">
              Scored
              </p>
            </th>

          </tr>
        </thead>
        <tbody>
          {paddedData && paddedData.map((row, index) => (
            <tr  key={index} className=' text-opacity-50 text-black'>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[30%]`}>

                <p className="block text-base font-normal leading-normal sh-graph-black ">
                  {row.question}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.score}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                  {row.answer}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                {row.empty ? '' : (row.is_correct ? 'TRUE' : 'FALSE')}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[25%]`}>
                <p className="block text-base font-normal leading-normal sh-graph-black">
                {row.empty ? '': row.is_correct ? row.score : 0}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsChallenges;