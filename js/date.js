var timeZoneOffset = (new Date()).getTimezoneOffset() * 60000; 
var myDate = (new Date(Date.now() - timeZoneOffset)).toISOString();

