function calculateSRTF() {
    const numProcesses = Number(document.getElementById("numProcesses").value);
    const processArrivalTimes = [];
    const processBurstTimes = [];
    for (let i = 0; i < numProcesses; i++) {
      const arrivalTime = Number(prompt(`Enter the arrival time of process P${i+1}`));
      const burstTime = Number(prompt(`Enter the burst time of process P${i+1}`));
      processArrivalTimes.push(arrivalTime);
      processBurstTimes.push(burstTime);
    }
  
    const output = document.getElementById("output");
  
    // SRTF process scheduling algorithm
    let currentTime = 0;
    let completedProcesses = 0;
    const completionTimes = [];
    const waitingTimes = [];
    const remainingBurstTimes = [...processBurstTimes];
  
    while (completedProcesses < numProcesses) {
      let shortestRemainingTime = Infinity;
      let shortestRemainingTimeProcessIndex = -1;
  
      // Find the process with the shortest remaining burst time that has arrived
      for (let i = 0; i < numProcesses; i++) {
        if (processArrivalTimes[i] <= currentTime && remainingBurstTimes[i] < shortestRemainingTime && remainingBurstTimes[i] > 0) {
          shortestRemainingTime = remainingBurstTimes[i];
          shortestRemainingTimeProcessIndex = i;
        }
      }
  
      if (shortestRemainingTimeProcessIndex === -1) {
        currentTime++;
        continue;
      }
  
      // Execute the process with the shortest remaining burst time for 1 time unit
      remainingBurstTimes[shortestRemainingTimeProcessIndex]--;
      currentTime++;
  
      // If the process has completed, record the completion time and calculate the waiting time and turn around time
      if (remainingBurstTimes[shortestRemainingTimeProcessIndex] === 0) {
        completedProcesses++;
        const completionTime = currentTime;
        completionTimes[shortestRemainingTimeProcessIndex] = completionTime;
        const waitingTime = completionTime - processArrivalTimes[shortestRemainingTimeProcessIndex] - processBurstTimes[shortestRemainingTimeProcessIndex];
        waitingTimes[shortestRemainingTimeProcessIndex] = waitingTime;
      }
    }
  
    // Calculate the average waiting time and average turn around time
    let totalWaitingTime = 0;
    let totalTurnAroundTime = 0;
    for (let i = 0; i < numProcesses; i++) {
      totalWaitingTime += waitingTimes[i];
      totalTurnAroundTime += completionTimes[i] - processArrivalTimes[i];
    }
    const avgWaitingTime = totalWaitingTime / numProcesses;
    const avgTurnAroundTime = totalTurnAroundTime / numProcesses;
  
    // Display the output in a table
    let tableHTML = "<table>";
    tableHTML += "<tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Completion Time</th><th>Turn Around Time</th><th>Waiting Time</th></tr>";
    for (let i = 0; i < numProcesses; i++) {
      tableHTML += `<tr><td>P${i+1}</td><td>${processArrivalTimes[i]}</td><td>${processBurstTimes[i]}</td><td>${completionTimes[i]}</td><td>${completionTimes[i] - processArrivalTimes[i]}</td><td>${waitingTimes[i]}</td></tr>`;
    }
    tableHTML += "</table>";
    tableHTML += `<p>Average Waiting Time: ${avgWaitingTime.toFixed(2)}</p>`;
    tableHTML += `<p>Average Turn Around Time: ${avgTurnAroundTime.toFixed(2)}</p>`;
    output.innerHTML = tableHTML;
  }
  
   
  