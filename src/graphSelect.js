import Plotly from 'plotly.js-dist'

export function returnSelect(event, assignedSeat){
  var student = assignedSeat[event.target.innerText]
  console.log(student)
  
  return {row: student.y, column: student.x, name: event.target.innerText, student: student}
}
function showSeatInSeatHolder(row, column){
  var seatHolder = document.getElementById("seat")
  seatHolder.innerText = `Row: ${row}  Column: ${column}`
}
export async function graphSelect(graphDiv, returnSelectResult){
 
    console.log( graphDiv.data)
    var {row, column, name, student}=returnSelectResult
    
    var studentPlotData = student?{
      type: 'scatter', mode: 'markers',
      x: [column], y: [row], marker: {size: 17}
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