import axios from 'axios';

export const getOfficialArtwork = (number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

export const getFrontSprite = (number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;

export const getHomeSprite = (number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${number}.png`;

const getPokemon = async (number) => {
	const { data } = await axios.get(
		`https://pokeapi.co/api/v2/pokemon/${Number(number)}`
	);

	return data;
};

const getGenus = async (number) => {
	const { data } = await axios.get(
		`https://pokeapi.co/api/v2/pokemon-species/${Number(number)}`
	);

	return data;
};

const getEvolution = async (uri) => {
	const { data } = await axios.get(uri);

	const getName = (name) =>
		name
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');

	const getId = (uri) => {
		let uriArray = uri.split('/');
		const number = Number(uriArray[uriArray.length - 2]);
		return number;
	};

	const populateEvolutions = (chain) => {
		if (!chain.evolves_to) return;
		else
			return {
				name: getName(chain.species.name),
				id: getId(chain.species.url),
				isBaby: chain.is_baby,
				hasEvolved: true,

				evolvesTo: [
					...chain.evolves_to.map((evolution) =>
						populateEvolutions(evolution)
					),
				],
			};
	};

	const chain = {
		name: getName(data.chain.species.name),
		id: getId(data.chain.species.url),
		isBaby: data.chain.is_baby,
		hasEvolved: false,

		evolvesTo: [
			...data.chain.evolves_to.map((evo) => populateEvolutions(evo)),
		],
	};

	return chain;
};

export const getPokemonData = async (number) => {
	const pokemonData = await getPokemon(number);
	const speciesData = await getGenus(number);
	const evolutionData = await getEvolution(speciesData.evolution_chain.url);

	const genus = speciesData.genera.filter((genera) => {
		if (genera.language.name === 'en') return genera.genus;
	})[0].genus;

	const pokemon = {
		id: pokemonData.id,
		name: pokemonData.name,
		species: { name: pokemonData.species.name },
		category: genus,

		height: pokemonData.height,
		weight: pokemonData.weight,

		abilities: pokemonData.abilities,
		stats: pokemonData.stats,
		type: pokemonData.types,

		sprites: {
			front_default: getFrontSprite(number),
			home_front: getHomeSprite(number),
			official_artwork: getOfficialArtwork(number),
		},

		evolutionChain: evolutionData,
	};

	return pokemon;
};
