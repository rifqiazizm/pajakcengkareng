import React, { Component } from 'react';
import { Content, Row, Col, Box, Button, LoadingSpinner, Infobox2,Infobox,Slider , Alert } from 'adminlte-2-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Home extends Component {
  state = {}




  infoBox1 = () => {
      return(
        <div>
          udah bisa
        </div>
      );
  };


  render() {
    return (<Content title="Homepage" browserTitle="Sedodata">
     
      <br />
     
      <Row>
        <Col sm={4}>
          <Infobox2 title="Tokopedia" text="ini bisaaaa" icon="fa-home" color="red" progress="90" footerText="Details" footerIcon="fa-question-circle" onFooterClick={(e) => console.log("di klik")} />
        
        </Col>
        <Col sm={4}>
          <Infobox2 title="Bukalapak" text="ini bisaaaa" icon="fa-home" color="green" progress="90" footerText="Details" footerIcon="fa-question-circle" onFooterClick={(e) => { e.preventDefault(); console.log("di klik") }} />

        </Col>
        <Col sm={4}>
          <Infobox2 title="Shopee" text="ini bisaaaa" icon="fa-home" color="blue" progress="90" footerText="Details" footerIcon="fa-question-circle" onFooterClick={() => console.log("di klik")} />

          
        </Col>
      </Row>
      <Row>
        
        <Col sm="5"><hr className="top-line"/></Col>
        <Col sm="2" className="fahead"> 
            <FontAwesomeIcon icon={['fa','plus-circle']} spin size="2x" style={{color : 'brown',marginRight: '6px'}} /> 
            <FontAwesomeIcon icon={['fa','asterisk']} spin size="2x" style={{color : 'brown',marginRight: '6px'}} /> 
            <FontAwesomeIcon icon={['fa','plus-circle']} spin size="2x" style={{color : 'brown'}} /> 

        </Col>
        <Col sm="5"><hr className="top-line"/></Col>

      </Row>
    </Content>);
  }
}

export default Home;