import logo from './logo.svg';
import './App.css';
import Plotly from 'plotly.js-dist'
import {useFetch} from 'usehooks-ts'
import config from './config.json'
import { useEffect, useState } from 'react';
import {Autocomplete, TextField, Box, Grid, Container} from '@mui/material'
import {returnSelect, graphSelect }from './graphSelect';
import BasicTable from './table';
//import heatmapData from "./heatmap.json";
//import data from './plotlyData.json';


window.Plotly = Plotly
var graphDiv
function App() {
  const searchParams = new URLSearchParams(window.location.search);
  // const url = `${config.appscript}${config.spreadsheetId}.json`
  const url = `${config.appscript}${searchParams.get("id")}.json`
  console.log(url)
  var {data, isLoading, error} = useFetch(
    url
  )
  const [dd, setDd]=useState(data)
  const [seat, setSeat]=useState({row: "", column: ""})
  // const [trace, setTrace]=useState(dd?dd.data.length:null)
  // console.log(dd)
  // console.log(trace)
  useEffect(()=>{
    graphDiv = document.getElementById("seatingMap")
    onNameSelect = onNameSelect.bind(graphDiv)
    window.graphDiv = graphDiv
    if(data){
      setDd(data)
      window.data=data.data
      window.layout=data.layout
      console.log(data.layout)
      console.log(data.data)

      data.layout.xaxis = {...data.layout.xaxis, 
        side: "top",
        modebar: {remove: [ "autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "reset", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetSankeyGroup", "resetScale2d", "resetViewMapbox", "resetViews", "resetcameradefault", "resetcameralastsave", "resetsankeygroup", "resetscale", "resetview", "resetviews", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toImage", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "toimage", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox", "zoomin", "zoomout"]}}
      // setTrace(data.data.length)
      Plotly.newPlot(graphDiv,data.data, data.layout, {staticPlot: true})
      Plotly.restyle(graphDiv,{hoverinfo: 'none'},0)
      Plotly.relayout(graphDiv, {margin: {l: 80, r: 0}, showlegend: false})
      // var z=[...Array(98).keys()].map(e=> 1)
      // z[13]=2
      
      // Plotly.restyle(graphDiv, {z: z}, 0)
    }
  })
  
  function onNameSelect(event){//(event: any, newValue: string | null){
    console.log(this)
    console.log(this.assignedSeat)
    console.log(returnSelect(event, this.assignedSeat))
    const returnSelectResult = returnSelect(event, this.assignedSeat)
    setSeat(
      {
        row: returnSelectResult.row,
        column: returnSelectResult.column
      }
    )
    graphSelect(graphDiv, returnSelectResult)
  }
 <div style={{justifyContent: 'center'}} />

  // onNameSelect = onNameSelect.bind(dd)
  // onNameSelect()
  return (
    <div className="App">

      <Grid container spacing={2} style={{ paddingTop: 10, justifyContent: 'center' }}>
        <Grid item xs={12} xl={6}>
          <BasicTable row={seat.row} column={seat.column}>
            <NameMenu dd={dd} width={200} handler={onNameSelect} />
          </BasicTable>
        </Grid>
      </Grid>
      <Grid container spacing={2}  style={{paddingTop: 10}}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <div className="podium">Podium 講台</div>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>

      <div id="seatingMap"></div>

    </div>
  );
}
// function onNameSelect(event){//(event: any, newValue: string | null){
//   console.log(this)
//   console.log(this.assignedSeat)
//   console.log(returnSelect(event, this.assignedSeat))
//   const returnSelectResult = returnSelect(event, this.assignedSeat)
//   graphSelect(graphDiv, returnSelectResult)
// }
function handleNameMenuSelect(){
  // show row, col, studentname
  
  // graph plotly
}
function NameMenu({dd, width, handler}){
  let options = dd?Object.keys(dd.assignedSeat):[]
  console.log(options)
  handler = handler.bind(dd)
  return  <Autocomplete
  disablePortal
  id="combo-box-demo"
  onChange = {handler}
  options={options}
  sx={{ width: width }}
  renderInput={(params) => <TextField {...params} label="Your name" />}
/>
}
export function BoxComponent({children}) {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
      {children}
    </Box>
  );
}

export default App;
