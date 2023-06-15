function createTable() {
    // getting the value of n from the input field
    var n = parseInt(document.getElementById("n").value);
  
    // creating the table header
    var table = "<table><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th></tr>";
  
    // creating the table rows with input fields for arrival time and burst time
    for (var i = 1; i <= n; i++) {
      table += "<tr><td>P" + i + "</td>";
      table += "<td><input type='number' name='arrival[]'></td>";
      table += "<td><input type='number' name='burst[]'></td></tr>";
    }
  
    // closing the table
    table += "</table>";
  
    // adding the table to the div element
    document.getElementById("tableDiv").innerHTML = table;
  }
  