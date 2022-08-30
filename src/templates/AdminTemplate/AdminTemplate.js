import React, { useEffect, useState } from 'react'

import { Route } from 'react-router-dom';
import Navbar from './layouts/NavBar'
import SideBar from './layouts/SideBar'
import Footer from './layouts/Footer'
import Swal from 'sweetalert2';
import { history } from '../../App';

export default function AdminTemplate(props) {


  
  useEffect(() => {

    if(!localStorage.getItem('userLogin')){
        Swal.fire({
         icon: 'error',
         title: 'Đăng nhập để tiếp tục :))',
         text: 'Bạn cần đăng nhập để tiếp tục duy trì!',
         footer: '<a href="/">Đăng nhập</a>'
       })
       history.push('/')
    }

    // if(localStorage.getItem('userLogin')){
    //   var userLogin = JSON.parse(localStorage.getItem('userLogin'));
      
    //   if(userLogin.position != 'quanLy'){
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Bạn không có quyền truy cập',
    //       text: 'Bạn cần đăng nhập bằng tài khoản quản lý!',
    //     })
    //     history.push('/')
    //   }
       
    // }

    





  }, []);



  return (
    <Route exact path={props.path} render={(propsRoute) => {
      return <div className="wrapper">
        {/* Preloader */}
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__wobble"
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTELogo"
            height={60}
            width={60}
          />
        </div>
        {/* Navbar */}
        <Navbar />
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <SideBar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper" >
          <props.component {...propsRoute} />
        </div>
        {/* /.content-wrapper */}
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
        {/* Main Footer */}
        <Footer />

      </div>
    }} />


  );

}

