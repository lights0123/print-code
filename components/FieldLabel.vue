<template>
	<div class="ui form">
		<div class="field">
			<label><slot /></label>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FieldLabel extends Vue {
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

	/* your custom style here */
}

/* for block of code */
.hljs-ln-code {
	padding-left: 10px !important;
	white-space: pre-wrap;
}
</style>
