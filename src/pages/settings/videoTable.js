import React, { useState,useEffect } from 'react';
import Spinner from '../../components/spinner/spinner';
import Toast from '../../components/toast/toast';
const VideosTable = ({ currentPage, recordsPerPage,settingsData,openIsChange }) => {
    // const uploadImgUrl = "https://dk9gc53q2aga2.cloudfront.net/assets/Upload_Video_Icon.svg";

    // const [selectedFile, setSelectedFile] = useState(null);
    const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  
   
    const [showChangeloading, setShowchangeloading] = useState(false);
    const [changeIdx, setChangeIdx] = useState();
  
    const [tableData, setTableData] = useState(settingsData.video_table || []); // Default to empty array

  
    useEffect(() => {
        if (settingsData.video_table) {
            setTableData(settingsData.video_table);
        }
    }, [settingsData.video_table]); //


    // const closeIsChange = () => {
    //   setIsChange(false);
    // };
    // const openIsChange = (id) => {
    //     setChangeIdx(id);
    //   setIsChange(true);
    // };

    // const handleFileInputClick = () => {
    //     setSelectedFile(null);
    //   };
    //   const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       const fileName = file.name;
    //       const allowedExtensions = [".jpg", ".jpeg", ".png"];
    //       const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
      
    //       if (allowedExtensions.includes(extension)) {
    //         setSelectedFile(file); // Set the selected file if it has an allowed extension
    //         const fileLabel = document.getElementById("fileLabel");
    //         if (fileLabel) {
    //           fileLabel.textContent = fileName; // Update file label text
    //         }
    //       } else {
    //         setToastMessages([
    //           ...toastMessages,
    //           {
    //             type: "invalid",
    //             title: "Invalid File",
    //             body: "Only JPEG, JPG, and PNG files are allowed",
    //           },
    //         ]);
    //         setSelectedFile(null); // Reset selected file
    //         const fileLabel = document.getElementById("fileLabel");
    //         if (fileLabel) {
    //           fileLabel.textContent = "No File Chosen"; // Reset file label text
    //         }
    //       }
    //     }
    //     e.target.value = null;
    //   };
    //   useEffect(() => {
    //     const fileLabel = document.getElementById("fileLabel");
    //     if (fileLabel) {
    //       fileLabel.textContent = selectedFile ? selectedFile.name : "No File Chosen";
    //     }
    //   }, [selectedFile]);


const handleView = (videoUrl) => {
    window.open(videoUrl, '_blank');
};
const startIndex = (currentPage - 1) * recordsPerPage;
const endIndex = startIndex + recordsPerPage;
const currentData = tableData.slice(startIndex, endIndex);


let paddedData = [...currentData];
while (paddedData.length < 2) {
  paddedData = [...paddedData, { name: '', questions: '', total_score: '', longitude: '', latitude: '', description: '', empty: true }];
}
// const paddedData = [
//     {
//         type: settingsData.intro_message ? "Welcome":"",
//         message: settingsData.intro_message,
//         empty: false,
//         _id: 'intro',
//         videoUrl: settingsData.intro_video, // You may need to adjust this ID based on your data structure
//     },
//     {
//         type: settingsData.outro_message?"Goodbye":"",
//         message: settingsData.outro_message,
//         empty: false,
//         _id: 'outro',
//         videoUrl: settingsData.outro_video, // You may need to adjust this ID based on your data structure
//     },
// ];

    return (
        <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream  rounded-sm ">
          {toastMessages.map((toast, index) => (
                    <Toast
                        className="mb-0"
                        key={index}
                        toasts={[toast]}
                        onClose={() => {
                            // Remove the toast message when it's closed
                            const updatedToasts = [...toastMessages];
                            updatedToasts.splice(index, 1);
                            setToastMessages(updatedToasts);
                        }}
                    />
                ))}
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr className='text-sh-graph-black text-opacity-80'>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block text-base  font-medium leading-none text-sh-graph-black">
                                Type
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Video
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Message
                            </p>
                        </th>
                        <th className="p-4 border border-gray-300 bg-sh-cream">
                            <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                                Action
                            </p>
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {paddedData && paddedData.map((row, index) => (
                        <tr key={index} className='text-opacity-50 text-black'>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[12%]`}>

                                <p className="block   text-base text-left font-normal leading-normal sh-graph-black">
                                    {row.title}
                                </p>
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[12%]`}>
                                {!row.empty && (
                                    <p  onClick={() => handleView(row.video)} className="block cursor-pointer text-sh-blue underline text-base font-normal leading-normal sh-graph-black">
                                        VIEW
                                    </p>
                                )}
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                                <p className="block  text-base font-normal leading-normal sh-graph-black">
                                    {row.message}
                                </p>
                            </td>
                            <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[25%]`}>
                                {!row.empty && (
                                    <button onClick={() => openIsChange(row.title,row.message,row.video)} className="py-4 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        CHANGE
                                    </button>
                                )}
                            </td>
                         
                        </tr>
                    ))}
                      
                    <tr className="border-b-0">
                        <td className="md:py-8 py-5 border-r border-gray-300 w-[100px]"></td>
                        <td className="md:py-8 py-5 border-r border-gray-300"></td>
                        <td className="md:py-8 py-5 border-r border-gray-300"></td>
                        <td className="md:py-8 py-5 border-r border-gray-300"></td>
                        <td className="md:py-8 py-5  border-gray-300"></td>
                    </tr>
                </tbody>
            </table>
            {/* {isChange && (
            <div
              className=" fixed inset-0 flex items-center justify-center z-50"
              onClick={closeIsChange}
            >
              <div className=" bg-black opacity-50 absolute inset-0"></div>
              <div
                className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-black font-semibold text-lg md:w-auto w-60 text-left mb-4">
                  Confirm
                </h2>
                <div className="text-left   mt-2 lg:text-xl text-lg text-black">
                        Question Picture
                    </div>
                    <div className="grid w-full ">
                        <div className=" mt-5 justify-self-center">
                            <img src={uploadImgUrl} className="lg:w-72 lg:h-40 h-40 w-56 xl:h-40 xl:w-40"></img>
                        </div>
                    </div>
                    <div className="text-left mt-2 xl:mt-3 lg:text-lg text-sm text-sh-gray">Please upload picture, size less than 15 MB</div>
                    <div className="flex ">
                        <label className="flex-col text-sm hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90 rounded-md font-medium cursor-pointer px-3 py-1.5 mt-3 border border-black custom-file-upload">
                            <input
                                type="file"
                             
                                className="hidden"
                                onChange={handleFileChange}
                                onClick={handleFileInputClick}
                            />
                            Choose File
                        </label>
                        <label id="fileLabel" className="ml-1 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3">
                        {selectedFile ? selectedFile.name : "No File Chosen"}
                        </label>
                    </div>
                <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                  Are you sure you want to delete this question?
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeIsChange}
                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sh-red hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                  
                  >
                    {showChangeloading ? <Spinner /> : <span>EDIT</span>}
                  </button>
                </div>
              </div>
            </div>
          )} */}

        </div>
    );
};

export default VideosTable;