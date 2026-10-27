<script setup lang="ts">
import type {
  AdminLink,
  AdminLinkStats,
  AdminLinkSummary,
  AdminLinksResponse,
  ImportLinksResult
} from '~~/types/links'
import { normalizeSlug, SHORT_DOMAIN, shortLinkUrl } from '~~/shared/links'

interface LinkFormState {
  slug: string
  url: string
  title: string
  label: string
  description: string
  icon: string
  category: string
  tags: string
  position: number
  featured: boolean
  listed: boolean
  archived: boolean
}

interface FetchErrorLike {
  statusMessage?: string
  message?: string
  data?: {
    statusMessage?: string
    message?: string
    issues?: Array<{ path?: Array<string | number>, message?: string }>
    data?: {
      issues?: Array<{ path?: Array<string | number>, message?: string }>
    }
  }
}

type FetchOptions = Parameters<typeof $fetch>[1]

const STORAGE_KEY = 'links-admin-token'

const toast = useToast()
const token = ref('')
const ready = ref(false)
const authed = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const links = ref<AdminLink[]>([])
const summary = ref<AdminLinkSummary | null>(null)

const editorOpen = ref(false)
const editing = ref<AdminLink | null>(null)
const saving = ref(false)
const formError = ref('')

const form = reactive<LinkFormState>(emptyForm())

const statsOpen = ref(false)
const statsLoading = ref(false)
const stats = ref<AdminLinkStats | null>(null)

const qrOpen = ref(false)
const qrLink = ref<AdminLink | null>(null)

const deleteOpen = ref(false)
const deleting = ref<AdminLink | null>(null)
const deletingBusy = ref(false)

const importOpen = ref(false)
const importCsv = ref('')
const importing = ref(false)
const importResult = ref<ImportLinksResult | null>(null)
const importFile = ref<HTMLInputElement | null>(null)

const categories = computed(() => [...new Set(links.value.map(link => link.category))].sort())
const maxDaily = computed(() => Math.max(1, ...(stats.value?.daily.map(day => day.count) ?? [1])))
const qrUrl = computed(() => qrLink.value ? `/qr/${qrLink.value.slug}.svg` : '')

function emptyForm(): LinkFormState {
  return {
    slug: '',
    url: '',
    title: '',
    label: '',
    description: '',
    icon: 'i-ph-link-duotone',
    category: 'Portfolio',
    tags: '',
    position: 1000,
    featured: false,
    listed: true,
    archived: false
  }
}

function readError(error: unknown): string {
  const value = error as FetchErrorLike
  const issues = value?.data?.data?.issues ?? value?.data?.issues
  if (issues?.[0]) {
    return `${issues[0].path?.join('.') ?? 'Field'}: ${issues[0].message ?? 'invalid value'}`
  }
  return value?.data?.statusMessage ?? value?.statusMessage ?? value?.data?.message ?? value?.message ?? 'Something went wrong.'
}

function adminFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const headers = new Headers(options?.headers as HeadersInit | undefined)
  headers.set('Authorization', `Bearer ${token.value}`)
  return $fetch<T>(path, { ...options, headers })
}

async function loadLinks(): Promise<void> {
  const result = await adminFetch<AdminLinksResponse>('/api/links/admin')
  links.value = result.links
  summary.value = result.summary
}

async function login(): Promise<void> {
  errorMessage.value = ''
  loading.value = true
  try {
    await loadLinks()
    sessionStorage.setItem(STORAGE_KEY, token.value)
    authed.value = true
  }
  catch (error) {
    authed.value = false
    errorMessage.value = readError(error)
  }
  finally {
    loading.value = false
  }
}

function logout(): void {
  sessionStorage.removeItem(STORAGE_KEY)
  authed.value = false
  token.value = ''
  links.value = []
  summary.value = null
}

onMounted(() => {
  token.value = sessionStorage.getItem(STORAGE_KEY) ?? ''
  ready.value = true
  if (token.value) login()
})

function openCreate(): void {
  editing.value = null
  Object.assign(form, emptyForm())
  formError.value = ''
  editorOpen.value = true
}

function openEdit(link: AdminLink): void {
  editing.value = link
  Object.assign(form, {
    slug: link.slug,
    url: link.url,
    title: link.title,
    label: link.label ?? '',
    description: link.description ?? '',
    icon: link.icon ?? '',
    category: link.category,
    tags: link.tags.join(', '),
    position: link.position,
    featured: link.featured,
    listed: link.listed,
    archived: link.archived
  })
  formError.value = ''
  editorOpen.value = true
}

function formPayload() {
  const slug = normalizeSlug(form.slug || form.title)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return {
    slug,
    url: form.url,
    title: form.title,
    label: form.label || null,
    description: form.description || null,
    icon: form.icon || null,
    category: form.category,
    tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean).slice(0, 12),
    position: Number(form.position) || 0,
    featured: form.featured,
    listed: form.listed,
    archived: form.archived
  }
}

async function save(): Promise<void> {
  saving.value = true
  formError.value = ''

  try {
    if (editing.value) {
      await adminFetch<AdminLink>(`/api/links/admin/${editing.value.id}`, {
        method: 'PATCH',
        body: formPayload()
      })
    }
    else {
      await adminFetch<AdminLink>('/api/links/admin', {
        method: 'POST',
        body: formPayload()
      })
    }

    editorOpen.value = false
    await loadLinks()
    toast.add({
      title: editing.value ? 'Link updated' : 'Link created',
      color: 'green'
    })
  }
  catch (error) {
    formError.value = readError(error)
  }
  finally {
    saving.value = false
  }
}

async function toggleField(link: AdminLink, field: 'listed' | 'featured' | 'archived'): Promise<void> {
  try {
    const updated = await adminFetch<AdminLink>(`/api/links/admin/${link.id}`, {
      method: 'PATCH',
      body: { [field]: !link[field] }
    })
    Object.assign(link, updated)
    if (field === 'archived') await loadLinks()
  }
  catch (error) {
    toast.add({
      title: 'Update failed',
      description: readError(error),
      color: 'red'
    })
  }
}

async function copyShortLink(link: AdminLink): Promise<void> {
  try {
    await navigator.clipboard.writeText(shortLinkUrl(link.slug))
    toast.add({ title: 'Short link copied', color: 'green' })
  }
  catch {
    toast.add({ title: 'Could not copy the short link', color: 'red' })
  }
}

async function openStats(link: AdminLink): Promise<void> {
  statsOpen.value = true
  statsLoading.value = true
  stats.value = null

  try {
    stats.value = await adminFetch<AdminLinkStats>(`/api/links/admin/${link.id}/stats?days=30`)
  }
  catch (error) {
    statsOpen.value = false
    toast.add({
      title: 'Could not load analytics',
      description: readError(error),
      color: 'red'
    })
  }
  finally {
    statsLoading.value = false
  }
}

function openQr(link: AdminLink): void {
  qrLink.value = link
  qrOpen.value = true
}

function askDelete(link: AdminLink): void {
  deleting.value = link
  deleteOpen.value = true
}

async function confirmDelete(): Promise<void> {
  if (!deleting.value) return
  deletingBusy.value = true

  try {
    await adminFetch(`/api/links/admin/${deleting.value.id}`, { method: 'DELETE' })
    deleteOpen.value = false
    deleting.value = null
    await loadLinks()
    toast.add({ title: 'Link deleted', color: 'green' })
  }
  catch (error) {
    toast.add({
      title: 'Could not delete the link',
      description: readError(error),
      color: 'red'
    })
  }
  finally {
    deletingBusy.value = false
  }
}

function openImport(): void {
  importResult.value = null
  importOpen.value = true
}

function onImportFile(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    importCsv.value = String(reader.result ?? '')
  }
  reader.readAsText(file)
}

async function runImport(): Promise<void> {
  importing.value = true
  importResult.value = null

  try {
    importResult.value = await adminFetch<ImportLinksResult>('/api/links/admin/import', {
      method: 'POST',
      body: { csv: importCsv.value }
    })
    await loadLinks()
    toast.add({
      title: 'Dub import complete',
      description: `${importResult.value.created} created, ${importResult.value.updated} updated, ${importResult.value.skipped} skipped.`,
      color: 'green'
    })
  }
  catch (error) {
    toast.add({
      title: 'Import failed',
      description: readError(error),
      color: 'red'
    })
  }
  finally {
    importing.value = false
  }
}

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en').format(value)
}

function barHeight(count: number): string {
  return `${Math.max(4, (count / maxDaily.value) * 100)}%`
}

useSeoMeta({
  title: 'Links admin',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <main class="py-4 sm:py-8">
    <div
      v-if="!ready"
      class="flex min-h-64 items-center justify-center"
    >
      <UIcon
        name="i-ph-spinner-gap-duotone"
        class="size-8 animate-spin text-neutral-400"
      />
    </div>

    <div
      v-else-if="!authed"
      class="mx-auto max-w-md py-12"
    >
      <div class="rounded-2xl border border-neutral-200 bg-default p-6 sm:p-8 dark:border-default dark:bg-elevated/30">
        <div class="flex size-11 items-center justify-center rounded-xl bg-default text-muted ring-1 ring-default">
          <UIcon
            name="i-ph-lock-key-duotone"
            class="size-6"
          />
        </div>

        <h1 class="mt-5 text-2xl font-bold tracking-tight text-highlighted">
          Links admin
        </h1>
        <p class="mt-2 text-sm leading-relaxed text-toned">
          Enter the admin token to manage short links, analytics, and QR codes.
        </p>

        <form
          class="mt-6 space-y-3"
          @submit.prevent="login"
        >
          <UInput
            v-model="token"
            type="password"
            placeholder="Admin token"
            autocomplete="current-password"
            size="lg"
            class="w-full"
          />
          <UAlert
            v-if="errorMessage"
            color="red"
            variant="soft"
            :description="errorMessage"
          />
          <UButton
            type="submit"
            label="Unlock"
            size="lg"
            block
            :loading="loading"
          />
        </form>

        <NuxtLink
          to="/links"
          class="mt-5 inline-flex items-center gap-1 text-sm text-muted hover:text-highlighted"
        >
          <UIcon name="i-ph-arrow-left" />
          Back to links
        </NuxtLink>
      </div>
    </div>

    <div
      v-else
      class="space-y-8"
    >
      <header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Admin
          </p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight text-highlighted">
            Links
          </h1>
          <p class="mt-1 text-sm text-muted">
            {{ links.length }} links on <span class="font-mono">{{ SHORT_DOMAIN }}</span>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <UButton
            to="/links"
            label="View page"
            icon="i-ph-arrow-up-right"
            color="neutral"
            variant="ghost"
            target="_blank"
          />
          <UButton
            label="Import Dub CSV"
            icon="i-ph-upload-simple-duotone"
            color="neutral"
            variant="outline"
            @click="openImport"
          />
          <UButton
            label="New link"
            icon="i-ph-plus"
            @click="openCreate"
          />
          <UButton
            icon="i-ph-sign-out-duotone"
            color="neutral"
            variant="ghost"
            aria-label="Log out"
            @click="logout"
          />
        </div>
      </header>

      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Total links
          </p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-highlighted">
            {{ formatNumber(summary?.totalLinks ?? 0) }}
          </p>
        </div>
        <div class="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Total clicks
          </p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-highlighted">
            {{ formatNumber(summary?.totalClicks ?? 0) }}
          </p>
        </div>
        <div class="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Clicks, 7 days
          </p>
          <p class="mt-2 text-2xl font-bold tabular-nums text-highlighted">
            {{ formatNumber(summary?.clicks7d ?? 0) }}
          </p>
        </div>
        <div class="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Top link
          </p>
          <p class="mt-2 truncate text-sm font-semibold text-highlighted">
            {{ summary?.topLink?.title ?? '—' }}
          </p>
          <p class="text-xs tabular-nums text-muted">
            {{ summary?.topLink ? `${formatNumber(summary.topLink.clicks)} clicks` : '' }}
          </p>
        </div>
      </section>

      <section class="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table class="w-full min-w-[880px] text-left text-sm">
          <thead class="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50">
            <tr>
              <th class="px-4 py-3">
                Link
              </th>
              <th class="px-3 py-3">
                Category
              </th>
              <th class="px-3 py-3 text-right">
                Clicks
              </th>
              <th class="px-3 py-3">
                Last click
              </th>
              <th class="px-3 py-3">
                Visibility
              </th>
              <th class="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr
              v-for="link in links"
              :key="link.id"
              class="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
              :class="{ 'opacity-55': link.archived }"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <UIcon
                      :name="link.icon || 'i-ph-link-duotone'"
                      class="size-4"
                    />
                  </span>
                  <div class="min-w-0">
                    <p class="flex items-center gap-2 font-semibold text-highlighted">
                      {{ link.title }}
                      <UIcon
                        v-if="link.featured"
                        name="i-ph-star-four-duotone"
                        class="size-3.5 text-amber-500"
                      />
                      <UIcon
                        v-if="link.archived"
                        name="i-ph-archive-duotone"
                        class="size-3.5 text-neutral-400"
                      />
                    </p>
                    <p class="truncate font-mono text-xs text-muted">
                      /{{ link.slug }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-3 text-toned">
                {{ link.category }}
              </td>
              <td class="px-3 py-3 text-right font-medium tabular-nums text-highlighted">
                {{ formatNumber(link.clicks) }}
              </td>
              <td class="whitespace-nowrap px-3 py-3 text-xs text-muted">
                {{ formatDate(link.lastClickedAt) }}
              </td>
              <td class="px-3 py-3">
                <div class="flex items-center gap-1">
                  <UTooltip text="Listed on the public page">
                    <UButton
                      icon="i-ph-eye-duotone"
                      size="xs"
                      variant="ghost"
                      :color="link.listed ? 'primary' : 'neutral'"
                      :aria-label="link.listed ? 'Hide from public page' : 'Show on public page'"
                      @click="toggleField(link, 'listed')"
                    />
                  </UTooltip>
                  <UTooltip text="Featured card">
                    <UButton
                      icon="i-ph-star-duotone"
                      size="xs"
                      variant="ghost"
                      :color="link.featured ? 'amber' : 'neutral'"
                      :aria-label="link.featured ? 'Remove from featured' : 'Feature link'"
                      @click="toggleField(link, 'featured')"
                    />
                  </UTooltip>
                  <UTooltip text="Archive">
                    <UButton
                      icon="i-ph-archive-duotone"
                      size="xs"
                      variant="ghost"
                      :color="link.archived ? 'red' : 'neutral'"
                      :aria-label="link.archived ? 'Unarchive link' : 'Archive link'"
                      @click="toggleField(link, 'archived')"
                    />
                  </UTooltip>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-0.5">
                  <UTooltip text="Copy short link">
                    <UButton
                      icon="i-ph-copy-duotone"
                      size="xs"
                      variant="ghost"
                      color="neutral"
                      aria-label="Copy short link"
                      @click="copyShortLink(link)"
                    />
                  </UTooltip>
                  <UTooltip text="Analytics">
                    <UButton
                      icon="i-ph-chart-bar-duotone"
                      size="xs"
                      variant="ghost"
                      color="neutral"
                      aria-label="View analytics"
                      @click="openStats(link)"
                    />
                  </UTooltip>
                  <UTooltip text="QR code">
                    <UButton
                      icon="i-ph-qr-code-duotone"
                      size="xs"
                      variant="ghost"
                      color="neutral"
                      aria-label="View QR code"
                      @click="openQr(link)"
                    />
                  </UTooltip>
                  <UTooltip text="Edit">
                    <UButton
                      icon="i-ph-pencil-simple-duotone"
                      size="xs"
                      variant="ghost"
                      color="neutral"
                      aria-label="Edit link"
                      @click="openEdit(link)"
                    />
                  </UTooltip>
                  <UTooltip text="Delete">
                    <UButton
                      icon="i-ph-trash-duotone"
                      size="xs"
                      variant="ghost"
                      color="red"
                      aria-label="Delete link"
                      @click="askDelete(link)"
                    />
                  </UTooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="links.length === 0"
          class="p-10 text-center"
        >
          <UIcon
            name="i-ph-link-duotone"
            class="mx-auto size-8 text-neutral-400"
          />
          <p class="mt-3 text-sm text-neutral-500">
            No links yet. Import your Dub CSV or create one.
          </p>
        </div>
      </section>
    </div>

    <UModal
      v-model:open="editorOpen"
      :title="editing ? 'Edit link' : 'New link'"
      description="Short links redirect through links.arthurdanjou.fr and record clicks."
    >
      <template #body>
        <form
          id="link-editor"
          class="space-y-4"
          @submit.prevent="save"
        >
          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField
              label="Slug"
              required
              :description="editing ? 'Changing this breaks existing short URLs.' : undefined"
            >
              <UInput
                v-model="form.slug"
                placeholder="research"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Category">
              <UInput
                v-model="form.category"
                list="link-categories"
                class="w-full"
              />
              <datalist id="link-categories">
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                />
              </datalist>
            </UFormField>
          </div>

          <UFormField
            label="Destination URL"
            required
          >
            <UInput
              v-model="form.url"
              placeholder="https://arthurdanjou.fr/research"
              class="w-full"
            />
          </UFormField>

          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField
              label="Title"
              required
            >
              <UInput
                v-model="form.title"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Kicker">
              <UInput
                v-model="form.label"
                placeholder="Research"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Description">
            <UTextarea
              v-model="form.description"
              :rows="2"
              class="w-full"
            />
          </UFormField>

          <div class="grid gap-4 sm:grid-cols-2">
            <UFormField label="Icon">
              <UInput
                v-model="form.icon"
                placeholder="i-ph-link-duotone"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Position">
              <UInput
                v-model.number="form.position"
                type="number"
                min="0"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Tags">
            <UInput
              v-model="form.tags"
              placeholder="research, open-source"
              class="w-full"
            />
          </UFormField>

          <div class="flex flex-wrap gap-x-6 gap-y-3 pt-1">
            <USwitch
              v-model="form.listed"
              label="Listed publicly"
            />
            <USwitch
              v-model="form.featured"
              label="Featured card"
            />
            <USwitch
              v-model="form.archived"
              label="Archived"
            />
          </div>

          <UAlert
            v-if="formError"
            color="red"
            variant="soft"
            :description="formError"
          />
        </form>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="ghost"
            @click="editorOpen = false"
          />
          <UButton
            type="submit"
            form="link-editor"
            :label="editing ? 'Save changes' : 'Create link'"
            :loading="saving"
          />
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="statsOpen"
      title="Link analytics"
      :description="stats ? `${stats.link.title} · last 30 days` : 'Loading...'"
    >
      <template #body>
        <div
          v-if="statsLoading"
          class="flex min-h-48 items-center justify-center"
        >
          <UIcon
            name="i-ph-spinner-gap-duotone"
            class="size-7 animate-spin text-neutral-400"
          />
        </div>

        <div
          v-else-if="stats"
          class="space-y-6"
        >
          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Total
              </p>
              <p class="mt-1 text-xl font-bold tabular-nums text-highlighted">
                {{ formatNumber(stats.link.clicks) }}
              </p>
            </div>
            <div class="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                30 days
              </p>
              <p class="mt-1 text-xl font-bold tabular-nums text-highlighted">
                {{ formatNumber(stats.trackedClicks) }}
              </p>
            </div>
            <div class="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Last click
              </p>
              <p class="mt-1.5 text-xs font-semibold text-highlighted">
                {{ formatDate(stats.link.lastClickedAt) }}
              </p>
            </div>
          </div>

          <div>
            <div class="flex items-end justify-between gap-2">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Daily clicks
              </p>
              <p class="text-[10px] text-neutral-400">
                {{ stats.daily[0]?.date }} → {{ stats.daily.at(-1)?.date }}
              </p>
            </div>
            <div class="mt-2 flex h-24 items-end gap-1">
              <div
                v-for="day in stats.daily"
                :key="day.date"
                class="group relative flex h-full flex-1 items-end"
                :title="`${day.date}: ${day.count} clicks`"
              >
                <div
                  class="w-full rounded-sm bg-neutral-200 transition-colors group-hover:bg-neutral-400 dark:bg-neutral-700 dark:group-hover:bg-neutral-500"
                  :style="{ height: barHeight(day.count) }"
                />
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="bucket in [
                { label: 'Countries', items: stats.countries },
                { label: 'Referrers', items: stats.referrers },
                { label: 'Devices', items: stats.devices }
              ]"
              :key="bucket.label"
              class="space-y-2"
            >
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {{ bucket.label }}
              </p>
              <ul class="space-y-1">
                <li
                  v-for="item in bucket.items"
                  :key="item.value"
                  class="flex items-center justify-between gap-3 text-sm"
                >
                  <span class="truncate text-toned">{{ item.value }}</span>
                  <span class="tabular-nums text-muted">{{ item.count }}</span>
                </li>
                <li
                  v-if="bucket.items.length === 0"
                  class="text-sm text-neutral-400"
                >
                  No data yet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="qrOpen"
      title="QR code"
      :description="qrLink?.title"
    >
      <template #body>
        <div
          v-if="qrLink"
          class="flex flex-col items-center gap-4"
        >
          <img
            :src="qrUrl"
            :alt="`QR code for ${qrLink.title}`"
            class="size-56 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800"
          >
          <p class="break-all text-center font-mono text-xs text-muted">
            {{ shortLinkUrl(qrLink.slug) }}
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            label="Close"
            color="neutral"
            variant="ghost"
            @click="qrOpen = false"
          />
          <UButton
            :to="qrUrl"
            :download="`qr-${qrLink?.slug ?? 'link'}.svg`"
            label="Download SVG"
            icon="i-ph-download-simple-duotone"
          />
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="deleteOpen"
      title="Delete link"
      description="This removes the link and its click history. This cannot be undone."
    >
      <template #body>
        <p class="text-sm text-toned">
          Delete <span class="font-semibold text-highlighted">{{ deleting?.title }}</span>
          (<span class="font-mono">/{{ deleting?.slug }}</span>)?
        </p>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="ghost"
            @click="deleteOpen = false"
          />
          <UButton
            label="Delete"
            color="red"
            icon="i-ph-trash-duotone"
            :loading="deletingBusy"
            @click="confirmDelete"
          />
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="importOpen"
      title="Import Dub CSV"
      description="Paste a Dub export or choose the CSV file. Existing links keep their curated content."
    >
      <template #body>
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <UButton
              label="Choose a file"
              icon="i-ph-file-csv-duotone"
              color="neutral"
              variant="outline"
              @click="importFile?.click()"
            />
            <input
              ref="importFile"
              type="file"
              accept=".csv,.tsv,text/csv,text/tab-separated-values"
              class="hidden"
              @change="onImportFile"
            >
            <p class="text-xs text-muted">
              CSV or TSV export from Dub.
            </p>
          </div>

          <UTextarea
            v-model="importCsv"
            :rows="8"
            placeholder="Paste the Dub CSV or TSV export here"
            class="w-full font-mono text-xs"
          />

          <UAlert
            v-if="importResult"
            color="green"
            variant="soft"
            :description="`${importResult.created} created, ${importResult.updated} updated, ${importResult.skipped} skipped.`"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="ghost"
            @click="importOpen = false"
          />
          <UButton
            label="Import links"
            icon="i-ph-upload-simple-duotone"
            :loading="importing"
            :disabled="!importCsv.trim()"
            @click="runImport"
          />
        </div>
      </template>
    </UModal>
  </main>
</template>
