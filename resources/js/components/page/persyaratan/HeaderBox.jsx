import React from 'react'
import { Row , Box, Col} from 'adminlte-2-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HeaderBox() {
    return (
        <div>
           <Box type="primary" className="persyaratan-box" >
                <Row>
                    <Col sm={4}>
                        <div className="persyaratan-inner">
                            <div className="rounded-avatar avatar1">
                                <FontAwesomeIcon icon={['far','user']} size="3x" style={{color:'white'}} />
                            </div>
                            <div className="header-text">
                                <h3 className="header-text-title" >OP</h3>
                                <h1 className="header-text-subtitle" >20</h1>
                            </div>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="persyaratan-inner">
                            <div className="rounded-avatar avatar2">
                                 <FontAwesomeIcon icon={['fas','building']} size="3x" style={{color:'white'}} />
                            </div>
                            <div className="header-text">
                                <h3 className="header-text-title" >Badan</h3>
                                <h1 className="header-text-subtitle" >36</h1>
                            </div>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="persyaratan-inner">
                            <div className="rounded-avatar avatar3">
                                <FontAwesomeIcon icon={['fas','building']} size="3x" style={{color:'white'}} />
                            </div>
                            <div className="header-text">
                                <h3 className="header-text-title" >Total </h3>
                                <h1 className="header-text-subtitle" >56</h1>
                            </div>
                        </div>
                    </Col>

                </Row>

            </Box>
        </div>
    )
}

export default HeaderBox;
