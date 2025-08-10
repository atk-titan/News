import React from 'react'

const Heading = ({heading , children}:{heading:string , children?: React.ReactNode}) => {
  return (
    <div>
      <h1 className={`inline font-bold w-fit`}>{heading}</h1>
      {children}
    </div>
  )
}

export default Heading;