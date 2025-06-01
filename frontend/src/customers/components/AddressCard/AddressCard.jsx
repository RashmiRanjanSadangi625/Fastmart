import React from 'react'

const AddressCard = ({address}) => {
  // console.log("address",address);
  return (
    <div>
        <div className='space-y-3'>
            <p className='font-semibold'>{address?.firstName + address?.lastName}</p>
            <p>{address?.streetAddress},{address?.state},{address?.zipcode}</p>
            <div className='space-y-1'>
                <p className='font-semibold'>Phone Number</p>
                <p>{address?.mobile}</p>
            </div>
        </div>
    </div>
  )
}

export default AddressCard