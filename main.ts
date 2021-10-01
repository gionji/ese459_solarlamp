function big_light_on () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        . . . . .
        `)
}
function small_light_on () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
}
function EVT_night () {
    if (status == NIGHT) {
        status = NIGHT
    } else if (status == DAY) {
        small_light_off()
        status = NIGHT
    } else {
    	
    }
}
function timer_reset () {
    timer_value = 0
    is_timer_on = 0
}
function EVT_timer_end () {
    if (status == NIGHT) {
        big_light_off()
        small_light_on()
        timer_stop()
        status = NIGHT
    } else if (status == DAY) {
        error()
        status = DAY
    } else {
    	
    }
}
function small_light_off () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function update_timer () {
    if (is_timer_on == 1) {
        is_timer_on += 1
        if (timer_value == timer_max) {
            // turn the TIMER off and reset it's value to 0
            is_timer_on = 0
            timer_value = 0
            EVT_timer_end()
        }
    }
}
function check_presence () {
    if (Environment.PIR(DigitalPin.P0)) {
        EVT_presence_detected()
    }
}
function big_light_off () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function timer_stop () {
    is_timer_on = timer_max
}
function EVT_daylight () {
    if (status == NIGHT) {
        big_light_off()
        small_light_off()
        timer_stop()
        status = DAY
    } else if (status == DAY) {
        status = DAY
    } else {
    	
    }
}
function error () {
	
}
function check_external_light () {
    if (Environment.ReadLightIntensity(AnalogPin.P1) > 100) {
        EVT_daylight()
    } else {
        EVT_night()
    }
}
function EVT_presence_detected () {
    if (status == NIGHT) {
        small_light_off()
        big_light_on()
        timer_reset()
        status = NIGHT
    } else if (status == DAY) {
        status = DAY
    } else {
    	
    }
}
let status = 0
let is_timer_on = 0
let timer_value = 0
let DAY = 0
let NIGHT = 0
let timer_max = 0
timer_max = 10
NIGHT = 0
DAY = 1
timer_value = 0
is_timer_on = 0
// 0 = NIGHT
// 1 = DAY
status = DAY
basic.forever(function () {
    update_timer()
    check_external_light()
    check_presence()
    basic.pause(1000)
})
