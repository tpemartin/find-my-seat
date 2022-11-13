import Plotly from 'plotly.js-dist'

function graphSelect(graphDiv, data, event){
    var student = data.assignedSeat[event.target.innerText]
    var newTrace = Plotly.addTraces(
      graphDiv, {
        type: 'scatter', mode: 'markers',
        x: [student.x], y: [student.y]
      }
    )
    return newTrace
}