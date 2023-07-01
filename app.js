const input = document.querySelector('#dob');
const checkbtn = document.querySelector('#check-btn');
const output = document.querySelector('#output-div');

checkbtn.addEventListener("click", () => {
    var userdob = input.value;

    if (userdob !== "") {

        var dobArr = userdob.split("-");
        var yyyy = dobArr[0];
        var mm = dobArr[1];
        var dd = dobArr[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };


        var dateobj = dateAsString(date);
        var palindromeList = checkPalindromeAllFormats(dateobj);
        var flag = false;
        for (let i = 0; i < palindromeList.length; i++) {
            if (palindromeList[i]) {
                flag = true;
                break;
            }
        }



        if (!flag) {
            const [count1, nxtDate] = checkNextdate(date);
            const [count2, prvDate] = checkPrevdate(date);

            if (count1 < count2) {
                output.innerText = `Sorry! you missed by ${count1} days. The nearest palindrome date is ${nxtDate.day}-${nxtDate.month}-${nxtDate.year}`;
            } else {

                output.innerText = `Sorry! you missed by ${count2} days. The nearest palindrome date is ${prvDate.day}-${prvDate.month}-${prvDate.year} `;
            }
        } else {
            output.innerText = "Yay! your birthday is a palindrome 🥳";
        }


    }

});

function dateAsString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function checkPalindromeAllFormats(date) {
    var dateFormatList = getDateAllFormats(date);
    var palList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isPalindrome(dateFormatList[i]);
        palList.push(result);
    }

    return palList;

}

function isPalindrome(str) {
    var charArr = str.split("");
    var reversedCharArr = charArr.reverse();
    var reversedString = reversedCharArr.join("");
    return str === reversedString;
}

function getDateAllFormats(date) {

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkNextdate(date) {
    var nextDate = getNextdate(date);


    count = 0;

    while (true) {
        count++;

        var dateobj = dateAsString(nextDate);
        var palList = checkPalindromeAllFormats(dateobj);
        for (let i = 0; i < palList.length; i++) {
            if (palList[i]) {
                return [count, nextDate];
            }
        }

        nextDate = getNextdate(nextDate);
    }

}

function getNextdate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2 && leapYear(year)) {

        if (day > 29) {
            day = 1;
            month = 3;
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };

}



function leapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

function checkPrevdate(date) {
    var prevDate = getPrevdate(date);
    count = 0;

    while (true) {
        count++;

        var dateobj = dateAsString(prevDate);
        var palList = checkPalindromeAllFormats(dateobj);
        for (let i = 0; i < palList.length; i++) {
            if (palList[i]) {
                return [count, prevDate];
            }
        }

        prevDate = getPrevdate(prevDate);
    }

}

function getPrevdate(date) {

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    const dayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (leapYear(year) && month === 3) {
        if (day === 0) {
            day = 29;
            month = 2;
        }

    } else {

        if (day === 0) {        
            month--;
            day = dayList[month - 1];
        }


    }

    if (month === 0) {
        day = dayList[11];
        month = 12;
        year--;
    }


    return {
        day: day,
        month: month,
        year: year,
    };

}