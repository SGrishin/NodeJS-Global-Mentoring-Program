const csv = require('csvtojson');
const fs = require('fs');

const readable = csv();
const writable = fs.createWriteStream('./src/module_1/task2_result.txt', 'utf8');

readable.on('error', (error) => {
    console.error(error);
});
writable.on('error', (error) => {
    console.error(error);
});

readable.on('data', (data) => {
    const jsonStr = data.toString('utf8');
    
    writable.write(jsonStr);
});

readable.fromFile('./src/module_1/nodejs-hw1-ex1.csv');
