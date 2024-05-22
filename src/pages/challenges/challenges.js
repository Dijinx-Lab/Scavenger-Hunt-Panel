import React,{ useState, useEffect } from "react";
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import CurrentChallenges from './table';
import Pagination from "../../components/pagination/pagination";
import { Blurhash } from 'react-blurhash';
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router";
import UsePagination from "../../components/pagination/handle_page_change";

function Challenges() {
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 10);

  const navigate = useNavigate();

    const goToCreate = () => {
        navigate("/challenges/create");
      };
    
      const cdnImageUrl = 'https://dk9gc53q2aga2.cloudfront.net/assets/Challenges_Icon_For_Dashboard.svg'; 
    return (
        <div className="flex-col w-full overflow-x-hidden ">
<PlainNavbar/>
            
            <div className="w-full ">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%]  mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%]  mt-5 flex items-start justify-start">
                    <span className="text-sh-gray text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>

                <div class="w-full xl:ml-[5%] ml-[8%]  md:mt-10 mt-10 grid md:grid-cols-1 lg:ml-[4%] lg:grid-cols-2 xl:grid-cols-[28%,28%,28%] xl:gap-x-[3%] xl:gap-y-0 gap-x-0 gap-y-10">
                    <div className="bg-sh-cream h-32  lg:ml-[8%] xl:ml-0 w-72 lg:w-[80%]  xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>TOTAL</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>500</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream  xl:mx-0  h-32 w-72  lg:w-[80%] xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img  src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>COMPLETED</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>465</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream xl:ml-0 lg:ml-[8%]  h-32 w-72 lg:w-[80%] xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-15px]'>UNCOMPLETED</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-15px]'>35</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-8 mb-10  xl:ml-[5%] ml-[8%] w-[84%] lg:w-[86%] xl:w-[90%] mx-[5%] h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-8 text-lg lg:text-[22px] font-bold'>Current Challenges</span>
                        <button onClick={goToCreate} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-[5%] lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button>
                    </div>
                    <div className='mt-8 mx-8 pb-10'>
            <CurrentChallenges currentPage={currentPage} recordsPerPage={recordsPerPage} />
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={recordsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange} // Pass the handlePageChange function
            />
          </div>
                </div>


            </div></div>
    )
}

export default Challenges;
