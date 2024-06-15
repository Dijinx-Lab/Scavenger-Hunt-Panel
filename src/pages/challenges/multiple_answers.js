import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate, useLocation } from "react-router";
import QuestionsManager from "../../models/admin/questions/questionshttp/http";
import Spinner from "../../components/spinner/spinner";
import UtilityManager from "../../models/admin/utility/utilityhttp";
import Toast from "../../components/toast/toast";
function MultipleType() {
    const questionsManager = new QuestionsManager();
    const utilityManager = new UtilityManager();

    const location = useLocation();
    const isEdit = location.pathname.includes("/challenges/edit-questions");
    const [showLoading, setShowLoading] = useState(false);
    const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  

    const searchParams = new URLSearchParams(location.search);
    const challengeId = searchParams.get("_id");
    const { selectedFile, questionName, questionType, points, newChallengeId, options: initialOption, sliderMin, sliderMax, jumbledWord, answer: initialAnswer } = location.state || {};

    // const { questionName, questionType, points } = location.state || {};
    const [answer1, setAnswer1] = useState(initialOption[0] || '');
    const [answer2, setAnswer2] = useState(initialOption[1] || '');
    const [answer3, setAnswer3] = useState(initialOption[2] || '');
    const [answer4, setAnswer4] = useState(initialOption[3] || '');
    const [correctAnswer, setCorrectAnswer] = useState(initialAnswer || '');

    const navigate = useNavigate();

    const handleAddQuestion = async () => {

        // navigate("/challenges/add-questions/multiple");
        setShowLoading(true);
        try {
            let imageUrl = selectedFile;
            if (typeof selectedFile !== 'string') {
                // const compressedVideo = await compressVideo(introVideo);
                const params = {
                    folder: "questions",
                    file: selectedFile,
                };
                const imageResponse = await utilityManager.create(params);
                if (imageResponse.success) {
                    imageUrl = imageResponse.data.url;
                }
                else {
                    setToastMessages([
                        ...toastMessages,
                        {
                            type: "invalid",
                            title: "Error",
                            body: imageResponse.message,
                        },
                    ]);
                }
            }
            const options = [answer1, answer2, answer3, answer4];
            const params = {
                question: questionName,
                type: questionType,
                score: points,
                picture: imageUrl,

                // challenge: challengeId,
                options: options,
                answer: correctAnswer, // If you need to send sliderValue as answer
            };
            if (!isEdit) {
                params.challenge = challengeId;
            }
            const response = await questionsManager.create(params, challengeId, isEdit)
            if (response.success) {
                const updatedToastMessages = [
                    {
                        type: "success",
                        title: "Success",
                        body: response.message,
                    },
                ];

                // Update the state to include toast messages
                // setToastMessages(updatedToastMessages)
                const state = {
                    toastMessages: updatedToastMessages,
                };

                if (isEdit) {
                    navigate("/challenges/manage?_id=" + newChallengeId, { state });
                }
                else {
                    navigate("/challenges/manage?_id=" + challengeId, { state });

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
            setShowLoading(false);
        }
    };
    const goBack = () => {
        const fromDetails = true;

        const state = {
            selectedFile,
            questionName,
            questionType,
            points,
            fromDetails,
            newChallengeId
        };
        if (isEdit) {
            navigate("/challenges/edit-questions?_id=" + challengeId, { state });
        }
        else {
            navigate("/challenges/add-questions?_id=" + challengeId, { state });
        }
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };
    const handleOpenFile = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            window.open(fileURL, '_blank');
        }
    };
    return (
        <div className="flex-col w-full overflow-x-hidden ">
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

                <div className="mt-10 mb-20 xl:ml-[5%] ml-[8%] w-[80%] rounded-[20px] h-auto bg-sh-cream">
                    <div className="text-sh-graph-black flex items-start justify-start pt-5  xl:ml-[4%] ml-[6%]  font-bold text-xl">
                        Question
                    </div>
                    <div className=" flex items-start justify-start text-sh-gray text-left pt-5 xl:ml-[4%] ml-[6%]  text-xl">
                        {capitalizeFirstLetter(questionName)}

                    </div>
                    <div className="xl:ml-[4%] ml-[6%] text-left grid md:grid-cols-[25%,30%,30%] xl:grid-cols-[20%,25%,25%] md:mt-12">
                        <span className="text-left text-xl  font-bold">Question Type</span>
                        <span className="text-left text-xl  ml-[10%] font-bold">Question Score</span>
                        <span className="text-left text-xl  ml-[10%] font-bold">Attached Image</span>
                    </div>
                    <div className="xl:ml-[4%] ml-[6%] text-left grid  md:grid-cols-[25%,30%,30%] xl:grid-cols-[20%,25%,25%] md:mt-4">
                        <span className="text-left text-xl   font-bold">{capitalizeFirstLetter(questionType == "mcq" ? "Multiple Choice" : "")}
                        </span>
                        <span className="text-left text-xl  ml-[10%] font-bold">{points}</span>
                        <span
                            //  onClick={() => window.open(videoUrl, '_blank')} 
                            onClick={handleOpenFile}
                            className="text-left text-xl  ml-[10%] underline font-bold text-sh-blue cursor-pointer ">VIEW</span>

                    </div>
                    <div className="mt-8 text-sh-graph-black xl:ml-[4%] ml-[6%]  flex items-start justify-start pt-5 font-bold text-xl">
                        Answer
                    </div>

                    {/* <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
                        Question</div>
                        
                        <textarea
    placeholder="How many years passed between the construction of Fort Howell and its transfer of ownership to the Hilto Head Island Land Trust?"
    className="w-[50%] resize-none py-4 lg:h-32 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl  border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
></textarea> */}

                    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-2 md:grid-cols-1 gap-6 lg:gap-x-16 lg:gap-y-8 mt-10 ml-10 lg:text-xl text-lg text-black">

                        <div>
                            <label htmlFor="answer1" className="flex text-left">Answer 1</label>
                            <input
                                type="text"
                                id="answer1"
                                placeholder="Answer 1"
                                value={answer1}
                                onChange={(e) => setAnswer1(e.target.value)}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="answer2" className="flex text-left">Answer 2</label>
                            <input
                                type="text"
                                id="answer2"
                                placeholder="Answer 2"
                                value={answer2}
                                onChange={(e) => setAnswer2(e.target.value)}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="answer3" className="flex text-left">Answer 3</label>
                            <input
                                type="text"
                                id="answer3"
                                placeholder="Answer 3"
                                value={answer3}
                                onChange={(e) => setAnswer3(e.target.value)}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="answer4" className="flex text-left">Answer 4</label>
                            <input
                                type="text"
                                id="answer4"
                                placeholder="Answer 4"
                                value={answer4}
                                onChange={(e) => setAnswer4(e.target.value)}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                        </div>
                    </div>
                    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-1 md:grid-cols-1 gap-8 lg:gap-12 lg:mt-10 mt-6 ml-10 lg:text-xl text-lg text-black">

                        <div className="lg:w-[50%] w-full  lg:justify-self-center ">
                            <label htmlFor="questionType" className="flex text-left">Correct Answer</label>
                            <select
                                id="questionType"
                                placeholder="Question Type"
                                required
                                value={correctAnswer}
                                onChange={handleCorrectAnswerChange}
                                className="w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            >
                                <option value="" disabled selected hidden  >Correct Answer</option>
                                <option value={answer1} className="bg-sh-cream  " >1</option>
                                <option value={answer2} className="bg-sh-cream">2</option>
                                <option value={answer3} className="bg-sh-cream">3</option>
                                <option value={answer4} className="bg-sh-cream">4</option>
                            </select>
                        </div></div>

                    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-2  xl:gap-x-8 xl:gap-y-8 mt-28 ml-10 lg:text-xl text-lg text-black">

                        <div className=" flex-col order-2 xl:order-1 mb-6">
                            <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                GO BACK
                            </button></div>
                        <div className=" flex-col order-1 xl:order-2">
                            <button onClick={handleAddQuestion} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {showLoading ? <Spinner color="white" /> : isEdit ? "EDIT QUESTION" : "ADD QUESTION"}
                            </button></div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MultipleType;