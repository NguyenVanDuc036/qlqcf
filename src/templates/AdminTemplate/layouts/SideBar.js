import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { history } from '../../../App';

export default function SideBar() {

  const user = JSON.parse(localStorage.getItem('userLogin'))

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          {/* <img
            src="https://thietkelogodep.com.vn/wp-content/uploads/2017/12/cach-thiet-ke-logo-quan-cafe.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          /> */}
          <span className="brand-text font-weight-light">Quản lý</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <h5 href="#" className="d-block text-light">
                {user.name}
              </h5>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <li className="nav-item">
                <a href="#" className="nav-link">
                <i style={{color:'green'}}  class="fas fa-chart-line nav-icon"></i>
                  <p>
                    Thống kê tổng hợp
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/admin/phan-tich-du-lieu" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Phân tích dữ liệu</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/thong-ke-doanh-thu"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Thống kê doanh thu</p>
                    </NavLink>
                  </li>
                </ul>
              </li>





              <li className="nav-item">
                <a href="#" className="nav-link">
                <i style={{color:'#fc424a'}} class="fas fa-users nav-icon"></i>
                  <p>
                    Quản lý nhân viên
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/admin/employees" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Danh sách nhân viên</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/admin/employee/addemployee"
                      className="nav-link"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>Thêm nhân viên</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i style={{color:'#ffab00'}} class="fas fa-chair nav-icon"></i>
                  <p>
                    Quản lý bàn
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/admin/danh-sach-ban" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Danh sách bàn</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/them-ban" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Thêm bàn</p>
                    </NavLink>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i style={{color:'#8f5fe8'}} className="nav-icon fas fa-edit" />
                  <p>
                    Quản lý hàng hóa
                    <i  className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/admin/goods" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Danh sách hàng hóa</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/good/addgoods" className="nav-link">
                      <i  className="far fa-circle nav-icon" />
                      <p>Thêm hàng hóa</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/admin/waters" className="nav-link">
                      <i  className="far fa-circle nav-icon" />
                      <p>danh sách nước uống</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/admin/water/addwater" className="nav-link">
                      <i  className="far fa-circle nav-icon" />
                      <p>Thêm nước uống</p>
                    </NavLink>
                  </li>


                 




                </ul>
              </li>

               <li onClick={()=>{
                  localStorage.removeItem("userLogin");
                  history.push("/");
               }} >
                <a href="" className="nav-link">
              
                  <i class="fas text-danger mr-3 fa-sign-out"></i>
                  <p>
                    Đăng xuất
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
              </li> 

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar content-wrapper*/}
      </aside>
  )
}
