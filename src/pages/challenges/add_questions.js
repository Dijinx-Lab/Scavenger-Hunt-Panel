import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate,useLocation } from "react-router";
import Toast from "../../components/toast/toast";
import QuestionsManager from "../../models/admin/questions/questionshttp/http";
import Spinner from "../../components/spinner/spinner";
import UtilityManager from "../../models/admin/utility/utilityhttp";
function AddQuestions() {
    const questionsManager = new QuestionsManager();
    const utilityManager = new UtilityManager();
    const location = useLocation();
    const { isViewDetails,newChallengeId } = location.state || {};
    const { isFromManageChallenge,managechallengeId } = location.state || {};
    const [questionType, setQuestionType] = useState('');
    const [questionName, setQuestionName] = useState('');
    const [fromDetails, setIsFromDetails] = useState('');
    const [challengeIdState, setChallengeIdState] = useState('');
    
    const [points, setPoints] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [options, setOptions] = useState('');
    const [sliderMin, setSliderMin] = useState('');
    const [sliderMax, setSliderMax] = useState('');
    const [jumbledWord, setJumbledword] = useState('');
    const [answer, setAnswer] = useState('');
    const [picture, setPicture] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const isEdit = location.pathname.includes("/challenges/edit-questions");
    
    const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  
    const searchParams = new URLSearchParams(location.search);
    console.log(newChallengeId);
    let ForchallengeId;
    if(!isEdit){
     ForchallengeId = searchParams.get("_id");

    }
    const challengeId = searchParams.get("_id");
    const handleFileInputClick = () => {
        setSelectedFile(null);
      };
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const fileName = file.name;
          const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp", "svg", "heic"];
          const extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
      
          if (allowedExtensions.includes(extension)) {
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
                body: "This image format is not allowed",
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
          fileLabel.textContent = selectedFile ? selectedFile.name : "No File Chosen";
        }
      }, [selectedFile]);

    const fetchData = async () => {
        if(!challengeId){
          const updatedToastMessages = [
            {
                type: "invalid",
                title: "Error",
                body: "Challenge ID is required",
            },
        ];
        const state = {
            toastMessages: updatedToastMessages,
        };
          navigate("/challenges", {state});
        }
        setShowLoading(true);
        try {
          const response = await questionsManager.get(challengeId);
          if (response.success) {
            setQuestionType(response.data.type);
            setQuestionName(response.data.question);
            setPoints(response.data.score);
            setOptions(response.data.options);
            setSliderMin(response.data.slider_min);
            setSliderMax(response.data.slider_max);
            setJumbledword(response.data.jumbled_word);
            setAnswer(response.data.answer);
            setPicture(response.data.picture);
            // setSelectedFile(response.data.picture);

          } 
          else {
            const updatedToastMessages = [
              {
                  type: "invalid",
                  title: "Error",
                  body: response.message,
              },
          ];
          const state = {
            toastMessages: updatedToastMessages,
        };
            navigate("/challenges", {state });
        
          }
        } catch (e) {
          const updatedToastMessages = [
            {
                type: "invalid",
                title: "Error",
                body: e.message,
            },
        ];
        const state = {
            toastMessages: updatedToastMessages,
        };
          navigate("/challenges", {state});
        
      
        } finally {
          setShowLoading(false);
        }
      };
      useEffect(() => {
        if(isEdit  ){
        fetchData();}
      }, []);
    useEffect(() => {
        if (!isEdit && location.state) {
          setSelectedFile(location.state.selectedFile || '');
          setQuestionType(location.state.questionType || '');
          setQuestionName(location.state.questionName || '');
          setPoints(location.state.points || '');
          setIsFromDetails(location.state.fromDetails || '');
          setChallengeIdState(location.state.newChallengeId || '');
          // window.history.replaceState({}, document.title);
        }
      }, [location.state]);
      useEffect(() => {
        if (location.state) {
          setIsFromDetails(location.state.fromDetails || '');
          // window.history.replaceState({}, document.title);
        }
      }, [location.state]);
      
      // useEffect(() => {
      //   if ( location.state) {
       
      //     setIsFromDetails(location.state.fromDetails || '');
      //     // window.history.replaceState({}, document.title);
      //   }
      // }, [location.state]);
      
    const handleSelectChange = (event) => {
        setQuestionType(event.target.value);
        if (isEdit) {
          setOptions('');
          setSliderMin('');
          setSliderMax('');
          setJumbledword('');
          setAnswer('');
        }
    };
    const handleQuestionChange = (event) => {
        setQuestionName(event.target.value);
        
    };

    const handlePointsChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setPoints(value);
        }
    };
    const navigate = useNavigate();

    const goToQuestionType = () => {
        if(!questionName){
            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: "Question name is required",
                },
              ]);
            return;
        }
        if(!questionType){
            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: "Question type is required",
                },
              ]);
            return;
        }
        if(!points){
            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: "Question Points is required",
                },
              ]);
            return;
        }
        const state = {
          selectedFile: selectedFile || picture,
            questionName,
            questionType,
            points,
            newChallengeId,
            options,
            sliderMin,
            sliderMax,
            jumbledWord,
            answer,
        };
        
        if (questionType === "mcq") {
            if(isEdit){
                navigate("/challenges/edit-questions/multiple?_id="+challengeId, { state });

            }
            else{
                navigate("/challenges/add-questions/multiple?_id="+challengeId, { state });

            }
        } 
        else if (questionType === "slider") {
            if(isEdit){
                navigate("/challenges/edit-questions/slider?_id="+challengeId, { state });

            }
            else{
                navigate("/challenges/add-questions/slider?_id="+challengeId, { state });

            }
        }
         else if (questionType === "picture") {
            if(isEdit){
                navigate("/challenges/edit-questions/photo?_id="+challengeId, { state });

            }
            else{
            navigate("/challenges/add-questions/photo?_id="+challengeId, { state });
                
            }
        } 
        else if (questionType === "wordjumble") {
            if(isEdit){
                navigate("/challenges/edit-questions/word-jumble?_id="+challengeId, { state });

            }
            else{
            navigate("/challenges/add-questions/word-jumble?_id="+challengeId, { state });
                
            }
        }
    };
    // console.log(challengeIdState);
    const goBack = () => {
        if(isViewDetails ){
        navigate("/challenges/manage?_id="+newChallengeId);
        return;
        }
        if(fromDetails ){
          if(isEdit){
            navigate("/challenges/manage?_id="+newChallengeId);
          }
          else{
            navigate("/challenges/manage?_id="+ForchallengeId);
          }
            return;
            }
         if(isFromManageChallenge){
        navigate("/challenges/manage?_id="+managechallengeId);
            return;
        }
        else{
        navigate("/challenges/create");
    }
    };
    const uploadImgUrl = "https://dk9gc53q2aga2.cloudfront.net/assets/Upload_Video_Icon.svg";

    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />
            {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}
            <div className="w-full ">
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
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5 flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>

                <div className="mt-10 mb-20 xl:ml-[5%] ml-[8%] w-[80%] rounded-[20px] h-auto bg-sh-cream">
                    <div className="text-sh-graph-black flex items-start justify-start pt-5 ml-10 font-bold text-xl">
                    {isEdit ? 'Edit Question' : 'Add New Question'}
                    </div>
                    {questionType !== 'picture' && (
                <>
                    <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
                        Question Picture
                    </div>
                    <div className="grid w-full ">
                        <div className=" mt-10 justify-self-center">
                            <img src={uploadImgUrl} className="lg:w-72 lg:h-40 h-40 w-56 xl:h-full xl:w-full"></img>
                        </div>
                    </div>
                    <div className="text-left md:ml-[25%] mt-2 xl:mt-8 lg:text-lg text-sm text-sh-gray">
                      {/* {isEdit? selectedFile:"Please upload picture, size less than 15 MB"} */}
                      Please upload picture, size less than 15 MB

                      </div>
                    <div className="flex md:ml-[25%]">
                        <label className="flex-col text-sm hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90 rounded-md font-medium cursor-pointer px-3 py-1.5 mt-3 border border-black custom-file-upload">
                            <input
                                type="file"
                                // value={selectedFile}
                                className="hidden"
                                onChange={handleFileChange}
                                onClick={handleFileInputClick}
                            />
                           {isEdit ? "Change File" : "Choose File" } 
                        </label>
                        <label id="fileLabel" className="ml-1 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3">
                        {/* {selectedFile ? selectedFile.name : "No File Chosen"} */}
                        { isEdit  && picture ?  picture : selectedFile ? selectedFile.name  : "No File Chosen"}
                        {/* {isEdit? picture ? picture:""} */}
                        </label>
                    </div>
                    </>
            )}
                    <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
                        Question
                    </div>

                    <textarea
                    value={questionName}
                    onChange={handleQuestionChange}
                        placeholder="How many years passed between the construction of Fort Howell and its transfer of ownership to the Hilto Head Island Land Trust?"
                        className="w-[50%] resize-none py-4 lg:h-36 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl  border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    ></textarea>

                    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-[0.63fr,0.4fr] grid-cols-1 gap-6 mt-5 xl:mt-10 ml-10 lg:text-xl text-lg text-black">

                        <div className="order-2 xl:order-1">
                            <label htmlFor="questionType" className="flex text-left">Question Type</label>
                            <select
                                id="questionType"
                                placeholder="Question Type"
                                required
                                value={questionType}
                                onChange={handleSelectChange}
                                className="w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            >
                                <option value="" disabled selected hidden  >Question Type</option>
                                <option value="slider" className="bg-sh-cream  " >Slider</option>
                                <option value="mcq" className="bg-sh-cream">Multiple</option>
                                <option value="picture" className="bg-sh-cream">Photo</option>
                                <option value="wordjumble" className="bg-sh-cream">Word Jumble</option>
                            </select>
                        </div>
                        <div className="order-1 xl:order-2">
                            <label htmlFor="points" className="flex text-left">Points</label>
                            <input
                                type="text"
                                id="points"
                                placeholder="Points"
                                value={points}
                                onChange={handlePointsChange}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                        </div>
                    </div>
                    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 mt-28 grid-cols-1 gap-1 xl:gap-5 xl:gap-x-8 xl:gap-y-8   ml-10 lg:text-xl text-lg text-black">

                        <div className=" flex-col order-2 xl:order-1 mb-6">
                            <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                GO BACK
                            </button></div>
                        <div className=" flex-col order-1 xl:order-2">
                            <button onClick={goToQuestionType} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                NEXT
                            </button></div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddQuestions;