import React from 'react'
import loading from './images/giphy.gif'
import './Loader.css'

export default function Loader() {
  return (
    <div className='loader'>
        <img src={loading} alt='Loading' className='loaderimg' />
    </div>
  )
}
