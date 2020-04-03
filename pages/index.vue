<template>
	<main>
		<v-style>{{ styles[style] }}</v-style>
		<div class="ui text container hide-print">
			<br>
			<div class="ui form">
				<div class="field">
					<label>Code</label>
					<textarea v-model="code" class="monospaced" />
				</div>
			</div>
			<br>
			<div class="ui stackable grid">
				<div class="six wide column" style="padding: 0 0.2rem !important;">
					<field-label>Theme</field-label>
					<v-select v-model="style"
					          :options="styleNames"
					          :clearable="false"
					          :select-on-tab="true"
					/>
				</div>
				<div class="six wide column" style="padding: 0 0.2rem !important;">
					<field-label>Language</field-label>
					<v-select v-model="language"
					          :options="languages"
					          :clearable="false"
					          :select-on-tab="true"
					/>
				</div>
				<div class="four wide column" style="padding: 0 0.2rem !important;">
					<field-label>Tab Size</field-label>
					<v-select v-model="tabSize"
					          class="tab-size"
					          :options="[2, 4, 8]"
					          :clearable="false"
					          :select-on-tab="true"
					/>
				</div>
			</div>
			<br>
			<br>
			<div class="ui stackable grid">
				<div class="two wide column" style="padding: 0 0.2rem !important;">
					<field-label>Line Numbers</field-label>
					<div class="ui checkbox">
						<input v-model="lineNumbers" type="checkbox" name="Line Numbers">
						<label />
					</div>
				</div>
				<div class="fourteen wide column" style="padding: 0 0.2rem !important;">
					<field-label>Font Size</field-label>
					<div class="slider">
						<vue-slider v-model="fontSize" :min="6" :max="72" />
						<div class="ui left pointing label">
							{{ fontSize }}px
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
			<div class="ui stackable grid">
				<div class="two wide column" style="padding: 0 0.2rem !important;">
					<field-label>Show File Icon</field-label>
					<div class="ui checkbox">
						<input v-model="fileIcon" type="checkbox" name="Show File Icon">
						<label />
					</div>
				</div>
				<div class="fourteen wide column" style="padding: 0 0.2rem !important;">
					<div class="ui form">
						<div class="field">
							<label>File Name</label>
							<input v-model="fileName"
							       type="text"
							       name="File Name"
							       :placeholder="`file.${language}`"
							>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="file-name monospaced" :style="{ fontSize: `${fontSize}px` }">
			<file-icon v-if="fileIcon" :file-name="fileName" />
			<span>{{ fileName }}</span>
		</div>
		<div class="highlighted">
			<highlighted-code :code="code"
			                  :tab-size="tabSize"
			                  :lang="language"
			                  :font-size="fontSize"
			                  :line-numbers="lineNumbers"
			/>
		</div>
	</main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import 'fomantic-ui-css/components/container.css';
import 'fomantic-ui-css/components/form.css';
import 'fomantic-ui-css/components/grid.css';
import 'fomantic-ui-css/components/label.css';
import 'fomantic-ui-css/components/checkbox.css';
import 'vue-select/dist/vue-select.css';
import 'firacode/distr/fira_code.css';
import 'vue-slider-component/dist-css/vue-slider-component.css';
import 'vue-slider-component/theme/default.css';
import hljs from 'highlight.js';
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js';
import vSelect from 'vue-select';
import vStyle from '@/components/VStyle';
import HighlightedCode from '@/components/HighlightedCode.vue';
import FieldLabel from '@/components/FieldLabel.vue';
import FileIcon from '@/components/FileIcon.vue';
import styles from '@/components/styles';

@Component({
	components: {
		vStyle,
		vSelect,
		HighlightedCode,
		FieldLabel,
		FileIcon,
		VueSlider,
	},
})
export default class Index extends Vue {
	private code = '';
	private fileName = '';
	private styles = styles;
	private lineNumbers = true;
	private fileIcon = true;
	private tabSize = 4;
	private fontSize = 14;
	private style: string = Object.keys(styles)[0];
	private language = 'rust';

	private get styleNames() {
		return Object.keys(this.styles);
	}

	private get languages() {
		return hljs.listLanguages();
	}
}

</script>

<style scoped lang="scss">
$monospaced: "Fira Code", serif;
.monospaced {
	font-family: $monospaced !important;
}

@media print {
	.highlighted {
		/deep/ code {
			padding-top: 0;
			padding-bottom: 0;
		}

		pre {
			margin: 0;
		}
	}
	.hide-print {
		display: none;
	}
}

.grid {
	margin-left: -0.2rem;
	margin-right: -0.2rem;
}

.slider {
	display: flex;
	align-items: center;

	& > .vue-slider {
		width: 100% !important;
	}

	& > .label {
		white-space: nowrap;
	}
}

.file-name {
	@media screen {
		margin-top: 1em;
	}
	align-items: center;
	padding-left: 0.5em;
	display: flex;
	span {
		padding-left: 0.5em;
	}
}
</style>
