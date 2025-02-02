import { getQuery } from 'ufo'

export default defineWebSocketHandler({
  open(peer) {
    // We send the latitude and longitude query params when connecting to the server
    const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
    // We send the (anonymous) user locations to the server
    peer.subscribe('visitors')
    peer.publish('visitors', JSON.stringify(locations))
    peer.send(JSON.stringify(locations))
  },
  close(peer) {
    peer.unsubscribe('visitors')
    // Wait 500ms before sending the updated locations to the server
    // This to avoid sending the location of the user that just left
    setTimeout(() => {
      const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
      peer.publish('visitors', JSON.stringify(locations))
    }, 500)
  },
})
