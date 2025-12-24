<script lang="ts" setup>
import { VueFlow, useVueFlow, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import type { Node, Edge } from '@vue-flow/core'

useSeoMeta({
  title: 'Ecosystem',
  description: 'Explore my educational background, professional experiences, projects, and technical skills in an interactive visual flow.',
  ogTitle: 'Arthur Danjou • Ecosystem',
  ogDescription: 'Explore my educational background, professional experiences, projects, and technical skills in an interactive visual flow.'
})

// Types for the data
interface EducationItem {
  degree: string
  institution: string
  startDate: string
  endDate: string
}

interface ExperienceItem {
  title: string
  company: string
  startDate: string
  endDate: string
}

interface ProjectItem {
  title: string
  type: string
}

interface SkillCategory {
  name: string
  items: Array<{ name: string, icon: string }>
}

// Fetch data from APIs
const { data: education } = await useFetch<EducationItem[]>('/api/education')
const { data: experiences } = await useFetch<ExperienceItem[]>('/api/experiences')
const { data: projects } = await useFetch<ProjectItem[]>('/api/projects')
const { data: skills } = await useFetch<SkillCategory[]>('/api/skills')

// Helper function to generate node positions
const generatePosition = (index: number, total: number, column: number, offset = 400) => {
  const spacing = 180
  const columnWidth = 350
  const verticalSpacing = total > 1 ? spacing : 0
  const startY = offset - ((total - 1) * verticalSpacing) / 2

  return {
    x: column * columnWidth + 50,
    y: startY + index * verticalSpacing
  }
}

// Create center node
const centerNode: Node = {
  id: 'center',
  type: 'default',
  position: { x: 750, y: 400 },
  label: 'Arthur Danjou',
  data: { label: 'Arthur Danjou' },
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: '2px solid #667eea',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    width: '180px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}

// Create education nodes
const educationNodes: Node[] = (education.value || []).map((item: EducationItem, index: number) => ({
  id: `education-${index}`,
  type: 'default',
  position: generatePosition(index, education.value?.length || 0, 0),
  label: `${item.degree}`,
  data: {
    label: item.degree,
    subtitle: item.institution,
    years: `${item.startDate?.substring(0, 4)}-${item.endDate?.substring(0, 4)}`
  },
  style: {
    background: '#3b82f6',
    color: '#fff',
    border: '2px solid #2563eb',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '11px',
    width: '160px',
    minHeight: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}))

// Create experience nodes
const experienceNodes: Node[] = (experiences.value || []).map((item: ExperienceItem, index: number) => ({
  id: `experience-${index}`,
  type: 'default',
  position: generatePosition(index, experiences.value?.length || 0, 1),
  label: item.title,
  data: {
    label: item.title,
    subtitle: item.company,
    years: `${item.startDate?.substring(0, 4)}-${item.endDate?.substring(0, 4)}`
  },
  style: {
    background: '#10b981',
    color: '#fff',
    border: '2px solid #059669',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '11px',
    width: '160px',
    minHeight: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}))

// Create project nodes
const projectNodes: Node[] = (projects.value || []).slice(0, 8).map((item: ProjectItem, index: number) => ({
  id: `project-${index}`,
  type: 'default',
  position: generatePosition(index, Math.min(8, projects.value?.length || 0), 3),
  label: item.title,
  data: {
    label: item.title,
    subtitle: item.type
  },
  style: {
    background: '#f59e0b',
    color: '#fff',
    border: '2px solid #d97706',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '11px',
    width: '160px',
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}))

// Create skill category nodes
const skillNodes: Node[] = (skills.value || []).map((category: SkillCategory, index: number) => ({
  id: `skill-${index}`,
  type: 'default',
  position: generatePosition(index, skills.value?.length || 0, 4),
  label: category.name,
  data: {
    label: category.name,
    count: `${category.items?.length || 0} skills`
  },
  style: {
    background: '#8b5cf6',
    color: '#fff',
    border: '2px solid #7c3aed',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '11px',
    width: '160px',
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}))

// Combine all nodes
const nodes = ref<Node[]>([
  centerNode,
  ...educationNodes,
  ...experienceNodes,
  ...projectNodes,
  ...skillNodes
])

// Create edges connecting nodes to center
const edges = ref<Edge[]>([
  // Connect education to center
  ...educationNodes.map((node, index) => ({
    id: `e-education-${index}`,
    source: node.id,
    target: 'center',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  })),
  // Connect experiences to center
  ...experienceNodes.map((node, index) => ({
    id: `e-experience-${index}`,
    source: node.id,
    target: 'center',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 }
  })),
  // Connect projects to center
  ...projectNodes.map((node, index) => ({
    id: `e-project-${index}`,
    source: 'center',
    target: node.id,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2 }
  })),
  // Connect skills to center
  ...skillNodes.map((node, index) => ({
    id: `e-skill-${index}`,
    source: 'center',
    target: node.id,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 }
  }))
])

// Initialize VueFlow
const { fitView } = useVueFlow()

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      fitView({ padding: 0.15, duration: 800 })
    }, 100)
  })
})
</script>

<template>
  <div class="w-full h-[calc(100vh-4rem)]">
    <div class="mb-4">
      <h1 class="text-3xl font-bold">
        Ecosystem
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Interactive visualization of my educational journey, professional experiences, projects, and skills
      </p>
    </div>
    <div class="w-full h-[calc(100%-5rem)] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        :default-zoom="0.8"
        :min-zoom="0.1"
        :max-zoom="2"
        class="vue-flow-basic"
      >
        <Background
          pattern-color="#aaa"
          :gap="16"
          variant="dots"
        />
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<style scoped>
.vue-flow-basic {
  background-color: var(--ui-bg);
}

:deep(.vue-flow__node) {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.vue-flow__node:hover) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

:deep(.vue-flow__edge-path) {
  stroke-width: 2;
}

:deep(.vue-flow__controls) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:deep(.vue-flow__controls-button) {
  background-color: var(--ui-bg);
  border: 1px solid var(--ui-border);
  border-radius: 0.375rem;
  color: var(--ui-text);
  transition: all 0.2s;
}

:deep(.vue-flow__controls-button:hover) {
  background-color: var(--ui-bg-elevated);
  transform: scale(1.05);
}
</style>
