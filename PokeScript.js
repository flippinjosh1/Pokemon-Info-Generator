function myFunction() {

    var x = document.getElementById("myText").value;
    document.getElementById("myText").innerHTML = x;

    const apiData = {
        url: 'https://pokeapi.co/api/v2/pokemon',
        name: x.toLowerCase(),
    }

    const {url, name} = apiData

    const apiUrl = `${url}/${name}`

    fetch(apiUrl)
        .then( (data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error('Response not ok.'); 
        })
        .then( pokemon => generateImg(pokemon) & generateDetails(pokemon))
        .catch( error => console.error('Error:', error))

    const generateImg = (data) => {
            console.log(data)
            const html = `
            <div class="name">${data.name}</div>
            <img src=${data.sprites.front_default}>
        `
        const pokemonDiv = document.querySelector('.pokemon')
        pokemonDiv.innerHTML = html
    }

    const generateDetails = (data) => {
        console.log(data)
        const html = `
        <div class="details">
            <span>Type: ${data.types[0].type.name}</span>
            <span>PokeID: ${data.id}</span><br></br>
            <span>Height: ${data.height}dm</span>
            <span>Weight: ${data.weight}kg</span>
        </div>
        `
        const pokemonDetails = document.querySelector('.pokemon-details')
        pokemonDetails.innerHTML = html
    }
}