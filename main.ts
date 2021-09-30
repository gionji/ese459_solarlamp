input.onPinPressed(TouchPin.P0, function () {
	
})
function big_light_on () {
	
}
function EVT_dayligh () {
	
}
function small_light_on () {
	
}
function EVT_night () {
	
}
function timer_reset () {
	
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
	
}
function check_presence () {
	
}
function big_light_off () {
	
}
function timer_stop () {
	
}
function error () {
	
}
function check_external_light () {
	
}
function EVT_presence_detected () {
	
}
let status = 0
let timer_max = 10
let timer_value = 0
let is_timer_on = 0
// 0 = DAYLIGHT
// 1 = NIGHT OFF
// 2 = NIGHT ON
status = 0
basic.forever(function () {
    if (is_timer_on == 1) {
        is_timer_on += 1
        if (timer_value == timer_max) {
            // turn the TIMER off and reset it's value to 0
            is_timer_on = 0
            timer_value = 0
            EVT_timer_end()
        }
    }
    basic.pause(1000)
})
