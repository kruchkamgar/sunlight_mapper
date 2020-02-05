import React from 'react'

const Output = ({nominalPower, coordinates}) => {

  return(
    <div className="output">
      {/* nominalPower &&
        <p className="data">nominal power: {nominalPower} </p> */}
      <p className="data subtext">
        {coordinates[0]}, {coordinates[1]}</p>
    </div>
  )

}

export default Output
