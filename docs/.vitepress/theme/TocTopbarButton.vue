<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, lang } = useData()

const canShow = computed(() => frontmatter.value.layout !== 'home')
const label = computed(() => (lang.value?.startsWith('en') ? 'On this page' : '本頁目錄'))

const toggleDrawer = () => {
  window.dispatchEvent(new Event('toc-drawer:toggle'))
}
</script>

<template>
  <button
    v-if="canShow"
    class="toc-topbar-button"
    type="button"
    :aria-label="label"
    @click="toggleDrawer"
  >
    <span class="toc-topbar-button-bar" />
    <span class="toc-topbar-button-bar" />
    <span class="toc-topbar-button-bar" />
  </button>
</template>
