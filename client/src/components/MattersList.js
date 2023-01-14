import React from 'react'

const MattersList = ({setMaterie,materie,allMatters}) => {
  return (
    <select
    className="form-control"
    value={materie}
    onChange={(e)=>setMaterie(e.target.value)}
  >
    {allMatters.map((item, index) => (
      <option value={item.title} key={index}>
        {item.title}
      </option>
    ))}
  </select>
  )
}

export default MattersList