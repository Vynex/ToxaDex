import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
	const router = useRouter();
	const current = Number(router.query.number);

	const generateLower = (num) => {
		let lower = num - 4;

		if (num - 4 < 0) lower = 1;
		if (num + 5 > 898) lower -= num + 5 - 898;

		return lower;
	};

	const [lower, setLower] = useState(generateLower(current));
	const [links, setLinks] = useState([]);

	useEffect(() => {
		setLower(generateLower(current));
	}, [current]);

	useEffect(() => {
		const nums = new Array(10);
		for (let i = 0; i != 10; i++) nums[i] = lower + i;

		setLinks(nums);
	}, [router.query.number, lower]);

	const handleLeft = () => {
		if (lower < 2) return;
		setLower((lwr) => lwr - 1);
	};

	const handleRight = () => {
		if (lower + 10 > 898) return;
		setLower((lwr) => lwr + 1);
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.links}>
				<BsChevronLeft className={styles.arrow} onClick={handleLeft} />
				{links.map((link, idx) => (
					<Link key={idx} href={`/${link}`}>
						<a
							className={`${styles.link} ${
								link === current && styles.active
							}`}
						>
							{String(link).padStart(3, '0')}
						</a>
					</Link>
				))}
				<BsChevronRight className={styles.arrow} onClick={handleRight} />
			</div>
		</nav>
	);
};

export default Navbar;
