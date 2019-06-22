<template>
	<pre><code :style="{ tabSize, fontSize: `${fontSize}px` }" :class="['hljs', lang]" v-html="formattedCode" /></pre>
</template>

<script lang="ts">
import {
	Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import hljs from 'highlight.js';
import highlightLines from './highlightLines';

@Component
export default class Code extends Vue {
	@Prop(String) lang!: string;
	@Prop(String) code!: string;
	@Prop({ type: Boolean, default: true }) lineNumbers!: boolean;
	@Prop({ type: Number, default: 4 }) tabSize!: number;
	@Prop({ type: Number, default: 14 }) fontSize!: number;
	private formattedCode = '';

	public mounted() {
		this.onCodeUpdate();
	}

	@Watch('code')
	@Watch('lang')
	@Watch('lineNumbers')
	// highlightLines must be called in the browser
	private onCodeUpdate() {
		let code = hljs.highlight(this.lang, this.code).value;
		if (this.code.length > 0 && this.lineNumbers) {
			code = highlightLines(code);
		}
		this.formattedCode = code;
	}
}
</script>

<style lang="scss">
.hljs-ln {
	td {
		padding: 0;
	}

	border-collapse: collapse;
	line-height: 1.429em;
}

.hljs-ln-n:before {
	content: attr(data-line-number)
}

/* for block of numbers */
.hljs-ln-numbers {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	text-align: right;
	color: #ccc;
	border-right: 1px solid #CCC;
	vertical-align: top;
	padding-left: 5px !important;
	padding-right: 5px !important;
}

/* for block of code */
.hljs-ln-code {
	padding-left: 10px !important;
	white-space: pre-wrap;
}
</style>
