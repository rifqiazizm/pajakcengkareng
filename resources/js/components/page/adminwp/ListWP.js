import React, { Component } from 'react'
import { fetchWP, deleteWP } from '../../actions';
import { connect } from 'react-redux'
import { Content, Row, Box  } from 'adminlte-2-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Animated} from "react-animated-css";
import DataTable from 'react-data-table-component';
import _ from 'lodash';




class ListWP extends Component {


    state={
        id : null,
        loadSwal : false,
    }



    componentDidMount() {
        this.props.fetchWP();
    }

    componentDidUpdate() {
        console.log( this.props.state.wajibpajak);
        console.log("dari Did mount!  " )
    }

    onClick = (e) => {
        e.stopPropagation();
        if(e.target.id == "edit") {
            this.props.history.push('/editWP/'+e.target.dataset.wpId);
        } else {
            this.setState({
                loadSwal : true,
                id : e.target.dataset.wpId

            });

        }
        
    }


    onConfirm = () => {
        
        this.props.deleteWP(this.state.id)
            .then(e=> {
                this.setState({
                    loadSwal : false
                })
            })
    }


    render() {
        // karena fetcWP async maka dibuat ternary operator mengantisipasi component telah di render sebelum API call selesai 
        // data table membutuhkan props berupa data, maka diberi data sementara di ternary operator
        const wajibpajak  = _.keys(this.props.state.wajibpajak).length > 1 ? _.values(this.props.state.wajibpajak) :[{ id: '1',title: 'data tidak ada',year : '2020'}];
        // const wajibpajak = this.props.state.wajibpajak;
        console.log(wajibpajak);
        return (
            <>
               <SweetAlert
                    warning
                    showCancel
                    show={this.state.loadSwal}
                    confirmBtnText="Ya, Hapus!"
                    confirmBtnBsStyle="danger"
                    title="Yakinnnn?"
                    onConfirm={this.onConfirm}
                    onCancel={() => { this.setState({ loadSwal : false})}}
                >
                    Data Wajib pajak akan dihapus!
                </SweetAlert> 
                

                <Content title="List Wajib Pajak" browserTitle="Lihat WP">
                
                <Animated animationIn="zoomIn" animationInDelay={600} isVisible>

                    <Box title="Tabel Wajib Pajak" type="primary" collapsable solid className="box1" >
                    
                        <button onClick={() => { this.props.history.push('/listWP/show') }}>click me</button>
                           <DataTable 
                           title="List WP"
                           data={[
                           ...wajibpajak
                           ]}
                           columns={[
                              {
                                name: 'nama WP',
                                selector: 'namaWP',
                                sortable: true,
                              },
                             
                              {
                                name: 'NPWP ',
                                selector: 'npwp',
                                sortable: true,
                            

                              },
                              {
                                name: 'NOP',
                                 selector: 'nop',
                                sortable: true,
                            
                              },
                              {
                                name: 'Alamat',
                                selector: 'alamat',
                                sortable: true,
                                wrap : true
                            
                              },
                              {
                                name: 'tanggal spop',
                                selector: 'tgl_spop',
                                sortable: true,
                            
                              },
                              {
                                name: 'aksi',
                                cell : (row) => {
                                    return (
                                        <div>
                                        <button id="edit" className="editBtn" data-wp-id={row.id} onClick={this.onClick} >Edit</button>
                                        <button id="delete " className="deleteBtn" data-wp-id={row.id} onClick={this.onClick} >delete</button>
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
    
                           

                           /> 
                    </Box>
                </Animated>

               </Content>
            </>
        )
    }
}


const mapState = state => {
    return {
        state : state
    }
}

export default connect(mapState , {
    fetchWP,
    deleteWP
})(ListWP);