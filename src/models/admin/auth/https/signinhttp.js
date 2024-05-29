import ApiConstants from "../../../../constants/adminconstants.js";
import {BaseResponse} from '../authmodels/signinmodel.js';

class HttpManager {
    async login(email, password) {
      const url = ApiConstants.SIGN_IN;
      const params = {
        email: email,
        password: password,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.status === 401) {
          localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminToken");
          
          localStorage.removeItem("adminEmail");
          sessionStorage.removeItem("adminEmail");
          localStorage.removeItem("adminName");
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
  }

export default HttpManager;