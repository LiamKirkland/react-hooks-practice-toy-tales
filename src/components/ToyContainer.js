import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, onSetToys}) {
  function handleLike(id) {
    const selectedToy = toys.filter((toy) => toy.id === id)[0]

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: ++selectedToy.likes }),
    })
      .then((res) => res.json())
      .then((data) =>
        onSetToys(
          toys.map((toy) => {
            if (toy === selectedToy) {
              return { ...toy, likes: data.likes }
            } else {
              return toy
            }
          }),
        ),
      )
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
    method: 'DELETE'
    })
    .then(onSetToys(toys.filter(toy => toy.id !== id)))
  }

  return (
    <div id="toy-collection">{toys.map(toy => {
      return <ToyCard name={toy.name} image={toy.image} likes={toy.likes} key={toy.id} id={toy.id} handleLike={handleLike} handleDelete={handleDelete}/>
    })}</div>
  );
}

export default ToyContainer;
