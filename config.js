export const GLOBALS = {
  //backend_url: "https://octopus-app-dgmcr.ondigitalocean.app",
  backend_url: "https://walrus-app-8bv3s.ondigitalocean.app",
};

export const API_ROUTER = {
  signin: `${GLOBALS.backend_url}/signin`,
  signinSlack: `${GLOBALS.backend_url}/signinSlack`,
  ticketGetTicket: `${GLOBALS.backend_url}/ticketGetTicket`, // :idTicket
  userGetUser: `${GLOBALS.backend_url}/userGetUser`, // :idTicket
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
    ticketGetTicket: `${GLOBALS.backend_url}/ticketGetTicket`, // :idTicke
    ticketGetReport: `${GLOBALS.backend_url}/ticketGetReport`, // :idTicke
  },
  USER: {
    userGetUsersForDomain: `${GLOBALS.backend_url}/userGetUsersForDomain`, // :idTicket
    userGetUsersByStatus: `${GLOBALS.backend_url}/userGetUsersByStatus`, // :idTicket
    userGetClient: `${GLOBALS.backend_url}/userGetClient`, // :idTicket
    userClient: `${GLOBALS.backend_url}/userClient`,
    userDomain: `${GLOBALS.backend_url}/userDomain`,
    userEmail: `${GLOBALS.backend_url}/userEmail`,
    userTag: `${GLOBALS.backend_url}/userTag`,
    userPassword: `${GLOBALS.backend_url}/userPassword`, // :idTicket
    userValidateToken: `${GLOBALS.backend_url}/userValidateToken`,
    userGetUsersBySearch: `${GLOBALS.backend_url}/userGetUsersBySearch`,
    userGetUsersByRole: `${GLOBALS.backend_url}/userGetUsersByRole`, //search
    userGetEmailByHubspot: `${GLOBALS.backend_url}/hubspotClientSync`, //search
    userGetUsersByTag: `${GLOBALS.backend_url}/userGetUsersByTag`,
  },
  PLAN: {
    getPlanInstance: `${GLOBALS.backend_url}/planInstance`, // :idTicket
    addBucket: `${GLOBALS.backend_url}/bucket`, // :idTicket
    getImages: `${GLOBALS.backend_url}/getImagesPlan`, // :idTicket
    getTourguide: `${GLOBALS.backend_url}/getTourguide`, // :idTicket
  },
  PACK: {
    getPackInstance: `${GLOBALS.backend_url}/packInstance`, // :idTicket
  },
  APP: {
    getAppPlan: `${GLOBALS.backend_url}/appPlan`, // :idTicket
    getAppById: `${GLOBALS.backend_url}/getAppById`, // :idTicket
  },
};
