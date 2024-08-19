const https = require('https');
const { resolve } = require('path');
let amount = 0;


/* https.get('https://www.youtube.com/', (res) => {
    let RawData = [];
    res.on('data', (chunk) => {
        RawData.push(chunk.toString())
        //console.log(amount++);
    }).on('end', ()=>{
        console.log('data ready');
        
    }).on('error', () => {

    })
}) */


//console.log(DataSet);


async function fetch(URL) {
    let collector = new Promise((resolve, reject) => {
        const RawData = [];
        https.get(URL, (res) => {
            res.on('data', (chunk) => {
                RawData.push(chunk.toString());
            }).on('error', () => { 
                reject('Something gone wrong'); 
            }).on('end', () => {
            resolve(RawData);
        });
        });
    })

    return collector
}

/* 
function ending(RawData) {
    let ender = new Promise((resolve, reject) =>{ 
        console.log('data ready');
        resolve(RawData);
    })
    return ender
}

function errorCatcher() {
    let errorCatch = new Promise((resolve, reject) =>{ 
        console.log('Something gone wrong');
        reject();
    })
    return errorCatch
} */


async function Read() {
    let p = await fetch('https://www.youtube.com/');
    console.log(p.join(""))
}

Read()
//console.log(fetch('https://www.youtube.com/').then())
