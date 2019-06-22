<template>
	<i :style="{ backgroundImage: `url(${path})` }" class="file-icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FileIcon, fileIcons, IconPack } from '~/assets/fileIcons';
import file from '~/assets/icons/file.svg';

@Component({
	asyncComputed: {
		path: {
			async get() {
				const file = await this.icon.file();
				return file.default;
			},
			default: file,
		},
	},
})
export default class FileIconComponent extends Vue {
	@Prop(String) fileName!: string;
	@Prop({ type: Array, default: () => [] }) iconPacks!: IconPack[];

	private get icon(): FileIcon {
		const icons = (fileIcons.icons as FileIcon[])
			.filter((icon) => {
				if (icon.enabledFor) {
					return icon.enabledFor.some(pack => this.iconPacks.includes(pack));
				}
				return true;
			});
		let icon = icons.find(icon => !!(icon.fileNames && icon.fileNames.indexOf(this.fileName) !== -1));
		if (icon) return icon;
		icon = icons.find(icon => !!(icon.fileExtensions && icon.fileExtensions.indexOf(this.fileExtension) !== -1));
		return icon || fileIcons.defaultIcon;
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
