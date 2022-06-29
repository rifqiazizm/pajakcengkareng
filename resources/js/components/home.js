import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content, Row, Box, Col, Memberbox , Inputs, Button, Alert, Infobox2} from 'adminlte-2-react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import exten from './page/misc/Axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import styled, { keyframes, css } from 'styled-components';
// import { fadeInDownBig , slideInUp , zoomInUp ,lightSpeedIn} from 'react-animations';
import {Animated} from "react-animated-css";
// import history from './history';
import { Line , Bar } from 'react-chartjs-2';
import User from './img/user.png'



class PBBikan extends Component {

    state = {

        garis : {
            width : '50%',
            borderTop : 'solid 1px white'
        },
        chart: {},
        obj1 : {
            a : 1
        },
        obj2 : {
            c : 3
        }
    };


       
      


    componentDidMount() {
        exten.get('/wp/besar')
            .then(e => {
                let namaWP = []
                let tangkapan = []

                _.forEach(e.data.data,(val,key) => {
                    console.log(key)
                    namaWP = [...namaWP,key]
                    tangkapan = [...tangkapan,val]
                })

                this.setState({
                    chart : {
                        labels:namaWP,
                        datasets:[
                            {
                                label : 'Wajib Pajak',
                                data: tangkapan,
                                backgroundColor : [
                                    'rgba(50, 190, 233, 0.897)',
                                    'rgba(64, 60, 104, 0.897)',
                                    'rgb(228, 231, 43)',
                                    'rgb(238, 40, 66)',
                                    'rgb(62, 78, 224)',
                                    'rgba(185, 47, 151, 0.897)'
                                ]
                            }
                        ]
                    }
                })
            })
    }




    render() {
        console.log(_.assignIn({ 'd': 0 }, this.state.obj1, this.state.obj2)); // nyoba doang
        const { history } = this.props;

        return (
        <Content title="Homepage" browserTitle="ExtenApp">
            <Row>
                <Col sm={4}>
                <Animated animationIn="zoomIn" isVisible>
                    <Infobox2 title="Jumlah WP" text="69" icon="fa-user" color="red" progress="90" footerText="Lihat Daftar WP" footerIcon="fas-arrow-circle-right" onFooterClick={(e) => { e.preventDefault(); history.push('/bukalapak'); }} className="kotakluar"  />
                </Animated>
                </Col>
                <Col sm={4}>
                <Animated animationIn="zoomIn" animationInDelay={500} isVisible>
                
                    <Infobox2 title="Total Tangkapan" text="000.000.000" icon="fas-dollar-sign" color="green" progress="90" footerText="Lihat Total Tangkapan" footerIcon="fas-arrow-circle-right" onFooterClick={(e) => { e.preventDefault(); console.log("di klik") }} />
                </Animated>
                </Col>
                <Col sm={4}>
                <Animated animationIn="zoomIn" animationInDelay={1000} isVisible>
                    <Infobox2 title="SPPT terbit" text="26" icon="fas-file-pdf" color="blue" progress="90" footerText="Lihat Daftar SPPT" footerIcon="fas-arrow-circle-right" onFooterClick={() => console.log("di klik")} />
                </Animated>
                
                </Col>
            </Row>

            <hr className="garisPembatas" />

            <Row>
            <Col sm={12}>
        
                <Box className="chartjs" solid title="Data 10 WP PBB Terbesar (dalam jutaan rupiah)" loaded >
                    <Bar 
                        data={this.state.chart}
                        options={{}}
                    />

                    
                </Box>
            </Col>
            </Row>

        </Content>
        );
    }
}




export default PBBikan;
// export default withRouter(PBBikan);