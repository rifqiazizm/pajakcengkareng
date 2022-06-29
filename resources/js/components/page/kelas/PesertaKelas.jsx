import React , {useState,useEffect} from 'react'
import {Animated} from 'react-animated-css'
import { Content , Box } from 'adminlte-2-react';
import exten from '../misc/Axios';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import DataTable from 'react-data-table-component';

const PesertaKelas = (props) => {

    const {id} = props.match.params;

    const [loadedBox, setLoadedBox] = useState(false);

    const [idPeserta, setIdPeserta] = useState('');

    const [loadSwalDel, setLoadSwalDel] = useState(false);

    const [listPeserta, setListPeserta] = useState([]);

    const onInit = async () => {
        let res = await exten.get('/kelas/listPeserta/'+id);
        if(res.data.status == 'oke') {
            setListPeserta([
                ...res.data.data
            ]);
            setLoadedBox(true);
        }
    }

    const onClickDelete = id => {
        setLoadSwalDel(true);
        setIdPeserta(id)
    }

    const onConfirmDelete = async () => {
        const res = await exten.delete('/kelas/listPeserta/delete/'+idPeserta);
        if(res.data.status == 'oke') {
            setLoadSwalDel(false),
            toast.warning('Data Peserta Berhasil Dihapus!', {
                position: "top-right",
                autoClose : 2000,
                closeOnClick: true
            })
            setListPeserta([
                ..._.filter(listPeserta,(val) => val.id != idPeserta)
            ])
            setIdPeserta('');
        }
    }

    useEffect(() => {
        onInit();
       
    }, []);

    return (
        <>
            <Content title="Peserta Kelas Pajak" browserTitle="Peserta Kelas">
                <SweetAlert
                    warning
                    showCancel
                    show={loadSwalDel}
                    confirmBtnText="Ya, Hapus!"
                    confirmBtnBsStyle="danger"
                    title="Yakinnnn?"
                    onConfirm={onConfirmDelete}
                    onCancel={() => {setLoadSwalDel(false)}}
                >
                    Data Peserta akan dihapus!
                </SweetAlert> 
               <Animated animationIn="fadeIn" animationInDelay={600} isVisible>
                    <Box title="List Peserta" type="danger" collapsable solid loaded={loadedBox} className="box" >
                        <DataTable 
                           title="List Peserta Sosialisasi"
                           data={
                               listPeserta
                           }
                           columns={[
                              {
                                name: 'npwp',
                                selector: 'npwp',
                                sortable: true,
                              },
                              {
                                name: 'Nama Peserta',
                                selector : 'namaWP',
                                wrap: true
                              },
                              {
                                name: 'nomor HP',
                                selector: 'no_hp',
                                sortable: true,
                              },
                              {
                                name: 'no EFIN',
                                selector: 'no_efin',
                                sortable: true,
                              }, 
                              {
                                name: 'aksi',
                                cell : (row) => {
                                
                                    return (
                                        <div className="dataTableRow">
                                            <button id="delete " className="deleteBtn" onClick={() => onClickDelete(row.id)} >delete</button>
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


export default PesertaKelas;