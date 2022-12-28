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

      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      sAttack: data.stats[3].base_stat,
      sDefense: data.stats[4].base_stat,
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
  console.log(isNaN(pokemon.id));

  if (isNaN(pokemon.id)) { pokemon.id = 1 }

  const pokePrev = pokemon.id - 1
  fetchData(pokePrev)
})

next.addEventListener('click', () => {
  if (isNaN(pokemon.id)) { pokemon.id = 1 }

  const pokeNext = pokemon.id + 1
  fetchData(pokeNext)
})

const drawCard = (pokemon) => {

  const card = document.querySelector('.card')


  card.querySelector('.card-body__img').setAttribute('src', pokemon.img)
  card.querySelector('.card-body__title').innerHTML = `${pokemon.name} <span>N.º${pokemon.id}</span>`

  card.querySelector('.pokecard-hp').innerHTML = `hp: ${pokemon.hp}`
  card.querySelector('.pokecard-attack').innerHTML = `attack: ${pokemon.attack}`
  card.querySelector('.pokecard-defense').innerHTML = `defense: ${pokemon.defense}`
  card.querySelector('.pokecard-sAttack').innerHTML = `sp. atack: ${pokemon.sAttack}`
  card.querySelector('.pokecard-sDefense').innerHTML = `sp. defense: ${pokemon.sDefense}`
  card.querySelector('.pokecard-speed').innerHTML = `speed: ${pokemon.speed}`


}
