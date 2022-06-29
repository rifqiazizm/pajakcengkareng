import React from 'react'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Error({ tulisan , render, anim }) {
    const animation = anim ? anim : 'shake';
    return (
        <>
            <Animated animationIn={animation} isVisible={render}  >
                    <div id="renderError">
                        <span><FontAwesomeIcon icon={['fa','exclamation-circle']} />  Error!! {tulisan} </span> 
                    </div>
                </Animated>
        </>
    )
}
