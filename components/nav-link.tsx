import React from 'react'

export default function Navlink({icon, title} : {icon: string, title: string}) {
  return (
    <div className='w-full py-2 px-5 flex gap-x-5 rounded-md'>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
  )
}
