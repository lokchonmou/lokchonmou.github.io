<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import TocTreeNode from './TocTreeNode.vue'

const { lang } = useData()
const route = useRoute()
const isOpen = ref(false)
const headings = ref<Array<{ level: number; slug: string; title: string }>>([])
const expandedGroups = ref<Record<string, boolean>>({})

type TocGroup = {
  level: number
  slug: string
  title: string
  children: TocGroup[]
}

const collectHeadingsFromDom = () => {
  const root = document.querySelector('.vp-doc')
  if (!root) {
    headings.value = []
    return
  }

  const nodes = Array.from(root.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')) as HTMLElement[]
  headings.value = nodes
    .map((node) => {
      const clone = node.cloneNode(true) as HTMLElement
      clone.querySelector('.header-anchor')?.remove()

      return {
        level: Number(node.tagName.slice(1)),
        slug: node.id,
        title: clone.textContent?.trim() ?? ''
      }
    })
    .filter((item) => item.title)
}

const groupedHeadings = computed<TocGroup[]>(() => {
  const groups: TocGroup[] = []
  const stack: TocGroup[] = []

  for (const item of headings.value) {
    if (item.level < 2 || item.level > 6) {
      continue
    }

    const node: TocGroup = {
      level: item.level,
      slug: item.slug,
      title: item.title,
      children: []
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      groups.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  }

  return groups
})

const title = computed(() => (lang.value?.startsWith('en') ? 'On this page' : '本頁目錄'))

const hasToc = computed(() => headings.value.length > 0)

const isGroupExpanded = (slug: string) => Boolean(expandedGroups.value[slug])

const toggleGroup = (slug: string) => {
  expandedGroups.value = {
    ...expandedGroups.value,
    [slug]: !expandedGroups.value[slug]
  }
}

onMounted(async () => {
  await nextTick()
  collectHeadingsFromDom()

  window.addEventListener('toc-drawer:toggle', toggleDrawer)
  window.addEventListener('toc-drawer:close', closeDrawer)
})

onBeforeUnmount(() => {
  window.removeEventListener('toc-drawer:toggle', toggleDrawer)
  window.removeEventListener('toc-drawer:close', closeDrawer)
})

watch(
  () => route.path,
  async () => {
    isOpen.value = false
    expandedGroups.value = {}
    await nextTick()
    collectHeadingsFromDom()
  }
)

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}

const closeDrawer = () => {
  isOpen.value = false
}
</script>

<template>
  <div v-if="hasToc" class="toc-drawer-root">
    <aside class="toc-drawer" :class="{ 'is-open': isOpen }">
      <div class="toc-drawer-header">
        <strong>{{ title }}</strong>
        <button type="button" class="toc-drawer-close" @click="closeDrawer">×</button>
      </div>
      <nav class="toc-drawer-nav">
        <TocTreeNode
          v-for="group in groupedHeadings"
          :key="group.slug"
          :node="group"
          :expanded-map="expandedGroups"
          @toggle="toggleGroup"
        />
      </nav>
    </aside>
  </div>
</template>
