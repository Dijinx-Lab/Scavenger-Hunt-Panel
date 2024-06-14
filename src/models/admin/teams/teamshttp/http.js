import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse,BaseResponse } from "../teamsmodel/model.js";

class TeamsManager {
  async getAll(team_code) {
    let url;
    if(team_code){
      url = ApiConstants.TEAM_DETAILS+team_code;
    }
    else{
     url = ApiConstants.GET_ALL_TEAM_DETAILS;
    }
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

  async create(name) {
    const url = ApiConstants.CREATE_TEAM;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    const params = {
        name: name,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(params),
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
        return new BaseResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async delete(code) {
    const url = ApiConstants.DELETE_TEAM+code;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");

    try {
      const response = await fetch(url, {
        method: "DELETE",
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

export default TeamsManager;
