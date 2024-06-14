import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import Spinner from '../../components/spinner/spinner';
import QuestionsManager from '../../models/admin/questions/questionshttp/http';
const ManageChallengesTable = ({ currentPage, recordsPerPage, allQuestions, newChallengeId }) => {
  const questionsManager = new QuestionsManager();
  const navigate = useNavigate();
  const [deleteShowLoading, setDeleteShowLoading] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState();

  const [tableData, setTableData] = useState(allQuestions);

  useEffect(() => {
    setTableData(allQuestions);
  }, [allQuestions]);

  const handleViewDetails = (id) => {
    const isViewDetails = true;
    const state = {
      isViewDetails,
      newChallengeId
    };
    navigate("/challenges/edit-questions?_id=" + id, { state });
  }

  const [isDelete, setIsDelete] = useState(false);

  const closeIsDelete = () => {
    setIsDelete(false);
  };
  const openIsDelete = (id) => {
    setDeleteIdx(id);
    setIsDelete(true);
  };

  const handleDelete = async () => {
    setDeleteShowLoading(true);
    try {
      const response = await questionsManager.delete(deleteIdx);
      if (response.success) {
        closeIsDelete();
        setTableData(allQuestions.filter(question => question._id !== deleteIdx));
        const updatedToastMessages = [
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ];
        const state = {
          toastMessages: updatedToastMessages,
        };
        navigate("/challenges/manage?_id=" + newChallengeId, { state });

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
        navigate("/challenges/manage?_id=" + newChallengeId, { state });
      }
    }
    catch (error) {
      const updatedToastMessages = [
        {
          type: "invalid",
          title: "Error",
          body: error.message,
        },
      ];
      const state = {
        toastMessages: updatedToastMessages,
      };
      navigate("/challenges/manage?_id=" + newChallengeId, { state });

    }
    finally {
      setDeleteShowLoading(false);
    }
  };


  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);


  let paddedData = [...currentData];
  while (paddedData.length < 10) {
    paddedData = [...paddedData, { name: '', questions: '', total_score: '', longitude: '', latitude: '', description: '', empty: true }];
  }
  return (
    <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream  rounded-sm ">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className='text-sh-graph-black text-opacity-80'>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block text-base  font-medium leading-none text-sh-graph-black">
                Question
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Challenge Type
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Points
              </p>
            </th>
            <th className="p-4 border border-gray-300 bg-sh-cream">
              <p className="block  text-base text-center font-medium leading-none text-sh-graph-black ">
                Actions
              </p>
            </th>
            {/* <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block  text-base  font-medium leading-none text-sh-graph-black ">
                Delete Challenge
                </p>
              </th> */}

          </tr>
        </thead>
        <tbody>
          {paddedData && paddedData.map((row, index) => (
            <tr key={index} className='text-opacity-50 text-black'>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[38%]`}>

                <p className="block   text-base text-left font-normal leading-normal sh-graph-black">
                  {row.question}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300 w-[12%]`}>
                <p className="block  text-base font-normal leading-normal sh-graph-black">
                  {row.type === 'mcq' ? 'Multiple Choice' :
                    row.type === 'wordjumble' ? 'Word Jumble' :
                      row.type === 'picture' ? 'Picture' :
                        row.type === 'slider' ? 'Slider' : ''}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                <p className="block  text-base font-normal leading-normal sh-graph-black">
                  {row.score}
                </p>
              </td>
              <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
                {/* <p className="block   text-base font-normal leading-normal sh-graph-black"> */}
                <div className='flex w-full'>
                  {!row.empty && (
                    <div className='flex w-full items-center justify-center'>
                      <button onClick={() => handleViewDetails(row._id)} className="py-4 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[90%] text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        VIEW DETAILS
                      </button>
                    </div>
                  )}
                  {!row.empty && (
                    <div className='flex w-full items-center justify-center'>
                      <button onClick={() => openIsDelete(row._id)} className="py-4 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[90%] text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        DELETE
                      </button>
                    </div>
                  )}</div>
              </td>
              {/* <td className={`p-${row.empty ? '6' : '4'} border border-gray-300`}>
              {!row.empty && (
              <button  class=" py-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  DELETE</button>
                )}
              </td> */}
            </tr>
          ))}
          {isDelete && (
            <div
              className=" fixed inset-0 flex items-center justify-center z-50"
              onClick={closeIsDelete}
            >
              <div className=" bg-black opacity-50 absolute inset-0"></div>
              <div
                className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-black font-semibold text-lg md:w-auto w-60 text-left mb-4">
                  Confirm
                </h2>
                <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                  Are you sure you want to delete this question?
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeIsDelete}
                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sh-red hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                    onClick={handleDelete}
                  >
                    {deleteShowLoading ? <Spinner /> : <span>Delete</span>}
                  </button>
                </div>
              </div>
            </div>
          )}
          <tr className="border-b-0">
            <td className="md:py-8 py-5 border-r border-gray-300 w-[100px]"></td>
            <td className="md:py-8 py-5 border-r border-gray-300"></td>
            <td className="md:py-8 py-5 border-r border-gray-300"></td>
            <td className="md:py-8 py-5 border-r border-gray-300"></td>
            <td className="md:py-8 py-5  border-gray-300"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageChallengesTable;