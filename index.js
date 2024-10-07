const day = document.getElementById("day")
const month = document.getElementById("month")
const year = document.getElementById("year")
const outputDay = document.getElementById("outputDay")
const outputMonth = document.getElementById("outputMonth")
const outputYear = document.getElementById("outputYear")

day.addEventListener("input", calculateDates)
month.addEventListener("input", calculateDates)
year.addEventListener("input", calculateDates)

function dateDiff(startingDate, endingDate) {
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
        endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
        const swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }

    return [yearDiff, monthDiff, dayDiff];
}
function reset() {
    outputDay.innerHTML = "--"
    outputMonth.innerHTML = "--"
    outputYear.innerHTML = "--"
}
function calculateDates() {
    //input checking
    if (!month.value || !year.value || !day.value) { reset(); return }
    if (!(1 <= month.value && month.value <= 12)) {
        month.value = null
        reset()
    } if (!(1 <= day.value && day.value <= 31)) {
        day.value = null
        reset()
    }
    if (!(-99999 <= year.value && year.value <= 99999)) {
        year.value = null
        reset()
    }
    let inputDate = new Date()
    inputDate.setFullYear(year.value)
    inputDate.setMonth(month.value - 1)
    inputDate.setDate(day.value)
    let now = new Date()
    outputDay.innerHTML = dateDiff(inputDate, now)[2] - 1
    outputMonth.innerHTML = dateDiff(inputDate, now)[1]
    outputYear.innerHTML = dateDiff(inputDate, now)[0]
}