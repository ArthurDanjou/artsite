// Run this expression in the browser console on a project page with several sections.
(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message)
  }
  const waitFor = async (condition) => {
    const start = performance.now()
    while (!condition()) {
      assert(performance.now() - start < 3000, 'Timed out waiting for the TOC.')
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
  }
  const trigger = document.querySelector('button[aria-label="Table of contents"]')
  assert(trigger, 'The table of contents should exist on this page.')
  document.querySelector('button[aria-label="Close table of contents"]')?.click()
  const originalScroll = window.scrollY
  trigger.click()
  await waitFor(() => document.querySelector('#page-table-of-contents a'))
  await new Promise(resolve => requestAnimationFrame(resolve))
  assert(Math.abs(window.scrollY - originalScroll) < 1, 'Opening the TOC should not scroll the article.')

  const links = [...document.querySelectorAll('#page-table-of-contents a')]
  assert(links.length > 1, 'The table of contents should contain several sections.')
  for (const link of links) {
    const id = decodeURIComponent(link.hash.slice(1))
    const matches = document.querySelectorAll(`#${CSS.escape(id)}`)
    assert(matches.length === 1, `The heading ${id} should have a unique anchor.`)
    assert(!matches[0].closest('aside, footer, .not-prose'), 'Unrelated UI should be excluded.')
  }

  const targetLink = links.find((link, index) => {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)))
    const next = links[index + 1]
    return index > 0 && heading.tagName === 'H2' && next
      && document.getElementById(decodeURIComponent(next.hash.slice(1))).offsetTop - heading.offsetTop > 180
  })
  assert(targetLink, 'This check needs a section containing more than a heading.')
  const target = document.getElementById(decodeURIComponent(targetLink.hash.slice(1)))
  const first = document.getElementById(decodeURIComponent(links[0].hash.slice(1)))
  window.scrollTo({ top: window.scrollY + first.getBoundingClientRect().top - 24, behavior: 'instant' })
  await waitFor(() => document.querySelector('#page-table-of-contents [aria-current="location"]')?.hash === links[0].hash)
  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 24, behavior: 'instant' })
  await waitFor(() => document.querySelector('#page-table-of-contents [aria-current="location"]')?.hash === targetLink.hash)
  assert(trigger.children[links.indexOf(targetLink)].classList.contains('bg-inverted'), 'The active bar should follow page scrolling.')
  targetLink.click()
  await waitFor(() => location.hash === targetLink.hash && Math.abs(target.getBoundingClientRect().top - 24) < 2)
  assert(document.activeElement === target, 'Navigation should move keyboard focus to the heading.')
  assert(trigger.getAttribute('aria-expanded') === 'false', 'Navigation should close the panel.')

  trigger.click()
  await waitFor(() => document.querySelector('#page-table-of-contents [aria-current="location"]')?.hash === targetLink.hash)
  trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await waitFor(() => trigger.getAttribute('aria-expanded') === 'false')
  assert(document.activeElement === trigger, 'Escape should restore focus to the trigger.')
  return { pass: true, headings: links.length, anchor: target.id }
})()
