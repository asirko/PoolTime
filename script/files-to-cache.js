const fs = require('fs');

function checkForADir(dir) {
  const files = fs.readdirSync(dir)
    .map(f => dir + f);
  const simpleFile = files.filter(f => !fs.lstatSync(f).isDirectory())
    .filter(f => !/service-worker.js$/.test(f));
  const subDir = files.filter(f => fs.lstatSync(f).isDirectory())
    .map(subDirName => checkForADir(subDirName + '/'))
    .reduce((a, c) => [...a, ...c], []);
  return [...simpleFile, ...subDir];
}

function replaceInFile(fileName, strToReplace, newStr) {
  const escapedStrToReplace = escapeRegExpSpecific(strToReplace);
  fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(new RegExp(escapedStrToReplace, 'g'), newStr);

    fs.writeFile(fileName, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

function escapeRegExpSpecific(str) {
  const specificsEscaped = '[]'.split('')
    .map(char => '\\' + char);
  let newStr = str;
  specificsEscaped.forEach(char => newStr = newStr.replace(new RegExp(char, 'g'), char));
  return newStr;
}

const fileList = checkForADir('./dist/').map(f => f.replace('dist/', ''));
const strJson = JSON.stringify(fileList, null, 2);
replaceInFile('./dist/service-worker.js', '[\'insertFiles\']', strJson);
