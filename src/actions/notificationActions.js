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
    if(type === 'error') {
        if(message.response) {
            message = message.response.data.error;
        } else if(message.message) {
            message = message.message;
        }
    }
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