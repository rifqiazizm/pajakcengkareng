import {combineReducers} from 'redux';
import {
    SIGN_IN,
    SIGN_OUT,
    SEDOT_TOKPED,
    SEDOT_BUKA,
    INPUT_WP,
    EDIT_WP,
    FETCH_WP,
    DELETE_WP,
    SHOW_ALERT,
    HIDE_ALERT,
    SHOW_ERROR,
    HIDE_ERROR,
    ADD_WP,
    REMOVE_WP,
    RENDER_KAPAL,
    UNRENDER_KAPAL,
    RENDER_LSPOP,
    UNRENDER_LSPOP,
    RENDER_TANGKAPAN,
    UNRENDER_TANGKAPAN,
    ADD_TANGKAPAN,
    INPUT_TANGKAPAN,
    DELETE_TANGKAPAN,
    INPUT_KAPAL,
    DELETE_KAPAL
} from '../actions/type';



const user = (state={}, actions) => {
    switch(actions.type) {
        case SIGN_IN:
            return { ...state, isSignedIn : true, user : actions.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn : false, user: null }
        default:
            return state;
    
    }
}


const hasilSedot = (state={} , actions) => {
    switch(actions.type) {
        case SEDOT_TOKPED:
            return { ...state , asal : 'tokopedia', hasil : actions.payload }
        case SEDOT_BUKA:
            return { ...state , asal : 'bukalapak', hasil : actions.payload }
        default:
            return state;
    }
} 



const wajibpajak = (state={}, actions) => {
    switch(actions.type) {
        case INPUT_WP:
            return _.assignIn({[actions.payload.id] : actions.payload},state); // nyoba 
        case EDIT_WP:
            return {...state,[actions.payload.id] : actions.payload };
        case FETCH_WP:
            return {...state, ..._.mapKeys(actions.payload,'id') } ;
            // return [ ...state, ...actions.payload]
        case DELETE_WP:
            return _.omit(state, actions.payload)
        default:
            return state;
    }
}

const initialVal = {
    show : false,
    body : {}
}

const sweetalert = (state={...initialVal}, actions) => {
    switch(actions.type) {
        case SHOW_ALERT:
            return { 
                show : true,
                body : actions.payload
            };
        case HIDE_ALERT:
            return { 
                show : false,
                body : {}
            };
        default:
            return state
    }
}


const initialError = {
    show : false,
    body : {}
}

const renderError = (state={ ...initialError}, actions) => {
    switch(actions.type) {
        case SHOW_ERROR:
            return {
                show : true,
                body : actions.payload
            };
        case HIDE_ERROR:
            return {
                show : false,
                body : {}
            }
        default:
            return state
    }
}

const initialSPOP = {
    renderKapal : false,
    renderLSPOP : true,
    renderTangkapan : false,
    currentWP : ''
}


const lspop = (state={ ...initialSPOP }, actions) => {
    switch(actions.type) {
        case ADD_WP:
            return { ...state, currentWP : actions.payload }
        case REMOVE_WP:
            return { ...state, currentWP : '' }

        // case ADD_TANGKAPAN:
        //     return {
        //         ...state,
        //         currentWP : {
        //             ...state.currentWP,
        //             tangkapan : actions.payload
        //         }
        //     }


        case INPUT_TANGKAPAN:
            return {
                ...state,
                currentWP : {
                    ...state.currentWP,
                    tangkapan : [
                        ...state.currentWP.tangkapan,
                        actions.payload
                    ]
                }
            }

        case DELETE_TANGKAPAN:
            return {
                ...state,
                currentWP : {
                    ...state.currentWP,
                    tangkapan : _.filter(state.currentWP.tangkapan,e => {
                        return e.id != actions.payload 
                    })
                    
                }
            }

        case INPUT_KAPAL:
            return {
                ...state,
                currentWP : {
                    ...state.currentWP,
                    kapal : [
                        ...state.currentWP.kapal,
                        actions.payload
                    ]
                }
            }

        case DELETE_KAPAL:
            return {
                ...state,
                currentWP : {
                    ...state.currentWP,
                    kapal : _.filter(state.currentWP.kapal,e => {
                        return e.id != actions.payload 
                    })

                }
            }


        case RENDER_KAPAL:
            return {
                ...state,
                renderKapal : true
            }
        case UNRENDER_KAPAL:
            return {
                ...state,
                renderKapal : false
            }
        case RENDER_LSPOP:
            return {
                ...state,
                renderLSPOP : true
            }
        case UNRENDER_LSPOP:
            return {
                ...state,
                renderLSPOP : false
            }
        case RENDER_TANGKAPAN:
            return {
                ...state,
                renderTangkapan : true
            }
        case UNRENDER_TANGKAPAN:
            return {
                ...state,
                renderTangkapan : false
            }
        default:
            return state
    }
}


// const kelas = (state=[],actions) => {
//     switch(actions.type) {

//     }
// }


export default combineReducers({
    user,
    hasilSedot,
    wajibpajak,
    sweetalert,
    renderError,
    lspop
});