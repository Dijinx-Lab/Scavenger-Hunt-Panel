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

  async create(name,difficulty,latitude,longitude,route,description,intro_url,isEdit, id) {
  console.log(intro_url);
    let url;
    let method;
    if(isEdit) {
      url = ApiConstants.UPDATE_CHALLENGE+id;
      method = 'PUT';
    }
    else{
      url = ApiConstants.CREATE_CHALLENGE;
      method = 'POST';
    }
    const params = {
        name: name,
        difficulty: difficulty,
        latitude: latitude,
        longitude: longitude,
        route: route,
        description: description,
        intro_url: intro_url,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
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
