import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentCreatedTeams = ({ currentPage, recordsPerPage,AllTeams  }) => {
  const [tableData, setTableData] = useState(AllTeams);
  useEffect(() => {
    setTableData(AllTeams);
  }, [AllTeams]);
  const navigate = useNavigate();

    // const [tableData, setTableData] = useState([
    //     {
    //       name: 'Team Unicorn',
    //       id: 'ESCO154-5571',
    //       members: 1,
    //       rank: 308,
    //       email: 'random@gmail.com',
          
    //     },
    //     {
    //         name: 'Team Unicorn',
    //         id: 'ESCO154-5571',
    //         members: 1,
    //         rank: 308,
    //         email: 'random@gmail.com',
            
    //       },
    //       {
    //         name: 'Team Unicorn',
    //         id: 'ESCO154-5571',
    //         members: 1,
    //         rank: 308,
    //         email: 'random@gmail.com',
            
    //       },
    //       {
    //           name: 'Team Unicorn',
    //           id: 'ESCO154-5571',
    //           members: 1,
    //           rank: 308,
    //           email: 'random@gmail.com',
              
    //         },
    //         {
    //           name: 'Team Unicorn',
    //           id: 'ESCO154-5571',
    //           members: 1,
    //           rank: 308,
    //           email: 'random@gmail.com',
              
    //         },
    //         {
    //             name: 'Team Unicorn',
    //             id: 'ESCO154-5571',
    //             members: 1,
    //             rank: 308,
    //             email: 'random@gmail.com',
                
    //           },
                      
    //     // Add more data objects as needed
    //   ]);
      const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);
    
  let paddedData = [...currentData];
  while (paddedData.length < 10) {
    paddedData = [...paddedData, { name: '', questions: '', total_score: '', longitude: '', latitude: '', description: '', empty: true }];
  }

  const navigateToTeamDetails=(team_code)=>{
    if(team_code){
      navigate("/teams/details?code="+team_code);
    }
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
                  Team Code
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                Score
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  Rank
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none  ">
                  Completed Challenges
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {paddedData.slice(0, 10).map((row, index) => {

            const completedChallengesLength = row.completed_challenges ? row.completed_challenges.length : 0;
            return (
            <tr onClick={() => navigateToTeamDetails(row.team_code)}  key={index} className='cursor-pointer text-opacity-50 text-black'>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[40%]`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.name}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block text-base font-normal leading-normal ">
                  {row.team_code}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.score}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                  {row.leaderboard}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal ">
                {!row.empty ? completedChallengesLength:""}
                </p>
              </td>
            </tr>
            );
          })}
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