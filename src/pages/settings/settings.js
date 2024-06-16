import { useState,useEffect } from 'react';
import PlainNavbar from '../../components/navbar/navbar';
import ArrowUp from "../../assets/arrow_up.svg";
import VideosTable from './videoTable';
import UsePagination from '../../components/pagination/handle_page_change';
import Pagination from '../../components/pagination/pagination';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import SettingsManager from '../../models/admin/settings/settingshttp/http';
import { Jodit } from 'jodit-react';
import Spinner from '../../components/spinner/spinner';
import Toast from '../../components/toast/toast';
import { useNavigate,useLocation } from "react-router";
import UtilityManager from '../../models/admin/utility/utilityhttp';
import { Padding } from '@mui/icons-material';

function Settings() {
  const location = useLocation();
    const settingsManager = new SettingsManager();
    const utilityManager = new UtilityManager();
    const [video, setVideo] = useState('');

  const [showLoading, setShowLoading] = useState(false);
  const [showSave1Loading, setShowSave1Loading] = useState(false);
  const [showSave2Loading, setShowSave2Loading] = useState(false);
  const [showSave3Loading, setShowSave3Loading] = useState(false);
  const [showSave4Loading, setShowSave4Loading] = useState(false);
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state

    const [isTermsAccordionOpen, setIsTermsAccordionOpen] = useState(false);
    const [isRouteAccordionOpen, setIsRouteAccordionOpen] = useState(false);
    const [termsEditorcontent2, setTermsEditorcontent2] = useState("");
    const [privacyEditorcontent, setPrivacyEditorcontent] = useState("");
    const [settingsData, setSettingsData] = useState("");

    const [isChange, setIsChange] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
      const uploadImgUrl = "https://dk9gc53q2aga2.cloudfront.net/assets/Upload_Video_Icon.svg";
      const [routeTime, setRouteTime] = useState('');
      const [videoType, setVideoType] = useState('');
      const [message, setMessage] = useState('');
      const [initialVideo, setInitialVideo] = useState('');

    // const [editorContent, setEditorContent] = useState("");
    const isMobile = window.innerWidth < 768;

    const config = {
        
        // all options from https://xdsoft.net/jodit/docs/
        placeholder: "Start typing....",
        // theme: "dark", // Add this line for dark mode
        disablePlugins: ['speech-recognize'],
        removeButtons: [
            "undo",
            "redo",
            "superscript",
            "subscript",
            "search",
            "source",
            "find",
            "fullsize",
            "preview",
            "print",
            "about",
            "image",
            "imageGallery",
            "file",
            "video",
            "lineBreak",
            "table"
        ],
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: Jodit.INSERT_AS_HTML,
        processPasteHTML: true,
        direction: "ltr",
        style: {
            height: isMobile ? "245px" : "250px",
            //background: '#000000',
            textAlign: "left",
            
        },
        tabIndex: 1,
        defaultTimeout: 0,
        addNewLine: false,
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
    };

    const toggleTermsAndConditionAccordion = () => {
        setIsTermsAccordionOpen(!isTermsAccordionOpen);
    };
    const toggleRouteAccordion = () => {
        setIsRouteAccordionOpen(!isRouteAccordionOpen);
    };
    const [isPrivacyAccordionOpen, setIsPrivacyAccordionOpen] = useState(false);

    const togglePPAccordion = () => {
        setIsPrivacyAccordionOpen(!isPrivacyAccordionOpen);
    };
    const [isVideosAccordionOpen, setIsVideosAccordionOpen] = useState(false);

    const toggleVideosAccordion = () => {
        setIsVideosAccordionOpen(!isVideosAccordionOpen);
    };
    const { currentPage: currentVideoPage, recordsPerPage: videoRecordsPerPage, handlePageChange: handleVideoPageChange } = UsePagination(1, 2);
    const fetchData = async () => {
        setShowLoading(true);
        try {
          const response = await settingsManager.get();
          if (response.success) {
            setPrivacyEditorcontent(response.data.privacy_policy);
            setTermsEditorcontent2(response.data.terms_and_conditions);
            setRouteTime(response.data.total_time)
            setSettingsData(response.data);
            // setVideo(response.data.challenge.intro_url);
            // setTotalTeams(response.data.total_teams);
            // setAllTeams(response.data.teams);
          } else {
            setToastMessages([
              ...toastMessages,
              {
                type: "invalid",
                title: "Error",
                body: response.message,
              },
            ]);
          }
        } catch (error) {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: error.message,
            },
          ]);
        } finally {
          setShowLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
      const closeIsChange = () => {
        setSelectedFile(null);
    
        setIsChange(false);
      };
      const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            const truncated = text.slice(0, maxLength);
            const lastFour = text.slice(-5);
            return `${truncated}......${lastFour}`;
        }
      };
      const openIsChange = (id,message,video) => {
        setVideoType(id);
        setMessage(message);
        setInitialVideo(video);
        setIsChange(true);
      };
         const handleFileInputClick = () => {
            setSelectedFile(null);
          };
          const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
              const fileName = file.name;
              const validTypes = [
                "video/mp4",
                "video/avi",
                "video/mov",
                "video/wmv",
                "video/mkv",
                "video/flv",
                "video/webm",
                "video/m4v",
                "video/mpg",
                "video/mpeg",
                "video/3gp",
                "video/quicktime",
                "video/3gpp",
                "video/x-msvideo",
                "video/x-flv",
                "video/x-matroska",
                "video/x-ms-wmv",
                "video/ogg",
            ];
    
            if (validTypes.includes(file.type)) {
                setSelectedFile(file); // Set the selected file if it has an allowed extension
                const fileLabel = document.getElementById("fileLabel");
                if (fileLabel) {
                  fileLabel.textContent = fileName; // Update file label text
                }
              } else {
                setToastMessages([
                  ...toastMessages,
                  {
                    type: "invalid",
                    title: "Invalid File",
                    body: "This video format is not available.",
                  },
                ]);
                setSelectedFile(null); // Reset selected file
                const fileLabel = document.getElementById("fileLabel");
                if (fileLabel) {
                  fileLabel.textContent = "No File Chosen"; // Reset file label text
                }
              }
            }
            e.target.value = null;
          };
          useEffect(() => {
            const fileLabel = document.getElementById("fileLabel");
            if (fileLabel) {
              fileLabel.textContent = selectedFile ? truncateText(selectedFile.name,15) : "No File Chosen";
            }
          }, [selectedFile]);
          const handleRouteTimeChange = (event) => {
            const value = event.target.value;
            if (/^\d*$/.test(value)) {; // Parse value to integer
                setRouteTime(value);
            }
        };
        const handleMessageChange =(e)=>{
          setMessage(e.target.value);
        }
    const handleSave = async (loader) =>{
    
      if(loader=="route"){
        setShowSave3Loading(true);
      }
      if(loader=="terms"){
        setShowSave1Loading(true);
      }
      if(loader=="privacy"){
        setShowSave2Loading(true);
      }
      if(loader=="change"){
        if(!message){
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: "Message is required",
            },
          ]);
          return;
        }
        setShowSave4Loading(true);
      }
     
      let videoUrl= initialVideo;
            if(selectedFile && typeof selectedFile !== 'string' ){
              // const compressedVideo = await compressVideo(introVideo);
              const params = {
                folder: "assets",
                file: selectedFile,
              };
              const videoResponse = await utilityManager.create(params);
              if(videoResponse.success){
                videoUrl= videoResponse.data.url;
              }
            }
        const params = {
            terms_and_conditions: termsEditorcontent2,
            privacy_policy:privacyEditorcontent,
            routeTime:routeTime,
            
          };
          if(videoType=="Welcome"){
            params.intro_message = message
            params.intro_video=videoUrl
          }
          else{
            params.outro_message=message
            params.outro_video=videoUrl
          }
         
          try{
          const response = await settingsManager.create(params);
          closeIsChange();
          if(response.success){
            setToastMessages([
                ...toastMessages,
                {
                  type: "success",
                  title: "Success",
                  body: response.message,
                },
              ]);
              setSettingsData(response.data);
            
          }
          else{
            closeIsChange();
            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: response.message,
                },
              ]);
          }
        }
        catch(e){
          closeIsChange();

            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: e.message,
                },
              ]);
        }
        finally{
            setShowSave1Loading(false);
            setShowSave2Loading(false);
            setShowSave3Loading(false);
            setShowSave4Loading(false);
        }
    }


    const [key, setKey] = useState(0);
    const handleClearVideo = () => {
      setInitialVideo(null);
      setSelectedFile(null);
      const fileLabel = document.getElementById("fileLabel");
      fileLabel.textContent = "No File Chosen";
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = "";
      setKey((prevKey) => prevKey + 1);
    };
    return (
        <div className="flex-col w-full h-full overflow-x-hidden">
              {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}
            <PlainNavbar />
            <div className="fixed top-0 right-0 w-full z-[9999] flex flex-col items-end p-4">
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
    </div>
            <div className="w-full ">
          
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
  {/* <textarea
                            placeholder="Start typing here..."
                            className="w-[98%] resize-none py-4 lg:h-44 mb-10 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                        ></textarea> */}
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
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isTermsAccordionOpen ? 'max-h-auto' : 'max-h-0'}`}
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                      
                         <div className="mt-0 mb-8 w-full "> 
                            <RichTextEditor
                                setValue={setTermsEditorcontent2}
                                initialValue={termsEditorcontent2}
                                config={config}
                                
                                // style={{ minHeight: "500px", maxHeight: "800px",maxWidth:"200px" }}
                                //  style={{paddingLeft:"20px" }}
                            />
                       </div> 
                        <div className='w-full flex justify-center items-center'>
                            <button onClick={()=>handleSave("terms")} class="mb-8 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[70%]  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {showSave1Loading ? <Spinner  color="white"  /> : "SAVE"}
                                
                            </button>

                        </div>  
                     </div>
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
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isPrivacyAccordionOpen ? 'max-h-auto' : 'max-h-0'}`}
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                        <div className="mt-0 mb-8 w-[98%] ">
                            <RichTextEditor
                                setValue={setPrivacyEditorcontent}
                                initialValue={privacyEditorcontent}
                                config={config}
                            
                            />
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <button onClick={()=>handleSave("privacy")} class="mb-8 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[70%]  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {showSave2Loading ? <Spinner  color="white"  /> : "SAVE"}

                            </button>

                        </div>   
                    </div>
                </div>
                
                <div id="accordion-collapse" data-accordion="collapse" className='xl:ml-[5%] mb-6 mt-6 ml-[8%] drop-shadow-md rounded-[20px] w-[90%] bg-sh-cream'>
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
                            <div className=' pb-10'>
                                <VideosTable currentPage={currentVideoPage} recordsPerPage={videoRecordsPerPage}   settingsData={settingsData}  openIsChange={openIsChange}  />
                            </div>
                        </div>                  
                    </div>                     
                </div>
                <div id="accordion-collapse" data-accordion="collapse" className='xl:ml-[5%] mb-20 ml-[8%] w-[90%] drop-shadow-md rounded-[20px] bg-sh-cream'>
                    <h2 id="accordion-collapse-heading-1">
                        <button
                            type="button"
                            className="flex font-bold lg:text-xl items-center justify-between w-full p-5  rtl:text-right text-black rounded-t-xl gap-3"
                            onClick={toggleRouteAccordion}
                            aria-expanded={isRouteAccordionOpen}
                            aria-controls="accordion-collapse-body-1"
                        >
                            <span>Route Time</span>
                            <img
                                src={ArrowUp}
                                alt="Arrow Icon"
                                className={` mr-3 shrink-0 transition-transform ${isRouteAccordionOpen ? 'rotate-360' : 'rotate-180'}`}
                            />
                        </button>
                    </h2>
                    <div
                        id="accordion-collapse-body-1"
                        className={`transition-all flex flex-col justify-start items-start ml-5  overflow-hidden ${isRouteAccordionOpen ? 'max-h-auto' : 'max-h-0'}`}
                        aria-labelledby="accordion-collapse-heading-1"
                    >
                      <div className='text-sh-gray2'>
                      This is the total time participants will have to complete the hunt
                      </div>
                      <div className='mt-5 mb-10 w-full grid grid-cols-[55%,40%]'>
                        <div className='w-full'>
                        <input 
                      type="text" 
                      name="route" 
                      id="route" 
                      value={routeTime}
                      onChange={handleRouteTimeChange}
                      className="bg-transparent border text-black border-gray-500 py-4  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-3 focus:outline-none focus:ring-0 focus:border-sh-blue peer " 
                      placeholder="60 MINUTES" 
                    //   value={email}
                    //   onChange={handleEmailChange}
                      />
                        </div>
                        <div className='ml-[5%] w-full'>
                        <button onClick={()=>handleSave("route")} class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base  py-4 text-center ">
            {showSave3Loading ? <Spinner  color="white"  /> : "SAVE"}
                                
                            </button>
                        </div>

                      </div>
{/*                      
                        <div className='w-full flex justify-center items-center'>
                            

                        </div>   */}
                     </div>
                </div>
                {isChange && (
            <div
              className=" fixed inset-0 flex items-center justify-center z-50"
              onClick={closeIsChange}
            >
              
              <div className=" bg-black opacity-50 absolute inset-0"></div>
              <div
                className=" bg-white rounded-3xl md:w-[33rem] w-80  p-8 px-12 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <h2 className="text-black font-semibold text-lg md:w-auto w-60 text-left mb-4">
                  Confirm
                </h2> */}
                <div className="text-left   mt-2 lg:text-xl text-lg font-bold text-black">
                        {videoType == "Welcome" ? "Update Intro Video" : "Update Outro Video"}
                    </div>
                    <div className="grid w-full ">
                        <div className=" mt-5 justify-self-center">
                            <img src={uploadImgUrl} className="lg:w-72 lg:h-40 h-40 w-56 xl:h-40 xl:w-40"></img>
                        </div>
                    </div>
                    <div className="text-left mt-3 lg:text-lg text-sm text-sh-gray">Please upload video, size less than 15 MB</div>
                    <div className="flex ">
                        <label className="flex-col text-sm hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90 rounded-md font-medium cursor-pointer px-3 py-1.5 mt-3 border border-black custom-file-upload">
                            <input
                                type="file"
                                key={key}
                                // accept='.mp4'
                                className="hidden"
                                onChange={handleFileChange}
                                // onClick={handleFileInputClick}
                            />
                            Choose File
                        </label>
                        {initialVideo || selectedFile ? (
                <button
                    onClick={handleClearVideo}
                    className=' mt-3 ml-3 rounded-md bg-sh-cream text text-center py-1.5 px-3 text-sm font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer'
                >
                    Clear
                </button>
            ) : null}
                        <label id="fileLabel" className="ml-1 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3">
                        {initialVideo ? truncateText(initialVideo,15) : "No File Chosen"}
                        </label>
                    </div>
                    <div className="text-left  mt-8 lg:text-lg text-sm text-black font-bold">Update Message</div>

                    <div className='w-full mt-3'>
                        <input 
                      type="text" 
                      name="message" 
                      id="message" 
                      value={message}
                      onChange={handleMessageChange}
                      className="bg-transparent border text-black border-gray-500 py-4  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-3 focus:outline-none focus:ring-0 focus:border-sh-blue peer " 
                      placeholder="Type Here..." 
                      />
                        </div>
                {/* <p className="text-black text-filter-heading md:w-auto mt-5 w-60 text-left">
                  Are you sure you want to delete this question?
                </p> */}
                <div className="flex justify-end mt-10">
                  <button
                    onClick={closeIsChange}
                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                  >
                    Cancel
                  </button>
                  <button
                  onClick={()=>handleSave("change")}
                    className="bg-sh-blue hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-9 px-5 rounded-[9px] py-1 "
                  
                  >
                    {showSave4Loading ? <Spinner /> : "EDIT"}
                  </button>
                </div>
              </div>
            </div>
          )}
                {/* <div className='mx-8 pb-10'>
                                <Pagination
                                    totalRecords={100} // Set the total number of records
                                    recordsPerPage={videoRecordsPerPage}
                                    currentPage={currentVideoPage}
                                    onPageChange={handleVideoPageChange} // Pass the handlePageChange function
                                />
                            </div> */}
                  {/* <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-[22px] font-bold'>Ft. Howell</span>
                        <button onClick={goToAddQuestions} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
                    </div> */}
            </div>
        </div>
    );
}

export default Settings;
