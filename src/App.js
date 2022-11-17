import logo from './logo.svg';
import './App.css';
import Plotly from 'plotly.js-dist'
import {useFetch} from 'usehooks-ts'
import config from './config.json'
import { useEffect, useState } from 'react';
import {Autocomplete, TextField, Box, Grid} from '@mui/material'
import {returnSelect, graphSelect }from './graphSelect';
import BasicTable from './table';
import UrlInput, {Form} from './textInput';
import axios from 'axios';
import * as React from 'react';

//import heatmapData from "./heatmap.json";
//import data from './plotlyData.json';

function App2(){
  return <Form></Form>
}

window.Plotly = Plotly
var graphDiv
function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const sha = searchParams.get("sha")
  const url = searchParams.get("url")
  var [id, setId]= useState(searchParams.get("id")) 
  console.log(id)
  console.log(id?1:0)
  var email = searchParams.get("email")
  var [chartLink, setChartLink] = useState(getChartLink(id))
  
  var appContent, urlEl, emailEl
  // appContent switch
  if(id){
    appContent = <SeatingChart id={id}/>
  } else {
    function handleSubmit(){
      urlEl = document.getElementById("url")
      emailEl = document.getElementById("email")
      //var idnew = getSheetIdFromUrl(urlEl.value) //.match(/\/d\/[^\/]+/g)[0].replace("/d/", "")
      const idnew = url?getSheetIdFromUrl(url):getSheetIdFromUrl(urlEl.value)
      console.log(idnew)
      console.log(emailEl.value)
      email = emailEl.value
      submitToAppScript(idnew, sha, email).then(res=> console.log(res.status))
      setChartLink(getChartLink(idnew))
      //submitToAppScript(id)
      const submitEl = document.getElementById("submitStatus")
      
      // // submitEl.innerText = 'Processing...'
    }
    appContent = <UrlInput onClick={handleSubmit} chartLink={chartLink}/>
  }
  
  useEffect(()=>{
    if(url){
      document.getElementById("url").value= url
    }
    if(email){
      document.getElementById("email").value=email
    }
  })
  
  return (
    <div className="App">
     {appContent}   
    </div>
  );
}
function getChartLink(id){
  return id?`https://tpemartin.github.io/find-my-seat/?id=${id}`:""
}
function SeatingChart({id}){
  
  const url = `${config.github}${id}.json`
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
    }})
  
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
  return <div>
    <Grid container spacing={2} style={{ paddingTop: 10, justifyContent: 'center' }}>
      <Grid item xs={12} xl={6}>
        <BasicTable row={seat.row} column={seat.column}>
          <NameMenu dd={dd} width={200} handler={onNameSelect} />
        </BasicTable>
      </Grid>
    </Grid>
    <Grid container spacing={2} style={{ paddingTop: 10 }}>
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
async function submitToAppScript(id, sha, email){
  var url = config.appscript+`?id=${encodeURIComponent(id)}&sha=${encodeURIComponent(sha)}&email=${encodeURIComponent(email)}`
  console.log(sha)
  console.log(typeof sha !== 'undefined'?1:0) 
  console.log(!sha?1:0)
  const shaQuery = typeof sha !== 'undefined' && !sha?('&sha='+sha):""
  console.log(shaQuery)
  
  // console.log(!sha?1:0)
  // console.log(sha===""?1:0)
  // sha = (!sha || sha==="")?null:sha
  // console.log(sha)
  email = (email==="")?null:email

 
  console.log(shaQuery)
  // var url = config.appscript+'?id='+id+'&email='+email+(shaQuery?shaQuery:"")
  console.log(url)
  return await axios.get(url)
}
function getSheetIdFromUrl(url){
  return url.match(/\/d\/[^\/]+/g)[0].replace("/d/", "")
}
export default App;
