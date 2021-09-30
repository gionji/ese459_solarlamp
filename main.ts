input.onPinPressed(TouchPin.P0, function () {
    EVT_presence_detected()
})
function big_light_on () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        . . . . .
        `)
}
function EVT_dayligh () {
    if (status == 0) {
        status = 0
    } else if (status == 1) {
        status = 0
    } else if (status == 2) {
        status = 0
    } else {
    	
    }
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
    if (status == 0) {
        status = 0
    } else if (status == 1) {
        status = 0
    } else if (status == 2) {
        status = 0
    } else {
    	
    }
}
function timer_reset () {
    timer_value = 0
    is_timer_on = 0
}
function EVT_timer_end () {
    if (status == 0) {
        error()
        status = 0
    } else if (status == 1) {
        error()
        status = 1
    } else if (status == 2) {
        big_light_off()
        small_light_on()
        timer_stop()
        status = 1
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
function error () {
	
}
function check_external_light () {
    if (Environment.ReadLightIntensity(AnalogPin.P1) > 100) {
        EVT_dayligh()
    } else {
        EVT_night()
    }
}
function EVT_presence_detected () {
    if (status == 0) {
        status = 0
    } else if (status == 1) {
        status = 0
    } else if (status == 2) {
        status = 0
    } else {
    	
    }
}
let status = 0
let is_timer_on = 0
let timer_value = 0
let timer_max = 0
timer_max = 10
timer_value = 0
is_timer_on = 0
// 0 = DAYLIGHT
// 1 = NIGHT OFF
// 2 = NIGHT ON
status = 0
basic.forever(function () {
    update_timer()
    check_external_light()
    check_presence()
    basic.pause(1000)
})
