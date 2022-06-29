import React, { Component } from 'react'
import { showError,hideError, showLSPOP , hideTangkapan,showKapal,inputTangkapan , deleteTangkapan,dottedNumber} from '../../actions';
import { connect } from 'react-redux'
import { Box,Row,Col , Inputs, Button } from 'adminlte-2-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Animated} from "react-animated-css";
import DataTable from 'react-data-table-component';
import { toast,Slide } from 'react-toastify';




class Tangkapan extends Component {


    state = {
        loadBox : true,
        form : {},
        bruto : '',
        loadSwal : false,
        loadSwalDel : false,
        idDel : 0,
        disabledBtn : true

    }



    componentDidMount() {
        
                let currentBruto = ''
                const { tangkapan } = this.props.currentWP;
                if(tangkapan) {
                    _.forEach(tangkapan, (e) => {
                        console.log(Number(e.harga) * Number(e.berat))
                        currentBruto = Number(currentBruto) + (Number(e.harga) * Number(e.berat))
                    });

                    
                    console.log(tangkapan)
                }
                
                this.setState({
                    bruto : currentBruto
                })

                
        
            
    }
 

    shouldComponentUpdate(nextProps,nextState) {
        if(nextState.form.ikan || nextState.form.berat || nextState.form.harga ) {
            if(!nextState.disabledBtn) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }


    onConfirm = async () => {

        await this.setState({
            loadBox: false,
            form: {
                ...this.state.form,
                wajibpajak_id: this.props.currentWP.id
            }
        })

        

        this.props.inputTangkapan(this.state.form)
            .then(e => {
            

                if(e) {
                    const {harga,berat} = this.state.form;
                    let currentBruto = Number(harga)*Number(berat);
                    this.setState({
                        bruto : Number(this.state.bruto) + Number(currentBruto),
                        loadSwal : false,
                        loadBox : true,
                        form : {},
                        disabledBtn : true
                    })
                    
                    toast.success('Data Tangkapan Ditambah!', {
                        position: "top-right",
                        autoClose : 2000,
                        closeOnClick: true
                    })
                } else {
                    this.onCancel();
                    toast.warning(e.data.errors.harga[0], {
                        position: "top-right",
                        autoClose : 2000,
                        closeOnClick: true
                    })

                }
            });
           


    }

    onClickNav = (e) => {
        console.log(e.target.id)
        if(e.target.id == 'previous') {
            this.props.hideTangkapan();
            this.props.showLSPOP();
        } else {
           this.props.hideTangkapan();
           this.props.showKapal();
        }
    }



    onClickBtn = () => {
        this.setState({
            loadSwal : true
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



    onClickTable = async(e) => {
        
        
        await this.setState({
            loadSwalDel : true,
            idDel : e.target.dataset.ikanId
        })
        console.log(this.state.idDel)
       
    }
 

    onConfirmDel = () => {
        this.props.deleteTangkapan(this.state.idDel)
            .then(e => {
                
                if(e) {
                    let currentBruto = 0
                    _.forEach(this.props.currentWP.tangkapan,(e) => {
                        if(e.id == this.state.idDel) {
                            currentBruto = Number(e.harga)*Number(e.berat);
                        }
                    })
                    console.log(currentBruto)

                    this.setState({
                        loadSwalDel : false,
                        bruto : Number(this.state.bruto) - Number(currentBruto)
                    })
                    toast.error('Data Tangkapan Dihapus!', {
                            position: "top-right",
                            autoClose : 2000,
                            closeOnClick: true,
                            transition : Slide
                        })
                } else {
                    toast.warning('Data tangkapan gagal dihapus!', {
                        position: "top-right",
                        autoClose : 2000,
                        closeOnClick: true,
                        transition : Slide
                    })
                }
                    
            })
    }


    onFocus = () => { // fungsi ini cuman buat menghindari re render saja, button akan ttp bisa diklik (cek shouldComponentUpdate)
        this.setState({
            disabledBtn : true
        })
    }

    onBlurTotal = (e) => {
 
        const berat = this.state.form.berat ? this.state.form.berat:1;
        const harga = this.state.form.harga ? this.state.form.harga:1;

        
        this.setState({
            disabledBtn : false,
            form : {
                ...this.state.form,
                total : Number(berat) * Number(harga)
            }
        })
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
                    Data Tangkapan ini akan dihapus!
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
                 <Box title="Masukan Tangkapan" type="danger" icon="fas-fish" collapsable  loaded={this.state.loadBox} solid className="boxMiniform">
                <Row>
                    <Col sm={12}>
                        <Text 
                            inputType="text" 
                            id="ikan" 
                            name="ikan" 
                            onChange={this.onChange}

                            
                            label="Nama Ikan"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"

                        />
                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="berat" 
                            name="berat"
                            onFocus={this.onFocus} 
                            onChange={this.onChange}
                            label="Berat Ikan"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"
                            addonRight="KG"
                            onBlur={this.onBlurTotal}
                            
                        />

                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="harga" 
                            name="harga" 
                            onFocus={this.onFocus}
                            onChange={this.onChange}
                            label="Harga Ikan"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            required
                            size="md"   
                            labelMd={4}
                            addonLeft="Rp."
                            md={8}
                            className="inputTangkapan1"
                            onBlur={this.onBlurTotal}
                        />


                        <div className="jarakInput"></div>
                        <Text 
                            inputType="text" 
                            id="total" 
                            name="total" 
                            value={dottedNumber(this.state.form.total)}
                            label="Total Harga"
                            labelPosition="left"
                            labelClass="labelTangkapan"
                            type="primary"
                            disabled
                            addonLeft="Rp."
                            size="md"   
                            labelMd={4}
                            md={8}
                            className="inputTangkapan1"
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
                                labelClass="labelTangkapan"
                                type="primary"
                                required
                                size="md"   
                                labelMd={3}
                                md={9}
             
                            />
                            
                            <Text 
                                inputType="text" 
                                id="tangkapan" 
                                name="tangkapan" 
                                value={this.props.currentWP.tangkapan.length}
                                disabled
                                label="Tangkapan"
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
                                id="bruto" 
                                name="bruto" 
                                value={this.state.bruto}
                                disabled
                                label="Pendapatan"
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


                   <Box title="Input Tangkapan" type="warning" icon="fas-fish" solid className="box1" >
                   
                        <DataTable 
                           title="Tangkapan WP"
                           data={
                               this.props.currentWP.tangkapan
                           }
                           columns={[
                              {
                                name: 'Nama Ikan',
                                selector: 'ikan',
                                sortable: true,
                              },
                             
                              {
                                name: 'Berat Tangkapan ',
                                selector: 'berat',
                                sortable: true,
                                

                              },
                              {
                                name: 'Harga Per KG',
                                sortable: true,
                                cell : (row) => {
                                    return(
                                        <div>
                                            {dottedNumber(row.harga)}
                                        </div>
                                    )
                                }
                            
                              },
                             
                              {
                                name: 'aksi',
                                cell : (row) => {
                          
                                    return (
                                        <div>
                                           <button id="delete " className="deleteBtn" data-ikan-id={row.id} onClick={this.onClickTable} >delete</button>
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
                                    <Button type="danger" size="sm" id="inpuTangkap" text="tambah Tangkapan" icon="fa-plus" onClick={this.onClickBtn} />
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
                                    value={dottedNumber(this.state.bruto)}
                                    label="Total Pendapatan"
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
        render : state.lspop.renderTangkapan,
        currentWP : state.lspop.currentWP
    }
}


export default connect(mapState , {
    showError,
    hideError,
    showLSPOP,
    hideTangkapan,
    showKapal,
    inputTangkapan,
    deleteTangkapan
})(Tangkapan);
