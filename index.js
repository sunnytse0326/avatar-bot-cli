const chalk = require('chalk')

const helpers = require('./utils/helpers')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

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

  determineAction(askQuestion.PLACE_AVATAR)
}

let displayTopic = () => {
   console.log(chalk.green('*************************************************************************\n\n\t\t\tWelcome to Avator-CLI\n\n\tAn application which provides a grid environment to test\n\tyour character\'s capability from dedicated commands.\n\n*************************************************************************\n\nUasge:\n  - PLACE {X} {Y} {F}:\n    Place an avatar with initial position and facing direction.\n  - MOVE:\n    Move the avatar with one unit step in current facing direction\n  - REPORT:\n    Show the avator current location\n\nExample:\n\nPLACE 0 0 N\n(Placing avatar to the x-position in 0 and y-position in 0 and facing\ndirection to North) \n\n'))
}

let determineAction = (question) => {
  readline.question(question, (input) => {
    const args = input.split(' ')
    console.log(args[0])

    switch(args[0]){
      case 'PLACE':
        if(args.length < 4){
          console.log(chalk.red(errorMessages.CORRECT_PLACE_ARGUMENTS))
          determineAction(question)
        } else if(!helpers.isNumeric(args[1]) || !helpers.isNumeric(args[2])){
          console.log(chalk.red(errorMessages.CORRECT_PLACE_LOCATION))
          determineAction(question)
        }
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
