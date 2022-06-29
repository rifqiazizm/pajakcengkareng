import React, { Component } from 'react'
import { inputWP } from '../../actions';
import { connect } from 'react-redux'
import { Content, Row, Box, Col, Memberbox , Inputs, Button, Alert, Infobox2 } from 'adminlte-2-react';
import WPform from './WPform';
// import SweetAlert from 'sweetalert2-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Animated} from "react-animated-css";




class inputwp extends Component {


    state = {
        id : null,
        loadBox : true,
        loadSwal : false
    }


    onSubmit = formValues => {
        this.setState({loadBox : false})
        this.props.inputWP(formValues)
            .then(e => {
                this.setState({
                    loadSwal : true
                })
            });
        
    }



    render() {
    
   
        return (
           <>
               <Content title="input Wajib Pajak Baru" browserTitle="Input WP">
               <SweetAlert 
                    success
                    title="Berhasil!" 
                    show={this.state.loadSwal} 
                    onConfirm={() => {this.setState({loadBox : true,loadSwal: false}); }} 
                    customIcon="nyona"
                    timeout={1650}
                    >
                Wajib Pajak telah ditambahkan
                </SweetAlert>
               
               <Animated animationIn="fadeIn" animationInDelay={600} isVisible>
                   <Box title="Form Input" type="primary" collapsable icon="fa-edit" solid loaded={this.state.loadBox} className="box1" >
                        <WPform aksi="new" onSubmit={this.onSubmit}/>
                    </Box>
                </Animated>

               </Content>
            </>
        )
    }
}

export default connect(null , {
    inputWP
})(inputwp);
