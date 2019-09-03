import React, { Component } from 'react'
import Paper from 'paper'
import styles from './styles.css'

class Cursor extends Component {
  constructor({ color, radius, fill }) {
    super()
    this.color = color
    this.radius = radius
    this.fill = fill
  }

  componentDidMount() {
    this.clientX = -100
    this.clientY = -100
    this.innerCursor = document.querySelector('#cursor')
    this.initCursor()

    this.lastX = 0
    this.lastY = 0
    this.isStuck = false
    this.showCursor = false
    this.group = null
    this.stuckX = null
    this.stuckY = null
    this.fillOuterCursor = null
    this.initCanvas()
  }

  initCursor() {
    // add listener to track the current mouse position
    document.addEventListener('mousemove', e => {
      this.clientX = e.clientX
      this.clientY = e.clientY
    })

    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
    const render = () => {
      this.innerCursor.style.transform = `translate(${this.clientX}px, ${this.clientY}px)`

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  initCanvas() {
    const canvas = document.querySelector('#cursor__canvas')
    Paper.setup(canvas)
    const strokeColor = this.color || '#000'
    const strokeWidth = 1
    const segments = 6
    const radius = this.radius || 15

    // the base shape for the noisy circle
    const polygon = new Paper.Path.RegularPolygon(
      new Paper.Point(0, 0),
      segments,
      radius
    )
    polygon.strokeColor = strokeColor
    polygon.fillColor = this.fill ? strokeColor : 'transparent'
    polygon.strokeWidth = strokeWidth
    polygon.smooth()
    this.group = new Paper.Group([polygon])
    this.group.applyMatrix = false

    // function for linear interpolation of values
    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b
    }

    // function to map a value from one range to another range
    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      )
    }

    // the draw loop of Paper.js
    // (60fps with requestAnimationFrame under the hood)
    Paper.view.onFrame = event => {
      // using linear interpolation, the circle will move 0.2 (20%)
      // of the distance between its current position and the mouse
      // coordinates per Frame

      // move circle around normally
      this.lastX = lerp(this.lastX, this.clientX, 0.2)
      this.lastY = lerp(this.lastY, this.clientY, 0.2)
      this.group.position = new Paper.Point(this.lastX, this.lastY)
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.page__inner}>
          <div
            id='cursor'
            className={[styles.cursor, styles.cursor__small].join(' ')}
          />
          <canvas
            id='cursor__canvas'
            className={[styles.cursor, styles.cursor__canvas].join(' ')}
            resize='true'
          />
        </div>
      </div>
    )
  }
}

export default Cursor
