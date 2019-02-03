export const NOTIF = 'NOTIF';
export const NOTIF_ERROR = 'NOTIF_ERROR';

export const addNotif = (text) => {
    return {
        type: NOTIF,
        payload: text
    }
}

export const addErrorNotif = (text) => {
    return {
        type: NOTIF_ERROR,
        payload: text
    }
}