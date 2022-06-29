import React, { Component } from 'react'
import { editWP } from '../../actions';
import { connect } from 'react-redux'
import { Content, Row, Box, Col, Memberbox , Inputs, Button, Alert, Infobox2 } from 'adminlte-2-react';
import WPform from './WPform';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Animated} from "react-animated-css";
import _ from 'lodash';



class EditWP extends Component {


    state = {
        id : null,
        loadBox : true,
        loadSwal : false,
        formV : {}
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({
            id
        })
    
        
    }

    onSubmit = formValues => {
        this.setState({loadBox : false})
        this.props.editWP(this.state.id,formValues)
            .then(e => {
                this.setState({
                    loadSwal : true
                })
            });
        
    }

    onConfirm = () => {
        this.props.history.push('/listWP');
    }

 
    render() {
    
   
        return (
           <>
               <Content title="input Wajib Pajak Baru" browserTitle="Input WP">
                { this.state.loadSwal ?
               <SweetAlert 
                    success
                    title="Berhasil!" 
                    show={this.state.loadSwal} 
                    onConfirm={this.onConfirm} 
                    timeout={1650}
                >
                Data Wajib Pajak telah dirubah 
                </SweetAlert> : ""}
               
               <Animated animationIn="fadeIn" animationInDelay={600} isVisible>
                    <Box title="Form Edit" type="danger" collapsable solid loaded={this.state.loadBox} className="box" >
                        <WPform aksi="edit" onSubmit={this.onSubmit} initialValue={this.props.state} />
                    </Box>
                </Animated>

               </Content>
            </>
        )
    }
}

const mapState = (state,ownProps) => {
    const id = ownProps.match.params.id;
    const wp = _.pick(state.wajibpajak,[id]);
    return {
        state : wp[id]
    }
}

export default connect(mapState , {
    editWP
})(EditWP);
