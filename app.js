document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.querySelector(".btn-calculate");

  // Month Names to Numeric Index Mapping
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  calcBtn.addEventListener("click", () => {
    // 1. Get Values from Date of Birth Inputs
    const dobMonthStr = document.getElementById("dob-month").value;
    const dobDay = parseInt(document.getElementById("dob-day").value, 10);
    const dobYear = parseInt(document.getElementById("dob-year").value, 10);

    // 2. Get Values from Target Date Inputs
    const targetMonthStr = document.getElementById("target-month").value;
    const targetDay = parseInt(document.getElementById("target-day").value, 10);
    const targetYear = parseInt(document.getElementById("target-year").value, 10);

    // Create Date Objects
    const dobDate = new Date(dobYear, monthMap[dobMonthStr], dobDay);
    const targetDate = new Date(targetYear, monthMap[targetMonthStr], targetDay);

    // Validation Check
    if (dobDate > targetDate) {
      alert("Date of birth cannot be after the target date!");
      return;
    }

    // 3. Calculation Logic
    let years = targetDate.getFullYear() - dobDate.getFullYear();
    let months = targetDate.getMonth() - dobDate.getMonth();
    let days = targetDate.getDate() - dobDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get previous month's total days
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // 4. Display Result
    displayResult(years, months, days);
  });

  function displayResult(years, months, days) {
    let resultContainer = document.querySelector(".result-box");
    
    // Create Result Box if it doesn't exist
    if (!resultContainer) {
      resultContainer = document.createElement("div");
      resultContainer.className = "result-box";
      document.querySelector(".calculator-card").appendChild(resultContainer);
    }

    resultContainer.innerHTML = `
      <h3>Calculated Age</h3>
      <div class="result-grid">
        <div class="result-item"><span>${years}</span> Years</div>
        <div class="result-item"><span>${months}</span> Months</div>
        <div class="result-item"><span>${days}</span> Days</div>
      </div>
    `;
  }
});