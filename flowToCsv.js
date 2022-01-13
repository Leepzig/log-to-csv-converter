
const fs = require('fs')
const path =require('path')
const { stringify } = require('querystring')
var zlib = require('zlib')
var gunzip = zlib.createGunzip()
const readline = require('readline');


//returns a boolean for if file is a directory
const isDir = (filePath) => {
    const result = fs.statSync(filePath, (er, stats) => {if (er) throw er})
    return !result.isFile()
}

// using recursion, drills down to the files
const drillDownToFiles = (rootPath, folder) => {
    const dirTitle = fs.readdirSync(folder)[1]
    const dirPath = path.join(rootPath, dirTitle)
    const newFolderPath = `${folder}/${dirTitle}`
    console.log("Folder: ", folder)
    if (isDir(dirPath)) {
        drillDownToFiles(dirPath, newFolderPath)
   } else {
       console.log("was not folder", dirPath)
    fs.readdirSync(folder).forEach(fileName => {
        console.log("File:", fileName)
        //unzip(dirpath/filename)
        })
    }
}
//Used to execute Looping through files:
// const awsLogs = "AWSLogs"
// const rootPath = path.join(__dirname, awsLogs)
// drillDownToFiles(rootPath, awsLogs)

const logExample = "AWSLogs/607487649814/vpcflowlogs/us-east-2/2022/01/13/05/607487649814_vpcflowlogs_us-east-2_fl-007edc593c7c0b891_20220113T0525Z_31dbb2ff.log.gz"

const test = fs.readFileSync(logExample)

// console.log(test.toString().replaceAll(" ", ","))
const writeToCsv = filePath => {
    let lineReader = readline.createInterface({
        input: fs.createReadStream(filePath).pipe(zlib.createGunzip())
    });
    
    lineReader.on('line', (line) => {
        // fs.writeFileSync("logs.csv", line.replaceAll(" ", ","), {flags:'a'}, (err) => {
            console.log(line.replaceAll(" ", ","))
            // if (err) throw err
        // });
    });
}

writeToCsv(logExample)











// fs.createReadStream(logExample)
//     .pipe(csv.parse())
//     .on('error', error => console.error(error))
//     .on('data', row => writer.write(`ROW=${JSON.stringify(row)}`))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));












// const title0 = "AWSLOGS"
// const path0 = __dirname
// const title1 = fs.readdirSync(title0)[1] // => 607487649814
// const path1 = path.join(path0, title0, title1) // => full path to title1
// console.log("Path1", path1)
// // if path1 === dir
// const title2 = fs.readdirSync(`AWSLogs/${title1}`)[1] // => vpclogs
// console.log("Title2: ", title2)
// const path2 = path.join(path1, title2) // => ?
// console.log("Path2: ", path2)
// //if path2 === dir
// const title3 = fs.readdirSync(`AWSLogs/${title1}/${title2}`)[1] // => vpclogs
// console.log("Title 3:", title3)
// const path3 = path.join(path2, title3) // => ?
// console.log("Path 3: ", path3)
// //if path3 === dir
// const title4 = fs.readdirSync(`AWSLogs/${title1}/${title2}/${title3}`)[1] // => vpclogs
// console.log("Title 4:", title4)
// const path4 = path.join(path3, title4) // => ?
// console.log("Path 4: ", path4)