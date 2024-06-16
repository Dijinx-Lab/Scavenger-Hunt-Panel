import ApiConstants from "../../../../constants/adminconstants.js";

class ChallengesManager {
  async get(id) {
    let url;
    if (id){
      url = ApiConstants.CHALLENGES_DETAILS+id;

    }else{
      url = ApiConstants.ALL_CHALLENGES_DETAILS;

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

  async create(params,isEdit,challengeId) {
    let url;
    let method;
    if(isEdit) {
      url = ApiConstants.UPDATE_CHALLENGE+challengeId;
      method = 'PUT';
    }
    else{
      url = ApiConstants.CREATE_CHALLENGE;
      method = 'POST';
    }
    let requestParams = {
      name: params.challengeName,
      difficulty: params.challengeDifficulty,
      latitude: params.latitude,
      longitude: params.longitude,
      route: params.route,
      description: params.description,
     
    };
    if (params.intro_url) {
      requestParams.answer = params.intro_url;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
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
        console.log(responseBody);
        return responseBody;
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async delete(id) {
    const url = ApiConstants.DELETE_CHALLENGE+id;
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

export default ChallengesManager;
