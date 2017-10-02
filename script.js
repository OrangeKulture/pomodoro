$(document).ready(function() {
  var buzz = $("#buzzer")[0];
  var timeS = $("#timeSound")[0];
  var startS = $("#startSound")[0];
  var stopS = $("#stopSound")[0];
  var resetS = $("#resetSound")[0];

  // ---------- Pomodoro Clock logic ---------- \\

  var min = 5;
  var timeSelect = min;
  var minTimer = min;
  var timerFlag = 0;
  var startFlag = 0;
  var secs = "00";

  $(".minutes").text(min);
  $(".seconds").text(secs);

  $(".time").on("click", function() {
    timeS.play();
    if (timerFlag === 0) {
      timeSelect = this.id;
      $(".minutes").text(timeSelect);
      min = timeSelect;
    }
  });

  $("#start").on("click", function() {
    startS.play();
    timerFlag = 1;
    if (startFlag === 0) {
      startFlag = 1;
      var time = setInterval(function() {
        sec = $(".seconds").text();
        if (sec <= 10) {
          $(".seconds").text("0" + (sec - 1));
        } else {
          $(".seconds").text(sec - 1);
        }
        if (sec == "00") {
          $(".seconds").text(59);
          min -= 1;
          minTimer -= 1;
          $(".minutes").text(min);
        }
        if (minTimer < 0) {
          clearInterval(time);
          $(".minutes").text(0);
          $(".seconds").text(secs);
          buzz.play();
          min = timeSelect;
          if($('#check').prop('checked')){
            $('#breakMod').modal('show');
            brkStr();
            
          }
        }
      }, 1000);
    }

    $("#reset").on("click", function() {
      resetS.play();
      clearInterval(time);
      $(".seconds").text("00");
      min = timeSelect;
      minTimer = min;
      $(".minutes").text(min);
      timerFlag = 0;
      startFlag = 0;
    });

    $("#stop").on("click", function() {
      stopS.play();
      clearInterval(time);
      startFlag = 0;
    });
  }); // end start button

  // ---------- Break Clock logic ---------- \\

  var breakMin = 5;
  var breakOrig = breakMin;
  var breakTimer = breakMin;
  var breakSec = "00";
  var breakFlag = 0;
  var breakSelect = 0;

  $(".breakMins").text(breakMin);
  $(".breakSecs").text("00");

  // Break Time Select

  $(".break").on("click", function() {
    timeS.play();
    if (breakSelect === 0) {
      var ind = this.id;
      ind = Number(ind.slice(0));
      breakMin = ind;
      $(".breakOut").text(breakMin);
    }
  });
 
    var brkStr =  function() {
    startS.play();
    breakSelect = 1;
    if (breakFlag === 0) {
      breakFlag = 1;
      var breakTime = setInterval(function() {
        var sec = $(".breakSecs").text();
        if (sec <= 10) {
          $(".breakSecs").text("0" + (sec - 1));
        } else {
          $(".breakSecs").text(sec - 1);
        }
        if (sec == "00") {
          $(".breakSecs").text(59);
          breakMin -= 1;
          breakTimer -= 1;
          $(".breakMins").text(breakMin);
        }
        console.log(breakTimer);
        if (breakTimer < 0) {
          clearInterval(breakTime);
          $(".breakMins").text(0);
          $(".breakSecs").text("00");
        }
      }, 1000);
    }

     $('.modClose').on("click", function() {
      clearInterval(breakTime);
      $(".breakSecs").text("00");
      breakMin = breakOrig;
      $(".breakMins").text(breakMin);
      breakSelect = 0;
      breakFlag = 0;
    });

    $("#breakStop").on("click", function() {
      stopS.play();
      clearInterval(breakTime);
      breakFlag = 0;
    });
  };
  $("#breakStart").on("click", brkStr);
  
});
