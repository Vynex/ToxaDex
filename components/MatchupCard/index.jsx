import { useEffect, useState } from 'react';
import getMatchups from '../../lib/matchups';
import styles from '../../styles/Matchup.module.css';

const MatchupCard = ({ types }) => {
	const flattenTypes = (types) => types.map((type) => type.type.name);
	const [typeNames, setTypeNames] = useState(flattenTypes(types));

	useEffect(() => {
		console.log(getMatchups(typeNames));
	}, [typeNames]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>Type Matchups</div>

			<div className={styles.card}></div>
		</div>
	);
};

export default MatchupCard;
