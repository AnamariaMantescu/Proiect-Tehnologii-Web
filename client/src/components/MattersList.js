import React from 'react'

const MattersList = ({setMatter ,matter, allMatters}) => {
  return (
    <select
    className="form-control"
    value={matter}
    onChange={(e)=> setMatter(e.target.value)}
  >
    {allMatters.map((item, index) => (
      <option value={item.title} key={index} id={index}>
        {item.title}
      </option>
    ))}
  </select>
  )
}

export default MattersList