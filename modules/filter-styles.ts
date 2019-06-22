import { join, resolve } from 'path';
import fs from 'mz/fs';
import { map } from 'p-iteration';
import colorString from 'color-string';
import { minify } from 'csso';

const { readdir, readFile } = fs;

async function getValidStyles(): Promise<object> {
	const dir = 'node_modules/highlight.js/styles';
	const re = /\.hljs[, \n][^{]*{[^}]*background[^:]*:\s*(.*);/;
	const files = (await readdir(dir))
		.filter(file => file.endsWith('.css'));
	let styles = await map(files, async file => ({ file, contents: await readFile(join(dir, file), 'utf8') }));
	styles = styles.filter(({ contents }) => {
		const matched = re.exec(contents);
		if (!matched) {
			return contents.indexOf('@import') === -1;
		}
		const args = colorString.get.rgb(matched[1]);
		if (!args) return false;
		const color = colorString.to.hex(args);
		return color === '#FFFFFF';
	});
	styles = styles.map((style) => {
		style.file = style.file.substring(0, style.file.length - 4);
		style.file = style.file.toLowerCase()
			.replace(/_/g, '-')
			.split('-')
			.map(word => word.replace(word[0], word[0].toUpperCase()))
			.join(' ');
		return style;
	});
	return styles.reduce((acc, { file, contents }) => {
		acc[file] = minify(contents).css;
		return acc;
	}, {});
}

export default async function commit(moduleOptions) {
	const styles = await getValidStyles();
	this.addPlugin({
		src: resolve(__dirname, '../plugins/filter-styles.js'),
		options: {
			styles: JSON.stringify(styles),
		},
	});
}
