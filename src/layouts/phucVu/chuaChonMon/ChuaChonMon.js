 import React from 'react'

export default function ChuaChonMon() {
  return (
    <div className='text-center mt-5'  >
        <div >
            <img className='mt-5' style={{width:'20%'}} src='/img/chuachon.png' />
        </div>
        <div style={{justifyContent:'center'}} className='d-flex mt-5' >
            
            <h5 className='text-danger' ><img style={{width:'7%'}}  src='img/point-to-left.png' />  Vui lòng chọn món phía bên trái để ghi order</h5>
        </div>
    </div>
  )
}
