import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatedTeams = ({ currentPage, recordsPerPage, AllTeams,searchTerm }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(AllTeams);

  useEffect(() => {
    setTableData(AllTeams);
  }, [AllTeams]);

  const navigateToTeamDetails = (team_code) => {
    if(team_code){

    navigate("/teams/details?code="+team_code);
  }
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const filteredData = tableData.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentData = filteredData.slice(startIndex, endIndex);
  while (currentData.length < 10) {
    currentData.push({ name: '', id: '', challengesCompleted: '', empty: true });
  }

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream rounded-sm">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className='text-sh-graph-black text-opacity-80'>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base font-medium leading-none text-sh-graph-black">
                Name
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base font-medium leading-none text-sh-graph-black">
              Team Code
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base font-medium leading-none text-sh-graph-black">
                Score
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base font-medium leading-none text-sh-graph-black">
                Rank
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base font-medium leading-none text-sh-graph-black">
                Challenges Completed
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => {
            const completedChallengesLength = row.completed_challenges ? row.completed_challenges.length : 0;
            return (
              <tr onClick={() => navigateToTeamDetails(row.team_code)} key={index} className='cursor-pointer text-opacity-50 text-black'>
                <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[30%]`}>
                  <p className="block text-base font-normal leading-normal sh-graph-black">
                    {row.name}
                  </p>
                </td>
                <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                  <p className="block text-base font-normal leading-normal sh-graph-black">
                    {row.team_code}
                  </p>
                </td>
                <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                  <p className="block text-base font-normal leading-normal sh-graph-black">
                    {row.score}
                  </p>
                </td>
                <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                  <p className="block text-base font-normal leading-normal sh-graph-black">
                    {row.leaderboard}
                  </p>
                </td>
                <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                  <p className="block text-base font-normal leading-normal sh-graph-black">
                    {!row.empty ? completedChallengesLength:""}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedTeams;
