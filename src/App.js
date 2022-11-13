import logo from './logo.svg';
import './App.css';
import Plotly from 'plotly.js-dist'
import {useFetch} from 'usehooks-ts'
import config from './config.json'
import { useEffect, useState } from 'react';
import {Autocomplete, TextField, Grid} from '@mui/material'
import graphSelect from './graphSelect';
window.Plotly = Plotly
var graphDiv
function App() {
  const url = `${config.appscript}${config.spreadsheetId}.json`
  console.log(url)
  var {data, isLoading, error} = useFetch(
    url
  )
  const [dd, setDd]=useState(data)
  // const [trace, setTrace]=useState(dd?dd.data.length:null)
  // console.log(dd)
  // console.log(trace)
  useEffect(()=>{
    graphDiv = document.getElementById("seatingMap")
    window.graphDiv = graphDiv
    if(data){
      setDd(data)
      window.data=data.data
      window.layout=data.layout
      console.log(data.layout)
      console.log(data.data)
      // setTrace(data.data.length)
      Plotly.newPlot(graphDiv,data.data, data.layout)
      
    }
  })
 

  
  return (
    <div className="App">
      <Grid container spacing={2}>
  <Grid item xs={3}>
  <NameMenu dd={dd}/>
  </Grid>
  <Grid item xs={4}>
   <div id={"seat"} />
  </Grid>
  <Grid item xs={12}>
   
  </Grid>
</Grid>
      
      <div id="seatingMap"></div>
      
    </div>
  );
}
function NameMenu({dd}){
  let options = dd?Object.keys(dd.assignedSeat):[]
  console.log(options)
  return  <Autocomplete
  disablePortal
  id="combo-box-demo"
  onChange = {(event: any, newValue: string | null) => {graphSelect(graphDiv, dd, event)}}
  options={options}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Select Or Type your name" />}
/>
}

export default App;
