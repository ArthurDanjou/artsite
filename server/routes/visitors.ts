import { getQuery } from 'ufo'

export default defineWebSocketHandler({
  open(peer) {
    const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
    peer.subscribe('visitors')
    peer.publish('visitors', JSON.stringify(locations))
    peer.send(JSON.stringify(locations))
  },
  close(peer) {
    peer.unsubscribe('visitors')
    setTimeout(() => {
      const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
      peer.publish('visitors', JSON.stringify(locations))
    }, 500)
  },
})
