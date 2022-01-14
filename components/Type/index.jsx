import styles from '../../styles/Type.module.css';

const Type = ({ type }) => {
	return (
		<button
			className={`${styles.type} ${styles[type]} ${styles.label} ${styles.tooltip}`}
			data-tip={type}
		/>
	);
};

export default Type;
