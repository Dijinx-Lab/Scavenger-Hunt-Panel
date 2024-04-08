import React, { useState } from 'react';
import Spinner from '../../components/spinner/spinner';
const CreatedAccounts = ({ currentPage, recordsPerPage }) => {

    const [tableData, setTableData] = useState([
        {
          name: 'Team Unicorn',
          id: 'ESCO154-5571',
          email: 'random@gmail.com',
          
        },
        {
            name: 'Team Unicorn',
            id: 'ESCO154-5571',
            email: 'random@gmail.com',
            
          },
        // Add more data objects as needed
      ]);
      
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      const currentData = tableData.slice(startIndex, endIndex);


      const [passwordIdx, setPasswordIdx] = useState(0);
      const [isPassword, setIsPassword] = useState("");
  const [passwordShowLoading, setPasswordShowLoading] = useState(false);
    
      const openInfoPopup = (id) => {
        setPasswordIdx(id);
        setIsPassword(true);
      };
      const closeIsPassword = () => {
        setIsPassword(false);
      };
    return (
      <div className="relative  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-sh-cream shadow-md rounded-xl bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className=" block font-sans text-base  font-medium leading-none text-sh-graph-black">
                  Name
                </p>
              </th>
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                  ID
                </p>
              </th>
             
              <th className="p-4 border border-gray-300 bg-sh-cream">
                <p className="block font-sans text-base  font-medium leading-none text-sh-graph-black ">
                  Email
                </p>
              </th>
              
            </tr>
          </thead>
          <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td className="p-4 border border-gray-300">
                <p   onClick={openInfoPopup} className="cursor-pointer block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.name}
                </p>
              </td>
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.id}
                </p>
              </td>
            
              <td className="p-4 border border-gray-300">
                <p className="block font-sans text-base font-normal leading-normal sh-graph-black">
                  {row.email}
                </p>
              </td>
            </tr>
          ))}
           {isPassword && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeIsPassword}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-sh-cream rounded-xl md:w-[32rem] w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-sa-maroon text-center text-xl md:text-2xl  font-bold md:w-auto w-60  mb-12">
              User Information
              </h2>
              <p className="text-black font-medium  mb-2 text-filter-heading md:w-auto w-60 text-left">
                Username
              </p>
              <input
  type="text"
  placeholder="User 1"
  className="w-full text-base bg-transparent mb-6 px-3 rounded-xl py-3 border border-gray-400  focus:outline-none focus:ring-primary-300"
/>

<p className="text-black font-medium  mb-2 text-filter-heading md:w-auto w-60 text-left">
                User Email
              </p>
              <input
  type="text"
  placeholder="mailrandom@mail.com"
  className="w-full text-base bg-transparent mb-6 px-3 rounded-xl py-3 border border-gray-400  focus:outline-none focus:ring-primary-300"
/>
<p className="text-black font-medium  mb-2 text-filter-heading md:w-auto w-60 text-left">
                User Team
              </p>
              <input
  type="text"
  placeholder="N/A (Enter ID of team)"
  className="w-full text-base bg-transparent mb-4 px-3 rounded-xl py-3 border border-gray-400  focus:outline-none focus:ring-primary-300"
/>

       
             
              <div className=" mt-6">
                
                <button
                  className="bg-sh-blue w-full md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-8 px-7 rounded-[9px] py-3.5 "
                  
                >
                  {passwordShowLoading ? <Spinner /> : <span>SAVE</span>}
                </button>
              </div>
               </div>
            </div>
        )}
          <tr className="border-b-0">
                    <td className="md:py-8 py-5 border-r border-gray-300 w-[100px]"></td>
                    <td className="md:py-8 py-5 border-r border-gray-300"></td>
                    <td className="md:py-8 py-5  border-gray-300"></td>
                  </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CreatedAccounts;