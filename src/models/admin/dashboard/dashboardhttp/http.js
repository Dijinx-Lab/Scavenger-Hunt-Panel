import ApiConstants from "../../../../constants/adminconstants.js";

class DashboardManager {
  async get() {
    const url = ApiConstants.DASHBOARD_SUMMARY;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
      });

      if (response.status === 401) {
        
    localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminName");
        window.location.href = "/";
        return;
      }
    

      if (response.ok) {
        const responseBody = await response.json();
        return (responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async getChallengesChart(filter) {
    const url = ApiConstants.CHALLENGES_CHART+filter;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
      });

      if (response.status === 401) {
        
    localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminName");
        window.location.href = "/";
        return;
      }
    

      if (response.ok) {
        const responseBody = await response.json();
        return (responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async getTeamsChart(filter) {
    const url = ApiConstants.TEAMS_CHART+filter;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
      });

      if (response.status === 401) {
        
    localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminName");
        window.location.href = "/";
        return;
      }
    

      if (response.ok) {
        const responseBody = await response.json();
        return (responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

 
}

export default DashboardManager;
