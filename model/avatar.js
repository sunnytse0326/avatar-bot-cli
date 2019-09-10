const fs = require('fs')
const helpers = require('../utils/helpers')

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
    return this.direction
  }

  set direction(orientation) {
    this.orientation = orientation
  }

  getJson(){
    return { 'X': parseInt(args[1]), 'Y': parseInt(args[2]), 'F': args[3] }
  }

  save(dataPath){
    if(!helpers.readFileExist(dataFilePath)){
      helpers.createEmptyFile(dataFilePath)
    }
    helpers.writeFile(dataPath, JSON.stringify(getJson()))
  }
}

