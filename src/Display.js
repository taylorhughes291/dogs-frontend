import React from "react";

const Display = (props) => {
  const {dogs} = props
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {dogs.map((item, index) => (
        <article key={item.id}>
          <img src={item.img} />
          <h1>{item.name}</h1>
          <h3>{item.age}</h3>
          <button 
            onClick={() => {
              props.selectDog(item)
              props.history.push("/edit")
            }}
          >Edit</button>
          <button
            onClick={() => {
              props.deleteDog(item)
            }}
          >Delete</button>
        </article>
      ))}
    </div>
  )

  const loading = () => {
    return (
      <h1>Loading...</h1>
    )
  }

  return dogs.length > 0 ? loaded() : loading()
};

export default Display;
