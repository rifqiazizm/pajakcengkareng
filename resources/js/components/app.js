import React, { Component } from 'react';
// import { BrowserRouter , Route, Link, Switch } from  'react-router-dom';
import AdminLTE , { Sidebar , Navbar} from 'adminlte-2-react';
import Home from './home';
import './css/style.css';
import Tokopedia from './page/Tokopedia';
import Bukalapak from './page/Bukalapak';
import CobaHooks from './page/CobaHooks';
import Inputwp from './page/adminwp/Inputwp';
import history from './history';
import Wajibpajak from './page/Wajibpajak';
import ListWP from './page/adminwp/ListWP';
import EditWP from './page/adminwp/EditWP';
import Modal from './page/misc/Modal';
import Lspop from './page/adminwp/Lspop';
import Fdm from './page/adminsppt/Fdm';
import Kelas from './page/kelas/Kelas';
import { connect } from 'react-redux';
import { fetchUser } from './actions/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { toast,Slide } from 'react-toastify';
import PesertaKelas from './page/kelas/PesertaKelas';
import Persyaratan from './page/persyaratan/Persyaratan';
import Goceng from './page/Goceng/Goceng';







const { Item ,Header, UserPanel } = Sidebar;

const { Entry, MessageItem, NotificationItem, TaskItem, } = Navbar;


class App extends Component {

  
    componentDidMount() {
      this.props.fetchUser();

      // window.Echo.private('cetak-KK').listen('CetakEvent', (e) => {
      //   console.log(e);
      //   toast.warning("ada yang cetak kertas kerja!", {
      //     position: "top-right",
      //     autoClose : 2000,
      //     closeOnClick: true,
      //     transition : Slide
      // })
      // });
      
    }

  

    sidebar = [
      

      <UserPanel key="UserInfo" username="KPP Cengkareng" imageUrl="https://image.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg" link="/bukalapak" status="available" statusType="warning" />,
      <Header key="header" text="Navigasi" />,
      <Item key="hello" text="HomePage" to="/" icon="fa-home" color="gray"/>,
      
      <Item key="WP" text="Portal WP" icon="fas-caret-square-right" to="/wajibpajak" />,
      
          <Item key="input" text="Input Wajib Pajak" icon="fas-id-card" to="/inputWP" />,
          <Item key="list" text="List WP" icon="fa-list" to="/listWP" />,
          <Item key="lspop" text="Input LSPOP" icon="fa-edit" to="/lspop" />,
          <Item key="fdm" text="Cetak FDM dan KK" icon="fas-file-pdf" to="/fdm" />,
      <Item key="NyedotGan" text="NyedotGan" icon="fa-home">
        <Item key="tokopedia" text="tokopedia" to="/tokped"  />
        <Item key="bukalapak" text="bukalapak" to="/bukalapak" />
        <Item key="shopee" text="shopee" to="/shopee" />
        <Item key="css" text="Coba CSS" to="/tes" />
        <Item key="hooks" text="Coba Hooks" to="/hooks" />
      </Item>,
      <Item  key="kelas" text="Kelas Pajak" icon="fas-users" to="/kelas" />,
      <Item  key="persyaratan" text="Persyaratan WP" icon="fas-book-open" to="/persyaratan" />,
      <Item  key="goceng" text="Goceng" icon="fas-car" to="/goceng" />,




    ];
  
    render() {

      

      return (
        <>
        <ToastContainer />
        <AdminLTE title={["admin", "X10"]} titleShort={["X","10"]}  theme="purple" sidebar={this.sidebar}>
            <Home exact path="/" history={history} />
            <Tokopedia path="/tokped" />
            <Wajibpajak path="/wajibpajak" history={history} />
            <Inputwp path="/inputWP" history={history} />
            <ListWP path="/listWP" history={history} />
            <EditWP path="/editWP/:id" history={history} />
            <Modal path="/listWP/show" modal={true} />
            <Lspop path="/lspop" history={history} />
            <Fdm path="/fdm" />
            <Bukalapak path="/bukalapak" />
            <CobaHooks path="/hooks" props="this is props" />
            <Kelas path="/kelas" history={history} />
            <PesertaKelas path="/peserta/:id" history={history} />
            <Persyaratan path="/persyaratan"/>
            <Goceng path="/goceng" />
        </AdminLTE>
      
        
        </>
      );
    }
  }
  


export default connect(null , {
  fetchUser
})(App);