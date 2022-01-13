import typeData from './types.json';

const getMatchups = (types) => {
	const matchups = {};

	types.forEach((type) => {
		const damageRelations = typeData[type];

		let immuneFrom = damageRelations.defense.zero;
		let resistantFrom = damageRelations.defense.half;
		let weakFrom = damageRelations.defense.double;

		immuneFrom.forEach((type) => {
			matchups[type] = matchups.hasOwnProperty(type)
				? matchups[type] * 0
				: 0;
		});

		resistantFrom.forEach((type) => {
			matchups[type] = matchups.hasOwnProperty(type)
				? matchups[type] * 0.5
				: 0.5;
		});

		weakFrom.forEach((type) => {
			matchups[type] = matchups.hasOwnProperty(type)
				? matchups[type] * 2
				: 2;
		});
	});

	return matchups;
};

export default getMatchups;
