import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import TocDrawer from './TocDrawer.vue'
import TocTopbarButton from './TocTopbarButton.vue'
import LocaleSwitchButton from './LocaleSwitchButton.vue'
import './custom.css'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'nav-bar-content-before': () => h(TocTopbarButton),
			'nav-bar-content-after': () => h(LocaleSwitchButton),
			'doc-before': () => h(TocDrawer)
		})
	}
}
