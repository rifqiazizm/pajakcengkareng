import React, { Component } from 'react'
import { Content, Row, Col , Inputs } from 'adminlte-2-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Error from '../misc/Error';

class  WPform extends Component {
    state = {
        formV : {
            npwp : '',
            namaWP : '',
            nop : '',
            alamat : '',
            kelurahan : '',
            no_spop : '',
            tgl_spop : '',

        },
        formType : {
            npwp : '',
            namaWP : '',
            nop : '',
            alamat : '',
            kelurahan : '',
            no_spop : '',
            tgl_spop : '',

        },
        select2 : {
            value : [{
                value : 'cengkareng timur',
                label : 'cengkareng timur'
            },{
                value : 'cengkareng barat',
                label : 'cengkareng barat'
            },{
                value : 'rawa buaya',
                label : 'Rawa Buaya'
            },{
                value : 'duri kosambi',
                label : 'Duri Kosambi'
            },{
                value : 'kapuk',
                label : 'kapuk'
            },{
                value : 'kedaung kali angke',
                label : 'kedaung kali angke'
            }]
        },
        formValid : {
            value : true,
            errorMsg : []
        },
    }


    componentDidMount() {
        if(this.props.initialValue) {
            this.setState({
                formV : {
                    ..._.pick(this.props.initialValue,['npwp','namaWP','nop','alamat','kelurahan','no_spop','tgl_spop'])
                }
            })
            
        }
    }
  
    onSubmit = async (e) => {
 
        e.preventDefault();
        const errorMsg = "kolom NOP, NPWP dan No SPOP hanya berupa angka!";
        var error = {value : true,errorMsg : ''}
        Object.keys(this.state.formV).forEach((val,index) => {
            const cekNum = isNaN(this.state.formV[val]);
            console.log("kolom "+this.state.formV[val]+" isinya ada " + this.state.formV[val].length)
            if(String(this.state.formV[val]).length > 0) {
                if([0,2,5].includes(index)) {
                    if(cekNum) {
                        error = {
                            value : false,
                            errorMsg : `${errorMsg} value = ${val},index = ${index}`
                        }                  
                        // console.log("kolom yang bukan angka" + this.state.formV[val])                       
                    }                    
                }
                // console.log("lebih dari 0 value")
            } else {
               error = {
                    value : false,
                    errorMsg : "nilai tidak boleh kosong"
               }
          
                // console.log("nilai value 0") 
            }
           
        });
        
        await this.setState({
            formValid : {
                ...error
            }
        });
        console.log(this.state.formValid)
        console.log(error)
     
        if(this.state.formValid.value) {
            this.props.onSubmit(this.state.formV);
            this.setState({
                formV : {
                    npwp : '',
                    namaWP : '',
                    nop : '',
                    alamat : '',
                    no_spop : '',
                    tgl_spop : '',
        
                }
            })
        }


    }
    onChangeDate = e => {
        console.log(e.target.value);
        this.setState({
            formV : {
                ...this.state.formV,
                tgl_spop : e.target.value
            }
        })
    }

    onChangeSelect2 = e => {
        this.setState({
            formV : {
                ...this.state.formV,
                kelurahan : e.value
            }
        })
    }

    onChange = (e) => {
        this.setState({
            formV : {
                ...this.state.formV,
                [e.target.id] : e.target.value
            }
            
        })
    }

 
    render() {

        const { Text } = Inputs;

        return (
            <>
                <Row>
                            <Col sm={12}>
                            { this.state.formValid.value ?  ''  : <Error tulisan={this.state.formValid.errorMsg} render={!this.state.formValid.value} />}
                           
                                <form onSubmit={this.onSubmit}>
                                    <table className="tableInput">
                                        <tr>      



                                            <td className="tdLabel"><p>No NPWP</p></td> 
                                            <td>                             
                                            <Text 
                                                inputType="text" 
                                                id="npwp" 
                                                name="npwp" 
                                                placeholder="masukan no NPWP" 
                                                onChange={this.onChange} 
                                                value={this.state.formV.npwp} 
                                                labelPosition="none"
                                                type={this.state.formType.npwp} 
                                                required
                                                size="md"   
                                            />

                                            </td>
                                        </tr>
                                        <tr>      
                                            <td className="tdLabel"><p>Nama WP</p></td> 
                                            <td>                             
                                            <Text 
                                                inputType="text" 
                                                id="namaWP" 
                                                name="namaWP" 
                                                placeholder="masukan nama WP" 
                                                onChange={this.onChange} 
                                                value={this.state.formV.namaWP} 
                                                labelPosition="none"
                                                type={this.state.formType.namaWP} 
                                                
                                                size="md"   
                                            />

                                            </td>
                                        </tr>
                                        <tr>      
                                            <td className="tdLabel"><p>No NOP</p></td> 
                                            <td>                             
                                            <Text 
                                                inputType="text" 
                                                id="nop" 
                                                name="nop" 
                                                placeholder="masukan nomor NOP" 
                                                onChange={this.onChange} 
                                                value={this.state.formV.nop} 
                                                labelPosition="none"
                                                type={this.state.formType.nop} 
                                                size="md"   
                                            />

                                            </td>
                                        </tr>
                                        <tr>      
                                            <td className="tdLabel"><p>alamat</p></td> 
                                            <td>                             
                                            <Text 
                                                inputType="text" 
                                                id="alamat" 
                                                name="alamat" 
                                                placeholder="masukan alamat tanpa kelurahan" 
                                                onChange={this.onChange} 
                                                value={this.state.formV.alamat} 
                                                labelPosition="none"
                                                type={this.state.formType.alamat} 
                                                size="md"   
                                            />

                                            </td>
                                        </tr>
                                       
                                        <tr>      
                                            <td className="tdLabel tdplus"><p>tgl himbauan spop</p></td> 
                                            <td>                             
                                            <input 
                                                type="date"
                                                placeholder="masukan tanggal penerbitan spop"
                                                id="tgl_spop"
                                                name="tgl_spop"
                                                onChange={this.onChangeDate}
                                                value={this.state.formV.tgl_spop}
                                                
                                            />

                                            </td>
                                        </tr>
                                        <br/>
                                        <tr>      
                                            <td className="tdLabel"><p>no himbauan spop</p></td> 
                                            <td>                             
                                            <Text 
                                                inputType="text" 
                                                id="no_spop" 
                                                name="no_spop" 
                                                placeholder="masukan no spop" 
                                                onChange={this.onChange} 
                                                value={this.state.formV.no_spop} 
                                                labelPosition="none"
                                                type={this.state.formType.no_spop} 
                                                addonLeft="S -"
                                                addonRight="/WPJ.05/KP.06/2020"
                                                size="md"
                                            />

                                            </td>
                                        </tr>
                                        <tr>      
                                            <td className="tdLabel tdplus"><p>kelurahan</p></td> 
                                            <td>                             

                                            <Select 
                                                id="kelurahan"
                                                name="kelurahan"
                                                placeholder="kelurahan terdaftar"
                                                onChange={this.onChangeSelect2}
                                                options={this.state.select2.value}
                                                autofocus
                                                components={makeAnimated()}
                                                
                                            />


                                            </td>
                                        </tr>
                               

                                        <tr>      
                                            <td className="tdLabel tdplus"></td> 
                                            <td>                             

                                           <button className="submitBtn" type="submit">
                                                Submit
                                           </button>


                                            </td>
                                        </tr>
                                       
                                    </table>
                                </form>
                            </Col>

                        </Row>
            </>
        )
    }
}



export default WPform;