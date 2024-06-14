import ApiConstants from "../../../../constants/adminconstants.js";

class QuestionsManager {
  async get(id) {
    // let url;
    // if(team_code){
    //   url = ApiConstants.TEAM_DETAILS+team_code;
    // }
    // else{
    //  url = ApiConstants.GET_ALL_TEAM_DETAILS;
    // }
    const  url = ApiConstants.QUESTION_DETAILS+id;

    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
      });

      if (response.status === 401) {
        
        window.location.href = "/";
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

  async create(params,challengeId,isEdit) {
    let method;
    let url;
    if(isEdit) {
      url = ApiConstants.QUESTION_UPDATE+challengeId;
      method = 'PUT';
    }
    else{
      url = ApiConstants.CREATE_QUESTION;
      method = 'POST';
    }
    // const url = ApiConstants.CREATE_QUESTION;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");

    let requestParams = {
      question: params.question,
      type: params.type,
      score: params.score,
      challenge: params.challenge,
    };
    
    // Conditionally add parameters to the requestParams object
    if (params.answer) {
      requestParams.answer = params.answer;
    }
    if (params.options) {
      requestParams.options = params.options;
    }
    if (params.picture) {
      requestParams.picture = params.picture;
    }
    if (params.jumbled_word) {
      requestParams.jumbled_word = params.jumbled_word;
    }
    if (params.slider_min) {
      requestParams.slider_min = params.slider_min;
    }
    if (params.sliderMax) {
      requestParams.slider_max = params.slider_max;
    }

    

    try {
      const response = await fetch(url, {
        method: method,  
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
        return(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async delete(id) {
    const url = ApiConstants.QUESTION_DELETE+id;
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

export default QuestionsManager;
