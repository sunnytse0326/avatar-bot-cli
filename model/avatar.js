const fs = require('fs')
const helpers = require('../utils/helpers')

const direction = ['N','E','S','W']

module.exports = class Avatar {
  constructor(x, y, d){
      this.posX = x
      this.posY = y
      this.orientation = d
  }

  get x(){
    return this.posX
  }

  set x(posX) {
    this.posX = posX
  }

  get y(){
    return this.posY
  }

  set y(posY) {
    this.posY = posY
  }

  get direction(){
    return this.orientation
  }

  set direction(orientation) {
    this.orientation = orientation
  }

  left(){
    this.orientation = direction[((direction.indexOf(this.orientation) - 1) + 4) % 4]
  }

  right(){
    this.orientation = direction[((direction.indexOf(this.orientation) + 1) + 4) % 4]
  }

  move(){
    switch(this.orientation){
      case 'N':
        this.posY += 1
      break
      case 'E':
        this.posX += 1
      break;
      case 'S':
        this.posY -= 1
      break;
      case 'W':
        this.posX -= 1
      break;
      default:
      break;
    }
  }

  save(dataPath){
    if(!helpers.readFileExist(dataPath)){
        helpers.createEmptyFile(dataPath)
    }
    helpers.writeFile(dataPath, JSON.stringify(this.getJson()))
  }

  getJson(){
    return { 'X': parseInt(this.posX), 'Y': parseInt(this.posY), 'F': this.orientation }
  }
}

