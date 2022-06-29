import React, { Component } from 'react';
import { Content, Row, Box, Col, Memberbox , Button, Inputs } from 'adminlte-2-react';
import {Animated} from "react-animated-css";
import User from '../img/user.png';
import { connect } from 'react-redux';
import MiniForm from './adminwp/MiniForm';
import { showAlert, hideAlert } from '../actions/index';




class Wajibpajak extends Component {


    getFromData = (object) => {
        const formdata = new FormData();
        Object.keys(object).forEach(key => formdata.append(key, object[key]));
        return formdata;
    }


    onClickBox1 = (e) => {
        console.log(e.currentTarget.id);
        switch(e.currentTarget.id) {
            
            case "inputWP":
                this.props.history.push('/inputWP');
                break;
            case "ListWP":
                this.props.history.push('/listWP');
                break;
            case "spop":
                console.log('clicked')
                this.props.showAlert();
                break;
            case "lspop":
                this.props.history.push('/lspop');
                break;
            default:
                this.props.history.push('/')
                
        }
        // console.log(e.currentTarget.id);
        
    }

    testing = (e) => {
       this.props.history.push('/');
    }

    

    render() {

        const { history } = this.props;

        const { Text } = Inputs;
       

        return (

        <Content title=" administrasi Wajib Pajak" browserTitle="Menu WP">


            <MiniForm />

          


            <Animated animationIn="zoomIn" animationInDelay={500} isVisible>
                <Row >
                <Col sm={1}></Col>
                <Col sm={3} style={{marginLeft : '80px'}}>
                <div className="isiBoxContent" id="inputWP" onClick={this.onClickBox1} >
                    <Box type="info" collapsable className="boxContentDalamPBB box1" loaded style={{marginBottom : '60px'}}>
                    
                         
                        <Row>
                            <Col md={12}>
                            <img src={User} alt="inputWP" className="avatarBox2" />
                            <br />
                            <hr />
                                <h3>
                                    Input Wajib Pajak
                                </h3>
          
                            </Col>
                        </Row>
                    
                    </Box>
                </div>
                <div className="isiBoxContent" id="lspop" onClick={this.onClickBox1}>
                    <Box type="warning" collapsable className="boxContentDalamPBB2 box1" >
                    
                        <Row>
                            <Col md={12}>
                            
                            <img src={User} alt="inputWP" className="avatarBox2" />
                            <br />
                            <hr />
                                <h3>
                                    Input Lampiran SPOP
                                </h3>

                            </Col>

                            
                        </Row>
                    
                    </Box>
                </div> 

                </Col>

                <Col sm={3}>
                <div className="isiBoxContent"  id="spop" onClick={this.onClickBox1} >
                    <Box type="warning" collapsable className="boxContentDalamPBB2 box1" style={{paddingBottom:'15px'}}>
                    
         
                        <Row>
                            <Col md={12}>
                            <img src={User} alt="spop kembali" className="avatarBox2" />
                            <hr />
                            <h3>
                                rekam SPOP Kembali
                            </h3>
                                    

                           
                            </Col>

                            
                        </Row>
                    
                    </Box>
                </div>   

                <div className="isiBoxContent" id="fdm" onClick={this.onClickBox1} >
                    <Box type="info" collapsable className="boxContentDalamPBB box1" loaded style={{marginTop : '50px'}}>
                    
                        
                        <Row>
                            <Col md={12}>
                            <img src={User} alt="inputWP" className="avatarBox2" />
                            <br />
                            <hr />
                                <h3>
                                    Cetak Kertas Kerja dan FDM
                                </h3>
          
                            </Col>
                        </Row>
                    
                    </Box>
                </div>
                </Col>
                
                <Col sm={3}>
                <div className="isiBoxContent" id="ListWP" onClick={this.onClickBox1}>
                    <Box type="warning" collapsable className="boxContentDalamPBB box1" loaded >
                    
                        
                        
                        <Row>
                            <Col md={12}>
                            <img src={User} alt="listWP" className="avatarBox2" />
                            <hr />
                                <h3>
                                    List Wajib Pajak
                                </h3>
                                
                            </Col>

                            
                        </Row>
                    
                    </Box>
                </div>  
                   

                </Col>
              
                </Row>
               
            </Animated>
            


        </Content>
        );
    }
}



export default connect(null, {
    showAlert,
    hideAlert
})(Wajibpajak);