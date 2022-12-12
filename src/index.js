let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  // toggle function given by lab
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // get elements
  const cardContainer = document.querySelector('#toy-collection')
  const form = document.querySelector('form')

  // fuction for fetch resp

  let handleClick = (e) => {
    let likeCount = e.target.previousSibling.textContent 
     fetch(`http://localhost:3000/toys/${e.target.id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         "likes": ++likeCount
       })
     })
     .then((resp) => resp.json())
     .then((updatedToy) => e.target.previousSibling.textContent++)
   }

  function fillContent(pram){
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<h2>${pram.name}</h2> <img src=${pram.image} class="toy-avatar"/> <p>${pram.likes}</p>`
    const btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.id = pram.id
    btn.textContent = "like ❤️"
    btn.addEventListener('click', handleClick)
    cardContainer.appendChild(card)
    card.appendChild(btn)
  }

  function getToyCards(data){
    data.forEach((toy) => {
      fillContent(toy)
    })
  }

  // function for post
  function postCard(name, image){
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        'name': name,
        'image': image,
        'likes': 0 ,
      })
    })
    .then((resp) => resp.json())
    .then((resp) => fillContent(resp))
    .catch((error) => console.log(error.message))
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = form[0].value
    let image = form[1].value
    postCard(name, image)
    form.reset()
  })

  // fetch request
  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((resp) => getToyCards(resp))
  .catch((error) => console.log(error.message))

});
