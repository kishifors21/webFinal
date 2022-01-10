var uri = "http://140.128.102.242:8080";

async function renew(){
  genTable = document.getElementsByClassName('genTable');
  genTable.remove;
  while(genTable.length > 0){
    genTable[0].parentNode.removeChild(genTable[0]);
  }
  await drawTable();
  sum();
}
async function drawTable() {
  var jsondata = await fetch(uri+'/getdata')
    .then(function(response) {
      return response.json();
    })
    .then(function(myjson) {
      console.log(myjson)
      return myjson
    })
  var tr, td;
  tbody = document.getElementById('tbody');

  for (var i = jsondata.length-1; i >=0 ; i--) // loop through data source
  {
    tr = tbody.insertRow(tbody.rows.length);
    tr.classList.add('genTable');
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
  if (isNaN(parseInt(data[0].value))||isNaN(parseInt(data[1].value))){
    // alert("value input error!");
    showAlert();
    return
  }

  var body = {
    "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
    "in": data[0].value,
    "out": data[1].value,
    "amount": data[0].value-data[1].value,
  };
  console.log(body);
  await fetch(uri+"/newdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  renew();

}
function sum(){
  var in_sum = 0;
  var out_sum = 0;
  var amount_sum = 0;
  // $("tr").remove()
  $("tr").not(':first').each(function() {
    console.log($(this));
    in_sum +=  getnum($(this).find("td:eq(1)").text());
    out_sum +=  getnum($(this).find("td:eq(2)").text());
    amount_sum +=  getnum($(this).find("td:eq(3)").text());
    function getnum(t){
      if(isNumeric(t)){
          return parseInt(t,10);
      }
      return 0;
      function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
      }
    }
  });
  $("#in_sum").text('共收入 $'+in_sum);
  $("#out_sum").text('共支出 $'+out_sum);
  $("#amount_sum").text('總資產 $'+amount_sum);
  $("#my_bar").text(amount_sum+'/10000');
  let perc = amount_sum/10000*100;
  console.log(perc);
  document.getElementById("my_bar").style.width=perc+'%';
}

function showAlert() {
  $("#my_alert").toast('show');
}
$(document).ready(async function() {
  await drawTable();
  sum();
});