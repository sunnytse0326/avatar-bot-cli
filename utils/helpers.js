const fs = require('fs');

exports.isNumeric = (num) => {
  return !isNaN(num)
}

exports.readFileExist = (dataFilePath) => {
  console.log
  return fs.existsSync(dataFilePath)
}

exports.createEmptyFile = (dataFilePath) => {
  fs.openSync(dataFilePath, 'w')
}

exports.readFile = (dataFilePath) => new Promise(r => {
  return fs.readFile(dataFilePath, 'utf8', function(err, contents) {
    r(contents);
  });
})

exports.writeFile = (dataFilePath, context) => {
  fs.writeFileSync(dataFilePath, context, function(err) {
    if(err) {
        console.log(err)
        return {}
    }
    return context
  }); 
}