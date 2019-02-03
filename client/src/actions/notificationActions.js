export const NOTIF = 'NOTIF';
export const REMOVE_NOTIF = 'REMOVE_NOTIF';

export const addNotif = (notif) => {
    return {
        type: NOTIF,
        payload: {
            key: new Date().getTime() + Math.random(),
            ...notif
        }
    }
}

export const removeNotif = (key) => {
    return {
        type: REMOVE_NOTIF,
        payload: {
            key
        }
    }
}

export const addNotifHelper = (message, type) => {
    return {   
        type: NOTIF, 
        payload: {
            key: new Date().getTime() + Math.random(),
            message,
            options: {
                variant: type,
                autoHideDuration: 2500 //Hide after 2.5 seconds.
            }
        }
    }
};