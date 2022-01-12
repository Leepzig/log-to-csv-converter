'use strict';
//Asynchonous

const fs = require('fs');

const readJson = file => {
    fs.readFile(file, (err, data) => {
        console.log('before call')
        if (err) throw err;
        let student = JSON.parse(data);
        console.log(student);
    });
    console.log('This is after the read call');
}

const writeJson = (data, file) => {
    let jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(file, jsonData, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};
