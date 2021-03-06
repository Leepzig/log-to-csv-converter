const fs = require('fs')
const path =require('path')
const zlib = require('zlib')
const readline = require('readline');

// These are the headers that will be put on the first line of the csv file
const headers = "version,account-id,interface-id,srcaddr,dstaddr,srcport,dstport,protocol,packets,bytes,start,end,action,log-status"
const myArgs = process.argv.slice(2);


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
            fs.writeFileSync(logFile, headers)
        } 
      });
      return logFile
}

const writeToCsv = filePath => {
    const logFile = createLogsFile()
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

const notLoggedFileNotification = fileNotLogged => {
    if (fileNotLogged !== null) {
        console.log("There were files not logged:")
        console.log(fileNotLogged + '\n')
    }
}

//records only the zipped files
const filterZipped = (filePath) => {
    let fileNotLogged = null
    if (path.extname(filePath) === '.gz') {
        writeToCsv(filePath)
    } else {
        fileNotLogged = filePath
        notLoggedFileNotification(fileNotLogged)
    }
}

// using recursion, drills down to the files
const drillDownToFiles = (rootPath, folder) => {
    // How to do error handling with this kind of thing?
    const dirTitle = fs.readdirSync(folder)[1]
    const dirPath = path.join(rootPath, dirTitle)
    const newFolderPath = `${folder}/${dirTitle}`

    if (isDir(dirPath)) {
        drillDownToFiles(dirPath, newFolderPath)
   } else {
        // createLogsFile()
        fs.readdirSync(folder).forEach(fileName => {
            const file = path.join(folder, fileName)
            // console.log("Function drilldown ran sucessfully.")
            filterZipped(file)
        })
        //I need to write a test that actually test whether that's true or not.
        console.log("Files have been succesfully logged")
    }
}


//File Execution:
const filesToBeCombined = myArgs[0]
const rootPath = path.join(__dirname, filesToBeCombined)
drillDownToFiles(rootPath, filesToBeCombined)

