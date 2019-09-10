const chalk = require('chalk')
const helpers = require('./utils/helpers')
const dotenv = require('dotenv').config()

const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
})

const Avatar = require('./model/avatar')

const dataFilePath = `${__dirname}/${process.env.DATA_DIR || "data/avatar.js"}`
const gridX = process.env.GRID_X || 5
const gridY = process.env.GRID_Y || 5

let avatar = null

const errorMessages = {
   INVALID_INPUT: 'Please input valid commands',
   CORRECT_PLACE_ARGUMENTS: 'Please input correct PLACE arguments',
   CORRECT_PLACE_OUTSIDE: 'The avator cannot be placed outside the grid area',
   CORRECT_PLACE_LOCATION: 'Avatar location must be in numeric format',
   CORRECT_PLACE_FACING: 'Avatar facing direction must be in \'N\', \'E\', \'S\', \'W\' characters',
   OUT_OF_BOUNDARY: 'Avatar cannot be moved out of the boundary of grid',
}

const askQuestion = {
   PLACE_AVATAR: 'Place your first avator: ',
   NEXT_ACTION: 'What is the next action? '
}

module.exports = () => {  
   displayTopic()
   initAvator()
}

const initAvator = async () => {
   if(!helpers.readFileExist(dataFilePath)){
      avatar = new Avatar(-1, -1, null)
      determineAction(askQuestion.PLACE_AVATAR)
   } else{
      const data = JSON.parse(await helpers.readFile(dataFilePath))
      avatar = new Avatar(data.X, data.Y, data.F)
      determineAction(askQuestion.NEXT_ACTION)
   }
}

 const displayTopic = () => {
      console.log(chalk.green('*************************************************************************\n\n\t\t\tWelcome to Avator-CLI\n\n\tAn application which provides a grid environment to test\n\tyour character\'s capability from dedicated commands.\n\n*************************************************************************\n\nUasge:\n  - PLACE {X} {Y} {F}:\n    Place an avatar with initial position and facing direction.\n  - LEFT:\n    Rotate 90 degrees in anti-clockwise.\n  - RIGHT:\n    Rotate 90 degrees in clockwise.\n - MOVE:\n    Move with one unit step in current facing direction\n  - REPORT:\n    Show the avator current location\n\nExample:\n\nPLACE 0 0 N\n(Placing avatar to the x-position in 0 and y-position in 0 and facing\ndirection to North) \n\n'))
}

const setAvatarPosition = async (args) => {
   await helpers.writeFile(dataFilePath, JSON.stringify({ 'X': parseInt(args[1]), 'Y': parseInt(args[2]), 'F': args[3] }))
   avatar = new Avatar(parseInt(args[1]), parseInt(args[2]), args[3])
   reportCurrentStatus()
 }
 
 const reportCurrentStatus = () => {
   console.log(`Current Status: ${JSON.stringify(avatar.getJson())}`)
}

let determineAction = (question) => {
   readline.question(question, async (input) => {
      const args = input.split(' ')

      switch(args[0]){
         case 'PLACE':
         if(args.length < 4){
               console.log(chalk.red(errorMessages.CORRECT_PLACE_ARGUMENTS))
               determineAction(question)
         } else if(!helpers.isNumeric(args[1]) || !helpers.isNumeric(args[2])){
               console.log(chalk.red(errorMessages.CORRECT_PLACE_LOCATION))
               determineAction(question)
            } else if(args[1] >= gridX || args[2] >= gridY){
               console.log(chalk.red(errorMessages.CORRECT_PLACE_OUTSIDE))
               determineAction(question)
            } else if(args[3] !== 'N' && args[3] !== 'W' && args[3] !== 'E' && args[3] !== 'S' ){
               console.log(args[3])
               console.log(chalk.red(errorMessages.CORRECT_PLACE_FACING))
               determineAction(question)
         } else{
               await setAvatarPosition(args)               
               determineAction(askQuestion.NEXT_ACTION)
         }
         break
         case 'LEFT':
            avatar.left()
            avatar.save(dataFilePath)
            reportCurrentStatus()
            determineAction(question)
         break
         case 'RIGHT':
            avatar.right()
            avatar.save(dataFilePath)
            reportCurrentStatus()
            determineAction(question)
         break
         case 'MOVE':
            if((avatar.x + 1 >= gridX && avatar.direction === 'E') || (avatar.y + 1 >= gridY && avatar.direction === 'N')
            || (avatar.x - 1 < 0 && avatar.direction === 'W') || (avatar.y - 1 < 0 && avatar.direction === 'S') ){
               console.log(chalk.red(errorMessages.OUT_OF_BOUNDARY))
            } else{
               avatar.move()
               avatar.save(dataFilePath)
               reportCurrentStatus()
            }
            determineAction(question)
         break
         case 'REPORT':
            reportCurrentStatus()
            determineAction(question)
         break
         default:
            console.log(chalk.red(errorMessages.INVALID_INPUT))
            determineAction(question)
         break
      }
   })
}
