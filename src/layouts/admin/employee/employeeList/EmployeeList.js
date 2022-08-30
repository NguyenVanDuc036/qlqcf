import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachNhanVienAction, xoaNhanVienAction } from "../../../../redux/actions/QuanLyNhanVienAction";
import axios from "axios";
import { LAY_DANH_SACH_NHAN_VIEN } from "../../../../redux/actions/types/QuanLyNhanVienType";
import { qlNhanVienService } from "../../../../service/QuanLyNhanVienService";
import { Input, Space , Tooltip  } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, ProfileOutlined } from "@ant-design/icons";
import './employeeList.css'
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { history } from '../../../../App';

export default function EmployeeList() {
  const dispatch = useDispatch();

  // Sẽ call api về server để lấy danh sách nhân viên, sau đó đẩy dữ liệu lên redux
  useEffect(() => {

    dispatch(layDanhSachNhanVienAction(""));
    
  }, []);



  // Lấy danh sách nhân viên từ redux về để sử dụng
  const { danhSachNhanVien } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const data = danhSachNhanVien

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 2,
      },
    },
    {
      title: "Ngày bắt đầu làm",
      dataIndex: "startedDate",
      render: (text, user) => {
        return <Fragment>
            {moment(user.startedDate).format("DD-MM-YYYY")}
        </Fragment>
    },
    },  
    {
      title: "Chức vụ",
      dataIndex: "position",
      sorter: {
        compare: (a, b) => a.position - b.position,
        multiple: 1,
      },
    },{
      title: "Số điện thoại",
      dataIndex: "numberPhone",
      sorter: {
        compare: (a, b) => a.numberPhone - b.numberPhone,
        multiple: 1,
      },
    },
    {
      title: 'Tác vụ',
      dataIndex: 'hanhDong',
      render: (text, user) => {
          return <Fragment>
              <div className="flex" >
              <Tooltip title="Chỉnh sửa">
                  <NavLink key={1} className="mr-3 text-blue-700 text-xl" to={`/admin/employee/edit/${user.id}`}><EditOutlined className="btn-edit" style={{fontSize:'25px', color:'#1890ff'}} /></NavLink>
              </Tooltip>
              <Tooltip title="Xóa">
              <span onClick={()=>{

                      
                  Swal.fire({
                    title: `Bạn có chắc muốn xóa tài khoản ${user.email} `,
                    text: "Bạn sẽ không thể hoàn nguyên lại !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Đồng ý!',
                    cancelButtonText: 'Hủy'
                  }).then((result) => {
                    if (result.isConfirmed) {

                      // Gọi api về server để xóa nhân viên
                      dispatch(xoaNhanVienAction(user.id))

                      Swal.fire(
                        'Xóa thành công!',
                        `Bạn đã xóa thành công nhân viên ${user.name}`,
                        'success'
                      )
                    }
                  })
                  }} key={2} className="text-xl mr-3 cursor-pointer text-red-600" ><DeleteOutlined  className="btn-delete" style={{fontSize:'25px', color:'red'}} /></span>

              </Tooltip>

              <Tooltip title="Ca làm việc">
                <NavLink key={1} className="mr-3 btn-detail text-blue-700 text-xl"   to={`/admin/employee/shifts/${user.id}`}><ProfileOutlined style={{fontSize:'25px', color:'green'}} /></NavLink>

              </Tooltip>
              </div>
          </Fragment>
      },
      sortDirections: ['descend'],
  },
  ];
  
  
  




  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSearch = (value) => {
    dispatch(layDanhSachNhanVienAction(value))
  }

  const handleChange = (value) => {
    dispatch(layDanhSachNhanVienAction(value.target.value))
  }
  
  
  



  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-header">
          <h3>Danh sách nhân viên</h3>
        </div>
        <div  className="card-body">
          <div className="d-flex" >
            <Space className="mb-5" direction="vertical">
              <Search
                placeholder="Tìm kiếm nhân viên"
                onSearch={onSearch}
                style={{ width: 200 }}
                onChange={handleChange}
              />
            </Space>
            <button  style={{height:'45px'}} onClick={()=>{
              history.push('/admin/employee/addemployee')
            }} className=" p-2 btn-them  ml-5" >Thêm nhân viên</button>


          </div>
         
          <Table className="nhanvien" scroll={{ y: 720 , x : 1100}}   columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
