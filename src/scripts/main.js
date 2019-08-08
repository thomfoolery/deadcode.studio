// https://github.com/mattboldt/typed.js/
import typed from 'typed.js'

// querySelector shortcut
const $ = document.querySelector.bind(document)

const DELAY = 0
const typeSpeed = 100
const startDelay = 2500

const OPTIONS = {
  stringsElement: `#intro`,
  typeSpeed,
  startDelay,
  cursorChar: '_',
  smartBackspace: true,
}

// typedJS options
setTimeout(() => new typed(`#canvas`, OPTIONS), DELAY)