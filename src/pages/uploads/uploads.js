import React, { useState, useEffect } from "react";
import UploadedVideosTable from "./uploaded_videos_table";
import Pagination from "../../components/pagination/pagination";
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router";
import UploadVideoIcon from "../../assets/Upload_Video_Icon.svg";
import UsePagination from "../../components/pagination/handle_page_change";

function Uploads() {
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 5);

    const navigate = useNavigate();

    const handleUpload = () => {

    };
const uploadImgUrl="https://dk9gc53q2aga2.cloudfront.net/assets/Upload_Video_Icon.svg";

    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

            <div className="w-full ">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Uploads
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>
                {/* <div className="grid w-full lg:grid-cols-[0.6fr,1fr] grid-cols-1 gap-6 mt-5 lg:mt-6 ml-10 lg:text-xl text-lg text-black"> */}
                <div class="w-full mb-10 xl:ml-[5%] ml-[8%] md:mt-10 mt-10 grid grid-cols-1 xl:grid-cols-[52%,31%] gap-2"  >

                    <div className='mt-8 mb-10  w-[84%]  xl:w-[100%]  h-auto rounded-[20px] bg-sh-cream  '>
                        <div className='flex justify-between'>
                            <span className='text-left flex items-start justify-start ml-8 pt-8 text-xl lg:text-[22px] font-bold'>Uploaded Videos</span>
                            <button onClick={handleUpload} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 lg:px-[12%] px-[4%]   py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button>
                        </div>
                        <div className='mt-8 mx-8 pb-10'>
                            <UploadedVideosTable currentPage={currentPage} recordsPerPage={recordsPerPage} />
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
                    {/* <div className='mt-8 mb-10 ml-10 w-[80%]  h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-2xl font-bold'>Uploaded Videos</span>
                        <button onClick={goToCreate} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-semibold hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button>
                    </div>
                    <div className='mt-8 mx-8  pb-10 '>
                        <UploadedVideosTable /></div>
                    <div className='mx-8 pb-10'><Pagination /></div>
                </div> */}
                    <div className='xl:ml-[20%] mt-8 mb-10 w-[84%] xl:w-[100%] h-[40rem]  lg:h-[41rem] rounded-[20px] bg-sh-cream  '>
                        <div className="grid w-full ">
                            <div className=" mt-16 justify-self-center">
                                <img src={uploadImgUrl} className="lg:w-72 lg:h-44 h-40 w-56 xl:h-full xl:w-full"></img>
                            </div>
                        </div>
                        <div className="text-left md:ml-[10%] mt-2 xl:mt-8 lg:text-sm text-sm text-gray-600">Please upload video, size less than 1GB</div>
                        {/* <input  className="file-input file-input-bordered w-full max-w-xs" 
    type="file"
    id="videoUpload"
    name="videoUpload"
    accept="video/*"
    
    
     className="md:ml-[10%]  mt-3 block"
/> */}
                        <div className="flex md:ml-[10%]">
                            <label className="flex-col text-sm hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90 rounded-md font-medium cursor-pointer px-3 py-1.5 mt-3 border border-black custom-file-upload">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const fileName = e.target.files[0]?.name || "No File Chosen";
                                        const fileLabel = document.getElementById("fileLabel");
                                        if (fileLabel) fileLabel.textContent = fileName;
                                    }}
                                />
                                Choose File
                            </label>
                            <label id="fileLabel" className="ml-1 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3">
                                No File Chosen
                            </label>
                        </div>
                        <div className="text-left md:ml-[10%] mt-5 lg:text-lg text-base text-black">Name</div>
                        <input
                            type="text"
                            placeholder="Video Name"
                            className="w-[80%] text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        />
                        <div className="text-left md:ml-[10%] mt-5 lg:text-lg text-base text-black">Comment</div>
                        <input
                            type="text"
                            placeholder="Video Comment"
                            className=" w-[80%] text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        />
                        <div class="flex items-center justify-center mt-10 mb-10 lg:mt-8">
                            <button class="w-[80%]  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                UPLOAD
                            </button>
                        </div>
                    </div>


                </div>
            </div></div>
    )
}

export default Uploads;
