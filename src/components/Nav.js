import React from 'react'
import '../css/nav.css'
import img1 from '../Images/img1.PNG'

export default function Nav() {
  return (
    <>
        <div class="box">
        <img src={img1} alt=''/>
            <div class="nav">
              Graviti
            </div>
        </div>
    </>
  )
}
