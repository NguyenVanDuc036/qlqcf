import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { history } from '../../App';
import { dangNhapAction } from '../../redux/actions/QuanLyNhanVienAction';

import './Login.css'
export default function Login() {

  useEffect(() => {
    if(localStorage.getItem('userLogin')){
      var userLogin = JSON.parse(localStorage.getItem('userLogin'));
      
      // if(userLogin.position == 'phucVu'){
      //   history.push('/phucvu')
      // }
      
      // if(userLogin.position == 'quanLy'){
      //   history.push('/admin/home')
      // }
      
      // if(userLogin.position == 'thuNgan'){
      //   history.push('/thungan')
      // }
      
      // if(userLogin.position == 'phaChe'){
      //   history.push('/phache')
      // }
       
    }

  }, []);


  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    onSubmit: (values) => {
        // console.log(values);
        dispatch(dangNhapAction(values))
    },validationSchema: Yup.object().shape({
      email: Yup.string().required(' (*)Email không được bỏ trống!').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'(*)Email không hợp lệ'),
      password: Yup.string().required('(*) Mật khẩu Không được bỏ trống'),
  })
  })

  return (
    <>
         <div className='login' style={{backgroundImage:'url("/img/bg-coffe.jpg")'}} >
  <div className="dust-paarticle">
  </div>
  <div className="container-fluid">
    <div className="row">
      <div className="authfy-container col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-offset-1 col-md-offset-2 col-lg-offset-3">
        <div className="col-sm-5 authfy-panel-left">
          <div className="brand-col">
            <div className="headline">
              {/* brand-logo start */}
              <div className="brand-logo">
                <img src="img/logo-caffe.png" width={250} alt="brand-logo" />
              </div>{/* ./brand-logo */}
            </div>
          </div>
        </div>
        <div className="col-sm-7 authfy-panel-right">
          {/* authfy-login start */}
          <div className="authfy-login">
            {/* panel-login start */}
            <div className="authfy-panel panel-login text-center active">
              <div className="authfy-heading">
                <h3 style={{color:'#8686f3!important'}} className="auth-title">Bạn cần đăng nhập để tiếp tục</h3>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <form onSubmit = {formik.handleSubmit} className="loginForm" >
                    <div className="form-group">
                      <input  onBlur={formik.handleBlur}  onChange={formik.handleChange}  type="text" className="form-control email" name="email" placeholder="Email address" />
                      <div className="text-left text-danger">{formik.errors.email && formik.touched.email ? (<div>{formik.errors.email}</div>) : null} </div>
                    </div>
                    <div className="form-group">
                      <div className="pwdMask">
                        <input onBlur={formik.handleBlur}  onChange={formik.handleChange}  type="password" className="form-control password" name="password" placeholder="Password" />
                        <div className="text-left text-danger">{formik.errors.password && formik.touched.password ? (<div>{formik.errors.password}</div>) : null} </div>
                        <span className="fa fa-eye-slash pwd-toggle" />
                      </div>
                    </div>
                    {/* start remember-row */}
                    <div className="row remember-row">
                      <div className="col-xs-6 col-sm-6">
                        <label className="checkbox text-left">
                          <input type="checkbox" defaultValue="remember-me" />
                          <span className="label-text">Remember me</span>
                        </label>
                      </div>
         
                    </div> {/* ./remember-row */}
                    <div className="form-group">
                      <button  className="btn btn-lg btn-primary btn-block" type="submit">Đăng nhập</button>
                    </div>
                  </form>
                </div>
              </div>
            </div> 
          </div> 
        </div>
      </div>
    </div> 
  </div>
</div>

    </>
  )
}
