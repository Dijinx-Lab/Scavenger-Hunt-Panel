import ApiConstants from "../../../constants/adminconstants";
class UtilityManager {
    
  async create(params) {
    const url = ApiConstants.UTILITY_UPLOAD;
    const token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
   
    let formData = new FormData();
    formData.append('folder', params.folder);
    formData.append('file', params.file);
      
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
      },
      body: formData,
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

export default UtilityManager;
