// import Layout from '../../components/layout';

import Head from 'next/head';
import Image from 'next/image';

import { prominent, average } from 'color.js';
import { useEffect, useState } from 'react';
import { getFrontSprite, getHomeSprite, getPokemonData } from '../../lib/pokemon';

import styles from '../../styles/Pokemon.module.css';
import Type from '../../components/Type';

import { BsChevronCompactDown } from 'react-icons/bs';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import EvolutionCard from '../../components/EvolutionCard';
import StatsCard from '../../components/StatsCard';
import tinycolor from 'tinycolor2';
import MatchupCard from '../../components/MatchupCard';

const Pokemon = ({ pokemonData }) => {
	const router = useRouter();

	const getName = (name) => {
		let speciesName = name
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');
		return speciesName;
	};

	const [name, setName] = useState(getName(pokemonData.species.name));
	const [dexNumber, setDexNumber] = useState(
		`#${String(router.query.number).padStart(3, '0')}`
	);

	const [abilities, setAbilities] = useState([]);
	const [vibrantColor, setVibrantColor] = useState('#FFFFFF');

	useEffect(() => {
		setDexNumber(`#${String(router.query.number).padStart(3, '0')}`);
	}, [router.query.number]);

	useEffect(() => {
		const getPalette = async () => {
			const promColor = await prominent(pokemonData.sprites.home_front, {
				amount: 3,
				group: 30,
				format: 'hex',
			});

			let bgColor = tinycolor(promColor[1]).isLight()
				? promColor[2]
				: promColor[1];

			setVibrantColor(bgColor);
			document.body.style.backgroundColor = bgColor;
		};
		getPalette();
	}, [pokemonData]);

	useEffect(() => {
		setAbilities(
			pokemonData.abilities.map((ability) => ({
				name: ability.ability.name
					.split('-')
					.map((word) => word[0].toUpperCase() + word.slice(1))
					.join(' '),
				isHidden: ability.is_hidden,
			}))
		);
	}, [pokemonData]);

	return (
		<>
			<Head>
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href={getHomeSprite(Number(router.query.number))}
				></link>
				<title>
					{dexNumber} | {name} | ToxaDex
				</title>
			</Head>

			<Navbar number={Number(dexNumber.slice(1))} />

			<main className={styles.main}>
				<div className={styles.row}>
					<section className={styles.meta}>
						<div className={styles.identifier}>
							<div>
								<div className={styles.dexId}>{dexNumber}</div>
								<div className={styles.name}>{name}</div>
								<div className={styles.category}>
									{pokemonData.category}
								</div>
							</div>

							<div className={styles.types}>
								{pokemonData.type.map((type, idx) => (
									<Type key={idx} type={type.type.name} />
								))}
							</div>
						</div>

						<div className={styles.container}>
							<div className={styles.card}>
								<div>
									<span className={styles.key}>Height</span>{' '}
									<div>{pokemonData.height / 10}m</div>
								</div>
								<div>
									<span className={styles.key}>Weight</span>{' '}
									<div>{pokemonData.weight / 10}kg</div>
								</div>
								<div>
									<span className={styles.key}>Abilities</span>{' '}
									<div className={styles.abilities}>
										{abilities.map((ability, idx) => (
											<span className={styles.ability} key={idx}>
												{ability.name}{' '}
												{ability.isHidden && (
													<span className={styles.abilityHidden}>
														(Hidden)
													</span>
												)}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className={styles.art}>
						<div>
							<Image
								className={styles.image}
								alt={name}
								src={pokemonData.sprites.official_artwork}
								// src={pokemonData.sprites.home_front}
								height="475"
								width="475"
							/>
						</div>
					</section>
				</div>
			</main>

			<main className={styles.main}>
				<EvolutionCard
					chain={pokemonData.evolutionChain}
					color={vibrantColor}
				/>
			</main>

			<main className={styles.main}>
				<div className={styles.row}>
					<StatsCard stats={pokemonData.stats} />
					<MatchupCard types={pokemonData.type} />
				</div>
			</main>
		</>
	);
};

export const getStaticPaths = () => {
	const paths = [...Array(898).keys()].map((_, id) => {
		return { params: { number: String(id + 1) } };
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const pokemonData = await getPokemonData(params.number);

	return {
		props: { pokemonData },
	};
};

export default Pokemon;
