export class TeamData {
    constructor({ _id, name, team_code, score, active_challenge, completed_challenges, fcm_token }) {
      this._id = _id;
      this.name = name;
      this.team_code = team_code;
      this.score = score;
      this.active_challenge = active_challenge;
      this.completed_challenges = completed_challenges;
      this.fcm_token = fcm_token;
    }
  
    static fromJson(json) {
      return new TeamData({
        _id: json._id,
        name: json.name,
        team_code: json.team_code,
        score: json.score,
        active_challenge: json.active_challenge,
        completed_challenges: json.completed_challenges,
        fcm_token: json.fcm_token,
      });
    }
  
    toJson() {
      return {
        _id: this._id,
        name: this.name,
        team_code: this.team_code,
        score: this.score,
        active_challenge: this.active_challenge,
        completed_challenges: this.completed_challenges,
        fcm_token: this.fcm_token,
      };
    }
  }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new TeamData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? TeamData.fromJson(json.data) : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.toJson() : null,
        message: this.message,
      };
    }
  }
  
  export class ListResponse {
    constructor({ success, total_teams, teams, message }) {
      this.success = success;
      this.total_teams = total_teams;
      this.teams = teams ? teams.map(team => new TeamData(team)) : [];
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        total_teams: json.data.total_teams,
        teams: json.data.teams ? json.data.teams.map(team => TeamData.fromJson(team)) : [],
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        total_teams: this.total_teams,
        teams: this.teams ? this.teams.map(team => team.toJson()) : [],
        message: this.message,
      };
    }
  }