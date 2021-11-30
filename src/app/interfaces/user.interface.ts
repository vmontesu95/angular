
export interface ClientData {
    name        : string;
    lastName    : string;
    userName    : string;
}

export interface UserInfo {
    userId      : string;
    clientId    : string;
    clientData  : ClientData;
}

export interface Session {
    sessionId   : string;
}

export interface UserLogin {
    session     : Session,
    userInfo    : UserInfo,
    mediated    : boolean,
    firstAccess : boolean
}
