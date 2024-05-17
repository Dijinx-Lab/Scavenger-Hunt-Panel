import Pagination from "../../components/pagination/pagination";

import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router";
import ManageChallengesTable from './manage_challenges_table';
import UsePagination from "../../components/pagination/handle_page_change";

function ManageChallenges() {
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 10);

  const navigate = useNavigate();

    const goToAddQuestions = () => {
        navigate("/challenges/add-questions");
      };
    

    return (
        <div className="flex-col w-full overflow-x-hidden ">
<PlainNavbar/>
            
            <div className="w-full "></div>
            <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>

<div className='mt-8 mb-10 xl:ml-[5%] ml-[8%] w-[84%]  xl:w-[90%] mx-[5%] h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-[22px] font-bold'>Ft. Howell</span>
                        <button onClick={goToAddQuestions} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
                    </div>
                    <div className='mt-8 mx-8 pb-10'>
            <ManageChallengesTable currentPage={currentPage} recordsPerPage={recordsPerPage} />
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
                </div>
    )
}

export default ManageChallenges;