console.log('work');

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


document.addEventListener('change', () => {

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
  }
}

const drawCard = (pokemon) => {
  console.log(pokemon);

  const flex = document.querySelector('.flex') 
  const template = document.querySelector('#template-card').content 
  const clone = template.cloneNode(true)
  const fragment = document.createDocumentFragment()

  clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
  clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>N.º${pokemon.id}</span>`
  clone.querySelector('.card-body-text').innerHTML = `${pokemon.type}`

  clone.querySelectorAll('.card-footer h3')[0].innerHTML = `${pokemon.attack}`
  clone.querySelectorAll('.card-footer h3')[1].innerHTML = `${pokemon.defense}`
  clone.querySelectorAll('.card-footer h3')[2].innerHTML = `${pokemon.speed}`



  fragment.appendChild(clone)
  flex.appendChild(fragment)
}
