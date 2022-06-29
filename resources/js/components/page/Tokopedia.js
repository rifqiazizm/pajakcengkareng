import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content, Row, Box, Col, Memberbox , Inputs, Button, Alert } from 'adminlte-2-react';
import { connect } from 'react-redux';
import { fetchTokped } from '../actions'
import Header from './misc/Header';
import Tokped from '../img/tokped.png';
import NumberFormat from 'react-number-format';
import Axios from '../page/misc/Axios';
import '../css/style.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import styled, { keyframes, css } from 'styled-components';
// import { fadeInDownBig , slideInUp , zoomInUp ,lightSpeedIn} from 'react-animations';
import {Animated} from "react-animated-css";



class Tokopedia extends Component {

    state = {
        errorLog : null,
        produk : null,
        hargaMin : null,
        hargaMax : null,
        filterDaerah : null,
        buttonSubmit : false,
        inputType : {
            produk : 'primary',
            hargaMin : ' ',
            hargaMax : ''
        },
        select2 : {
            value : [{
                value : '104',
                label : 'Loading'
            }]
        },
        style : {
            pError : {
                color : 'red'
            },
            select2 : {
                color : 'white',
                width : '15px',
                height : '15px',
                marginRight : '10px'
            },
            buttonSubmit : {}
        },
        renderAnimate : {
            renderError : false,
            renderAll :  true
        }
    };


    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.produk && this.state.hargaMax && this.state.hargaMin) {
            if(this.state.errorLog === null) {
                console.log(e)
                this.props.fetchTokped(e.value)
            }
        } else {
            console.log('data ga lengkap')
        }
    }


    onChangeSelect2 = value => {
        console.log(value)
    }

    componentWillMount() {
        Axios.get('/api/getRegion').then(res => {
            this.setState({ select2 : { value : res.data.results }})
            console.log(this.state.select2.value)
        })

    }

    componentDidUpdate() {
        console.log("updated!!")
    }

    onChange = values => {
        console.log(values.target.id);

        

        this.setState({
            [values.target.id] : values.target.value,
            inputType : {
                [values.target.id] : 'success'
            }
        });
    };

    
    onClick = (e) => {
     
        e.preventDefault();
        console.log(e.target[0].value)
        

    }


    onBlur = (e) => {
        console.log(e.target.id)
        if(e.target.id === 'hargaMin' || e.target.id === 'hargaMax') {
            if(isNaN(this.state.hargaMax) || isNaN(this.state.hargaMin)) {
                console.log('harus angka cok!');
                this.setState({
                    errorLog : 'input harga hanya angka!',
                    renderAnimate : {
                        renderError : true
                    },
                    inputType : {
                        [e.target.id] : 'warning'
                    }
                });
            } else {
                this.setState({
                    errorLog : null,
                    renderAnimate : {
                        renderError : false
                    }
                 
                })
            }
   
        };
       
    }

    

    render() {


        const { Select2, Text } = Inputs;

        const  Options  = this.state.select2.value ? this.state.select2.value[0] : null;



        const RenderError = ({ tulisan }) => {
            return (
                <Animated animationIn="shake" isVisible={this.state.renderAnimate.renderError}  >
                    <div id="renderError">
                        <span><FontAwesomeIcon icon={['fa','exclamation-circle']} />  Error!! {tulisan} </span> 
                    </div>
                </Animated>
            )
        }
      

        return (
        <Content title="Via Tokopedia" browserTitle="Tokopedia">
            <Row>
                <Col sm={3}>
                    <Animated animationIn="zoomIn" isVisible={this.state.renderAnimate.renderAll}>
                    <div className="">
                        <Box title="Profile" type="success" collapsable header={<Header logo={Tokped} />}>
                        </Box>
                    </div>
                    </Animated>
                </Col>
                <Col sm={9}>

                
                <Animated animationIn="zoomIn" animationInDelay={500} isVisible={this.state.renderAnimate.renderAll}>
                <Box title="Scrap data via tokped" type="warning" collapsable className="tokpedsearch"  >
                    
                    <hr />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                    
                         
                                <form onSubmit={this.onSubmit} >
                                <Text 
                                    inputType="text" 
                                    id="produk" 
                                    name="product" 
                                    placeholder="masukan nama produk" 
                                    onChange={this.onChange} 
                                    value={this.state.formV} 
                                    labelPosition="none"
                                    type={this.state.inputType.produk} 
                                    iconLeft="fa-shopping-cart"
                                    onBlur={this.onBlur}
                                    size="md"           
                                    />
                                <Row>
                                    <Col md={6}>
                                        <Text 
                            
                                            inputType="text" 
                                            id="hargaMin" 
                                            name="hargaMin" 
                                            placeholder="harga minimum" 
                                            onChange={this.onChange} 
                                            value={this.state.hargaMin} 
                                            labelPosition="none"
                                            type={this.state.inputType.hargaMin} 
                                            iconLeft="fa-tag"
                                            onBlur={this.onBlur}
                                            size="md"
                                            />
                                    </Col>
  
                                    <Col md={6}>
                                        <Text 
                                            inputType="text" 
                                            id="hargaMax" 
                                            name="hargaMax" 
                                            placeholder="harga maximum" 
                                            onChange={this.onChange} 
                                            value={this.state.hargaMax} 
                                            labelPosition="none"
                                            type={this.state.inputType.hargaMax} 
                                            iconLeft="fa-tags"
                                            onBlur={this.onBlur}
                                            size="md"
                                            />
                                    </Col>
                                   
                                   
                                </Row>

                                <Select 
                                    placeholder="filter daerah pencarian"
                                    onChange={this.onChangeSelect2}
                                    options={this.state.select2.value}
                                    autofocus
                                    isMulti
                                    components={makeAnimated()}
                                    />
                                                       

                                
                                { this.state.renderAnimate.renderError ? <RenderError tulisan={this.state.errorLog} /> : '' }
                               
                     
                                        <button 
                                        type="submit" 
                                        className="submitBtn" 
                                        style={this.state.style.buttonSubmit} 
                                        onMouseOver={() => {
                                            this.setState({ 
                                                buttonSubmit : true,
                                                style : {
                                                    buttonSubmit : {
                                                        backgroundColor : 'white',
                                                        color : 'black',
                                                        border : 'solid 3px rgb(153, 55, 42)'
                                                        
                                                    }
                                                }
                                                })
                                            }} 
                                        onMouseLeave={() => {
                                            this.setState({ 
                                                buttonSubmit : false,
                                                style : {
                                                    buttonSubmit : {}
                                                }
                                                })
                                            }}>

                                                <FontAwesomeIcon 
                                                    icon={['fa','search']} 
                                                    style={this.state.style.select2} 
                                                    spin={this.state.buttonSubmit} />

                                                Submit

                                        </button>
                               
                                    
                               
                            </form>
                            
                                
                            
                        </Col>

                        
                    </Row>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={3}>
                        <Box type="info" collapsable className="boxContentDalamPBB" loaded  >
                    <div className="isiBoxContent" id="inputWP" onClick={this.onClickBox1} >
                        
                        <Row>
                            <Col md={12}>
                           
                            <br />
                            <hr />
                                <h3>
                                    Input Wajib Pajak
                                </h3>
          
                            </Col>
                        </Row>
                    </div> 
                    </Box>
                        </Col>
                    </Row>
                    
                </Box>

                </Animated>

                </Col>
            </Row>

        </Content>
        );
    }
}

const mapState = (state) => {
    return {
        hasil : state.hasilSedot
    }
}


export default connect(mapState , {
    fetchTokped
})(Tokopedia);