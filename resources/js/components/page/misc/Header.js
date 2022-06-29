import React, { Component } from 'react';
import { Row , Col } from 'adminlte-2-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Header extends Component {

    style = {
        wrapper : {
            textAlign : 'center',
            alignItems : 'center',
            marginTop : '5px'
        },
        icon : {
            color : '#7c3d32',
            width : '20px',
            height : '20px'
        
        },
        table : {
            width : '30%',
            margin : 'auto'
        }
        
    }
    

    render() {

        const { logo } = this.props;

        return (
            <Row>
                <Col sm={12} >
                    <div style={this.style.wrapper} >
                        <img src={logo} alt="Logo" width="100" height="100" />
                        
                        <h2>Tech Used</h2>
                        <hr />
                       

                            <table style={this.style.table} >
                           
                                <tr>
                                    <td><FontAwesomeIcon icon={['fab','react']} spin style={this.style.icon} /></td>
                                    <td>ReactJS</td>
                                </tr>
                            
                            <tr>
                                <td><FontAwesomeIcon icon={['fab','ubuntu']} spin style={this.style.icon} /></td>
                                <td>Ubuntu</td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={['fab','google']} spin style={this.style.icon} /></td>
                                <td>Go Lang</td>
                            </tr>
                            </table>
                        
                    </div>
                </Col>
            </Row>
        )
    }
}


export default Header;