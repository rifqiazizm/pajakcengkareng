import React, { Component } from 'react'
import { 
    showError,
    hideError,
    currentWP,
    hideLSPOP,
    showTangkapan,
 } from '../../actions';
import { connect } from 'react-redux'
import { Box, Row,Col, Inputs, Button } from 'adminlte-2-react';
import 'react-toastify/dist/ReactToastify.min.css'
import {Animated} from "react-animated-css";
import exten from '../misc/Axios';



class LoadWP extends Component { 

    
    
    state = {
        disabledBtn : true,
        loadBox : true,
        formV : {
            id : '',
            npwp : '',
            nop : '',
            namaWP : '',
            kode_wilayah :'',
            daerah : ''
        }
    }


   

    onChange = e => {
        this.setState({
            formV : {
                npwp : e.target.value
            }
        })
    }




    errorFunc = (msg,npwp) => {
        console.log(npwp)
            this.props.showError(msg,'NPWP Error!');
            this.setState({
                loadBox : true,
                loadError : true,
                disabledBtn : true,
                formV : {
                    npwp,
                    namaWP: '',
                    nop : '',
                    kode_wilayah : '',
                    daerah : ''
                },
                loadSelect : true,
                errorMsg : msg
            })
    }



    
    onBlur = async (e) => {
        
        console.log(this.state.formV.npwp);
        this.setState({
            loadBox : false
        });

        const path = this.props.path == '/lspop' ? '/wp/fetchWP' : '/wp/fdm';

        const req = await exten.post(path, _.pick(this.state.formV,['npwp']));
     
         
            
            // const data = _.find(this.props.wp, (e) => { return e.npwp == this.state.formV.npwp })
            if(_.head(req.data.data)) { // method head lodash akan mengembalikan undefined jika arraynya kosong
                
                const { id , namaWP , nop , wpp , spop_kembali } = req.data.data[0];
                const npwp = this.state.formV.npwp;

                if(spop_kembali) { 
                    this.setState({
                        formV : {
                            id ,
                            npwp,
                            namaWP,
                            nop,
                            kode_wilayah : wpp.id,
                            daerah : wpp.daerah
                        },
                        loadBox : true,
                        disabledBtn : false
                    })
                    this.props.hideError();
                    this.props.currentWP(req.data.data[0]);
                } else {
                    
                    this.errorFunc('Wajib Pajak ini SPOP nya belum kembali!',npwp)
                }
                
            } else {
                this.errorFunc("NPWP tidak ketemu!",this.state.formV.npwp);
            }
        
    }





    render() {
        const { Text } = Inputs;
        return (  
           <>
              

                

               <Animated animationIn="zoomIn" isVisible={this.props.lspop.renderLSPOP}>
                   <Box title="Form Input" type="primary" icon="fas-fish"  solid loaded={this.state.loadBox} className="box1" >
                   <table className="tableInput">
                        <tbody>      
                            <td className="tdLabel"><p>No NPWP</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="npwp" 
                                name="npwp" 
                                placeholder="masukan npwp 9 digit" 
                                onChange={this.onChange} 
                                onBlur={this.onBlur}
                                value={this.state.formV.npwp} 
                                labelPosition="none"
                                type="primary"
                                required
                                size="lg"    
             
                            />
                            </td>
                        </tbody>
                        <tbody>      
                            <td className="tdLabel"><p>Nama WP</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="namaWP" 
                                name="namaWP" 
                                placeholder="masukan nama WP" 
                                value={this.state.formV.namaWP} 
                                labelPosition="none"
                                size="md"   
                                disabled
                            />
                            </td>
                        </tbody>
                        <tbody>      
                            <td className="tdLabel"><p>No NOP</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="nop" 
                                name="nop" 
                                placeholder="masukan nomor NOP" 
                                value={this.state.formV.nop} 
                                labelPosition="none"
                                size="md"   
                                disabled
                            />
                            </td>
                        </tbody>
                        <tbody>      
                            <td className="tdLabel"><p>WPP NRI</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="wpp" 
                                name="wpp" 
                                placeholder="WPP NRI" 
                                value={this.state.formV.kode_wilayah} 
                                labelPosition="none"
                                size="md"   
                                disabled
                            />
                            </td>
                        </tbody>
                        <tbody>      
                            <td className="tdLabel"><p>daerah penangkapan</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="daerah" 
                                name="daerah" 
                                placeholder="masukan nomor NOP" 
                                value={this.state.formV.daerah} 
                                labelPosition="none"
                                size="md"
                                disabled
                            />
                            </td>
                        </tbody>
                        <tbody>      
                            <td className="tdLabel"><p>Tahun Pajak</p></td> 
                            <td>                             
                            <Text 
                                inputType="text" 
                                id="tahun" 
                                name="tahun" 
                                onChange={this.onChange} 
                                value="2020" 
                                labelPosition="none"
                                size="md"   
                                disabled
                            />
                            </td>
                        </tbody>
                        <tbody>
                            <td></td>
                            <td>
                                <Button type="primary" text="Submit" icon="fa-paper-plane" disabled={this.state.disabledBtn} onClick={this.props.onClickBtn} />
                            </td>
                        </tbody>
                    </table>
                    </Box>
                </Animated>


            </>
        )
    }
}


const mapState = state => {
    return {
        lspop : state.lspop,
    }
}


export default connect(mapState , {
    showError,
    hideError,
    currentWP,
    hideLSPOP,
    showTangkapan
    

})(LoadWP);
