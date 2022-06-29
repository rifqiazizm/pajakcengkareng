import React, { Component } from 'react'
import { Box , Col , Row } from 'adminlte-2-react';
import HeaderBox from './HeaderBox';
import SidePanel from './SidePanel'



class Persyaratan extends Component {
    render() {
        return (


            <div className="persyaratan-outer">
                
                <Row>
                    <Col sm={12}>
                        <HeaderBox />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <SidePanel />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Persyaratan;