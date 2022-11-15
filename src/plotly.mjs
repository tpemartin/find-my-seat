
import fetch from 'node-fetch'
import config from './config.json' assert {type: 'json'}
import fs from 'fs'
const url=config.appscript+config.spreadsheetId+'.json'


async function fetchData(){
  const data =  await fetch(url)
          .then(res=>{ return res.json()})
  return data
}

fetchData().then( (data)=> {return JSON.stringify(data)})
  .then(stringData=>{fs.writeFile("./plotlyData.json", stringData,  function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  })})

// then(data => fs.writeFile("./plotlyData.json", data))


// async function downloadData(){
    
//   let data = await axios.get(url)
//   console.log(data)  
//   return data
// }

// downloadData()