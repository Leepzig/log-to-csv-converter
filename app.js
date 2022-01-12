'use strict';
//Asynchonous

const fs = require('fs');
const path = require('path');

// const readJson = file => {
//     fs.readFile(file, 'utf8', (err, data) => {
//         console.log(err)
//         if (err) throw err;
//         let student = JSON.parse(data);
//         console.log(student);
//         return student
//     });
// }
const readJson = filePath => {
    let rs = fs.createReadStream(filePath)
    return rs
    // rs.on('data', (dataChunk) => {
    //     let student = JSON.parse(dataChunk)
    //     console.log(student)
    // })
}

const writeJson = (data, file) => {
    let jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(file, jsonData, {flag:'a+'}, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}


fs.readdirSync('students').forEach( fileName => {
    let dirPath = path.join(__dirname, `/students/${fileName}`)
    let student = readJson(dirPath)
    student.on('data', (dataChunk) => {
        writeJson(JSON.parse(dataChunk), 'data.json')
    })
})
// const dirPath = path.join(__dirname, '/students/student.json')
// readJson(dirPath)