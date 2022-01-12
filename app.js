'use strict';
//Synchronous
const fs = require('fs');
const readJson = file => {
    let rawdata = fs.readFileSync('student.json');
    let student = JSON.parse(rawdata);
    console.log(student);
}

const writeJson = (data, file) => {
    let jsonData = JSON.stringify(data);
    fs.writeFileSync(file, jsonData);
}

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

writeJson(student, 'student-2.json')
