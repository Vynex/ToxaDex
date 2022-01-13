import typeData from './types.json';

const getMatchups = (types) => {
	const typeNames = types.map((type) => type.type.name);

	const multipliers = {};

	typeNames.forEach((type) => {
		const damageRelations = typeData[type];

		let immuneFrom = damageRelations.defense.zero;
		let resistantFrom = damageRelations.defense.half;
		let weakFrom = damageRelations.defense.double;

		immuneFrom.forEach((type) => {
			multipliers[type] = multipliers.hasOwnProperty(type)
				? multipliers[type] * 0
				: 0;
		});

		resistantFrom.forEach((type) => {
			multipliers[type] = multipliers.hasOwnProperty(type)
				? multipliers[type] * 0.5
				: 0.5;
		});

		weakFrom.forEach((type) => {
			multipliers[type] = multipliers.hasOwnProperty(type)
				? multipliers[type] * 2
				: 2;
		});
	});

	const matchups = {
		immuneTo: [],
		resistantTo: [],
		weakTo: [],
	};

	Object.entries(multipliers).forEach((category) => {
		const [type, multipler] = category;

		if (multipler === 0) matchups.immuneTo.push({ [type]: multipler });
		else if (multipler < 1) matchups.resistantTo.push({ [type]: multipler });
		else if (multipler > 1) matchups.weakTo.push({ [type]: multipler });
	});

	return matchups;
};

export default getMatchups;
