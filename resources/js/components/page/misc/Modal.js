import React, { Component } from "react";
import ReactDOM from "react-dom";

const modalStyle = {
  position: "fixed",
  left: '0',
  top: '0',
  bottom: "0",
  right: "0",
  backgroundColor: "rgba(0,0,0,.2)",
  color: "##FFF",
  fontSize: "40px",
};

const modalBody = {
  marginLeft: '50%',
  marginTop: '50%',
  height : '100px',
  width : '500px',
  backgroundColor : 'white',
  transform: "translate(-50%,-50%)"
}

export default class Modal extends Component {
  // perhatikan bahwa ketika membuat sebuah element dengan portal
  // harus dibungkus <div> jangan memakai fragment karena element ini ada di top level DOM jadi butuh wrapper node baru berupa <div>
  render() {
    return ReactDOM.createPortal(
        <div style={modalStyle}> 
          <div style={modalBody}>
              <h1>dsdsd</h1>
          </div>
        
      </div>,
      document.getElementById("portal"),
    );

   
    
  }
}
