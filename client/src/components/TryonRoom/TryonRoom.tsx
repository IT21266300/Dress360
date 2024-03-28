import React from 'react'
import close_icon from '../../assets/dhananjaya/icons8-close-30.png'

const TryonRoom = () => {
  return (
    <div className='tryon-room'>
        <div className="tryon-room-top">
            <img src={close_icon} alt="close" />
            <h2>Try Your Clothes</h2>
        </div>

        <div className="3d-model">

            <div className="3d-model-left"></div>
            <div className="3d-model-right"></div>
            
        </div>

      
    </div>
  )
}

export default TryonRoom
