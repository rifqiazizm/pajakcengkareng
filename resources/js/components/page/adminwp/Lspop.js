import React, { Component } from 'react'
import { 
    showError,
    hideError,
    currentWP,
    showLSPOP,
    hideLSPOP,
    showTangkapan,
    delcurrentWP,
    hideTangkapan,
    hideKapal
 } from '../../actions';
import { connect } from 'react-redux'
import { Content,  Inputs, Button } from 'adminlte-2-react';
import AlertError from '../misc/AlertError';
import Tangkapan from './Tangkapan';
import Kapal from './Kapal';
import LoadWP from '../misc/LoadWP';


class Lspop extends Component { 




    componentWillUnmount() { // supaya bisa balik ke awal masukin currentWP jika keluar dari halaman LSPOP
        this.props.delcurrentWP();
        this.props.showLSPOP();
        this.props.hideKapal();
        this.props.hideTangkapan();
        this.props.hideError();// antisipasi jika pindah halaman tetapi pesan error masi muncul
        console.log('lembar LSPOP Unmoounted!')

    }

    onClickBtn = e => {
        this.props.hideLSPOP();
        this.props.showTangkapan();
    }




    render() {
        const { Text } = Inputs;
        console.log('LSPOP Telah di render')
        return (  
           <>
               <Content title="input Data Kapal dan Tangkapan" browserTitle="Lampiran SPOP">

                
                    

               
                
                    

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
                    this.props.lspop.renderTangkapan ? 
                    <Tangkapan/> 
                    
                    : ''
                }

                {
                    this.props.lspop.renderKapal ? 
                    <Kapal /> 
                    
                    : ''
                }


                {
                    this.props.lspop.renderLSPOP ?
                    <LoadWP onClickBtn={this.onClickBtn} path={this.props.history.location.pathname} />
                    :''
                }

               </Content>
            </>
        )
    }
}


const mapState = state => {
    return {
        error : state.renderError,
        lspop : state.lspop
    }
}


export default connect(mapState , {
    showError,
    hideError,
    currentWP,
    showLSPOP,
    hideLSPOP,
    showTangkapan,
    delcurrentWP,
    hideTangkapan,
    hideKapal

})(Lspop);
