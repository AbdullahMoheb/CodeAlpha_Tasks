function calculateAge() {
    var inputDateString = document.getElementById("Birth").value;

    var inputDate = new Date(inputDateString);
    var currentYear = new Date().getFullYear();

    if (isNaN(inputDate)) {
        alert("Please enter a valid birth date.");
        return;
    }

    if (inputDate.getFullYear() < 0 || inputDate.getFullYear() > currentYear) {
        alert("Please enter a valid birth year.");
        return;
    }

    var today = new Date();
    var age = today.getFullYear() - inputDate.getFullYear();
    var m = today.getMonth() - inputDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < inputDate.getDate())) {
        m += 12;
        age--;
    }
    var d = today.getDate() - inputDate.getDate();
    if (d < 0) {
        d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        m--;
    }
    var h = today.getHours() - inputDate.getHours();
    if (h < 0) {
        d--;
        h += 24;
    }
    var resultYears = "Wow you are"
    var resyear = age;
    var resultMonth = m;
    var resultDays = d;
    var resultHours = h;
    document.getElementById("year-output").innerText = resultYears;
    document.getElementById("yearoutput").innerText = resyear;
    document.getElementById("month-output").innerText = resultMonth;
    document.getElementById("day-output").innerText = resultDays;
    document.getElementById("hour-output").innerText = resultHours;
}