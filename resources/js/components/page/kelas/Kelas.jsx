import React, { Component } from 'react'
import { Content , Row, Col , Inputs, Box , Button} from 'adminlte-2-react';
// import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import exten from '../misc/Axios';
import {Animated} from "react-animated-css";
import DataTable from 'react-data-table-component';
import KelasMiniForm from './KelasMiniForm';
import { toast } from 'react-toastify';


class Kelas extends Component {

    state = {
        loaded : false,
        loadSwalForm : false,
        loadSwalDel : false,
        listKelas : [],
        disabledForm : true,
        isEditSwal : false,
        initialValSwal : {},
        idEdit : '',
        loadSwalDelete: false,
        idDelete : ''

    }  

    componentDidUpdate() {
        console.log('updated');
    }

    onInit = async (e) => {
        try {
            const res = await exten.get('/api/kelas/fetchKelas');
            this.setState({
                listKelas : [
                    ...res.data.data
                ]
            })
        } catch(err) {
            console.log(err)
        } finally {
            this.setState({
                loaded: true
            })
        }

    }

    componentDidMount() {
        this.onInit();

    }

    onOpenForm = e => {
        // console.log(e);
        this.setState({
            loadSwalForm : true
        })
    }

    onBlur = e => {
        this.setState({
            disabledForm : false
        })
    }


    onConfirmDelete = async () => {
        console.log(this.state);
        const res = await exten.delete('/kelas/delete/' + this.state.idDelete);
        if(res.data.status == 'oke') {
            this.setState({
                listKelas : [
                    ..._.filter(this.state.listKelas, (val) => val.id != this.state.idDelete )
                ],
                idDelete : '',
                loadSwalDelete : false
            });

            toast.warning('Data Kelas Berhasil Dihapus!', {
                position: "top-right",
                autoClose : 2000,
                closeOnClick: true
            })
            
        }
    }

    onDeleteTable = id => {
        this.setState({
            loadSwalDelete : true,
            idDelete : id
        })
    }


    onEdit = (id) => {
        
        this.setState({
            initialValSwal : _.find(this.state.listKelas, (val) => {
                return val.id == id
            }),
            idEdit : id,
            isEditSwal : true,
            loadSwalForm : true,
        });  
        // console.log(` ini dari onEdit ${id}`)

    }  

    onCancel = e => {
        this.setState({
            loadSwalForm : false,
            isEditSwal : false,
            idEdit : '' // lakukan pembersihan state ketika Swal ditutup
        })
    }

    onSubmit = async (formData) => {
        let res;
        if(this.state.isEditSwal) {
            res = await exten.patch('/kelas/edit/'+ this.state.idEdit,formData);
        } else {
            res = await exten.post('/kelas/create', formData);
        }
        
        if(res.data.status == "oke") {
            console.log(res.data);

            if(this.state.isEditSwal) {
                toast.success('Data Kelas Berhasil Diubah!', {
                    position: "top-right",
                    autoClose : 2000,
                    closeOnClick: true
                })
    
                this.setState({
                    loadSwalForm : false,
                    listKelas : [
                        ..._.reject(this.state.listKelas,(e) => e.id == this.state.idEdit),
                        res.data.data
                    ]
                })
            } else {
                toast.success('Data Kelas Ditambah!', {
                    position: "top-right",
                    autoClose : 2000,
                    closeOnClick: true
                })
    
                this.setState({
                    loadSwalForm : false,
                    listKelas : [
                        ...this.state.listKelas,
                        res.data.data
                    ]
                })
            }
            
        } else {
            console.log(res);
            toast.error('Data gagal diSubmit!', {
                position: "top-right",
                autoClose : 2000,
                closeOnClick: true
            })
        }
        
    
    }

    onShowPeserta = id => {
        this.props.history.push('/peserta/'+id);
    }


    render() {

        const { Text } = Inputs;

        return (
            <>
                <Content title="Input Kelas Pajak" browserTitle="Kelas Pajak">
                    { this.state.loadSwalForm ?
                    <KelasMiniForm show={this.state.loadSwalForm}  onCancel={this.onCancel} onSubmit={this.onSubmit} isEdit={this.state.isEditSwal} initVal={this.state.initialValSwal} />
                    :
                    ''
                    }

                    <SweetAlert
                        warning
                        showCancel
                        show={this.state.loadSwalDelete}
                        confirmBtnText="Ya, Hapus!"
                        confirmBtnBsStyle="danger"
                        title="Yakinnnn?"
                        onConfirm={this.onConfirmDelete}
                        onCancel={() => { this.setState({ loadSwalDelete : false})}}
                    >
                        Data Wajib pajak akan dihapus!
                    </SweetAlert> 

                    <Animated animationIn="zoomIn" animationInDelay={500} isVisible >
                    <Box type="danger"  title="List Kelas Pajak " icon="fa-edit"  loaded={this.state.loaded} collapsable>
                        <Row>
                            <Col sm={12}>
                                <Button 
                                    size="md"
                                    type="danger"
                                    icon="fa-plus"
                                    text="Tambah Kelas"
                                    onClick={this.onOpenForm}
                                    pullRight={true}
                                />

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <DataTable 
                                   title="List Sosialisasi KPP Cengkareng"
                                   data={
                                       this.state.listKelas
                                   }
                                   columns={[
                                      {
                                        name: 'Nama Kelas',
                                        cell : (row) => {
                                            // console.log(row)
                                            return (
                                                <div className="dataTableRow">
                                                    <h5 style={{wordBreak : 'break-all'}}>{row.nama_sosis}</h5>
                                                </div>
                                            )
                                        },
                                        wrap: true
                                      },
                                      {
                                        name: 'jenis',
                                        selector: 'jenis_kelas',
                                        sortable: true,
                                      },
                                      {
                                        name: 'tanggal',
                                        selector: 'tgl_kelas',
                                        sortable: true,
                                      },
                                      {
                                        name: 'mulai',
                                        selector: 'jam_mulai',
                                        sortable: true,
                                      },
                                      {
                                        name: 'selesai',
                                        selector: 'jam_selesai',
                                        sortable: true,
                                      },
                                      {
                                        name: 'media',
                                        selector: 'media',
                                        sortable: true,
                                      },
                                      {
                                        name: 'kapasitas',
                                        selector: 'kapasitas',
                                        sortable: true,
                                      },
                                  
                                      {
                                        name: 'aksi',
                                        cell : (row) => {
                                        
                                            return (
                                                <div className="dataTableRow">
                                                    <button id="edit" className="editBtn" onClick={() => this.onEdit(row.id)} >Edit</button>
                                                    <button id="delete " className="deleteBtn" onClick={() => this.onDeleteTable(row.id)} >delete</button>
                                                    <button id="edit" className="editBtn" onClick={() => this.onShowPeserta(row.id)} >Peserta</button>
                                                </div>
                                            )
                                        },
                                        sortable: true,
                                        wrap: true
                                    
                                      },
                                   ]} 
                                   responsive
                                   striped
                                   pagination
                                   highlightOnHover
                                /> 
                            </Col>

                        </Row>

                    </Box>
                    </Animated>
                </Content>  
            </>
        )
    }
}

const mapState = (state) => {
    return {
        state
    }
}

export default Kelas;
