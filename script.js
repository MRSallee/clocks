
// Update DOM w/ time
function updateTime(timezone, hoursRaw, hours, minutes, seconds) {
    let pageTitle = document.querySelector('title'),
        timeport = document.querySelector('section.timeport'),
        elemTimezone = timeport.querySelector('h1.timezone'),
        elemHours = timeport.querySelector('span.hours'),
        elemMinutes = timeport.querySelector('span.minutes'),
        elemSeconds = timeport.querySelector('span.seconds');
    
    let percentHours = (hoursRaw / 24) * 100,
        percentMinutes = (minutes / 60) * 100,
        percentSeconds = (seconds / 60) * 100,
        meridiem = hoursRaw > 11 ? 'pm' : 'am';
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
    
    pageTitle.textContent = hours + ':' + minutes + ':' + seconds + ' ' + meridiem + ' - Liveclock Pro';
    timeport.setAttribute('meridiem', meridiem);
}

// Set military time
function setMilitary() {
    let milDefault = 'false',
        milPref = localStorage.getItem('military');
    
    military = milPref ? milPref : milDefault;
    
    let elemTimeport = document.querySelector('section.timeport'),
        elemHours = document.querySelector('span.hours');
    
    elemTimeport.addEventListener('click', function() {
        if (military === 'false') {
            military = 'true';
            localStorage.setItem('military', 'true');
            getTime();
        } else {
            military = 'false';
            localStorage.setItem('military', 'false');
            getTime();
        }
    });
}
setMilitary();

// Get current time values
function getTime() {
    console.clear();
    
    let now = new Date(),
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ').replace('/', ' / '),
        year = now.getFullYear(),
        month = (now.getMonth() + 1) > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
        day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate(),
        date = year + '-' + month + '-' + day,
        hoursRaw = now.getHours(),
        hours = getHours(hoursRaw),
        minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes(),
        seconds = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds(),
        time = hours + ":" + minutes + ":" + seconds;
    
    function getHours(hoursRaw) {
        let meridiem = hoursRaw > 11 ? 'pm' : 'am';
        
        if (military === 'true') {
            hoursFormatted = hoursRaw;
        } else {
            hoursFormatted = hoursRaw > 12 ? hoursRaw - 12 : hoursRaw;
        }
        
        let hoursDisplay = hoursFormatted > 9 ? hoursFormatted : '0' + hoursFormatted;
        
        return hoursDisplay;
    }
    
    console.log(timezone);
    console.log(date);
    console.log(time);
    
    updateTime(timezone, hoursRaw, hours, minutes, seconds)
}
getTime();

setInterval(function() {
    getTime();
}, 1000);


// Display tooltip

function tooltipMilitary() {
    let shownTooltip = localStorage.getItem('tooltip-military'),
        elemTime = document.querySelector('div.time');
    
    if (shownTooltip) {
        console.log('Already shown');
    } else {
        elemTime.classList.add('tooltip');
        localStorage.setItem('tooltip-military', 'shown');
    }
    
}
setTimeout(function() {
    tooltipMilitary();
}, 3000);