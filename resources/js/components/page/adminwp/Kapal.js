import React, { Component } from 'react'
import { showError,hideError, showTangkapan , hideKapal,showKapal,showLSPOP,inputKapal,deleteKapal} from '../../actions';
import { connect } from 'react-redux'
import { Box,Row,Col , Inputs, Button, Alert } from 'adminlte-2-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Animated} from "react-animated-css";
import DataTable from 'react-data-table-component';
import { toast,Slide } from 'react-toastify';




class Tangkapan extends Component {


    state = {
        loadBox : true,
        form : {},
        loadSwal : false,
        loadSwalDel : false,
        idDel : '',
        disabledBtn : true,
        reRender: false,
        jmlKapal : ''

    }



    componentDidMount() {
       
        this.setState({
            reRender:true,
            jmlKapal : Number(this.props.currentWP.kapal.length)
        })
           
    }
 

    shouldComponentUpdate(nextProps,nextState) {
        if(nextState.reRender) {
            return true
        } else {
            return false
        }
    }


    onConfirm = async () => { // onConfirm form untuk menambah data kapal

        await this.setState({
            loadBox: false,
            form: {
                ...this.state.form,
                wajibpajak_id: this.props.currentWP.id
            },
            reRender : true
        })

        this.props.inputKapal(this.state.form)
            .then(e => {    

                if(e) {
                    this.setState({
                        jmlKapal : Number(this.state.jmlKapal)+1,
                        loadSwal : false,
                        loadBox : true,
                        form : {},
                        disabledBtn : true
                    })
                    
                    toast.success('Data Kapal Ditambah!', {
                        position: "top-right",
                        autoClose : 2000,
                        closeOnClick: true
                    })
                } else {
                    this.onCancel();
                    toast.warning("tambah Kapal error", {
                        position: "top-right",
                        autoClose : 2000,
                        closeOnClick: true
                    })

                }
           
            })

    }

    onClickNav = (e) => {
        console.log(e.target.id)
        if(e.target.id == 'previous') {
            this.props.hideKapal();
            this.props.showTangkapan();
        } else {
            this.props.hideKapal();
           this.props.showLSPOP();
           
        }
    }



    onClickBtn = () => {
        console.log('clicked');
        this.setState({
            loadSwal : true,
            reRender : true
        })
    }



    onChange = (e) => {
        
        this.setState({
            form : {
                ...this.state.form,
                [e.target.id] : e.target.value
            }
        })
    }



    onCancel = () => {
        this.setState({
            loadSwal : false,
            loadBox : true,
            form : {},
            disabledBtn : true
        })
    }



    onClickTable = async(e) => { // button delete onCLick (untuk memunculkan Swal delete)
        
        
        await this.setState({
            loadSwalDel : true,
            idDel : e.target.dataset.kapalId
        })
        console.log("yang akan di delete ID nya = "+this.state.idDel);
    }
 


    onConfirmDel = () => {
        this.props.deleteKapal(this.state.idDel)
            .then(e => {
                
               
                if(e) {
                    this.setState({
                        loadSwalDel : false,
                        jmlKapal : Number(this.state.jmlKapal)-1
                    })

                    toast.error('Data Kapal Dihapus!', {
                            position: "top-right",
                            autoClose : 2000,
                            closeOnClick: true,
                            transition : Slide
                    })
                }
            })
    }


    onFocus = () => { 
        this.setState({
            reRender : false
        })
    }

    onBlur = (e) => {
        

        if(_.keys(this.state.form).length === 4 && e.target.value.length > 0) {
            this.setState({
                reRender : true,
                disabledBtn : false
            })
        } else {
            this.setState({
                reRender : true,
                disabledBtn : true
            })
        }
    }



    render() {
        const { Text } = Inputs;

        console.log('rendered!!')
                    
   

        return (  
           <>
                <SweetAlert
                    warning
                    showCancel
                    show={this.state.loadSwalDel}
                    confirmBtnText="Ya, Hapus!"
                    confirmBtnBsStyle="danger"
                    title="yakinnn???"
                    onConfirm={this.onConfirmDel}
                    onCancel={() => { this.setState({loadSwalDel : false}) }}
                    >
                    Data Kapal ini akan dihapus!
                </SweetAlert>


                <SweetAlert
                    show={this.state.loadSwal}
                    onConfirm={this.onConfirm}
                    title=""
                    closeOnClickOutside
                    showCancel
                    onCancel={this.onCancel}
                    disabled={this.state.disabledBtn}
                >
                 <Box title="Masukan Kapal" type="danger" icon="fas-fish" collapsable  loaded={this.state.loadBox} solid className="boxMiniform">
                <Row>
                    <Col sm={12}>
                        <Text 
                            inputType="text" 
                            id="nama_kapal" 
                            name="nama_kapal" 
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            label="Nama Kapal"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"
                            onBlur={this.onBlur}
                        />
                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="no_siup" 
                            name="no_siup" 
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            label="No SIUP"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"
                            onBlur={this.onBlur}
                        />
                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="no_sipi" 
                            name="no_sipi" 
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            label="No SIPI"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"
                            onBlur={this.onBlur}
                        />
                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="berat" 
                            name="berat" 
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            label="Berat Kapal"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            addonRight="GT"
                            className="inputTangkapan1"
                            onBlur={this.onBlur}
                        />
                    
                        <div className="jarakInput"></div>
                    </Col>
                </Row>
                </Box>
          
                </SweetAlert>

               <Animated animationIn="zoomIn" isVisible={this.props.render}>

                    <Box title=" WP dipilih" type="danger" icon="fa-user" solid className="box1">
                    <Row>
                        <Col sm={6}>
                        <Text 
                                inputType="text" 
                                id="nama" 
                                name="nama" 
                                value={this.props.currentWP.namaWP}
                                disabled
                                label="nama"
                                labelPosition="left"
                                labelClass="labelTangkapan"
                                type="primary"
                                required
                                size="md"   
                                labelMd={3}
                                md={9}
             
                            />
                            
                            <Text 
                                inputType="text" 
                                id="npwp" 
                                name="npwp" 
                                value={this.props.currentWP.npwp}
                                disabled
                                label="NPWP"
                                labelPosition="left"
                                type="primary"
                                required
                                size="md"   
                                labelClass="labelTangkapan"
                                labelMd={3}
                                md={9}
             
                            />


                            <Text 
                                inputType="text" 
                                id="kode" 
                                name="kode" 
                                value={this.props.currentWP.wpp.kode}
                                disabled
                                label="Kode Wil"
                                labelPosition="left"
                                labelClass="labelTangkapan"
                                type="danger"
                                required
                                size="md"   
                                labelMd={3}
                                md={9}
                            />

                            
                        </Col>

                        <Col sm={6}>
                        
                         
                            
                            <Text 
                                inputType="text" 
                                id="daerah" 
                                name="daerah" 
                                value={this.props.currentWP.wpp.daerah}
                                disabled
                                label="daerah"
                                labelPosition="left"
                                type="primary"
                                required
                                size="md"   
                                labelClass="labelTangkapan"
                                labelMd={3}
                                md={9}
             
                            />
                         
                            <Text 
                                inputType="text" 
                                id="luas" 
                                name="luas" 
                                value={this.props.currentWP.wpp.luas}
                                disabled
                                label="Luas Wilayah"
                                labelPosition="left"
                                labelClass="labelTangkapan"
                                type="danger"
                                required
                                size="md"   
                                labelMd={3}
                                md={9}
             
                            />
                            <Text 
                                inputType="text" 
                                id="kapal" 
                                name="kapal" 
                                value={this.props.currentWP.kapal.length}
                                disabled
                                label="kapal"
                                labelPosition="left"
                                labelClass="labelTangkapan"
                                type="danger"
                                required
                                size="md"   
                                labelMd={3}
                                md={9}
             
                            />
                            
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col sm={6}>
                        <Button id="previous" className="btnTangkap" type="danger" size="md"  icon="fas-chevron-circle-left" onClick={this.onClickNav} />
                        </Col>
                        <Col sm={6}>
                        <Button id="next" className="btnTangkap" pullRight type="danger" size="md" icon="fas-chevron-circle-right"  onClick={this.onClickNav} />
                        </Col>
                    </Row>

                    </Box>


                   <Box title="Input Kapal" type="warning" icon="fas-fish" solid className="box1" >
                   
                        <DataTable 
                           title="Kapal WP"
                           data={
                               this.props.currentWP.kapal
                           }
                           columns={[
                              {
                                name: 'Nama Kapal',
                                selector: 'nama_kapal',
                                sortable: true,
                              },
                             
                              {
                                name: 'No SIUP',
                                selector: 'no_siup',
                                sortable: true,
                                

                              },
                              {
                                name: 'No SIPI',
                                selector: 'no_sipi',
                                sortable: true,
                            
                              },
                             
                              {
                                name: 'aksi',
                                cell : (row) => {
                          
                                    return (
                                        <div>
                                           <button id="delete " className="deleteBtn" data-kapal-id={row.id} onClick={this.onClickTable} >delete</button>
                                        </div>
                                    )
                                },
                                sortable: true,
                            
                              },
                           ]} 
                           responsive
                           striped
                           pagination
                           highlightOnHover
                           subHeader={true}
                           subHeaderComponent={(
                                <div>
                                    <Button type="danger" size="sm" id="inpuTangkap" text="tambah Kapal" icon="fa-plus" onClick={this.onClickBtn} />
                                </div>
                           )}
                           subHeaderAlign="right"
                           
                           

                        /> 

                           <Row>
                               <Col sm={6}></Col>
                               <Col sm={6}>
                               <Text 
                                    inputType="text" 
                                    id="total" 
                                    name="total" 
                                    value={this.state.jmlKapal}
                                    label="Total Kapal"
                                    labelPosition="left"
                                    labelClass="labelTangkapan"
                                    type="primary"
                                    required
                                    size="md"   
                                    labelMd={4}
                                    md={8}
                                    disabled
                                    className="inputTangkapan1"
                                />
                               </Col>
                           </Row>
                    </Box>
                </Animated>

       
            </>
        )
    }
}


const mapState = state => {
    return {
        error : state.renderError.show, 
        render : state.lspop.renderKapal,
        currentWP : state.lspop.currentWP
    }
}


export default connect(mapState , {
    showError,
    hideError,
    showTangkapan,
    hideKapal,
    showKapal,
    showLSPOP,
    inputKapal,
    deleteKapal
})(Tangkapan);
