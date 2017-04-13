$(document).ready(function() {
  // Set the time on the header if it's displayed
  if ($(".top-bar .time").length > 0) {
    $(".time").html(displayTime());
  }

  // Setup the background
  // setupBG();

  // Set the calendar icon
  $(".icon.calendar .weekday").html(displayWeekday());
  $(".icon.calendar .date").html(displayDate());

  // Set the clock icon
  rotateClock();
  setInterval(function() {
    rotateClock();
  },60000);

  // Rotate the degrees in Safari
  rotateDegrees($(".iphone .screen .icon.safari .compass .degrees hr"));
  // Rotate the degrees in the Compass
  rotateDegrees($(".iphone .screen .icon.compass .degrees hr"));

  $('div.home').iosParallax({
    movementFactor: 50
  });
});





// ***************
// Functions
// ***************

function displayTime() {
  var str = "";

  var currentTime = new Date();
  var hours 			= currentTime.getHours();
  var minutes 		= currentTime.getMinutes();
  var extra				= "";

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if(hours > 11){
    extra = "PM"
  } else {
    extra = "AM"
  }
  hours = hours%12;
  if (hours < 1) {
    hours = 12;
  }
  str = hours + ":" + minutes + " " + extra;
  return str;
}

function setupBG() {
  var maxTop 	= $(".iphone .screen .home .bg").height();
  var maxLeft = $(".iphone .screen .home .bg").width();
  for(i=0;i<25;i++){
    $(".iphone .screen .home .bg").prepend("<span></span>");
    var top 	= Math.floor((Math.random()*maxTop)+1);
    var left 	= Math.floor((Math.random()*maxLeft)+1);
    $(".iphone .screen .home .bg span:first").css('top', top+'px');
    $(".iphone .screen .home .bg span:first").css('left', left+'px');
  }
  $(".iphone .screen .home .bg span").fadeIn(2000);
  moveBG();
}

function moveBG() {
  setInterval(function() {
    $(".iphone .screen .home .bg span:odd").each(function() {
      moveBGSpan($(this));
    });
  },2000);
  setInterval(function() {
    $(".iphone .screen .home .bg span:even").each(function() {
      moveBGSpan($(this));
    });
  },1000);
}

function moveBGSpan(span, mul) {
  var height 	= $(".iphone .screen .home .bg").height();
  var width 	= $(".iphone .screen .home .bg").width();

  var top 	= $(span).position().top + (10-Math.floor(Math.random()*30));
  var left 	= $(span).position().left + (10-Math.floor(Math.random()*30));
  if (top > height) {
    top = (height-5);
  } else if (top < 0) {
    top = 5;
  }
  if (left > width) {
    left = (width-5);
  } else if (left < 0) {
    left = 5;
  }

  $(span).animate({
    top: top,
    left: left
  }, 3000);
}

function displayWeekday() {
  var d				= new Date();
  var weekday	= new Array(7);
  weekday[0] 	= "Sunday";
  weekday[1]	= "Monday";
  weekday[2]	= "Tuesday";
  weekday[3]	= "Wednesday";
  weekday[4]	= "Thursday";
  weekday[5]	= "Friday";
  weekday[6]	= "Saturday";

  var n = weekday[d.getDay()];
  return n;
}

function displayDate() {
  var d			= new Date();
  var date 	= d.getDate();
  return date;
}

function rotateClock(set) {
  var currentTime = new Date();
  var hours 			= currentTime.getHours();
  var minutes 		= currentTime.getMinutes();
  var seconds			= currentTime.getSeconds();

  hours = (hours%12) + (minutes/60);

  hDeg = (hours*360)/12;
  mDeg = (minutes*360)/60;
  sDeg = (seconds*360)/60;

  $(".icon.clock .clock").addClass("set");

  doRotate(".icon.clock hr.hour", hDeg);
  doRotate(".icon.clock hr.minute", mDeg);
  doRotate(".icon.clock hr.second", sDeg);

  setTimeout(function() {
    $(".icon.clock .clock").removeClass("set");
    doRotate(".icon.clock hr.second", (sDeg+360));
  }, 1);
}

function rotateDegrees(target) {
  var deg = 0;
  var inc = 360/$(target).length;
  $(target).each(function() {
    doRotate($(this), deg);
    deg += inc;
  });
}


function doRotate(target, deg) {
  $(target).css({
    '-moz-transform':'rotate('+deg+'deg)',
    '-webkit-transform':'rotate('+deg+'deg)',
    '-o-transform':'rotate('+deg+'deg)',
    '-ms-transform':'rotate('+deg+'deg)',
    'transform': 'rotate('+deg+'deg)'
  });
}


