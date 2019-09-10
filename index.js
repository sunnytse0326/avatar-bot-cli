const chalk = require('chalk')
const helpers = require('./utils/helpers')

const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
})

const Avatar = require('./model/avatar')

const dataFilePath = `${__dirname}/data/avatar.js`

let avatar = null

const errorMessages = {
   INVALID_INPUT: 'Please input valid commands',
   CORRECT_PLACE_ARGUMENTS: 'Please input correct PLACE arguments',
   CORRECT_PLACE_LOCATION: 'Avatar location must be in numeric format',
   CORRECT_PLACE_FACING: 'Avatar facing direction must be in \'N\', \'E\', \'S\', \'W\' characters',
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

const setAvatarPosition = (args) => {
   helpers.writeFile(dataFilePath, JSON.stringify({ 'X': parseInt(args[1]), 'Y': parseInt(args[2]), 'F': args[3] }))
}

let determineAction = (question) => {
  readline.question(question, (input) => {
    const args = input.split(' ')

    switch(args[0]){
      case 'PLACE':
        if(args.length < 4){
            console.log(chalk.red(errorMessages.CORRECT_PLACE_ARGUMENTS))
            determineAction(question)
        } else if(!helpers.isNumeric(args[1]) || !helpers.isNumeric(args[2])){
            console.log(chalk.red(errorMessages.CORRECT_PLACE_LOCATION))
            determineAction(question)
         } else if(args[3] !== 'N' && args[3] !== 'W' && args[3] !== 'E' && args[3] !== 'S' ){
            console.log(args[3])
            console.log(chalk.red(errorMessages.CORRECT_PLACE_FACING))
            determineAction(question)
        } else{
            setAvatarPosition(args)
            determineAction(askQuestion.CORRECT_PLACE_FACING)
        }
      break
      case 'LEFT':
        
      break
      case 'RIGHT':
         
      break
      case 'MOVE':
      break
      case 'REPORT':
      break
      default:
         console.log(chalk.red(errorMessages.INVALID_INPUT))
         determineAction(question)
      break
    }
  })
}
