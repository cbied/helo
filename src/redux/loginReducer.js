
const initialState = {
    user: []
}

const HANDLE_UPDATE_USER = 'HANDLE_UPDATE_USER'


export const handleUpdateUser = (user) => {
    return {
        type: HANDLE_UPDATE_USER,
        payload: user
    }
}

export default function reducer(state=initialState,action) {
    const { type, payload } = action

    switch(type) {
        case HANDLE_UPDATE_USER:
            return { ...state, user: payload }
        default: return state
    }
}