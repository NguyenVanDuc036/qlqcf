import React from 'react'

export default function Unavailable(props) {
    const {message} = props
  return (
    <div className='mt-5 text-center' >
        <img style={{width:'35%'}} src='https://cdn-icons-png.flaticon.com/512/7466/7466140.png' />
        <h5 className='text-danger' >{message}</h5>
    </div>
  )
}
