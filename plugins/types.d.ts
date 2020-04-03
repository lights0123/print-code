declare module '*.svg' {
	const value: string;
	export = value;
}
declare module '*.vue' {
	import Vue from 'vue';
	export default Vue;
}
