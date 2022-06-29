import React from 'react'
import { Box , Col , Row , Inputs} from 'adminlte-2-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const { Text, CheckBox } = Inputs;


const FilterElm = (props) => ( 
    <div className={props.icon == 'check' ? 'filter-btn' : 'filter-btn filter-false'}>
        <h3 className="persyaratan-btn"> {props.text} </h3>
        <FontAwesomeIcon icon={['fa',props.icon]} size="2x" />
    </div>
);  


const SidePanel = () => {
    

    return (
        <div>
            <Row>
                <Col sm={12}>
                    <Box type="primary" className="persyaratan-box" >
                        <Row>
                            <Col sm={12}>
                                <h3 className="header-text-title">Filter</h3>
                                <FilterElm text="Orang pribadi" icon="check" />
                                <FilterElm text="Badan" icon="times" />
                            </Col>
                        </Row>  
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <center>
                    <div className="button-create">
                        <h3 className="persyaratan-btn"> Text Here </h3>
                    </div>
                    </center>
                </Col>
            </Row>
            
        </div>
    )
}

export default SidePanel
  