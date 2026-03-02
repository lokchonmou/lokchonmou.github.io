<script setup lang="ts">
import { computed } from 'vue'

type TocNode = {
  level: number
  slug: string
  title: string
  children: TocNode[]
}

defineOptions({
  name: 'TocTreeNode'
})

const props = defineProps<{
  node: TocNode
  expandedMap: Record<string, boolean>
}>()

const emit = defineEmits<{
  toggle: [slug: string]
}>()

const expanded = computed(() => Boolean(props.expandedMap[props.node.slug]))

const toggle = () => {
  emit('toggle', props.node.slug)
}
</script>

<template>
  <div class="toc-drawer-group" :class="`toc-level-${node.level}`">
    <div class="toc-drawer-group-head">
      <a :href="`#${node.slug}`" class="toc-drawer-link" :class="`toc-drawer-link-h${node.level}`">
        {{ node.title }}
      </a>
      <button
        v-if="node.children.length > 0"
        class="toc-drawer-group-toggle"
        type="button"
        :aria-expanded="expanded"
        @click="toggle"
      >
        {{ expanded ? '−' : '+' }}
      </button>
    </div>

    <div v-if="node.children.length > 0 && expanded" class="toc-drawer-children">
      <TocTreeNode
        v-for="child in node.children"
        :key="child.slug"
        :node="child"
        :expanded-map="expandedMap"
        @toggle="emit('toggle', $event)"
      />
    </div>
  </div>
</template>
