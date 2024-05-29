import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate,useLocation } from "react-router";
import QuestionsManager from "../../models/admin/questions/questionshttp/http";
import Spinner from "../../components/spinner/spinner";
function Photo() {
    const questionsManager = new QuestionsManager();
    const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  

    const location = useLocation();
    const isEdit = location.pathname.includes("/challenges/edit-questions");

    const searchParams = new URLSearchParams(location.search);
    const challengeId = searchParams.get("_id");
    const { selectedFile,questionName, questionType, points, newChallengeId, options, sliderMin, sliderMax, jumbledWord, answer } = location.state || {};

    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    // const [answer, setAnswer] = useState(initialAnswer || '');
    // const [jumbledWord, setJumbledword] = useState(initialJumbledWord || '');

    const handleAddQuestion = async () => {
        
        setShowLoading(true);
        try{
            const params = {
                question: questionName,
                type: questionType,
                score: points,
                // challenge: challengeId,
              };
              if (!isEdit) {
                params.challenge = challengeId;
              }          
                const response = await questionsManager.create(params,challengeId,isEdit)
                if(response.success){
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
                if(isEdit){
                navigate("/challenges/manage?_id="+newChallengeId,{state});
                }
                else{
                    navigate("/challenges/manage?_id="+challengeId,{state});

                }

            }
            else{
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
        catch(error){
            setToastMessages([
                ...toastMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: error.message,
                },
              ]);
        }
        finally{
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
        if(isEdit){
            navigate("/challenges/edit-questions?_id="+challengeId,{state});
            }
            else{
                navigate("/challenges/add-questions?_id="+challengeId,{state});
            }
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

            <div className="w-full ">
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
                <div className="  mt-10 mb-20  xl:ml-[5%] ml-[8%]  w-[80%] rounded-[20px] h-auto  bg-sh-cream">
                <div className="text-black flex items-start justify-start pt-5  xl:ml-[4%] ml-[6%] font-bold text-xl">
        Question
    </div>
<div className=" flex items-start justify-start text-sh-gray text-left pt-5 xl:ml-[4%] ml-[6%]  text-xl">
{capitalizeFirstLetter(questionName)}
    </div>
    <div className="xl:ml-[4%] ml-[6%] text-left grid md:grid-cols-[25%,30%,30%] xl:grid-cols-[20%,25%,25%] md:mt-12">
<span className="text-left text-xl  font-bold">Question Type</span>
<span className="text-left text-xl  ml-[10%] font-bold">Question Score</span>
{/* <span className="text-left text-xl  ml-[10%] font-bold">Attached Image</span> */}
</div>
<div className="xl:ml-[4%] ml-[6%] text-left grid  md:grid-cols-[25%,30%,30%] xl:grid-cols-[20%,25%,25%] md:mt-4">
<span className="text-left text-xl   font-bold">{capitalizeFirstLetter(questionType=="picture"?"Picture":"")}
</span>
<span className="text-left text-xl  ml-[10%] font-bold">{points}</span>
{/* <span 
//  onClick={() => window.open(videoUrl, '_blank')} 
 className="text-left text-xl  ml-[10%] underline font-bold text-sh-blue cursor-pointer">VIEW</span> */}

</div>
              
                        <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-2  xl:gap-x-8 xl:gap-y-8 mt-20 ml-10 lg:text-xl text-lg text-black">

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

export default Photo;