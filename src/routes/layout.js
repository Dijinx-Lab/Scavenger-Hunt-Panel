import "../App.css";
import React, { useState, useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import MultipleType from "../pages/challenges/multiple_answers";
import Login from "../pages/login";
import Sidebar from "../components/sidebar/sidebar";
import DashBoard from "../pages/dashboard/dashboard";
import PlainNavbar from "../components/navbar/navbar";
import Challenges from "../pages/challenges/challenges";
import Teams from "../pages/teams/teams";
import CreateChallenges from "../pages/challenges/create_challenge";
import ManageChallenges from "../pages/challenges/manage_challenges";
import AddQuestions from "../pages/challenges/add_questions";
import WordJumble from "../pages/challenges/word_jumble";
import LocationDashboard from "../pages/locations/dashboard";
import AddLocation from "../pages/locations/add_location";
import Uploads from "../pages/uploads/uploads";
import Slider from "../pages/challenges/slider";
// function ResetPasswordRoute() {
//   return <ResetPassword />;
// }
// function ChangePasswordRoute() {
//   return <ChangePassword />;
// }
function Layout() {
  const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const showSidebar = [
    "/dashboard",
    "/teams",
    "/challenges",
    "/locations",
    "/locations/add",
    "/uploads",
    "/challenges/create",
    "/challenges/manage",
    "/challenges/add-questions",
    "/challenges/add-questions/multiple",
    "/challenges/add-questions/slider",
    "/challenges/add-questions/photo",
    "/challenges/add-questions/word-jumble",
  ].includes(location.pathname);

  return (
    // <div className="App w-full  h-screen" >
    //   <div className=" flex-col">
    //   {showSidebar && <PlainNavbar />}
    //     <div className="flex-col ">
    //       <div className="App-content ">
    //     {showSidebar && <Sidebar />}

    //         <Routes>
    //           <Route path="/" element={<Login />} />
    //           <Route path="/dashboard" element={<DashBoard />} />
    //           <Route path="/challenges" element={<Challenges />} />
    //           <Route path="/teams" element={<Teams />} />

    //         </Routes>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div className="App   h-screen" >
      {/* <div className=" flex-col"> */}
      {showSidebar && <Sidebar />}
      {/* {showSidebar && <PlainNavbar />} */}
        {/* <div className="flex-col h-screen"> */}
          <div className="App-content w-full ">
       

            <Routes>
            {/* <Route path="/" element={<Navigate to={adminToken ? '/dashboard' : '/login'} />} /> */}
            <Route path="/" element={<Login />} />

              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/challenges/create" element={<CreateChallenges />} />
              <Route path="/challenges/manage" element={<ManageChallenges />} />
              <Route path="/challenges/add-questions" element={<AddQuestions />} />
              <Route path="/challenges/add-questions/multiple" element={<MultipleType />} />
              <Route path="/challenges/add-questions/word-jumble" element={<WordJumble />} />
              <Route path="/challenges/add-questions/slider" element={<Slider />} />
              <Route path="/challenges/add-questions/photo" />
              <Route path="/locations" element={<LocationDashboard />}/>
              <Route path="/locations/add" element={<AddLocation />}/>
              <Route path="/uploads" element={<Uploads />}/>
              

            </Routes>
          </div>
        {/* </div> */}
      {/* </div> */}
      {/* <div className="App w-full  h-screen" >
      <div className="w-full flex-col">
      {showSidebar && <PlainNavbar />}
        <div className="flex ">
        {showSidebar && <Sidebar />}
          <div className="App-content pp-content flex-grow overflow-auto">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/teams" element={<Teams />} />

            </Routes>
          </div>
        </div>
      </div>

    </div> */}
     {/* <div className="App w-full h-screen flex">
    {showSidebar && <Sidebar  />}
   <div className=" flex-col flex-grow">
     {showSidebar && <PlainNavbar />}
    <div className="flex  overflow-x-auto overflow-y-auto">
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/teams" element={<Teams />} />
       </Routes>
   </div>
  </div>
 </div> */}
    </div>
  );
}

export default Layout;
