document.addEventListener("DOMContentLoaded", start)

function start(){
  const filterDogsButton = document.querySelector("#good-dog-filter")
  filterDogsButton.addEventListener("click", toggleFilterDogs)
  getDogs().then(dogAddToDogBar)
}


function dogAddToDogBar(dog){
    const dogBar = document.querySelector("#dog-bar")
    const dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name
    dogSpan.dataset.id = dog.id
  
    dogSpan.addEventListener("click", dogClick)
  
    dogBar.append(dogSpan)
  }
  
  function dogClick(e){
    getSingleDog(e.target.dataset.id)
      .then(addInfo)
  }
  
  function addInfo(dog){
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    const dogImg = document.createElement("img")
    dogImg.src = dog.image
  
    const dogTitle = document.createElement("h2")
    dogTitle.innerText = dog.name
  
    const dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id
    dogButton.addEventListener("click", onGoodDogButtonClick)
  
    dogInfo.append(dogImg, dogTitle, dogButton)
  }

  function onGoodDogButtonClick(e){
    let newValue;
    if (e.target.innerText.includes("Good")){
      e.target.innerText = "Bad Dog"
      newValue = false
    } else {
      e.target.innerText = "Good Dog"
      newValue = true
    }
    toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar)
  }
  
  function updateDogBar(){
    const filterDogsButton = document.querySelector("#good-dog-filter")
    if (filterDogsButton.innerText.includes("OFF")){
      getDogs().then(dogArray => dogAddToDogBar(dogArray))
    } else {
      getDogs().then(dogArray => dogAddToDogBar(dogArray, true))
    }
  }

  function fetchDog() {
    return fetch(`http://localhost:3000/pups`)
    .then(res => res.json())
}

function toggleGoodDog(id, newValue){
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    }
    return fetch(`http://localhost:3000/pups/${id}`, options)
      .then(resp => resp.json())
  }