import { OPEN_CHAT_MODAL,MESSAGE } from './action'

const initialVal = {
    isOpen: false,
}

const msgInitVal = 
    {message: ""}


let initValArr = [initialVal,msgInitVal]

const reducer = (state = initValArr, action) => {
    switch (action.type) {
        case OPEN_CHAT_MODAL:
            return {
                ...state,
                isOpen: action.isOpen
            }
        case MESSAGE: 
            return {
                ...state,
                message: action.message
            }    

        default:
            return{
                ...state
            }    
    }

}

export default reducer