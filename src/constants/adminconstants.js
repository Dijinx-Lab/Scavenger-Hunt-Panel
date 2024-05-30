const BASE_URL = "http://3.143.104.128/api/v1/";
// const BASE_URL = "http://localhost:3000/api/v1/";

const ApiConstants = {
  SIGN_IN: `${BASE_URL}admin/auth/sign-in`,
  SIGN_OUT: `${BASE_URL}admin/auth/sign-out`,
  GET_ALL_TEAM_DETAILS: `${BASE_URL}admin/team/all-details`,
  CREATE_TEAM: `${BASE_URL}admin/team/create`,
  DASHBOARD_SUMMARY: `${BASE_URL}admin/team/dashboard-summary`,
  ALL_CHALLENGES_DETAILS: `${BASE_URL}admin/challenge/all-details`,
  TEAM_DETAILS: `${BASE_URL}admin/team/details?code=`,
  CREATE_CHALLENGE: `${BASE_URL}admin/challenge/create`,
  CHALLENGES_DETAILS: `${BASE_URL}admin/challenge/details?id=`,
  UPDATE_CHALLENGE: `${BASE_URL}admin/challenge/update?id=`,
  CREATE_QUESTION: `${BASE_URL}admin/question/create`,
  QUESTION_DETAILS: `${BASE_URL}admin/question/details?id=`,
  QUESTION_UPDATE: `${BASE_URL}admin/question/update?id=`,
  QUESTION_DELETE: `${BASE_URL}admin/question/delete?id=`,
  SETTINGS_UPDATE: `${BASE_URL}admin/settings/update?id=`,
  SETTINGS_DETAILS: `${BASE_URL}admin/settings/details?id=`,
  UTILITY_UPLOAD: `${BASE_URL}utility/upload/s3`,
  DELETE_CHALLENGE: `${BASE_URL}admin/challenge/delete?id=`,
  CHALLENGES_CHART: `${BASE_URL}admin/team/chart/challenges-completed?filter=`,
  TEAMS_CHART: `${BASE_URL}admin/team/chart/teams-joined?filter=`,
  DELETE_TEAM: `${BASE_URL}admin/team/delete?code=`,
  GET_COURSE: `${BASE_URL}course/details?_id=`,
  EDIT_FACULTY_PASSWORD: `${BASE_URL}faculty/updatebyid/password?_id=`,
  EDIT_PARENT_PASSWORD: `${BASE_URL}parent/updatebyid/password?_id=`,
  EDIT_STUDENT_PASSWORD: `${BASE_URL}student/updatebyid/password?_id=`,
  CREATE_LEAVE: `${BASE_URL}leave/create`,
};

export default ApiConstants;
