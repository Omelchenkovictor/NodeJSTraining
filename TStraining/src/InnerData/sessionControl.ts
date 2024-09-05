var sessionMap = new Map();

function addNewSession(UUID: string, data: object) {
    sessionMap.delete(UUID)
    sessionMap.set(UUID, data)
}

function accessSession(UUID: string) {
    //console.log(sessionMap)
    return sessionMap.get(UUID)
}

export { addNewSession, accessSession }