import React, { Fragment, useEffect, useState } from 'react'
import { Form, Input, Tabs, Select, Button, Checkbox, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FieldTimeOutlined, MailOutlined, PhoneFilled, SnippetsOutlined, UnlockOutlined } from '@ant-design/icons';
import '../../employee/addEmployee/addEmployee.css'
import moment from 'moment';
import { themNhanVienAction } from '../../../../redux/actions/QuanLyNhanVienAction';
import axios from 'axios';
import { capNhatHangHoaAction, layChiTietHangHoaAction, themHangHoaAction } from '../../../../redux/actions/QuanLyHangHoaAction';
const { TabPane } = Tabs;

function callback(key) {
}

export default function EditGoods(props) {

    const [imgSrc,setImgSrc] = useState('');

    useEffect(() => {
      dispatch(layChiTietHangHoaAction(props.match.params.id))
    }, []);

    const { chiTietHangHoa } = useSelector(
      (state) => state.QuanLyHangHoaReducer
  );


    const dispatch = useDispatch()

  const handleChangeViTri =(value)=>{
        formik.setFieldValue('position',value)
        console.log(value);
    }

    const handleChangeTrangThai =(value)=>{
      formik.setFieldValue('status',value)
    }

    const { Option } = Select;
    const onFinish = (values) => {
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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
            name: chiTietHangHoa.name,
            srcImg: chiTietHangHoa.srcImg,
            status: chiTietHangHoa.status,
        },
        onSubmit: (values) => {


            dispatch(capNhatHangHoaAction(values, props.match.params.id))

        
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('(*) Tên hàng hóa Không được bỏ trống')
        })
    });


    return (
        <div  className='p-5  content'>
            <div className='card' >
                <div className='card-header' >
                    <h3>Thêm mới hàng hóa</h3>
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
                    label="Tên hàng hóa"
                >
                    
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i style={{color :'#500aac'}} class="fas fa-shopping-cart"></i></span>
                                </div>
                                <Input onBlur={formik.handleBlur} className="form-control" value={formik.values.name} name="name" onChange={formik.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="text text-danger">{formik.errors.name && formik.touched.name ? (<div>{formik.errors.name}</div>) : null} </div>
                </Form.Item>

                <Form.Item
                    className="w-75"
                    label="Trạng thái"

                >
                   <div className="col-sm-12 p-0">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i style={{color :'#500aac'}} class="fas fa-shopping-cart"></i></span>
                                </div>
                                <Select defaultValue="Hết hàng" value={formik.values.status} style={{ width: 120 }} onChange={handleChangeTrangThai}>
                                    <Option value="Còn hàng">Còn hàng</Option>
                                    <Option value="Hết hàng">Hết hàng</Option>
                                </Select>
                            </div>
                        </div>
                   
                </Form.Item>

                <Form.Item
                    className="w-75"
                    label="Hình ảnh"

                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                    
                >
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <div className="input-group">
                                <input onChange={handleChangeFile} type="file" name="avatar" />                            </div>
                                <Fragment>
                                    {!imgSrc ? <Fragment></Fragment>:<img  className="mt-3 object-cover" width={200} height={200} src={imgSrc} alt="..." />} 
                                </Fragment>
                    </div>
                    </div>
                </Form.Item>

                <div className="flex justify-center">
                    <button className="btn btn-outline-success ml-5 btn-themNhanVien mt-3" type="submit"><i class="fas fa-cart-plus mr-2"></i> Cập nhật Hàng Hóa</button>

                </div>
            </Form>
                </div>
            </div>
            
        </div>
    )
}