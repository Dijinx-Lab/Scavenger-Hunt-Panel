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
  const challengeName = "Ft. Howell"
  const coords = "(10.12312, 12.123121)"
  const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum luctus mollis. Curabitur tempor gravida quam non rhoncus. Ut mattis mi et turpis cursus, ac interdum erat porta. Ut porta pretium condimentum. Integer a quam erat. Vivamus consectetur purus tortor"

  return (
    <div className="flex-col w-full overflow-x-hidden ">
      <PlainNavbar />

      <div className="w-full "></div>
      <div className=" xl:ml-[5%] ml-[8%]  grid lg:grid-cols-[60%,22%] xl:grid-cols-[70%,17%]">
        <div>
          <div className="md:mt-20  mt-16  flex items-start justify-start">
            <span className=" text-left font-bold text-2xl md:text-4xl">
              {challengeName}
            </span>
          </div>
          <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className=" text-left font-bold text-lg md:text-xl">
              {coords}
            </span>
          </div>
          <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className="text-sh-gray text-left text-lg md:text-xl">
              {message}
            </span>
          </div>
        </div>
        <div >
          <div>
          <button onClick={goToAddQuestions} className='xl:mt-14 lg:ml-[40%] w-full mt-16    rounded-md bg-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
          </div>
          <div>
          <button onClick={goToAddQuestions} className='md:mt-5 lg:ml-[40%] w-full mt-16    rounded-md bg-white text-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 cursor-pointer border border-sh-blue '>Edit Details</button>
          </div>
          <div>
          <button onClick={goToAddQuestions} className='md:mt-5 lg:ml-[40%] w-full mt-16    rounded-md bg-white text text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer  '>Delete Challenge</button>
          </div>
        </div>
      </div>
<div className="xl:ml-[5%] text-left grid lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[20%,20%,20%,20%] ml-[8%] md:mt-12">
<span className="text-left text-xl  font-bold">Difficulty</span>
<span className="text-left text-xl  ml-[10%] font-bold">Total Points</span>
<span className="text-left text-xl  ml-[10%] font-bold">Total Questions</span>
<span className="text-left text-xl ml-[10%] font-bold">Intro Video</span>
</div>
<div className="xl:ml-[5%] text-left grid  lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[20%,20%,20%,20%] ml-[8%] md:mt-4">
<span className="text-left text-xl   font-bold">MEDIUM</span>
<span className="text-left text-xl  ml-[10%] font-bold">1043</span>
<span className="text-left text-xl  ml-[10%] font-bold">10</span>
<span className="text-left text-xl  ml-[10%] underline font-bold text-sh-blue">VIEW</span>

</div>
      <div className='mt-16 mb-10 xl:ml-[5%] ml-[8%] w-[84%]  xl:w-[90%] mx-[5%] h-auto rounded-[20px] bg-sh-cream  '>
        {/* <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-[22px] font-bold'>Ft. Howell</span>
                        <button onClick={goToAddQuestions} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
                    </div> */}
        <div className='mt-8 pt-10 mx-8 pb-10'>
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