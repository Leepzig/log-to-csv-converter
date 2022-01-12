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
    let data = fs.createReadStream(filePath, {encoding: 'utf8'})
    let student = JSON.parse(data);
    console.log(student);
}

const writeJson = (data, file) => {
    let jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(file, jsonData, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}


// fs.readdirSync('students').forEach( fileName => {
//     let dirPath = path.join(__dirname, `/students/${fileName}`)
//     let student = readJson(dirPath)
//     console.log(student)
// })
const dirPath = path.join(__dirname, '/students/student.json')
readJson(dirPath)