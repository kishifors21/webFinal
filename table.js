async function drawTable() {
  var jsondata = await fetch('http://140.128.102.242:8080/getdata')
    .then(function(response) {
      return response.json();
    })
    .then(function(myjson) {
      console.log(myjson)
      return myjson
    })
  var tr, td;
  tbody = document.getElementById('tbody');

  for (var i = 0; i < jsondata.length; i++) // loop through data source
  {
    tr = tbody.insertRow(tbody.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['date'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['in'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['out'];
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = jsondata[i]['amount'];


  }
}
async function newData() {
  var tr, td;
  var data = document.getElementsByClassName('newData');
  console.log(data)
  console.log(data[1])

  // for (var i = 0; i < data.length; i++) // loop through data source
  // {

  // }
  let vody = {
    date: data[0].value,
    in: data[1].value,
    out: data[2].value,
    amount: data[3].value,
  }
  fetch("http://140.128.102.242:8080/newdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: body,
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
$(document).ready(function() {

  drawTable();

});