// const getRandomArbitrary = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// }


document.addEventListener('change', () => {
// document.addEventListener('DOMContentLoaded', () => {


  const pokemonName = document.getElementById('pokemon-name__input').value
  fetchData(pokemonName)
})

const fetchData = async (pokemonName) => {

  console.log(pokemonName);
  
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await res.json()

    const pokemon = {
      img: data.sprites.front_default,
      name: data.name,
      id: data.id,
      type: data.types[0].type.name,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat
    }

    drawCard(pokemon)

  } catch (error) {
    console.log(error);
    console.log('nombre o id no válidos');

  }
}

const drawCard = (pokemon) => {
  console.log(pokemon);

  const flex = document.querySelector('.flex') 
  const template = document.querySelector('.card')
  const clone = template.cloneNode(true)
  const fragment = document.createDocumentFragment()

  template.querySelector('.card-body__img').setAttribute('src', pokemon.img)
  template.querySelector('.card-body__title').innerHTML = `${pokemon.name} <span>N.º${pokemon.id}</span>`
  // clone.querySelector('.card-body-text').innerHTML = `${pokemon.type}`

  // clone.querySelectorAll('.card-footer h3')[0].innerHTML = `${pokemon.attack}`
  // clone.querySelectorAll('.card-footer h3')[1].innerHTML = `${pokemon.defense}`
  // clone.querySelectorAll('.card-footer h3')[2].innerHTML = `${pokemon.speed}`

}
