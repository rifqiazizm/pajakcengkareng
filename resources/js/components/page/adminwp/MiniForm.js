import React, { Component } from 'react'
import { Row, Box, Col , Inputs } from 'adminlte-2-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Error from '../misc/Error';
import { editWP,hideAlert,fetchSPOP } from '../../actions/index';
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert';
import exten from '../misc/Axios';



class MiniForm extends Component {


    state = {
        postData : { 
            id : '',
            npwp : '',
            namaWP : '',
            nop : '',
            wpp_id : ''
        },
        disabledBtn : true,
        loadBox : true,
        loadSelect : true,
        loadError : false,
        confirmSwal : false,
        select2 : {
            value : [{
                value : '571',
                label : 'WPP NRI 571'
            },{
                value : '572',
                label : 'WPP NRI 572'
            },{
                value : '573',
                label : 'WPP NRI 573'
            },{
                value : '711',
                label : 'WPP NRI 711'
            },{
                value : '712',
                label : 'WPP NRI 712'
            },{
                value : '713',
                label : 'WPP NRI 713'
            },{
                value : '714',
                label : 'WPP NRI 714'
            },{
                value : '715',
                label : 'WPP NRI 715'
            },{
                value : '716',
                label : 'WPP NRI 716'
            },{
                value : '717',
                label : 'WPP NRI 717'
            },{
                value : '718',
                label : 'WPP NRI 718'
            }]
        }
    }


    onConfirm = async (e) => {
        await this.setState({
            loadBox : false,
            postData : {
                ...this.state.postData,
                spop_kembali : true
            }
            
        });
        const res = await this.props.editWP(this.state.postData.id, _.pick(this.state.postData,['spop_kembali','wpp_id']));

           
        if(res) {
            this.props.hideAlert();
            this.setState({
                confirmSwal : true,
                loadBox : true,
                postData : {},
                disabledBtn : true,
                loadSelect : true
            });

        } else {
            this.setState({
                loadBox : true
                
            })
        }
         
        
    }

    onChange = e => {
        this.setState({
            postData : { 
                npwp : e.target.value
            }
        });
    }

    onChangeSelect2 = e => {
        
        this.setState({
            postData : {
                ...this.state.postData,
                wpp_id : e.value
            },
            disabledBtn : false
        })

    }

    onCancel = e => {
        this.setState({
            loadBox : true,
            postData : {},
            disabledBtn : true,
            loadSelect : true,
            loadError : false
        });
        this.props.hideAlert();
    }

    onBlur = async (e) => {
        console.log('on Blur executed');
        this.setState({
            loadBox : false
        });

        const req = await exten.post('/wp/fetchWP', _.pick(this.state.postData,['npwp']));

        if(_.head(req.data.data)) { // method head lodash akan mengembalikan undefined jika arraynya kosong
            let { id , namaWP , nop,npwp } = req.data.data[0];
            this.setState({
                postData : {
                    id ,
                    namaWP,
                    nop,
                    npwp,
                },
                loadBox : true,
                loadSelect : false,
                loadError : false,
                
            })
            
        } else {
            this.setState({
                loadBox : true,
                loadError : true,
                postData : {
                    namaWP: '',
                    nop : ''
                },
                loadSelect : true,
                disabledBtn : true
            })
        }
    }


    render() {
        const { Text } = Inputs;


        return (
            <div>

            <SweetAlert
                show={this.state.confirmSwal}
                success
                title="Berhasil!"
                timeout={1}
                onConfirm={() => { this.setState({ confirmSwal : false }) }  }
            >
                Data pengembalian SPOP berhasil di update!
                
            </SweetAlert>

            <SweetAlert
                show={this.props.swal}
                title="rekam SPOP yang kembali"
                onConfirm={this.onConfirm}
                closeOnClickOutside
                onCancel={this.onCancel}
                disabled={this.state.disabledBtn}
                
            >

     
            <hr />
            <Box title="input here" type="danger" collapsable solid  loaded={this.state.loadBox} className="boxMiniform">


                        <Text 
                            inputType="text" 
                            id="npwp" 
                            name="npwp" 
                            placeholder="masukan npwp 9 digit" 
                            onChange={this.onChange} 
                            onBlur={this.onBlur}
                            value={this.state.postData.npwp} 
                            labelPosition="none"
                            type="primary"
                            required
                            size="lg"   
             
                        />
                       {this.state.loadError ? <Error tulisan="npwp tidak ditemukan" render={this.state.loadError} /> : null } 
                <Row>
          
                    <Col sm={6}>
                           
                        <Text 
                            inputType="text" 
                            id="namaWP" 
                            name="namaWP" 
                            placeholder="nama wajib pajak" 
                            value={this.state.postData.namaWP} 
                            labelPosition="none"
                            type="primary"
                            size="md"   
                            disabled
             
                        />
                    </Col>
                    <Col sm={6}>
                        <Text 
                            inputType="text" 
                            id="nop" 
                            name="nop" 
                            placeholder="no NOP WP" 
                            value={this.state.postData.nop} 
                            labelPosition="none"
                            type="primary"
                            size="md"   
                            disabled
                
                            />
                    </Col>
                </Row>
                         <Select 
                            id="wpp"
                            name="wpp"
                            placeholder="Wilayah Penangkapan"
                            onChange={this.onChangeSelect2}
                            options={this.state.select2.value}
                            autofocus
                            components={makeAnimated()}
                            isDisabled={this.state.loadSelect}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPortalTarget={document.body}
                        />
 
                </Box>
                
            </SweetAlert>
            </div>
      
        )
    }
}

const mapState = state => {
    return {
        wp   : state.wajibpajak,
        swal : state.sweetalert.show 
    }
}

export default connect(mapState , {
    editWP,
    hideAlert,
    fetchSPOP
})(MiniForm)