import { useState } from 'react';
import PlainNavbar from '../../components/navbar/navbar';
import ArrowUp from"../../assets/arrow_up.svg";
import VideosTable from './videoTable';
import UsePagination from '../../components/pagination/handle_page_change';
import Pagination from '../../components/pagination/pagination';
function Settings() {
    const [isTermsAccordionOpen, setIsTermsAccordionOpen] = useState(false);

    const toggleTermsAndConditionAccordion = () => {
        setIsTermsAccordionOpen(!isTermsAccordionOpen);
    };
    const [isPrivacyAccordionOpen, setIsPrivacyAccordionOpen] = useState(false);

    const togglePPAccordion = () => {
        setIsPrivacyAccordionOpen(!isPrivacyAccordionOpen);
    };
    const [isVideosAccordionOpen, setIsVideosAccordionOpen] = useState(false);

    const toggleVideosAccordion = () => {
        setIsVideosAccordionOpen(!isVideosAccordionOpen);
    };
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 10);

    return (
        <div className="flex-col w-full overflow-x-hidden">
            <PlainNavbar />

            <div className="w-full">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Settings
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5 flex items-start justify-start">
                    <span className="text-sa-maroon text-left text-lg md:text-xl">
                        Here you can change and manage app’s miscellaneous settings.
                    </span>
                </div>

                <div id="accordion-collapse" data-accordion="collapse" className='xl:ml-[5%] mt-10 ml-[8%] w-[90%] drop-shadow-md rounded-[20px] bg-sh-cream'>
                    <h2 id="accordion-collapse-heading-1">
                        <button 
                            type="button" 
                            className="flex font-bold lg:text-xl items-center justify-between w-full p-5  rtl:text-right text-black rounded-t-xl gap-3"
                            onClick={toggleTermsAndConditionAccordion}
                            aria-expanded={isTermsAccordionOpen}
                            aria-controls="accordion-collapse-body-1"
                        >
                            <span>Terms and Conditions</span>
                            <img 
                                src={ArrowUp} 
                                alt="Arrow Icon" 
                                className={` mr-3 shrink-0 transition-transform ${isTermsAccordionOpen ? 'rotate-360' : 'rotate-180'}`} 
                            />
                        </button>
                    </h2>
                    <div 
                        id="accordion-collapse-body-1" 
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isTermsAccordionOpen ? 'max-h-96' : 'max-h-0'}`} 
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                        <textarea
                            placeholder="Start typing here..."
                            className="w-[98%] resize-none py-4 lg:h-44 mb-10 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        ></textarea>
                 
                    <div className='w-full flex justify-center items-center'>
                    <button class="mb-8 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[70%]  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        SAVE
                        </button>

                    </div>   </div>
                </div>
                <div id="accordion-collapse" data-accordion="collapse" className='xl:ml-[5%] mt-6 ml-[8%] w-[90%] drop-shadow-md rounded-[20px] bg-sh-cream'>
                    <h2 id="accordion-collapse-heading-1">
                        <button 
                            type="button" 
                            className="flex font-bold lg:text-xl items-center justify-between w-full p-5  rtl:text-right text-black rounded-t-xl gap-3"
                            onClick={togglePPAccordion}
                            aria-expanded={isPrivacyAccordionOpen}
                            aria-controls="accordion-collapse-body-1"
                        >
                            <span>Privacy Policy</span>
                            <img 
                                src={ArrowUp} 
                                alt="Arrow Icon" 
                                className={` mr-3 shrink-0 transition-transform ${isPrivacyAccordionOpen ? 'rotate-360' : 'rotate-180'}`} 
                            />
                        </button>
                    </h2>
                    <div 
                        id="accordion-collapse-body-1" 
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isPrivacyAccordionOpen ? 'max-h-96' : 'max-h-0'}`} 
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                        <textarea
                            placeholder="Start typing here..."
                            className="w-[98%] resize-none py-4 lg:h-44 mb-10 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        ></textarea>
                 
                    <div className='w-full flex justify-center items-center'>
                    <button class="mb-8 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[70%]  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        SAVE
                        </button>

                    </div>   </div>
                </div>
                <div id="accordion-collapse" data-accordion="collapse" className='xl:ml-[5%] mb-20 mt-6 ml-[8%] drop-shadow-md rounded-[20px] w-[90%] bg-sh-cream'>
                    <h2 id="accordion-collapse-heading-1">
                        <button 
                            type="button" 
                            className="flex font-bold lg:text-xl items-center justify-between w-full p-5  rtl:text-right text-black rounded-t-xl gap-3"
                            onClick={toggleVideosAccordion}
                            aria-expanded={isVideosAccordionOpen}
                            aria-controls="accordion-collapse-body-1"
                        >
                            <span>Videos</span>
                            <img 
                                src={ArrowUp} 
                                alt="Arrow Icon" 
                                className={` mr-3 shrink-0 transition-transform ${isVideosAccordionOpen ? 'rotate-360' : 'rotate-180'}`} 
                            />
                        </button>
                    </h2>
                    <div 
                        id="accordion-collapse-body-1" 
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isVideosAccordionOpen ? 'max-h-auto' : 'max-h-0'}`} 
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                        <div className='mt-5 mb-10  w-[84%]  xl:w-[98%] h-auto rounded-[20px] bg-sh-cream  '>
        {/* <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-[22px] font-bold'>Ft. Howell</span>
                        <button onClick={goToAddQuestions} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
                    </div> */}
        <div className=' pb-10'>
          <VideosTable currentPage={currentPage} recordsPerPage={recordsPerPage} />
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
                        {/* <textarea
                            placeholder="Start typing here..."
                            className="w-[98%] resize-none py-4 lg:h-44 mb-10 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        ></textarea>
                 
                    <div className='w-full flex justify-center items-center'>
                    <button class="mb-8 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[70%]  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        SAVE
                        </button>

                    </div>    */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
