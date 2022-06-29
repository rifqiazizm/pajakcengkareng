import React ,{ useEffect,useState } from 'react';
import { Content, Col,Row,Box,Button,Checkbox } from 'adminlte-2-react';
import DataTable from 'react-data-table-component';
// import animated from 'react-select/animated';
import { Animated } from 'react-animated-css';
import exten from '../misc/Axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast } from 'react-toastify';


const Goceng = () => {

    const [listST, setlistST] = useState([]);

    const [filteredST, setfilteredST] = useState([]);

    const [loadSwalDetail, setloadSwalDetail] = useState(false);

    const [detailST, setdetailST] = useState({});

    const [loadFetch, setloadFetch] = useState(true);

    const [isFiltered, setisFiltered] = useState(false);

    
    const fetchST = async() => {
        setloadFetch(false);
        let res = await exten.get('/api/goceng/getST');
        let filtered = _.filter(res.data.data, (e) => e.released == 0 );
        setlistST(res.data.data);
        setfilteredST(filtered);
        setloadFetch(true);
        console.log(res);
    }
    
    useEffect(() => {
        fetchST();
        console.log('ini jalan useeffect');
    }, [])

    const ondetailST = (id) => {
        let detail = _.find(listST, (e) => e.id == id);
        setdetailST(detail);
        setloadSwalDetail(true);
        console.log(detail.mobildinas.merk);
    }

    const onFilter = (e) => {
        setisFiltered(!isFiltered);
    }

    const onRilis = async(e) => {
        const id = detailST.id;
        const postData = {
            'id' : id,
            'released' : 1
        }
        const res = await exten.post('/api/goceng/rilisST', postData );
        console.log(res);
        if(res.data.status == "oke") {
            const data = _.reject(filteredST, e => e.id == id);
            toast.success('Surat Tugas Berhasil Rilis', {
                position: "top-right",
                autoClose : 2000,
                closeOnClick: true
            })
            setloadSwalDetail(false);
            setdetailST({});
            setfilteredST(data);
        } else {
            toast.warning('Surat Tugas Gagal Rilis', {
                position: "top-right",
                autoClose : 2000,
                closeOnClick: true
            })
        }
    }
    

    const onDownload = () => {
        console.log('okee')
    }


    return (
        <>
            <Content title ="Administrasi Goceng" browserTitle="Goceng" >
                <Button    
                    type="danger"
                    icon="fas-filter"
                    text={ isFiltered ? "Lihat Arsip" : "Lihat Belum rilis"}
                    onClick={onFilter}
                    name="filter"
                    margin={true}
                />
                <a href="/api/goceng/rekapST">
                <Button    
                    type="info"
                    icon="fas-file-excel"
                    text="Download Rekapan"
                    onClick={onDownload}
                    name="filter"
                    margin={true}
                />
                </a>
                <br />
                <br />


                    <SweetAlert
                        showCancel
                        show={loadSwalDetail}
                        title="Detail Surat Tugas"
                        onConfirm={() => { setloadSwalDetail(false) }}
                        onCancel={() => { setloadSwalDetail(false) }}
                        customClass="boxDetailST"
                        style={{
                            minWidth: '600px'
                        }}
                    >
                        <Row>
                            <Col sm={12} >
                            
                                <Box className="boxDetailST" type="info" solid title="detail ST" >
                                            <table className="tableST">
                                                <tr>
                                                    <td>Agenda Surat Tugas</td>
                                                    <td>{ detailST.agendaST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Tanggal mulai</td>
                                                    <td>{ detailST.tglmulaiST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Tanggal Selesai</td>
                                                    <td>{ detailST.tglselesaiST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Jam Mulai</td>
                                                    <td>{ detailST.jammulaiST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Jam Selesai</td>
                                                    <td>{ detailST.jamselesaiST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Nama Pegawai</td>
                                                    <td>{ detailST.namaPeserta }</td>
                                                </tr>
                                                <tr>
                                                    <td>Tujuan </td>
                                                    <td>{ detailST.tujuanST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Alamat</td>
                                                    <td>{ detailST.alamatST }</td>
                                                </tr>
                                                <tr>
                                                    <td>Kendaraan dinas</td>
                                                    <td>{ loadSwalDetail ? `${detailST.mobildinas.merk} - ${detailST.mobildinas.tipe} ` : '-' }</td>
                                                </tr>
                                                <tr>
                                                    <td>Seksi Pembuat</td>
                                                    <td>{ loadSwalDetail ? detailST.seksinya.namaSeksi : '-' }</td>
                                                </tr>
                                                <tr>
                                                    <td>Note KAKAP</td>
                                                    <td>{ loadSwalDetail ? detailST.seksinya.notekakap : '-' }</td>
                                                </tr>
                                                <tr>
                                                    <td>Uraian Laporan ST</td>
                                                    <td>{ detailST.uraianLaporan }</td>
                                                </tr>
                                                <tr>
                                                    <td>Url Foto Laporan</td>
                                                    <td> { loadSwalDetail ? detailST.urlFoto.length != 0 ? <a href={`/storage/${detailST.urlFoto}`}>lihat foto</a> : '' : ''  }   </td>
                                                </tr>
                                                <tr>
                                                    <td>koordinat</td>
                                                    <td>{ detailST.koordinat }</td>
                                                </tr>
                                                <tr>
                                                    <td>Aksi</td>
                                                    <td><Button    
                                                            type="info"
                                                            icon="fa-paper-plane"
                                                            text="Rilis!"
                                                            onClick={onRilis}
                                                            name="rilis"
                                                        />
                                                    </td>
                                                </tr>
                                                
                                            </table>
                                </Box>
                            </Col>
                        </Row>
                    </SweetAlert> 
                <Box type="primary" title="list Surat Tugas yg sudah approve" icon="fa-list" loaded={loadFetch} solid collapsable  >
                        
                    <Row>
                        <Col sm={12}>   
                            <DataTable 
                                title="Sudah Approve"
                                data={isFiltered ? filteredST : listST}
                                pagination={true}
                                columns={[
                                    {
                                        name: 'agenda ST',
                                        selector : 'agendaST',
                                        sortable:true,
                                        wrap: true,
                                        width: '150px'
                                    },
                                    {
                                        name: 'tanggal',
                                        selector : 'tglmulaiST',
                                        sortable:true
                                    },
                                    {
                                        name: 'jam',
                                        selector : 'jammulaiST',
                                        sortable:true
                                    },
                                    {
                                        name: 'Seksi',
                                        cell: (row) => {
                                            return(
                                                <div className="dataTableRow">
                                                    <p>{row.seksinya.namaSeksi}</p>
                                                </div>
                                            )
                                        }
                                    },
                                    {
                                        name: 'Status',
                                        cell: (row) => {
                                            return(
                                                <div className="dataTableRow">
                                                    <p>{row.approved == 1 ? 'Approved' : row.approved == 2 ? 'Ditolak' : 'Belum Acc'}</p>
                                                </div>
                                            )
                                        }
                                    },
                                    {
                                        name: 'note Kakap',
                                        selector : 'notekakap',
                                        sortable:true,
                                        wrap:true
                                    },
                                    
                                    {
                                        name: 'Aksi',
                                        cell: (row) => {
                                            return(
                                                <div className="dataTableRow">
                                                     <Button 
                                                        size="sm"
                                                        type="info"
                                                        icon="fa-search"
                                                        text="Lihat Detail"
                                                        onClick={() => ondetailST(row.id)}
                                                    />
                                                </div>
                                            )
                                        }
                                    }
                                ]}
                            />
                        </Col>
                    </Row>

                </Box>
            </Content>
        </>
    )
}

export default Goceng;
