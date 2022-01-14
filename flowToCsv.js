const fs = require('fs')
const path =require('path')
var zlib = require('zlib')
const readline = require('readline');
const { Console } = require('console');

//returns a boolean for if file is a directory
const isDir = (filePath) => {
    const result = fs.statSync(filePath, (er) => {if (er) throw er})
    return !result.isFile()
}

//if log files don't exists, it makes a new file and puts the headers
const createLogsFile = () => {
    const logFile = 'logs.csv'
    fs.access(logFile, fs.constants.F_OK, (err) => {
        if (err) {
            const headers = "version,account-id,interface-id,srcaddr,dstaddr,srcport,dstport,protocol,packets,bytes,start,end,action,log-status"
            fs.writeFileSync(logFile, headers)
        } 
      });
      return logFile
}

const writeToCsv = filePath => {
    const logFile = 'logs.csv'
    const writeStream = fs.createWriteStream(logFile, {flags:'a'});
    let lineReader = readline.createInterface({
        input: fs.createReadStream(filePath).pipe(zlib.createGunzip()),
    });
    
    lineReader.on('line', (line) => {
        if (!line.includes('version')) {
            writeStream.write(line.replaceAll(" ", ",") + "\n")
        }
    });
}

//records only the zipped files
const filterZipped = (filePath) => {
    const filesNotLogged = []
    if (path.extname(filePath) === '.gz') {
        writeToCsv(filePath)
    } else {
        filesNotLogged.push(filePath)
        if (filesNotLogged[0]) console.log(`There were ${filesNotLogged.length}: \n${filesNotLogged}`)
    }
}

// using recursion, drills down to the files
const drillDownToFiles = (rootPath, folder) => {
    const dirTitle = fs.readdirSync(folder)[1]
    const dirPath = path.join(rootPath, dirTitle)
    const newFolderPath = `${folder}/${dirTitle}`

    if (isDir(dirPath)) {
        drillDownToFiles(dirPath, newFolderPath)
   } else {
        createLogsFile()
        fs.readdirSync(folder).forEach(fileName => {
            filterZipped(dirPath)
        })
        //I need to write a test that actually test whether that's true or not.
        console.log("Files have been succesfully logged")
    }
}

//Used to execute Looping through files:
const awsLogs = "AWSLogs"
const rootPath = path.join(__dirname, awsLogs)
drillDownToFiles(rootPath, awsLogs)

