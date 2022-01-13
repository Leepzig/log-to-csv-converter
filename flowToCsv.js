
const fs = require('fs')
const { dirname } = require('path')
const path =require('path')

//fix the array
const dir = fs.readdirSync('AWSLogs')[1]
const dirAWS = path.join(__dirname,'AWSLogs', dir)
const dirSub = path.join(dirAWS, 'vpcflowlogs')

//returns a boolean for if file is a directory
const isDir = (filePath) => {
    const result = fs.statSync(filePath, (er, stats) => {if (er) throw er})
    return !result.isFile()
}
// console.log(isDir(dir))
// console.log(isDir(dirAWS))

// fs.readdirSync(dir).forEach(fileName => {
//     console.log(fileName)
//     const dirPath = path.join(__dirname, fileName)
//     // console.log(dirPath)
// })
// using recursion, drills down to the files
const drillDownToFiles = (rootPath, folder) => {
    const dirTitle = fs.readdirSync(folder)[1]
    const dirPath = path.join(rootPath, dirTitle)
    const newFolderPath = `${folder}/${dirTitle}`
    console.log("Folder: ", folder)
    if (isDir(dirPath)) {
        drillDownToFiles(dirPath, newFolderPath)
   } else {
       console.log("was not folder")
    fs.readdirSync(folder).forEach(fileName => {
   console.log("loop:", fileName)})
    }
}
const awsLogs = "AWSLogs"
const rootPath = path.join(__dirname, awsLogs)
drillDownToFiles(rootPath, awsLogs)

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