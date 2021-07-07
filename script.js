
function updateTime(timezone, hours, minutes, seconds) {
    let timeport = document.querySelector('section.timeport'),
        elemTimezone = timeport.querySelector('h1.timezone'),
        elemHours = timeport.querySelector('span.hours'),
        elemMinutes = timeport.querySelector('span.minutes'),
        elemSeconds = timeport.querySelector('span.seconds');
    
    let percentHours = (hours / 24) * 100,
        percentMinutes = (minutes / 60) * 100,
        percentSeconds = (seconds / 60) * 100,
        elemHoursGauge = timeport.querySelector('span.hours-gauge span'),
        elemMinutesGauge = timeport.querySelector('span.minutes-gauge span'),
        elemSecondsGauge = timeport.querySelector('span.seconds-gauge span');
    
    elemTimezone.textContent = timezone;
    elemHours.textContent = hours;
    elemMinutes.textContent = minutes;
    elemSeconds.textContent = seconds;
    
    elemHoursGauge.setAttribute('style', 'width: ' + percentHours + '%;')
    elemMinutesGauge.setAttribute('style', 'width: ' + percentMinutes + '%;')
    elemSecondsGauge.setAttribute('style', 'width: ' + percentSeconds + '%;')
}

function getTime() {
    console.clear();
    
    let now = new Date(),
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ').replace('/', ' / '),
        year = now.getFullYear(),
        month = (now.getMonth() + 1) > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
        day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate(),
        date = year + '-' + month + '-' + day,
        hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours(),
        minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes(),
        seconds = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds(),
        time = hours + ":" + minutes + ":" + seconds;
    
    console.log(timezone);
    console.log(date);
    console.log(time);
    
    updateTime(timezone, hours, minutes, seconds)
}
getTime();

setInterval(function() {
    getTime();
}, 1000);
