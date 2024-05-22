
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router";
import TeamsChallenges from './teams_challenges_table';
import UsePagination from '../../components/pagination/handle_page_change';
import Pagination from '../../components/pagination/pagination';
function TeamDetails() {    
  const { currentPage: teamsPage, recordsPerPage: teamsPerPage, handlePageChange: handleTeamsPageChange } = UsePagination(1, 10);

    const navigate = useNavigate();
    const challengeName = "Wild Cats"
    const coords = "(09102)"
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
          {/* <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className="text-sh-gray text-left text-lg md:text-xl">
              {message}
            </span>
          </div> */}
        </div>
        <div >
          {/* <div>
          <button  className='xl:mt-14 lg:ml-[40%] w-full mt-16    rounded-md bg-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
          </div>
          <div>
          <button  className='md:mt-5 lg:ml-[40%] w-full mt-16    rounded-md bg-white text-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 cursor-pointer border border-sh-blue '>Edit Details</button>
          </div> */}
          <div>
          <button className='xl:mt-20 lg:ml-[40%] w-full mt-16    rounded-md bg-white text text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer  '>Delete Challenge</button>
          </div>
        </div>
      </div>
<div className="xl:ml-[5%] text-left grid md:grid-cols-3 lg:grid-cols-[20%,25%,25%,25%] xl:grid-cols-[15%,15%,15%,15%,15%,15%] ml-[8%] md:mt-12">
<div>
<span className="text-left text-xl  font-bold">Status</span>
<div className="text-left text-xl mt-3  font-bold">ACTIVE</div>
</div>
<div>
<span className="text-left text-xl  lg:ml-[10%] xl:ml-0 font-bold">Points Scored</span>
<div className="text-left text-xl lg:ml-[10%] xl:ml-0 mt-3 font-bold">1043</div>

</div>
<div>
<span className="text-left text-xl  ml-[10%] font-bold">Answered</span>
<div className="text-left text-xl mt-3 ml-[10%] font-bold">10</div>

</div>
<div className='lg:mt-0 mt-8'>

<span className="text-left text-xl lg:ml-[10%] font-bold">Route Started</span>
<div className="text-left text-xl mt-3  lg:ml-[10%] font-bold">22/01/2024</div>

</div>
<div className='xl:mt-0 mt-8'>

<span className="text-left text-xl xl:ml-[10%] font-bold">Time Taken</span>
<div className="text-left text-xl mt-3 xl:ml-[10%] font-bold">55 mins </div>

</div>
<div className='xl:mt-0 mt-8'>
<span className="text-left text-xl ml-[10%] font-bold">Leaderboards</span>
<div className="text-left text-xl mt-3 ml-[10%] font-bold">22 </div>

</div>
</div>
{/* <div className="xl:ml-[5%] text-left grid  lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[15%,15%,15%,15%,15%,15%] ml-[8%] md:mt-4">
<span className="text-left text-xl   font-bold">ACTIVE</span>
<span className="text-left text-xl   font-bold">1043</span>
<span className="text-left text-xl  ml-[10%] font-bold">10</span>
<span className="text-left text-xl  ml-[10%] font-bold ">22/01/2024</span>
<span className="text-left text-xl  ml-[10%] font-bold">55 mins</span>
<span className="text-left text-xl  ml-[10%] font-bold">22</span>

</div>   */}
<div className='mt-16 mb-20 xl:ml-[5%] ml-[8%] w-[84%] xl:w-[90%] h-auto rounded-[20px] bg-sh-cream  '>
<div className='mt-8  w-full  pb-6 pt-16 px-10'>
            <TeamsChallenges currentPage={teamsPage} recordsPerPage={teamsPerPage} />
          </div>
          <div className='xl:ml-[5%] w-[90%] pb-6 '>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={teamsPerPage}
              currentPage={teamsPage}
              onPageChange={handleTeamsPageChange} // Pass the handlePageChange function
            />
          </div></div>
 </div>
)
}

export default TeamDetails;