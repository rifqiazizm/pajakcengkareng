import React, { useState, Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Content, Row, Box, Col, Memberbox , Inputs, Button, Alert } from 'adminlte-2-react';



const CobaHooks = (props) => {    
    
    const [angka, setAngka] = useState(0);

    // const [name,setName] = useState(null)

    const [disabledBtn,setdisabledBtn] = useState(true);

    const { Text } = Inputs;

    const [ inputVal, setInputVal ] = useState({
        name : null,
        country : null 
    })



    useEffect(() => {
       console.log(inputVal.name)
    }, [inputVal]) // jika diberi argumen kedua maka fungsinya sama seperti componenDidUpdate(). tetapi hanya akan dijalani jika state angka (atau apapun yg menjadi argumen kedua) berubah.




    onChange = (e) => {
        setName({
            ...inputVal,
            [e.target.id] : e.target.value
        });
    }


    onBlur = (e) => {
        setdisabledBtn(false)
    }



        return (
            <div>
                <Content title="Belajar Hooks">
                    <Row>
                        <Col sm={6}>
                            <Box title="Input Hooks" collapsable type="success">
                                <h1>Belajar Hooks</h1>

                                <Text 
                                    inputType="text" 
                                    id="nama" 
                                    name="nama" 
                                    placeholder="enter your name" 
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={name} 
                                    labelPosition="none"
                                    type="primary"
                                    required
                                    size="lg"   
                                />

                                <Text 
                                    inputType="text" 
                                    id="country" 
                                    name="country" 
                                    placeholder="enter your country" 
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={name} 
                                    labelPosition="none"
                                    type="primary"
                                    required
                                    size="lg"   
                                />  

                                <Button type="danger" text="Submit" icon="fa-paper-plane" disabled={disabledBtn} onClick={onClickBtn} />


                            </Box>
                        </Col>
                        
                    </Row>
                </Content>
            </div>
        )
    }


export default CobaHooks;