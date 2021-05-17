import React, { useEffect } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  //URL in variable
  const url = "https://dogs-backend-329-th.herokuapp.com"

  //Declare state for dogs
  const [dogs, setDogs] = React.useState([])

  // empty - for the create form
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //Getting the dogs from db

  const getDogs = () => {
    fetch(url + "/dog/")
    .then((response) => response.json())
    .then((data) => {
      setDogs(data)
    })
  }

    //handleCreate, to get the data right away
    React.useEffect(() => {
      getDogs()
    }, [])

    const handleCreate = (newDog) => {
      fetch(url + "/dog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDog)
      })
      .then(() => getDogs())
    }

    const handleUpdate = (dog) => {
      fetch(url + "/dog/" + dog._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
      })
      .then(() => getDogs())
    }

//function to specify whoch dog gets updated
const selectDog = (dog) => {
  setSelectedDog(dog)
}

//function to delete individual dogs
const deleteDog = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "delete"
  })
  .then(() => {
    getDogs()
  })
}

  React.useEffect(() => {
    getDogs()
  }, [])



  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to='/create'>
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route 
            exact path="/" 
            render={(rp) => <Display 
              {...rp}
              dogs={dogs}
              selectDog={selectDog}
              deleteDog={deleteDog}
            />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
