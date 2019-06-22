/* eslint-disable */
import styles from '../components/styles.ts';
const internalStyles = (<%= options.styles %>);
for (const style in internalStyles) {
	styles[style] = internalStyles[style];
}
