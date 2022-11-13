import logo from './logo.svg';
import './App.css';
import Plotly from 'plotly.js-dist'
import {useFetch} from 'usehooks-ts'
import config from './config.json'
import { useEffect, useState } from 'react';
import {Autocomplete, TextField} from '@mui/material'


function App() {
  var {data, isLoading, error} = useFetch(
    config.appscript+'?spreadsheetId='+config.spreadsheetId
  )
  const [dd, setDd]=useState(data)
  const [trace, setTrace]=useState(dd.data.length)
  console.log(dd)
  console.log(trace)
  useEffect(()=>{
    const graphDiv = document.getElementById("seatingMap")
    if(data){
      setDd(data)
      setTrace(data)
      Plotly.newPlot(graphDiv,data.data, data.layout)
      
    }
  })
  
  return (
    <div className="App">
      <NameMenu dd={dd}/>
      <div id="seatingMap"></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function NameMenu({dd}){
  let options = dd?Object.keys(dd.assignedSeat):[]
  console.log(options)
  return  <Autocomplete
  disablePortal
  id="combo-box-demo"
  onChange = {(event: any, newValue: string | null) => {console.log(event.target.innerText)}}
  options={options}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/>
}
function graphSelect(event){

}
export default App;
