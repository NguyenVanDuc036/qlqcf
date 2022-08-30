import React from 'react'

export default function NotFoundWater(props) {

  const {message} = props
  return (
    <div className='mt-5 text-center' >
        <img style={{width:'15%'}} src='img/no-data.png' />
        <h5 className='text-danger' >{message}</h5>
    </div>
  )
}
