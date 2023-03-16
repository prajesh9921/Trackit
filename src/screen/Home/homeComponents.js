
function getTodayDate(setTodayDate) {
    var dateObj = new Date();
    var month = dateObj.toLocaleString('default', {month: 'long'});
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const currentdate = month + ' ' + day + ',' + year;
    setTodayDate(currentdate.toString());
}

export {getTodayDate}
