import React, { Fragment, useState } from 'react'
import { Form, Input, Tabs, Select, Button, Checkbox, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { FieldTimeOutlined, MailOutlined, PhoneFilled, SnippetsOutlined, UnlockOutlined } from '@ant-design/icons';
import '../addEmployee/addEmployee.css'
import moment from 'moment';
import { themNhanVienAction } from '../../../../redux/actions/QuanLyNhanVienAction';
import axios from 'axios';
const { TabPane } = Tabs;

function callback(key) {
}

export default function AddEmployee(props) {

    const [imgSrc,setImgSrc] = useState('');

    const dispatch = useDispatch()

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

    const handleChangeFile = (e) => {
        
        let file = e.target.files[0];
        // Tạo đối tượng để đọc file
        if(file.type === 'image/jpeg' ||  file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' ){
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) =>{
            setImgSrc(e.target.result)
        }

        }
        // formik.setFieldValue('avatar',file)
    }
    // name , email , password , startedDate , position , numberPhone
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            email: '',
            password: '',
            startedDate: '',
            position: 'phucVu',
            numberPhone: '',
        },
        onSubmit: (values) => {

            let formData = new FormData();

            for (let key in values) {
                if (key !== 'avatar') {
                  formData.append(key, values[key]);
                } else {
                    formData.append('File', values.avatar, values.avatar.name);
                    
                }
            }

              dispatch(themNhanVienAction(values))
           
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
                    <h3>Thêm mới nhân viên</h3>
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
                encType="multipart/form-data"
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
                                <DatePicker style={{width:'35%'}} format="DD/MM/YYYY"  onChange={onChangeDate} onOk={onOk} />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.startedDate && formik.touched.startedDate ? (<div>{formik.errors.startedDate}</div>) : null} </div>
                </Form.Item>
                
                {/* <Form.Item>
                    <input onChange={handleChangeFile} type="file" name="avatar" />
                </Form.Item> */}

                <Form.Item
                    className="w-75"
                    label="Ngày vào làm"

                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <input onChange={handleChangeFile} type="file" name="avatar" />                            </div>
                                <Fragment>
                                    {!imgSrc ? <Fragment></Fragment>:<img  className="mt-3 object-cover" width={200} height={200} src={imgSrc} alt="..." />
 } 
                                </Fragment>
                       </div>
                    </div>
                </Form.Item>

                <div className="flex justify-center">
                    <button className="btn btn-outline-success ml-5 btn-themNhanVien mt-3" type="submit"><i class="fas fa-user-plus mr-2"></i> Thêm người dùng</button>

                </div>
            </Form>
                </div>
            </div>
            
        </div>
    )
}