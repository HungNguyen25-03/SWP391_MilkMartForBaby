import React from 'react'
import "./UseFull.scss"
import { listUsefull } from './UsefullList'
import { FaRegEye } from "react-icons/fa";

export default function UseFull() {
  return (
    <div>
      <div className='usefull_container'>
        {
          listUsefull.map((usefull) => {
            return (
              <a href={usefull.title} className='usefull_detail' key={usefull.id}>
                <img src={usefull.img} /><br />
                <h4>{usefull.info}</h4>
                <p> <FaRegEye /> {usefull.view}</p>
              </a>
            );
          })
        }

      </div>
    </div>
  )
}
