import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Content, Box,Row,Col , Inputs, Button, Infobox,ButtonGroup } from 'adminlte-2-react';
import LoadWP from '../misc/LoadWP';
import { hideLSPOP,showLSPOP,delcurrentWP,hideError,dottedNumber } from '../../actions';
import AlertError from '../misc/AlertError';
import {Animated} from "react-animated-css";
import DataTable from 'react-data-table-component';
import exten from '../misc/Axios';




class Fdm extends Component {

    state = {
        loadFdm : false,
        showTangkapan : true,
        button : "Lihat kapal"
    }


    onClick = e => {

        this.setState({
            loadFdm : true
        })
        this.props.hideLSPOP();

    }

    onClickBtn = () => {
        let text = this.state.showTangkapan ? "Lihat Tangkapan" : "Lihat Data Kapal" ;

        this.setState({
            showTangkapan : !this.state.showTangkapan,
            button : text
        })
    }

    kertasKerja = (e) => {
        exten.post('/wp/kertasKerja',this.props.lspop.currentWP.npwp);
    }

    componentWillUnmount() { // supaya bisa balik ke awal masukin currentWP jika keluar dari halaman LSPOP
        this.props.delcurrentWP(); 
        this.props.showLSPOP();
        this.props.hideError();// antisipasi jika pindah halaman tetapi pesan error masi muncul
        console.log('lembar LSPOP Unmoounted!')

    }


    render() {
        const { Text } = Inputs;


        return (
            <div>
                <Content title="input FDM dan Kertas kerja" browserTitle="FDM">

                {
                    this.props.error.show ? 
                    <div>
                    <AlertError
                        title={this.props.error.body.title}
                        text={this.props.error.body.msg}
                        visible={this.props.error.show}
                    /></div>:null
                }
                     
                {
                    this.state.loadFdm ?
                    <Animated animationIn="fadeIn" isVisible={this.state.loadFdm  }>
                        <Row>
                            <Col sm={3}>
                                    <Infobox
                                        id="user"
                                        icon="fa-user"
                                        color="maroon"
                                        text="Wajib Pajak"
                                        number={this.props.lspop.currentWP.namaWP}
                                        progress="80"
                                        progressText={`NOP = ${this.props.lspop.currentWP.nop}`}
                                        iconColorOnly={true}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Infobox
                                        id="tangkapan"
                                        icon="fas-fish"
                                        color="blue"
                                        text="Pendapatan Bruto"
                                        number={(this.props.lspop.currentWP.pbb.tangkapanTot)}
                                        progress="80"
                                        progressText={`Total ikan =  ${this.props.lspop.currentWP.pbb.jml_ikan}`}
                                        iconColorOnly={true}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Infobox
                                        id="kapal"
                                        icon="fas-anchor"
                                        color="aqua"
                                        text="Jumlah Kapal"
                                        number={this.props.lspop.currentWP.pbb.jumlah_kapal}
                                        progress="80"
                                        progressText={`Luas Wilayah ${(this.props.lspop.currentWP.pbb.luas_wilayah)}`}
                                        iconColorOnly={true}
                                    />
                                </Col>
                                
                                <Col sm={3}>
                                    <Infobox
                                        id="pbb"
                                        icon="fas-file-invoice-dollar"
                                        color="red"
                                        text="PBB Terutang"
                                        number={(this.props.lspop.currentWP.pbb.pbb)}
                                        progress="80"
                                        progressText={`Nilai Bumi = ${this.props.lspop.currentWP.pbb.nilaiBumi_perM}`}
                                        iconColorOnly={true}
                                    />
                                </Col>
                        </Row>
                        
                      
                           
                        <Row>
                            <Col sm={7}>
                            
                                <Box title="Komponen Perhitungan" type="danger" icon="fas-list" collapsable  loaded={this.state.loadFdm}>
                                
                                    <Button type="danger" className="btnFDM" size="sm" id="inpuTangkap" text={this.state.button} icon="far-eye" onClick={this.onClickBtn} />

                                    <a href={`/cetak/kertasKerja/${this.props.lspop.currentWP.id}`}>
                                        <Button type="primary" className="btnFDM" size="sm" id="kertasKerja" text="Cetak Kertas Kerja" icon="fas-file-excel"/>
                                    </a>
                                    <a href={`/cetak/FDM/${this.props.lspop.currentWP.id}`}>
                                        <Button type="info" className="btnFDM" size="sm" id="kertasKerja" text="Cetak FDM" icon="far-file-excel"  />
                                    </a>

                                { !this.state.showTangkapan ? 
                                <Animated animationIn="fadeIn" isVisible={!this.state.showTangkapa} animatedInDelay={700}>
                                    <DataTable 
                                        title="Data kapal"
                                        data={
                                            this.props.lspop.currentWP.kapal
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
                                                
                                            
                                            }
                                        ]} 
                                        responsive
                                        striped
                                        pagination
                                        highlightOnHover

                                        /> 
                                </Animated>
                                :''}
                                
                                { this.state.showTangkapan ? 
                                <Animated animationIn="fadeIn" isVisible={this.state.showTangkapan  }>
                                    <DataTable 
                                        title="Data Tangkapan"
                                        data={
                                            this.props.lspop.currentWP.tangkapan
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

                                            }
                                        ]} 
                                        responsive
                                        striped
                                        pagination
                                        highlightOnHover
                                        /> 
                                
                                </Animated>
                                :''}
                                </Box>


                            </Col>
                            <Col sm={5}>
                                <Box type="warning" title="Rincian Perhitungan" icon="fas-info-circle" collapsable  loaded={this.state.loadFdm}>
                                    <Row>
                                        <Col sm={2}></Col>
                                        <Col sm={10}>
                                        <Text 
                                            inputType="text" 
                                            name="njop"
                                            label="NJOP"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value={(this.props.lspop.currentWP.pbb.njop)}
                                        />
                                        <div className="jarakInput"></div>
                                        <Text 
                                            inputType="text" 
                                            name="njoptkp"
                                            label="NJOPTKP"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value={(this.props.lspop.currentWP.pbb.njoptkp)}
                                        />
                                        <div className="jarakInput"></div>
                                        <Text 
                                            inputType="text" 
                                            name="njopkp"
                                            label="NJOPKP"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value={(this.props.lspop.currentWP.pbb.njopkp)}
                                        />
                                        <div className="jarakInput"></div>
                                        <Text 
                                            inputType="text" 
                                            name="persen"
                                            label="Presentase"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value="40"
                                            addonRight="%"
                                        />
                                        <div className="jarakInput"></div>
                                        <Text 
                                            inputType="text" 
                                            name="njkp"
                                            label="NJKP"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value={this.props.lspop.currentWP.pbb.njkp}
                                            
                                        />
                                        <div className="jarakInput"></div>
                                        <Text 
                                            inputType="text" 
                                            name="pbb"
                                            label="PBB Terutang"
                                            labelPosition="left"
                                            labelClass="labelTangkapan"
                                            type="primary"
                                            required
                                            size="md"   
                                            labelMd={3}
                                            md={9}
                                            className="inputTangkapan1"
                                            disabled
                                            value={this.props.lspop.currentWP.pbb.pbb}
                                           
                                        />
                                        <div className="jarakInput"></div>
                                        </Col>
                                    </Row>
                                </Box>
                            </Col>


                        </Row>


                    </Animated>
                 
                    :''
                }

                {
                    this.props.lspop.renderLSPOP ?
                        <LoadWP onClickBtn={this.onClick} />
                    :''
                }





                </Content>
            </div>
        )
    }
}



const mapState = (state) => {
    return {
        lspop : state.lspop,
        error : state.renderError
    }
}



export default connect(mapState, {
    showLSPOP,
    hideLSPOP,
    delcurrentWP,
    hideError
})(Fdm) 