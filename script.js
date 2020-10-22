const grids = document.querySelectorAll('.grid')
const headings = document.querySelectorAll('.heading .wrapper .text')

function enterScreen(index) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  grid.classList.add('active')

  gridColumns.forEach(element => {
    element.classList.remove('animate-after', 'animate-before')
  })

  heading.classList.remove('animate-after', 'animate-before')
}

function exitScreen(index, exitDelay) {
  const grid = grids[index]
  const heading = headings[index]
  const gridColumns = grid.querySelectorAll('.column')

  gridColumns.forEach(element => {
    element.classList.add('animate-before')
  })

  heading.classList.add('animate-before')

  setTimeout(() => {
    grid.classList.remove('active')
  }, exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay
  let nextIndex = 0

  function nextCycle() {
    const currentIndex = nextIndex

    enterScreen(currentIndex)

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen)

    if (nextIndex >= grids.length - 1){
        nextIndex = 0
    }
    else {
        nextIndex += 1
    }
  }

  nextCycle()

  setInterval(nextCycle, cycleTime)
}

setupAnimationCycle({
  timePerScreen: 2000, // ms
  exitDelay: 200 * 7 // ms
})