export const GLOBALS = {
  //backend_url: "http://localhost:2002",
  backend_url: "https://walrus-app-8bv3s.ondigitalocean.app",
  admin: "dm",
  guide: "gd",
  superadmin: "sdm",
};
//

export const API_ROUTER = {
  signin: `${GLOBALS.backend_url}/signin`,
  signinSlack: `${GLOBALS.backend_url}/signinSlack`,
  ticketGetTicket: `${GLOBALS.backend_url}/ticketGetTicket`,
  userGetUser: `${GLOBALS.backend_url}/userGetUser`,
  userGetUsersByRole: `${GLOBALS.backend_url}/userGetUsersByRole`, //search
  userGetUsersBySearch: `${GLOBALS.backend_url}/userGetUsersBySearch`,
  TICKET: {
    ticketFromLocal: `${GLOBALS.backend_url}/ticketFromLocal`,
    ticketUploadImage: `${GLOBALS.backend_url}/ticketUploadImage`, //
    ticketGetUsersBySearch: `${GLOBALS.backend_url}/ticketGetTicketsBySearch`,
    ticketGetTicketsByStatus: `${GLOBALS.backend_url}/ticketGetTicketsByStatus`,
    ticketInstallationGetTicketsByStatus: `${GLOBALS.backend_url}/ticketInstallationGetTicketsByStatus`,
    ticketGetTickets: `${GLOBALS.backend_url}/ticketGetTickets`,
    ticketGetTicketsInstallation: `${GLOBALS.backend_url}/ticketGetTicketsInstallation`,
    ticketGetTicket: `${GLOBALS.backend_url}/ticketGetTicket`,
    ticketGetReport: `${GLOBALS.backend_url}/ticketGetReport`, // :idTicke
  },
  USER: {
    userGetUsersForDomain: `${GLOBALS.backend_url}/userGetUsersForDomain`,
    userGetUsersByStatus: `${GLOBALS.backend_url}/userGetUsersByStatus`,
    userGetClient: `${GLOBALS.backend_url}/userGetClient`,
    userClient: `${GLOBALS.backend_url}/userClient`,
    userDomain: `${GLOBALS.backend_url}/userDomain`,
    userEmail: `${GLOBALS.backend_url}/userEmail`,
    userTag: `${GLOBALS.backend_url}/userTag`,
    userPassword: `${GLOBALS.backend_url}/userPassword`,
    userValidateToken: `${GLOBALS.backend_url}/userValidateToken`,
    userGetUsersBySearch: `${GLOBALS.backend_url}/userGetUsersBySearch`,
    userGetUsersByRole: `${GLOBALS.backend_url}/userGetUsersByRole`, //search
    userGetEmailByHubspot: `${GLOBALS.backend_url}/hubspotClientSync`, //search
    userGetUsersByTag: `${GLOBALS.backend_url}/userGetUsersByTag`,
  },
  PLAN: {
    getPlanInstance: `${GLOBALS.backend_url}/planInstance`,
    getPlanPack: `${GLOBALS.backend_url}/planPack`,
    addBucket: `${GLOBALS.backend_url}/bucket`,
    getImages: `${GLOBALS.backend_url}/getImagesPlan`,
    getTourguide: `${GLOBALS.backend_url}/getTourguide`,
    getPlansByDate: `${GLOBALS.backend_url}/getPlansByDate`,
    planUpdates: `${GLOBALS.backend_url}/planUpdates`,
    closePlan: `${GLOBALS.backend_url}/closePlan`,
  },
  PACK: {
    getPackInstance: `${GLOBALS.backend_url}/packInstance`,
  },
  APP: {
    getAppPlan: `${GLOBALS.backend_url}/appPlan`,
    getAppById: `${GLOBALS.backend_url}/getAppById`,
  },
  ROOT: {
    rootInstance: `${GLOBALS.backend_url}/rootInstance`,
    rootPassword: `${GLOBALS.backend_url}/rootPassword`,
  },
};
