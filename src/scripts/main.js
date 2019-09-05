// https://github.com/mattboldt/typed.js/
import typed from 'typed.js'

// querySelector shortcut
const $ = document.querySelector.bind(document)

const loop = false
const typeSpeed = 100
const backSpeed = 100
const backDelay = 2500
const startDelay = 2500

const OPTIONS = {
  loop,
  typeSpeed,
  backSpeed,
  backDelay,
  startDelay,
  cursorChar: '_',
  smartBackspace: true,
};

// typedJS options
new typed(`#console-canvas`, {
  ...OPTIONS,
  stringsElement: `#intro`,
})
