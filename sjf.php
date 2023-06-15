<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $n = $_POST["n"];
    $arrival = $_POST["arrival"];
    $burst = $_POST["burst"];

    $sum_burst_time = 0;
    for ($i = 0; $i < $n; $i++) {
      $sum_burst_time += $burst[$i];
    }

    // setting the value for the last element of the burst_time array
    $burst[9] = 9999;

    // scheduling algorithm
    $time = 0;
    $sumt = 0;
    $sumw = 0;
    $result = "";
    for ($j = 0; $j < $sum_burst_time;) {
      $smallest = 9;
      for ($i = 0; $i < $n; $i++) {
        if ($arrival[$i] <= $time && $burst[$i] > 0 && $burst[$i] < $burst[$smallest]) {
          $smallest = $i;
        }
      }
      $result .= "P[" . ($smallest + 1) . "]\t|\t" . ($time + $burst[$smallest] - $arrival[$smallest]) . "\t|\t" . ($time - $arrival[$smallest]) . "<br>";
      $sumt += $time + $burst[$smallest] - $arrival[$smallest];
      $sumw += $time - $arrival[$smallest];
      $time += $burst[$smallest];
      $burst[$smallest] = 0;
    }

    // outputting the results
    $result .= "<br><br>average waiting time = " . ($sumw * 1.0 / $n);
    $result .= "<br><br>average turnaround time = " . ($sumt * 1.0 / $n);
    echo $result;
  } else {
    // display form
    ?>
    <form method="POST" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
      <label for="n">Enter the number of processes:</label>
      <input type="number" name="n" id="n"><br><br>
      <button type="button" onclick="createTable()">Submit</button>
    </form>
    <div id="tableDiv"></div>

    <script src="sjf.js"></script>
    <?php
  }
  ?>