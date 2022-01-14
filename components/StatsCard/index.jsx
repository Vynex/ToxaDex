import { useState } from 'react';
import styles from '../../styles/Stats.module.css';

const StatsCard = ({ stats }) => {
	const getTotalStats = (stats) => {
		let totalStats = 0;
		stats.forEach((stat) => {
			totalStats += stat.base_stat;
		});
		return totalStats;
	};

	const [totalStats, setTotalStats] = useState(getTotalStats(stats));

	return (
		<div className={styles.container}>
			<div className={styles.header}>Base Stats</div>

			<div className={styles.card}>
				<div className={styles.row}>
					<span className={styles.label}>HP</span>
					<span className={styles.value}>{stats[0].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[0].base_stat / 180) * 100}%`,
								backgroundColor: '#FF2626',
							}}
						></div>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Attack</span>
					<span className={styles.value}>{stats[1].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[1].base_stat / 180) * 100}%`,
								backgroundColor: '#FF7800',
							}}
						></div>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Defense</span>
					<span className={styles.value}>{stats[2].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[2].base_stat / 180) * 100}%`,
								backgroundColor: '#FFBD35',
							}}
						></div>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Sp. Atk</span>
					<span className={styles.value}>{stats[3].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[3].base_stat / 180) * 100}%`,
								backgroundColor: '#6890f0',
							}}
						></div>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Sp. Def</span>
					<span className={styles.value}>{stats[4].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[4].base_stat / 180) * 100}%`,
								backgroundColor: '#78c850',
							}}
						></div>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.label}>Speed</span>
					<span className={styles.value}>{stats[5].base_stat}</span>

					<div className={styles.chartContainer}>
						<div
							className={styles.chart}
							style={{
								width: `${(stats[5].base_stat / 180) * 100}%`,
								backgroundColor: '#f85888',
							}}
						></div>
					</div>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Total</span>
					<span className={`${styles.value} ${styles.total}`}>
						{totalStats}
					</span>

					<div className={styles.chartContainer}></div>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
