import { Component, Vue } from '~/node_modules/vue-property-decorator';

@Component
export default class VStyle extends Vue {
	render(createElement) {
		return createElement('style', this.$slots.default);
	}
}
