import ApiConstants from "../../../../constants/adminconstants.js";

class SettingsManager {
    async get() {
    const route = "66521318cac9420edc624570";
        const  url = ApiConstants.SETTINGS_DETAILS+route;
    
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
  async create(params) {
    const route = "66521318cac9420edc624570";
    const url = ApiConstants.SETTINGS_UPDATE+route;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
   
    let requestParams = {
        terms_and_conditions: params.terms_and_conditions,
        privacy_policy: params.privacy_policy,
        total_time:params.routeTime,
        intro_message:params.intro_message,
        intro_video:params.intro_video,
        outro_message:params.outro_message,
        outro_video:params.outro_video,
      };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
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

export default SettingsManager;
