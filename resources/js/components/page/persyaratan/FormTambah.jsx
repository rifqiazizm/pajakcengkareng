import React, { Component } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { Row,Col, Box, Inputs } from 'adminlte-2-react';
import { hideAlert } from '../../actions';

class FormTambah extends Component {

    render() {
        return (
            <div>
                <SweetAlert
                    show={}
                >

                </SweetAlert>
            </div>
        )
    }
}

const mapState = (state,ownProps) => {
    return {
        
    }
}

export default connect(mapState, {
    hideAlert
})(FormTambah);
