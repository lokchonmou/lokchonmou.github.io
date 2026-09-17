<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'

const route = useRoute()

const currentLocale = computed<'zh' | 'en'>(() => {
  if (route.path.startsWith('/en/')) {
    return 'en'
  }
  return 'zh'
})

const targetLocale = computed<'zh' | 'en'>(() => (currentLocale.value === 'zh' ? 'en' : 'zh'))

const label = computed(() => (targetLocale.value === 'en' ? '[EN]' : '[繁]'))

const fallbackPath = computed(() => (targetLocale.value === 'en' ? '/en/' : '/zh/'))

const targetPath = computed(() => {
  const currentPath = route.path.replace(/\?.*$/, '').replace(/#.*/, '')
  const normalized = currentPath.endsWith('/') ? currentPath : currentPath

  if (normalized.startsWith('/zh/')) {
    return normalized.replace(/^\/zh\//, '/en/')
  }

  if (normalized.startsWith('/en/')) {
    return normalized.replace(/^\/en\//, '/zh/')
  }

  return fallbackPath.value
})

function pathToHashKey(path: string): string {
  const rawPath = path.split('#')[0].split('?')[0]
  const noHtml = rawPath.replace(/\.html$/i, '')
  const normalized = noHtml.startsWith('/') ? noHtml : `/${noHtml}`
  const parts = normalized.split('/').filter(Boolean)

  if (parts.length === 0) {
    return 'index.md'
  }

  const locale = parts[0].toLowerCase()
  const rest = parts.slice(1).map((segment) => decodeURIComponent(segment).toLowerCase())
  const shouldUseIndex = normalized.endsWith('/') || rest.length === 0
  const all = shouldUseIndex ? [locale, ...rest, 'index'] : [locale, ...rest]

  return `${all.join('_')}.md`
}

function hasTargetPage(path: string): boolean {
  const hashMap = (window as any).__VP_HASH_MAP__ as Record<string, string> | undefined
  if (!hashMap) {
    return true
  }

  const key = pathToHashKey(path)
  return Boolean(hashMap[key])
}

function navigate(path: string) {
  window.location.href = withBase(path)
}

function onSwitchClick(event: MouseEvent) {
  event.preventDefault()

  const candidate = targetPath.value
  if (hasTargetPage(candidate)) {
    navigate(candidate)
    return
  }

  navigate(fallbackPath.value)
}
</script>

<template>
  <a class="locale-switch-button" :href="targetPath" @click="onSwitchClick">
    {{ label }}
  </a>
</template>
