const pokemonContainer = document.querySelector(".pokemon-container")
const spinner = document.getElementById("spinner")
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 8;

previous.addEventListener("click", () => {
	if(offset != 1){
		removeChilds(pokemonContainer)
		offset -= 9;
		fetchPokemon(offset, limit);
	}
})


next.addEventListener("click", () => {
	offset += 9;
	removeChilds(pokemonContainer)
	fetchPokemon(offset, limit);
})


const getPokemon = (id) => {
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
		.then(res => res.json())
		.then(data => {
			createPokemon(data)
			spinner.style.display = "none"
		})
}

const createPokemon = (pokemon) => {

	const flipCard = document.createElement("div");
	flipCard.classList.add("flip-card");

	const cardContainer = document.createElement("div");
	cardContainer.classList.add("card-container");

	flipCard.appendChild(cardContainer);

	const card = document.createElement("div");
	card.classList.add("pokemon-block");

	const spriteContainer = document.createElement("div");
	spriteContainer.classList.add("img-container");

	const sprite = document.createElement("img");
	sprite.src = pokemon.sprites.front_default;

	spriteContainer.appendChild(sprite);

	const number = document.createElement("p");
	number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

	const name = document.createElement("p");
	name.classList.add("name");
	name.textContent = pokemon.name;

	card.appendChild(spriteContainer);
	card.appendChild(number);
	card.appendChild(name);

	const cardBack = document.createElement("div")
	cardBack.classList.add("pokemon-block-back")

	cardBack.appendChild(progressBar(pokemon.stats))

	cardContainer.appendChild(card)
	cardContainer.appendChild(cardBack)
	pokemonContainer.appendChild(flipCard)
}

const fetchPokemon = (offset, limit) => {
	spinner.style.display = "block"
	for (let i = offset; i <= offset + limit; i++) {
		getPokemon(i)
	}
}

const removeChilds = (parent) => {
	while(parent.firstChild){
		parent.removeChild(parent.firstChild)
	}
}

const progressBar = (stats) => {
	const statsContainer = document.createElement("div");
	statsContainer.classList.add("stats-container");

	for(let i = 0; i < 3;i++){
		const stat = stats[i]

		const statsPercent = stat.base_state / 2 + "%";

		const statContainer = document.createElement("div");
		statContainer.classList.add("stat-container");

		const stateName = document.createElement("div")
		stateName.textContent = stat.stat.name

		const progress = document.createElement("div")
		progress.classList.add("progress")

		const progressBar = document.createElement("div")
		progressBar.classList.add("progress-bar")
		progressBar.setAttribute("arial-veluenow",stat.base_stat)	
		progressBar.setAttribute("arial-veluemin",0)	
		progressBar.setAttribute("arial-veluemax",200)
		progressBar.style.width = statsPercent;

		progressBar.textContent = stat.base_stat

		progress.appendChild(progressBar)
		statContainer.appendChild(stateName)
		statContainer.appendChild(progress)
		statsContainer.appendChild(statContainer)
	}

	return statsContainer
}


fetchPokemon(offset, limit)