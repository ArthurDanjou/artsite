// Run this expression after loading a project page at the top.
(async () => {
  const header = document.querySelector('header [data-tegaki="root"]')
  if (!header) throw new Error('The header signature should be mounted.')
  const start = performance.now()
  while (Number(header.style.getPropertyValue('--tegaki-progress')) < 1) {
    if (performance.now() - start > 6500) throw new Error('The header signature is paused or failed to finish.')
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  const canvas = header.querySelector('canvas')
  const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
  if (!pixels.some((value, index) => index % 4 === 3 && value > 0)) {
    throw new Error('The header signature should contain visible ink.')
  }
  const note = document.querySelector('aside [data-tegaki="root"]')
  if (note && note.getBoundingClientRect().top > innerHeight
    && Number(note.style.getPropertyValue('--tegaki-progress')) !== 0) {
    throw new Error('The author signature should wait until it becomes visible.')
  }
  return { pass: true, headerComplete: true, visibleInk: true }
})()
