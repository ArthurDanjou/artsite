import { useState } from '#imports'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useVisitors() {
  const visitors = useState<number>('visitors', () => 0) // Added default value
  const locations = ref<Array<{ latitude: number, longitude: number }>>([])
  const myLocation = useState('location', () => ({
    latitude: 0,
    longitude: 0,
  }))
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const wsRef = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const isMounted = ref(true)

  const RECONNECTION_DELAY = 5000 // 5 seconds delay for reconnection
  const WS_NORMAL_CLOSURE = 1000

  const getWebSocketUrl = (): string => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const baseUrl = window.location.host.replace(/^(http|https):\/\//, '')
    return `${protocol}//${baseUrl}/ws?latitude=${myLocation.value.latitude}&longitude=${myLocation.value.longitude}`
  }

  const cleanup = () => {
    if (wsRef.value) {
      wsRef.value.close()
      wsRef.value = null
    }
    isConnected.value = false
    isLoading.value = false
  }

  const handleMessage = async (event: MessageEvent) => {
    if (!isMounted.value)
      return

    try {
      const data = typeof event.data === 'string' ? event.data : await event.data.text()
      locations.value = JSON.parse(data) as { latitude: number, longitude: number }[]
      const visitorCount = locations.value.length
      if (!Number.isNaN(visitorCount) && visitorCount >= 0) {
        visitors.value = visitorCount
      }
      else {
        throw new Error('Invalid visitor count received')
      }
    }
    catch (err) {
      console.error('Failed to parse visitors WebSocket data:', err)
      error.value = 'Invalid data received'
    }
  }

  const handleClose = (event: CloseEvent) => {
    console.warn('Visitors WebSocket closed:', event.code, event.reason)
    isConnected.value = false
    wsRef.value = null

    if (isMounted.value && event.code !== WS_NORMAL_CLOSURE) {
      error.value = 'Connection lost'
      // eslint-disable-next-line ts/no-use-before-define
      setTimeout(reconnect, RECONNECTION_DELAY)
    }
  }

  const initWebSocket = () => {
    if (!isMounted.value)
      return

    cleanup()

    try {
      const ws = new WebSocket(getWebSocketUrl())
      wsRef.value = ws

      ws.onopen = () => {
        if (!isMounted.value) {
          ws.close()
          return
        }
        console.warn('Stats WebSocket connected')
        isConnected.value = true
        isLoading.value = false
        error.value = null
      }

      ws.onmessage = handleMessage
      ws.onclose = handleClose
      ws.onerror = (event: Event) => {
        if (!isMounted.value)
          return
        console.error('Visitors WebSocket error:', event)
        error.value = 'Connection error'
      }
    }
    catch (err) {
      if (!isMounted.value)
        return
      console.error('Failed to initialize Visitors WebSocket:', err)
      error.value = 'Failed to initialize connection'
      isLoading.value = false
    }
  }

  const reconnect = () => {
    if (!isMounted.value)
      return
    error.value = null
    isLoading.value = true
    initWebSocket()
  }

  onMounted(() => {
    if (import.meta.client) {
      isMounted.value = true
      initWebSocket()
    }
  })

  onBeforeUnmount(() => {
    isMounted.value = false
    cleanup()
  })

  return {
    visitors,
    locations,
    myLocation,
    isLoading,
    error,
    isConnected,
    reconnect,
  }
}
