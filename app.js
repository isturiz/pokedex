// const getRandomArbitrary = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

let pokemon = {}

const updateName = (name) => {
  document.getElementById('pokemon-name__input').value = `${name}`
}

const fetchData = async (pokemonName) => {

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await res.json()

    pokemon = {
      img: data.sprites.front_default,
      name: data.name,
      id: data.id,
      type: data.types[0].type.name,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat
    }

    setTimeout(updateName(pokemon.name), 5000)

    drawCard(pokemon)

  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('keyup', () => {
// document.addEventListener('DOMContentLoaded', () => {
  const pokemonName = document.getElementById('pokemon-name__input').value.toLowerCase();
  fetchData(pokemonName)
})


let prev = document.querySelector('#prev')
let next = document.querySelector('#next')

prev.addEventListener('click', () => {
  const pokePrev = pokemon.id - 1
  console.log(pokePrev);
  fetchData(pokePrev)

  

})

next.addEventListener('click', () => {
  const pokeNext = pokemon.id + 1
  console.log(pokeNext);
  fetchData(pokeNext)
})

const drawCard = (pokemon) => {

  const card = document.querySelector('.card')


  card.querySelector('.card-body__img').setAttribute('src', pokemon.img)
  card.querySelector('.card-body__title').innerHTML = `${pokemon.name} <span>N.º${pokemon.id}</span>`
  card.querySelector('.card-type').innerHTML = `${pokemon.attack}`
  // clone.querySelector('.card-body-text').innerHTML = `${pokemon.type}`

  // clone.querySelectorAll('.card-footer h3')[0].innerHTML = `${pokemon.attack}`
  // clone.querySelectorAll('.card-footer h3')[1].innerHTML = `${pokemon.defense}`
  // clone.querySelectorAll('.card-footer h3')[2].innerHTML = `${pokemon.speed}`

}
