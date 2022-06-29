import React, {useState,useEffect} from 'react'
import { Box, Inputs,Row,Col } from 'adminlte-2-react';
import SweetAlert from 'react-bootstrap-sweetalert';




const KelasMiniForm = (props) => {


    const [form, setForm] = useState({
        nama_sosis : '',
        jenis_kelas :'bimtek',
        tgl_kelas : '',
        jam_mulai : '',
        jam_selesai : '',
        media: 'online',
        kapasitas : '',
        id_zoom : '',
        password_zoom : ''
    });

    const [disabledBtn, setdisabledBtn] = useState(true);

    const [disabledBox, setdisabledBox] = useState(true);


    useEffect(() => {
        console.log('mounted Form');
        if(props.isEdit) {
            console.log(props);
            setForm({
                ..._.pick(props.initVal,['nama_sosis','jenis_kelas','tgl_kelas','jam_mulai','jam_selesai','media','kapasitas','id_zoom','password_zoom'])
            })
        }
        // return () => {
        //     setdisabledBtn(true)
        //     console.log('Unmounted!!')
        // }
    }, [props]);

    const style = {
        wrapper : {
            marginTop : '20px'
        },
        date : {
            width : '100%'
        },
        label : {
            fontWeight : 'bold'
        },
    };

    const onCancel = e => {
        props.onCancel();
        setdisabledBtn(true)
        setForm({
            nama_sosis : '',
            jenis_kelas :'bimtek',
            tgl_kelas : '',
            jam_mulai : '',
            jam_selesai : '',
            media: 'online',
            kapasitas : '',
            id_zoom : '',
            password_zoom : ''
        })
    }

    const onBlur = e => {
        setdisabledBtn(false);
    }

    const onChange = (e) => {
        // console.log(e.target)
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    };

    const onChangeSelect = e => {

    }

    const { Text , Select, Date } = Inputs;

    return (
        <>
        <SweetAlert
            show={props.show}
            title="Tambah Kelas"
            onConfirm={() => {
                props.onSubmit(form);
                setdisabledBox(false);
            }}
            closeOnClickOutside
            disabled={disabledBtn}
            onCancel={onCancel} // wajib dikasi oncancel karena closeOnClickOutside cuman trigger buat onCancel
        >
                    
                    
            <Box solid collabsable type="danger" icon="fas-users" title="Form Kelas" loaded={disabledBox}>
                <div style={style.wrapper}>

                    <Text 
                        id="nama_sosis" 
                        name="nama_sosis" 
                        placeholder="masukan nama Kelas" 
                        onChange={onChange} 
                        value={form.nama_sosis} 
                        labelPosition="above"
                        label="nama Kelas"
                        type="primary"
                        required
                        size="lg"
                    />
                    <Select 
                        label="jenis kelas"
                        labelPosition="above"
                        id="jenis_kelas" 
                        name="jenis_kelas" 
                        options={[
                            {
                                value : 'bimtek',
                                text: 'Bimtek'
                            },
                            {
                                value : 'kelas',
                                text : 'kelas'
                            }
                        ]}
                        onChange={onChange} 
                        type="primary"
                        required
                        size="lg"
                    /> 
                    <Row>
                        <Col sm={6}>
                        <Select 
                            label="media"
                            labelPosition="above"
                            id="media" 
                            name="media"
                            options={[
                                {
                                    value : 'offline',
                                    text: 'offline'
                                },
                                {
                                    value : 'online',
                                    text : 'online'
                                }
                            ]}
                            onChange={onChange} 
                            type="primary"
                            required
                            size="lg"
                        />  
                        </Col>
                        <Col sm={6}>
                            <Text 
                                id="kapasitas" 
                                name="kapasitas" 
                                placeholder="kapasitas" 
                                onChange={onChange} 
                                value={form.kapasitas} 
                                labelPosition="above"
                                // label="nama Kelas"
                                type="primary"
                                required
                                size="lg"
                            />
                        </Col>
                    </Row>
                    <h5 style={style.label}>Tanggal Kelas</h5>
                    <input 
                        type="date"
                        placeholder="masukan tanggal penerbitan spop"
                        id="tgl_kelas"
                        name="tgl_kelas"
                        onChange={onChange}
                        value={form.tgl_kelas}
                    />
                    <Row>
                        <Col sm={6}>
                            <Text 
                                id="jam_mulai" 
                                name="jam_mulai" 
                                placeholder="mulai" 
                                onChange={onChange} 
                                value={form.jam_mulai} 
                                labelPosition="above"
                                // label="nama Kelas"
                                type="primary"
                                required
                                size="lg"
                            />
                        </Col>
                        <Col sm={6}>                            
                            <Text 
                                id="jam_selesai" 
                                name="jam_selesai" 
                                placeholder="selesai" 
                                onChange={onChange} 
                                value={form.jam_selesai} 
                                labelPosition="above"
                                // label="nama Kelas"
                                type="primary"
                                required
                                size="lg"
                            />
                        </Col>
            
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Text 
                                id="id_zoom" 
                                name="id_zoom" 
                                placeholder="Id Zoom" 
                                onChange={onChange} 
                                value={form.id_zoom} 
                                labelPosition="above"
                                // label="nama Kelas"
                                type="primary"
                                required
                                size="lg"
                            />
                        </Col>
                        <Col sm={6}>                            
                            <Text 
                                id="password_zoom" 
                                name="password_zoom" 
                                placeholder="Password Zoom" 
                                onChange={onChange} 
                                onBlur={onBlur}
                                value={form.password_zoom} 
                                labelPosition="above"
                                // label="nama Kelas"
                                type="primary"
                                required
                                size="lg"
                            />
                        </Col>
            
                    </Row>
                    

                </div>
                

            </Box>
        </SweetAlert>
        </>
    )
}


export default KelasMiniForm;
