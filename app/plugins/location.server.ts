export default defineNuxtPlugin(() => {
  const event = useRequestEvent()
  console.log('event', event)

  useState('location', () => ({
    latitude: event?.context.cf?.latitude || Math.random() * 180 - 90, // default to random latitude (only in dev)
    longitude: event?.context.cf?.longitude || Math.random() * 360 - 180, // default to random longitude (only in dev)
  }))

  console.log(useState('location').value)
})
