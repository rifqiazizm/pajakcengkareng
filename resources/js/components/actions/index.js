import { SEDOT_TOKPED, SIGN_IN, INPUT_WP , EDIT_WP, FETCH_WP, DELETE_WP ,SHOW_ALERT,HIDE_ALERT,SHOW_ERROR,HIDE_ERROR,
    RENDER_TANGKAPAN,RENDER_KAPAL,RENDER_LSPOP,UNRENDER_KAPAL,UNRENDER_LSPOP,UNRENDER_TANGKAPAN, ADD_WP,ADD_TANGKAPAN,
    INPUT_TANGKAPAN,DELETE_TANGKAPAN,INPUT_KAPAL,DELETE_KAPAL,REMOVE_WP
} from './type'
import exten from '../page/misc/Axios';

//
//
// IMPORTANT NOTEE!! 
// AXIOS SECARA OTOMATIS AKAN CONVERT FORM DATA JADI JSON !!!
//
// METHOD HTTP PUT/PATCH/DELETE SEBENERNYA BISA MAKE METHOD POST JUGA (ASAL SAMA2 DI BACKEND NYA JUGA POST!!)
//
//

export const dottedNumber = (x=0) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const fetchTokped = (postData)   =>   {
    
    return async (dispatch, getState) => {
        const res = await exten.post('/api/sedotGan', postData);
        console.log(" berhasil " + res.data.data);
        dispatch({
            type : SEDOT_TOKPED,
            payload : res.data.data
        });
    }
}


export const fetchUser = () => {
    return async (dispatch,getState) => {
        const res = await exten.get('/user/details');
        console.log(res.data);
        dispatch({
            type: SIGN_IN,
            payload : _.pick(res.data,['id','name','email'])
        });
    }
}


export const fetchWP = () => async dispatch => {
    const res = await exten.get('/wp/fetchshow');
    console.log(res.data.data)
    dispatch({
        type : FETCH_WP,
        payload : res.data.data
    });
}

export const inputWP = (postData) => {
    return async (dispatch,getState) => {
        const res = await exten.post('/wp/tambahWP',postData); // untuk add Wajib pajak yg di redux global state make yg dari response backend, karena 
        // kita mau mengambil record yang ada ID nya. dimana ID ini di generate secara otomatis oleh backend sedangkan di frontend ga ada alur generate ID
        console.log(res.data.responses);
        dispatch({ 
            type : INPUT_WP,
            payload : res.data.responses
        });
        if(res) {
            return true
        } else {
            return false
        }
    }
}
 

export const editWP = (id , postData) => {
    return async (dispatch,getState) => {
        const res = await exten.patch('/wp/editWP/'+id,postData);
        console.log("sukses !"+ res.data.responses);
        
        
        dispatch({
            type : EDIT_WP,
            payload : res.data.responses
        });
        if(res) {
            console.log('request edit berhasil');
            return true
        } else {
            console.log('request edit gagal');
            return false
        }
    }
}


export const deleteWP = (id) => async dispatch => {
    const res = await exten.delete('/wp/deleteWP/'+id);

    console.log(res.data.responses);
    dispatch({
        type : DELETE_WP,
        payload : id
    })
}





export const showAlert = () => {
    return {
        type : SHOW_ALERT
    }
}

export const hideAlert = () => {
    return {
        type : HIDE_ALERT
    }
}


export const showError = (msg,title) => {
    const body = { 
        msg,
        title
    }

    return {
        type : SHOW_ERROR,
        payload : body
    }
}

export const hideError = () => {
    return {
        type : HIDE_ERROR
    }
}


export const fetchSPOP = async (postData) => {
    const res = await exten.post('/wp/fetchspop', postData);

    if (res) {
        return true;
    }

}

export const inputTangkapan = (postData) => async dispatch => {
    const res = await exten.post('/wp/tangkapan/add',postData)

    if(res) {
        dispatch({
            type : INPUT_TANGKAPAN,
            payload : res.data.data
        });
        return true;
    } else {
        return false;
    }
} 

export const deleteTangkapan = (id) => async dispatch => {
    const res = exten.delete('wp/tangkapan/del/'+id);

    if(res) {
        dispatch({
            type : DELETE_TANGKAPAN,
            payload : id
        })
        return true
    } else {
        return false
    }
}

export const inputKapal = (postData) => async dispatch => {
    const res = await exten.post('/wp/kapal/add',postData);

    if(res) {
        dispatch({
            type : INPUT_KAPAL,
            payload : res.data.data
        })
        return true;

    } else {
        return false;
    }
}


export const deleteKapal = (id) => async dispatch => {
    const res = await exten.delete('wp/kapal/del/'+id)

    if(res) {
        dispatch({
            type : DELETE_KAPAL,
            payload : id
        })
        return true;
    } else {
        return false;
    }
}


export const showKapal = () => {
    return {
        type : RENDER_KAPAL
    }
}

export const hideKapal = () => {
    return {
        type : UNRENDER_KAPAL
    }
}

export const showLSPOP = () => {
    return {
        type : RENDER_LSPOP
    }
}

export const hideLSPOP = () => {
    return {
        type : UNRENDER_LSPOP
    }
}

export const showTangkapan = () => {
    return {
        type : RENDER_TANGKAPAN
    }
}

export const hideTangkapan = () => {
    return {
        type : UNRENDER_TANGKAPAN
    }
}



export const currentWP = (dataWP) => {

    return {
        type : ADD_WP,
        payload : dataWP
    }
}

// export const currentTangkapan = (tangkapan) => {
//     return {
//         type : ADD_TANGKAPAN
//     }
// }

export const delcurrentWP = () => {

    return {
        type : REMOVE_WP
    }
}

