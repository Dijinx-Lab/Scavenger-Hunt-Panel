import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import ChallengesManager from "../../models/admin/challenges/challengeshttp/http";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
import UtilityManager from "../../models/admin/utility/utilityhttp";
import imageCompression from 'browser-image-compression';
import { DeleteOutline } from "@mui/icons-material";
function CreateChallenges() {
  const location = useLocation();
  const isEdit = location.pathname.includes("/challenges/edit");

  const challengesManager = new ChallengesManager();
  const utilityManager = new UtilityManager();
  const navigate = useNavigate();

  const goToManageQuestions = () => {
    navigate("/challenges/manage");
  };




  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  
  const [challengeName, setChallengeName] = useState("");
  const [challengeDifficulty, setChallengeDifficulty] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [introVideo, setIntroVideo] = useState(null);
  const [showCreateLoading, setShowCreateLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const challengeId = searchParams.get("_id");
  const [showLoading, setShowLoading] = useState(false);
  const [video, setVideo] = useState('');

  const [challengeData, setChallengeData] = useState({ name: '', latitude: '', longitude: '' });
  const route = "66521318cac9420edc624570";
  const uploadImgUrl = "https://dk9gc53q2aga2.cloudfront.net/assets/Upload_Video_Icon.svg";

  const goBack = () => {
    if (isEdit) {
      navigate("/challenges/manage?_id=" + challengeId);
    }
    else {
      navigate("/challenges");
    }
  };
  const fetchData = async () => {
    if (!challengeId) {
      const updatedToastMessages = [
        {
          type: "invalid",
          title: "Error",
          body: "Challenge ID is required",
        },
      ];
      setToastMessages(updatedToastMessages);
      navigate("/challenges", { state: { toastMessages: updatedToastMessages } });
    }
    setShowLoading(true);
    try {
      const response = await challengesManager.get(challengeId);
      if (response.success) {
        setChallengeData(response.data.challenge);
        setChallengeName(response.data.challenge.name);
        setChallengeDifficulty(response.data.challenge.difficulty);
        setLatitude(response.data.challenge.latitude);
        setLongitude(response.data.challenge.longitude);
        setDescription(response.data.challenge.description);
        setVideo(response.data.challenge.intro_url);
        // setCompletedChallenges(response.data.completed_challenges);
        // setUncompletedChallenges(response.data.uncompleted_challenges);
        // setTotalChallenges(response.data.total_challenges);
        // setAllChallenges(response.data.challenges);
      } else {
        const updatedToastMessages = [
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ];
        setToastMessages(updatedToastMessages);
        navigate("/challenges", { state: { toastMessages: updatedToastMessages } });

      }
    } catch (e) {
      const updatedToastMessages = [
        {
          type: "invalid",
          title: "Error",
          body: e.message,
        },
      ];
      setToastMessages(updatedToastMessages);
      navigate("/challenges", { state: { toastMessages: updatedToastMessages } });

    } finally {
      setShowLoading(false);
    }
  };
  useEffect(() => {
    if (location.pathname.includes("/challenges/edit")) {
      fetchData();
    }
  }, [location.pathname]);

  // const compressVideo = async (introVideo) => {
  //   const video = document.createElement('video');
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');

  //   return new Promise((resolve, reject) => {
  //     video.src = URL.createObjectURL(introVideo);
  //     video.onloadedmetadata = () => {
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;

  //       video.oncanplay = () => {
  //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //         canvas.toBlob(async (blob) => {
  //           try {
  //             const compressedBlob = await imageCompression(blob, {
  //               maxSizeMB: 1,          // Maximum size in MB
  //               maxWidthOrHeight: 1920, // Max width or height
  //               useWebWorker: true,    // Use web worker for faster compression
  //             });
  //             resolve(compressedBlob);
  //           } catch (error) {
  //             reject(error);
  //           }
  //         }, 'video/mp4');
  //       };
  //     };
  //     video.onerror = (error) => reject(error);
  //   });
  // };
  const handleCreateChallenge = async () => {
    if (!challengeName) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Challenge name is required",
        },
      ]);
      return;
    }
    if (!challengeDifficulty) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Challenge difficulty is required",
        },
      ]);
      return;

    }
    if (!latitude) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Latitude is required",
        },
      ]);
      return;

    }
    if (!longitude) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Longitude is required",
        },
      ]);
      return;

    }
    if (!route) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Route is required",
        },
      ]);
      return;

    }
    if (!description) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Description is required",
        },
      ]);
      return;

    }
    setShowCreateLoading(true);

    try {
      const isEdit = location.pathname.includes("/challenges/edit");
      let videoUrl = introVideo;
      if (introVideo && typeof introVideo !== 'string') {
        // const compressedVideo = await compressVideo(introVideo);
        const params = {
          folder: "challenges",
          file: introVideo,
        };
        const videoResponse = await utilityManager.create(params);
        if (videoResponse.success) {
          videoUrl = videoResponse.data.url;
        }
      }
      const params = {
        challengeName: challengeName,
        challengeDifficulty: challengeDifficulty,
        latitude: latitude,
        longitude: longitude,
        route: route,

        description: description, // If you need to send sliderValue as answer
        videoUrl: videoUrl || video, // If you need to send sliderValue as answer
    };
      // const response = await challengesManager.create(
      //   challengeName, challengeDifficulty, latitude, longitude, route, description, videoUrl, isEdit, challengeId);
        const response = await challengesManager.create(params,isEdit,challengeId);
      if (response.success) {
        const updatedToastMessages = [
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ];
        setToastMessages(updatedToastMessages);
        sessionStorage.setItem('toastMessages', JSON.stringify(updatedToastMessages));
        if (isEdit) {
          navigate("/challenges/manage?_id=" + challengeId);
        }
        else {
          navigate("/challenges/manage?_id=" + response.data.challenge._id);

        }

      }
      else {
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
    catch (error) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: error.message,
        },
      ]);
    }
    finally {
      setShowCreateLoading(false);
    }
  }
  const handleLatitudeChange = (e) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setLatitude(value);
    }
  };

  const handleLongitudeChange = (e) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setLongitude(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileLabel = document.getElementById("fileLabel");

    if (file) {
  
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

        if (!validTypes.includes(file.type)) {
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: "This video format is not available.",
                },
            ]);
            e.target.value = ""; // Reset the input
            if (fileLabel) fileLabel.textContent = "No File Chosen";
        } else if (file.size > 15 * 1024 * 1024) {
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: "File size must be less than 15 MB",
                },
            ]);
            e.target.value = ""; // Reset the input
            if (fileLabel) fileLabel.textContent = "No File Chosen";
        } else {
            setIntroVideo(file);
            const fileName = file.name;
            if (fileLabel) fileLabel.textContent = truncateText(fileName, 15);
        }
    } else {
        if (fileLabel) fileLabel.textContent = "No File Chosen";
    }
};
const handleLabelClick = () => {
  const fileInput = document.getElementById("fileInput");
  const fileLabel = document.getElementById("fileLabel");
  if (fileInput) {
      fileInput.value = ""; // Reset the input
  }
  if (fileLabel) {
      fileLabel.textContent = "No File Chosen";
  }
  setIntroVideo(null); // Clear the introVideo state if needed
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
const [key, setKey] = useState(0);
const handleClearVideo = () => {
  setVideo(null);
  setIntroVideo(null);
  const fileLabel = document.getElementById("fileLabel");
  fileLabel.textContent = "No File Chosen";
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = "";
  setKey((prevKey) => prevKey + 1);
};
  return (
    <div className="flex-col w-full overflow-x-hidden ">
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner size={50} stroke={3} speed={1} color="black" />
        </div>
      )}
      <PlainNavbar />

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
        <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
          <span className="text-sa-maroon text-left  text-lg md:text-xl">
            Here you can easily manage challenges.
          </span>
        </div>
        <div className="  mt-10 mb-10  xl:ml-[5%] ml-[8%]  w-[80%] rounded-[20px] h-[84rem] xl:h-[80rem] bg-sh-cream">
          <div className="text-sh-graph-black flex items-start justify-start pt-5 ml-10 font-bold text-xl"> Add New Challenge</div>


          <div className="text-left md:ml-[25%] mt-10 lg:text-xl text-lg text-black">Challenge Name</div>
          <input
            type="text"
            placeholder="Challenge Name"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue  focus:outline-none focus:ring-primary-300"
          />
          <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-1 grid-cols-1 gap-6 mt-5 xl:mt-8 ml-10 lg:text-xl text-lg text-black">

            <div className="order-2 xl:order-1">
              <label htmlFor="questionType" className="flex text-left">Challenge Difficulty</label>
              <div className="relative">
                <select
                  id="questionType"
                  placeholder="Question Type"
                  required
                  value={challengeDifficulty}
                  onChange={(e) => setChallengeDifficulty(e.target.value)}
                  className="appearance-none w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                >
                  <option value="" disabled selected hidden  >Challenge Difficulty</option>
                  <option value="Easy" className="bg-sh-cream  " >Easy</option>
                  <option value="Medium" className="bg-sh-cream">Medium</option>
                  <option value="Hard" className="bg-sh-cream">Hard</option>
                </select>
                <svg className="w-5 h-5 absolute top-[60%] right-3 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

          </div>
          <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Latitude</div>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            // onChange={(e) => setLatitude(e.target.value)}
            onChange={handleLatitudeChange}
            className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
          />
          <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Longitude</div>
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            // onChange={(e) => setLongitude(e.target.value)}
            onChange={handleLongitudeChange}
            className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400  focus:border-sh-blue focus:outline-none focus:ring-primary-300"
          />
          <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Description</div>
          <textarea
            placeholder="Apart from its Civil War history, Hilton Head Island boasts remarkable landscapes and captivating birdlife. Explore the Shorelinebirds informational signs to delve deeper and conquer your next set of challenges!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // onChange={handleLongitudeChange}
            className="w-[50%] resize-none py-4 lg:h-36 h-40 flex-col items-center justify-center text-base bg-transparent mt-3 px-3 rounded-xl  border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
          ></textarea>
          <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
            Intro Video (Optional)
          </div>
          <div className="grid w-full ">
            <div className=" mt-10 justify-self-center">
              <img src={uploadImgUrl} className="lg:w-72 lg:h-40 h-40 w-56 xl:h-full xl:w-full"></img>
            </div>
          </div>
          <div className="text-left md:ml-[25%] mt-2 xl:mt-8 lg:text-lg text-sm text-sh-gray">Please upload video, size less than 15 MB</div>
          <div className="flex md:ml-[25%]">
            <label 
            // onClick={handleLabelClick} 
            className="flex-col text-sm hover:scale-105 transition-all duration-200 ease-in-out hover:opacity-90 rounded-md font-medium cursor-pointer px-3 py-1.5 mt-3 border border-black custom-file-upload">
              {/* <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const fileLabel = document.getElementById("fileLabel");

                  if (!["video/mp4", "video/avi", "video/mov", "video/wmv", "video/mkv", "video/flv", "video/webm", "video/m4v", "video/mpg", "video/mpeg", "video/3gp"].includes(file.type)) {
                    if (file) {
                      //{
                      setToastMessages([
                        ...toastMessages,
                        {
                          type: "invalid",
                          title: "Error",
                          body: "This video format is not available.",
                        },
                      ]);
                      e.target.value = ""; // Reset the input
                      if (fileLabel) fileLabel.textContent = "No File Chosen";
                    } else if (file.size > 15 * 1024 * 1024) {
                      setToastMessages([
                        ...toastMessages,
                        {
                          type: "invalid",
                          title: "Error",
                          body: "File size must be less than 15 MB",
                        },
                      ]);
                      e.target.value = ""; // Reset the input
                      if (fileLabel) fileLabel.textContent = "No File Chosen";
                    } else {
                      setIntroVideo(file);
                      const fileName = file.name;
                      if (fileLabel) fileLabel.textContent = fileName;
                    }
                  } else {
                    if (fileLabel) fileLabel.textContent = "No File Chosen";
                  }
                }}
              /> */}
              <input
               key={key} 
    type="file"
    className="hidden"
    onChange={handleFileChange}
    // onChange={(e) => {
    //     const file = e.target.files[0];
    //     const fileLabel = document.getElementById("fileLabel");

    //     if (file) {
    //       console.log("File selected:", file);
    //       console.log("File type:", file.type);
    //       console.log("File size:", file.size);
    //         const validTypes = [
    //             "video/mp4",
    //             "video/avi",
    //             "video/mov",
    //             "video/wmv",
    //             "video/mkv",
    //             "video/flv",
    //             "video/webm",
    //             "video/m4v",
    //             "video/mpg",
    //             "video/mpeg",
    //             "video/3gp",
    //             "video/quicktime",
    //             "video/3gpp", // Added for .3gp
    //             "video/x-msvideo", // Added for .avi
    //             "video/x-flv", // Added for .flv
    //             "video/x-matroska", // Added for .mkv
    //             "video/x-ms-wmv", // Added for .wmv
    //             "video/ogg", // Added for .ogv
    //         ];

    //         if (!validTypes.includes(file.type)) {
              
    //             setToastMessages([
    //                 ...toastMessages,
    //                 {
    //                     type: "invalid",
    //                     title: "Error",
    //                     body: "This video format is not available.",
    //                 },
    //             ]);
    //             e.target.value = ""; // Reset the input
    //             if (fileLabel) fileLabel.textContent = "No File Chosen";
    //         } else if (file.size > 15 * 1024 * 1024) {
    //             setToastMessages([
    //                 ...toastMessages,
    //                 {
    //                     type: "invalid",
    //                     title: "Error",
    //                     body: "File size must be less than 15 MB",
    //                 },
    //             ]);
    //             e.target.value = ""; // Reset the input
    //             if (fileLabel) fileLabel.textContent = "No File Chosen";
    //         } else {
    //             setIntroVideo(file);
    //             const fileName = file.name;
    //             if (fileLabel) fileLabel.textContent = fileName;
    //         }
    //     } else {
    //         if (fileLabel) fileLabel.textContent = "No File Chosen";
    //     }
    // }}
/>

              {/* <input
                                type="file"
                                accept=".mp4"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const fileName = file?.name || "No File Chosen";
                                    const fileLabel = document.getElementById("fileLabel");

                                    if (file && file.type !== "video/mp4") {
                                        setToastMessages([
                                            ...toastMessages,
                                            {
                                                type: "invalid",
                                                title: "Error",
                                                body: "Only .mp4 files are allowed!",
                                            },
                                        ]);
                                        e.target.value = ""; // Reset the input
                                        if (fileLabel) fileLabel.textContent = "No File Chosen";
                                    } else {
                                        if (fileLabel) fileLabel.textContent = fileName;
                                    }
                                }}
                            /> */}
              Choose File
            </label>
            
            {video || introVideo ? (
                <button
                    onClick={handleClearVideo}
                    className=' mt-3 ml-3 rounded-md bg-sh-cream text text-center py-1.5 px-3 text-sm font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer'
                >
                    Clear
                </button>
            ) : null}
          {/* <div className="py-1.5 text-sm mt-3 ml-3 px-3 rounded-md  text-sh-red border border-sh-red cursor-pointer">
              <DeleteOutline className="text-sh-red cursor-pointer ml-0 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90" width={16} height={16} />
              <button
                // onClick={openIsDelete}
                //  className=' w-full mt-3 ml-3 rounded-md bg-sh-cream text text-center py-1.5 px-3  text-sm font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer  '
                className="ml-1 text-sm"
              >
                Clear
              </button>
              

            </div> */}
            {/* <label id="fileLabel" className="text-left whitespace-normal w-[70%] break-words ml-2 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3">
              {isEdit && video ? video : "No File Chosen"}
            </label> */}
             <label
            id="fileLabel"
            className="text-left whitespace-normal w-[50%] break-words ml-2 text-sm text-gray-500 rounded-md font-medium px-3 py-1.5 mt-3"
        >
             {isEdit && video ? truncateText(video, 15) : 'No File Chosen'}
        </label>
              {/* {video? <DeleteOutline className="text-sh-red cursor-pointer ml-2 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90" width={16} height={16} />:""} */}

          </div>
          <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-1 xl:gap-5 xl:gap-x-8 xl:gap-y-8 mt-10 ml-10 lg:text-xl text-lg text-black">

            <div className=" flex-col order-2 xl:order-1">
              <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                GO BACK
              </button></div>
            <div className=" flex-col order-1 xl:order-2">
              <button onClick={handleCreateChallenge} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {showCreateLoading ? <Spinner color="white" /> : location.pathname.includes("/challenges/edit") ? "EDIT CHALLENGE" : "CREATE CHALLENGE"}
              </button>
            </div>
          </div>


        </div>

      </div>

    </div>
  )
}

export default CreateChallenges;