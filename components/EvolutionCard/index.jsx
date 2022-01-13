import Image from 'next/image';

import { getFrontSprite } from '../../lib/pokemon';
import styles from '../../styles/Evolution.module.css';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';

const PokemonIcon = ({ name, id, multi, borderColor }) => {
	const borderStyle = { outline: `4px solid ${borderColor}` };

	return (
		<div
			className={`${styles.pokemon} ${multi && styles.multiPokemon}`}
			style={borderStyle}
		>
			<Image src={getFrontSprite(id)} alt={name} height={110} width={110} />
			<Link href={`/dex/${id}`}>
				<a>{name}</a>
			</Link>
		</div>
	);
};

const EvolutionLine = ({ chain, color }) => {
	return (
		<div className={styles.group}>
			{chain.hasEvolved && <BsChevronRight />}
			<PokemonIcon
				name={chain.name}
				id={chain.id}
				multi={chain.evolvesTo.length > 2}
				borderColor={color}
			/>

			{chain.evolvesTo.length <= 2 && (
				<div className={styles.stage}>
					{chain.evolvesTo.map((next) => (
						<EvolutionLine key={next.id} chain={next} color={color} />
					))}
				</div>
			)}

			{chain.evolvesTo.length > 2 && (
				<div className={styles.multiGroup}>
					<MultiEvolution color={color} chain={chain} />
				</div>
			)}
		</div>
	);
};

const MultiEvolution = ({ chain, color }) => {
	return (
		<>
			<BsChevronRight />

			<div className={styles.multiStage}>
				{chain.evolvesTo.map((next) => (
					<PokemonIcon
						key={next.id}
						name={next.name}
						id={next.id}
						multi={true}
						borderColor={color}
					/>
				))}
			</div>
		</>
	);
};

const EvolutionCard = ({ chain, color }) => {
	return (
		<>
			<div className={styles.header}>Evolution Chain</div>

			<div className={styles.card}>
				<EvolutionLine chain={chain} color={color} />
			</div>
		</>
	);
};

export default EvolutionCard;
