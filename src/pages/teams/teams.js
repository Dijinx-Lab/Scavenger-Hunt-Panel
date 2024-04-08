import React, { useState, useEffect } from "react";
import TeamLogo from '../../assets/Teams_Logo_For_Dashboard.svg';
import UsersLogo from '../../assets/Total Users Logo.svg';
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import Logo1 from '../../assets/1.svg';
import Logo2 from '../../assets/2.svg';
import Logo3 from '../../assets/3.svg';
import CreatedAccounts from './accounts_table';
import Pagination from "../../components/pagination/pagination";
import UsePagination from "../../components/pagination/handle_page_change";
import CreatedTeams from './created_teams_table';
function Teams() {
 
  const { currentPage: accountsPage, recordsPerPage: accountsPerPage, handlePageChange: handleAccountsPageChange } = UsePagination(1, 5);
  const { currentPage: teamsPage, recordsPerPage: teamsPerPage, handlePageChange: handleTeamsPageChange } = UsePagination(1, 5);

  return (
    <div className="flex overflow-x-hidden">
      <div className="w-full">
        <div className="md:mt-20 md:ml-20 ml-5 mt-16  flex items-start justify-start">
          <span className="text-sa-maroon  font-bold text-2xl lg:text-4xl">
            Teams
          </span>
        </div>
        <div className="md:mt-4 md:ml-20 ml-6  mt-5 flex items-start justify-start">
          <span className="text-sa-maroon text-left   text-lg lg:text-xl">
            Here effortlessly manage and view teams with intuitive dashboard controls.
          </span>
        </div>


        <div class="w-full mb-10 md:ml-20 ml-10 md:mt-10 mt-10 grid md:grid-cols-1  lg:grid-cols-1 xl:grid-cols-[0.6fr,1fr] gap-2"  >
          <div className="bg-sh-cream h-[26rem]    w-[80%] xl:w-[100%] rounded-[20px]">
            <div className='flex'>
              <img src={TeamLogo} className='w-40 h-40 lg:w-48 lg:h-48 mt-[-20px] lg:mt-[-28px]' />
              <div>
                <span className='flex mt-5 lg:text-2xl text-xl font-bold ml-[-10px]'>TEAMS</span>
                <span className='flex mt-5 lg:text-2xl text-xl font-bold ml-[-10px]'>308</span>
              </div>

            </div>
            <div className='flex mt-[-5px] ml-10  text-sh-graph-black text-lg lg:text-xl text-opacity-70 font-semibold'>
              Teams Leaderboard
            </div>
            <div className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
                <img src={Logo1} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Unicorn' readOnly className='bg-sh-cream-light bg-opacity-20  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div>
            <div className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
                <img src={Logo2} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Knight' readOnly className='bg-sh-cream-light bg-opacity-20  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div>
            <div className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14 border border-sh-cream-light'>
                <img src={Logo3} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Blue' readOnly className='bg-sh-cream-light bg-opacity-20  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div>
          </div>


          <div className='xl:mt-[-2px] mt-8 mb-10  xl:ml-5   md:w-[80%]  h-[35rem] rounded-[20px] bg-sh-cream w-[70%] '>
            <div className='flex justify-between'>
              <span className='text-left flex items-start justify-start ml-8 pt-6 text-xl lg:text-2xl font-bold'>Created Accounts</span>
            </div>
            <div className='mt-8 mx-8 pb-10'>
            <CreatedAccounts currentPage={accountsPage} recordsPerPage={accountsPerPage} />
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={accountsPerPage}
              currentPage={accountsPage}
              onPageChange={handleAccountsPageChange} // Pass the handlePageChange function
            />
          </div>

          </div>

          <div className="bg-sh-cream  xl:mt-[-120px] mt-[8px] h-72 w-[80%] xl:w-[100%] rounded-[20px]">
            <div className='flex justify-center items-center text-xl lg:text-2xl font-bold mt-5  '>CREATE TEAM</div>
            <div className='flex justify-start items-start text-lg lg:text-xl font-medium mt-5 ml-[5%]  '>Team Name</div>
            <input
              type="text"
              placeholder="Team Name"
              className="w-[90%] text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400  focus:outline-none focus:ring-primary-300"
            />
            <button class="mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[90%] mt-8 text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">CREATE</button>

            {/* <div className='flex'>
              <img src={ChallengesLogo} className='mt-[-7px]' />

              <div>
                <span className='flex mt-5 text-xl font-bold ml-[-10px]'>CHALLENGES</span>
                <span className='flex mt-5 text-xl font-bold ml-[-10px]'>500</span>
              </div>
            </div> */}
          </div>

        </div>

        <div className='mt-8 mb-10 ml-10 md:ml-20 w-[80%] xl:w-[90%] h-auto rounded-[20px] bg-sh-cream  '>
          <div className='flex justify-between'>
            <span className='text-left flex items-start justify-start ml-8 pt-6 text-xl lg:text-2xl font-bold'>Created Teams</span>
            <div className="flex items-center mr-8 pt-6">
              <div class="w-full ">
                <div class="relative h-10 w-full ">
                  <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" aria-hidden="true" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                  </div>
                  <input
                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" " />
                  <label
                    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search
                  </label>
                </div>
              </div>

            </div>


          </div>
          <div className='mt-8 mx-8 pb-10'>
            <CreatedTeams currentPage={teamsPage} recordsPerPage={teamsPerPage} />
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={teamsPerPage}
              currentPage={teamsPage}
              onPageChange={handleTeamsPageChange} // Pass the handlePageChange function
            />
          </div>

        </div>
      </div></div>
  )
}

export default Teams;
