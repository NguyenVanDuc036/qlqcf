import React, { useEffect } from 'react'

import { Form, Input, Tabs, Select, Button, Checkbox, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FieldTimeOutlined, MailOutlined, PhoneFilled, SnippetsOutlined, UnlockOutlined } from '@ant-design/icons';
import '../addEmployee/addEmployee.css'
import moment from 'moment';
import { capNhatNhanVienAction, layChiTietNhanVien, themNhanVienAction } from '../../../../redux/actions/QuanLyNhanVienAction';
const { TabPane } = Tabs;

function callback(key) {
}

export default function EditEmployee(props) {
    const dispatch = useDispatch()

    // Khi mới vào component, sẽ gọi chi tiết nhân viên với id được lấy từ trên url
    useEffect(() => {
        dispatch(layChiTietNhanVien(props.match.params.id))
    }, []);


    // Lấy chi tiết nhân viên từ redux về
    const { chiTietNhanVien } = useSelector(
        (state) => state.QuanLyNguoiDungReducer
    );

   const handleChangeViTri =(value)=>{
        formik.setFieldValue('position',value)
        console.log(value);
    }
    const { Option } = Select;
    const onFinish = (values) => {
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeDate = (values) => {
        formik.setFieldValue('startedDate',values)
    }
    const onOk = (values) => {
        formik.setFieldValue('startedDate',values)
    }
    // name , email , password , startedDate , position , numberPhone

    // Sử dụng formik để xử lý form
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: chiTietNhanVien?.name,
            email: chiTietNhanVien?.email,
            password: chiTietNhanVien?.password,
            // startedDate:moment(chiTietNhanVien.startedDate).format('DD-MM-YYYY'),
            startedDate:chiTietNhanVien.startedDate,
            position: 'phucVu',
            numberPhone: chiTietNhanVien?.numberPhone,
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(capNhatNhanVienAction(values , props.match.params.id))
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('(*) Tài khoản Không được bỏ trống'),
            email: Yup.string().required(' (*)Email không được bỏ trống!').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Email không hợp lệ'),
            password: Yup.string().required('(*)Mật khẩu không được bỏ trống!').min(6,'Mật khẩu từ 6 - 32 ký tự !').max(32,'Mật khẩu từ 6 - 32 ký tự !'),
            numberPhone: Yup.string().required('(*)Số điện thoại Không được bỏ trống').matches(/^[0-9]+$/,'Chỉ phép điền số'),
            startedDate : Yup.string().required('(*)Vui lòng chọn ngày!')
        })
    });


    return (
        <div  className='p-5  content'>
            <div className='card' >
                <div className='card-header' >
                    <h3 style={{color:'#eeeaea'}}>Cập nhật nhân viên</h3>
                </div>
                <div className='card-body' >
                <Form
                onSubmitCapture={formik.handleSubmit}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="mt-4"
            >
                <Form.Item
                    className="w-75"
                    label="Họ và tên"

                    rules={[{ required: true, message: 'Please input your account!' }]}
                >
                    
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><MailOutlined  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <Input onBlur={formik.handleBlur} className="form-control" value={formik.values.name} name="name" onChange={formik.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.name && formik.touched.name ? (<div>{formik.errors.name}</div>) : null} </div>
                </Form.Item>

                <Form.Item

                    className="w-75"
                    label="Mật khẩu"

                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><UnlockOutlined  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <Input.Password onBlur={formik.handleBlur}  className="form-control" value={formik.values.password} name="password" onChange={formik.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.password && formik.touched.password ? (<div>{formik.errors.password}</div>) : null} </div>
                </Form.Item>

                <Form.Item
                    className="w-75"
                    label="Email"

                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><MailOutlined  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <Input placeholder='Nhập email' name="email" className='form-control' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.email && formik.touched.email ? (<div>{formik.errors.email}</div>) : null} </div>
                </Form.Item>
                <Form.Item
                    className="w-75"
                    label="Số điện thoại"

                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><PhoneFilled  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <Input className='form-control' onBlur={formik.handleBlur} value={formik.values.numberPhone} onChange={formik.handleChange} name="numberPhone" />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.numberPhone && formik.touched.numberPhone ? (<div>{formik.errors.numberPhone}</div>) : null} </div>
                </Form.Item>

                <Form.Item

                    className="w-75"
                    label="Chức vụ"

                    rules={[{ required: true, message: 'Please input your type of user!' }]}
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><SnippetsOutlined  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <Select className='form-control' defaultValue="phucVu" value={formik.values.position}  name="position" style={{ width: 150 }} onChange={handleChangeViTri}>
                                    <Option value="khachHang">Phục vụ</Option>
                                    <Option value="thuNgan">Thu ngân</Option>
                                    <Option value="phaChe">Pha chế</Option>
                                </Select>                            
                            </div>
                        </div>
                    </div>
                   
                </Form.Item>

            

                <Form.Item
                    className="w-75"
                    label="Ngày vào làm"

                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FieldTimeOutlined  style={{color:'#8f5fe8'}} /></span>
                                </div>
                                <DatePicker value={moment(formik.values.startedDate)} style={{width:'35%'}}  onChange={onChangeDate}  />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.startedDate && formik.touched.startedDate ? (<div>{formik.errors.startedDate}</div>) : null} </div>
                </Form.Item>

                <div className="flex justify-center">
                    <button className="  btn-themNhanVien ml-5 mt-3" type="submit"><i class="fas mr-2 fa-user-edit"></i> Cập nhật</button>
                </div>
            </Form>
                </div>
            </div>
            
        </div>
    )
}