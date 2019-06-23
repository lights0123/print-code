<template>
	<img :src="path" class="file-icon">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AsyncComputed from './asyncComputed';
import icons from '~/assets/fileIcons';
import file from '~/assets/icons/file.svg';

@Component
export default class FileIconComponent extends Vue {
	@Prop(String) fileName!: string;

	@AsyncComputed({ default: file })
	async path() {
		const file = await this.icon();
		return file.default;
	}

	private get icon(): () => Promise<{ default: string }> {
		return (icons.find(({ pattern }) => pattern.test(this.fileName)) || icons[icons.length - 1]).icon;
	}

	private get fileExtension(): string {
		const parts = this.fileName.split('.');
		return parts[parts.length - 1];
	}
}
</script>

<style scoped>
.file-icon {
	background-size: contain;
	width: 1.2em;
	height: 1.2em;
}
</style>
