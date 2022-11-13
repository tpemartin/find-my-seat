import Plotly from 'plotly.js-dist'

export default async function graphSelect(graphDiv, data, event){
  var seatHolder = document.getElementById("seat")
  
    console.log( graphDiv.data)
    
    var student = data.assignedSeat[event.target.innerText]
    console.log(student)
    seatHolder.innerText = student?`Row: ${student.y}  Column: ${student.x}`:""
    var studentPlotData = student?{
      type: 'scatter', mode: 'markers',
      x: [student.x], y: [student.y], marker: {size: 30}
    }:null
    console.log(studentPlotData)
    // Plotly.addTraces(graphDiv, studentPlotData)
    if(studentPlotData && graphDiv.data.length>1){
    Plotly.deleteTraces(graphDiv,1)
      .then(
          () => {Plotly.addTraces(graphDiv, studentPlotData)})
    } else if(studentPlotData && graphDiv.data.length === 1){
      Plotly.addTraces(graphDiv, studentPlotData)
    }
    console.log(graphDiv)
    return graphDiv
}