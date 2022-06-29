import React from 'react'
import {Animated} from "react-animated-css";
import {Alert } from 'adminlte-2-react';


const AlertError = ({ visible , anim="shake" , title, text }) => {
    return (
        <>
            <Animated animationIn={anim} isVisible={visible}>
                <Alert 
                        closable
                        id="alert"
                        type="danger"
                        title={title}
                        icon="fa-exclamation-triangle"
                    >

                        <p>{text} </p>
                    </Alert> </Animated> 
        </>
    )
}


export default AlertError;