// Function to calculate SRTF scheduling algorithm
function calculate() {
    // Get the table and rows
    const table = document.getElementById("processTable");
    const rows = table.getElementsByTagName("tr");
    const n = rows.length - 1;
  
    // Initialize the arrays for arrival time, burst time, and time remaining
    const a = [];
    const b = [];
    const x = [];
  
    // Loop through the rows to get the values from the table
    for (let i = 1; i <= n; i++) {
      const arrival = parseInt(rows[i].cells[1].firstChild.value);
      const burst = parseInt(rows[i].cells[2].firstChild.value);
      a.push(arrival);
      b.push(burst);
      x.push(burst);
    }
  
    // Set the last element of burst array to a large number
    b[n] = 9999;
  
    // Initialize variables for time, smallest process index, count, and output arrays
    let time = 0;
    let smallest = n;
    let count = 0;
    const turnAroundTime = [];
    const completionTime = [];
    const waitingTime = [];
  
    // Loop until all processes are completed
    while (count !== n) {
      // Find the process with smallest burst time that has arrived
      for (let i = 0; i < n; i++) {
        if (a[i] <= time && b[i] < b[smallest] && b[i] > 0) {
          smallest = i;
        }
      }
  
      // Decrement remaining time of the smallest process
      b[smallest]--;
  
      // If the smallest process has completed
      if (b[smallest] === 0) {
        count++;
        // Set completion time and turn around time
        completionTime[smallest] = time + 1;
        turnAroundTime[smallest] = completionTime[smallest] - a[smallest];
        // Set waiting time
        waitingTime[smallest] = turnAroundTime[smallest] - x[smallest];
      }
  
      // Move time to the next unit
      time++;
    }
  
    // Calculate the average waiting time and average turn around time
    let avgWaitingTime = 0;
    let avgTurnAroundTime = 0;
    for (let i = 0; i < n; i++) {
      avgWaitingTime += waitingTime[i];
      avgTurnAroundTime += turnAroundTime[i];
    }
    avgWaitingTime /= n;
    avgTurnAroundTime /= n;
  
    // Display the output table
    const outputTable = document.getElementById("outputTable");
    for (let i = 0; i < n; i++) {
      const row = outputTable.insertRow();
      const pidCell = row.insertCell(0);
      const ctCell = row.insertCell(1);
      const tatCell = row.insertCell(2);
      const wtCell = row.insertCell(3);
      pidCell.innerText = i + 1;
      ctCell.innerText = completionTime[i];
      tatCell.innerText = turnAroundTime[i];
      wtCell.innerText = waitingTime[i];
    }
  
    // Display the average waiting time and average turn around time
    const avgWTDiv = document.getElementById("avgWT");
    const avgTATDiv = document.getElementById("avgTAT");
    const avgWT = avg.toFixed(2);
    const avgTAT = tt.toFixed(2);
    
    avgWTDiv.innerHTML = 'Average Waiting Time: ${avgWT}';
    avgTATDiv.innerHTML = 'Average Turnaround Time: ${avgTAT}';
    }

    // Add a new row to the table
function addRow() {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${tableBody.childElementCount + 1}</td>
      <td><input type="number" class="arrival-time"></td>
      <td><input type="number" class="burst-time"></td>
      <td><button type="button" onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
  }
  
  // Delete a row from the table
  function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    // Update the process numbers after deleting a row
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach((row, index) => {
      row.cells[0].textContent = index + 1;
    });
  }
  