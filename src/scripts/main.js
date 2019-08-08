// https://github.com/mattboldt/typed.js/
import typed from 'typed.js'

// querySelector shortcut
const $ = document.querySelector.bind(document)

const DELAY = 0

const typeSpeed = 150

const OPTIONS = {
  stringsElement: `#intro`,
  typeSpeed,
  cursorChar: '_',
  smartBackspace: true,
}

// typedJS options
setTimeout(() => new typed(`#canvas`, OPTIONS), DELAY)