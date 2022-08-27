import { CHAR_SET, DISPLAY } from '~/constants'


export default class Display {
  private memory : Uint8Array
  private screen : HTMLCanvasElement | null
  private context : CanvasRenderingContext2D
  private frameBuffer : number[][]
  private bgColor : string
  private color : string


  constructor (memory : Uint8Array) {
    console.log('Create a new Display')
    this.memory = memory
    this.screen = document.querySelector('canvas')
    this.screen.width = DISPLAY.WIDTH * DISPLAY.SCALE
    this.screen.height = DISPLAY.HEIGHT * DISPLAY.SCALE
    this.context = this.screen.getContext('2d')
    this.frameBuffer = []
    this.resetColors()
    this.reset()
  }


  public reset () {
    for (let h = 0; h < DISPLAY.HEIGHT; h++) {
      this.frameBuffer.push([])
      for (let w = 0; w < DISPLAY.WIDTH; w++) {
        this.frameBuffer[h].push(0)
      }
    }
    this.context.fillStyle = this.bgColor
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
  }


  private drawBuffer () {
    for (let h = 0; h < DISPLAY.HEIGHT; h++) {
      for (let w = 0; w < DISPLAY.WIDTH; w++) {
        this.drawPixel(h, w, this.frameBuffer[h][w])
      }
    }
  }


  private drawPixel (h : number, w : number, value : number) {
    this.context.fillStyle = value
      ? this.color : this.bgColor
    this.context.fillRect(
      w * DISPLAY.SCALE, h * DISPLAY.SCALE, DISPLAY.SCALE, DISPLAY.SCALE
    )
  }


  public drawSprite (h : number, w : number, sprite : number, rows : number) {
    let pixelCollision = 0
    for (let y = 0; y < rows; y++) {
      const line = this.memory[sprite + y]
      for (let x = 0; x < CHAR_SET.WIDTH; x++) {
        const bitToCheck = 0b10000000 >> x
        const value = line & bitToCheck
        if (value === 0) {
          continue
        }
        const pixelHeight = ((h + y) % DISPLAY.HEIGHT)
        const pixelWidth = ((w + x) % DISPLAY.WIDTH)
        if (this.frameBuffer[pixelHeight][pixelWidth] === 1) {
          pixelCollision = 1
        }
        this.frameBuffer[pixelHeight][pixelWidth] ^= 1
      }
    }
    this.drawBuffer()
    return pixelCollision
  }


  private resetColors () {
    this.setColors(DISPLAY.COLOR)
  }


  private setColors (color : string) {
    const tinycolor = require('tinycolor2')
    let bgColor = tinycolor(color)
    let fgColor = tinycolor(color)
    if (fgColor.isLight()) {
      bgColor = bgColor.desaturate(50)
      bgColor = bgColor.darken(50)
    }
    else {
      bgColor = bgColor.saturate(50)
      bgColor = bgColor.lighten(50)
    }
    this.bgColor = bgColor.toString()
    this.color = fgColor.toString()
  }
}