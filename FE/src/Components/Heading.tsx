import React from 'react'

const Heading = ({heading}:{heading:string}) => {
  return (
      <h1 className='text-4xl font-bold w-fit'>{heading}</h1>
  )
}

export default Heading;