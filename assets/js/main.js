
$(document).ready(function () {
  var list_qua = [
    { src: "assets/images/themluot.png", id: "1", name_item: "+1 lượt" },
    { src: "assets/images/10k.png", id: "2", name_item: "10k" },
    { src: "assets/images/1dolar.png", id: "3", name_item: "2$" },
    { src: "assets/images/200k.png", id: "4", name_item: "200k" },
    { src: "assets/images/20k.png", id: "5", name_item: "20k" },
    { src: "assets/images/1k.png", id: "6", name_item: "1k" },
    { src: "assets/images/50k.png", id: "7", name_item: "50k" },
    { src: "assets/images/100k.png", id: "8", name_item: "100k" },
    { src: "assets/images/2dolar.png", id: "9", name_item: "1$" },
    { src: "assets/images/2k.png", id: "10", name_item: "2k" },
    { src: "assets/images/5k.png", id: "11", name_item: "5k" },
    { src: "assets/images/500k.png", id: "12", name_item: "500k" }
  ];


  var wheel = $('#wheel');
  var button = $('#button');
  var number_item = list_qua.length;
  var number_circle = 10; // 5 circle
  var time_spin = 10000; // 5s

  var degree_stop = 0;
  var time_click = 0;
  var is_start = 1;
  var time_delay_click_again = 2000;
  var time_show_info = 1000;

  var pos_pause = 0;
  var pos_now = 1;

  var img_src = '';
  var name_item = '';

  var timeCheckItem;
  var wheel_first = 1;

  // degree every item
  var degree_item = 360 / number_item;
  var add_first = degree_item / 2;
  // console.log(add_first);

  var add_random = 0;
  var add_random_save = 0;

  function setItem(item) {
    pos_pause = item;
  }
  function timeClickAgain() {
    setTimeout(function () {
      is_start = 1;
    }, time_delay_click_again); // time_delay_click_again sau cho click lai
  }

  function showqua(item_pos) {
    for (var loop = 1; loop <= list_qua.length; loop++) {
      img_src = list_qua[item_pos - 1]['src'];
      name_item = list_qua[item_pos - 1]['name_item'];
    }
  }

  function spin_wheel() {
    var adsave = add_random;
    console.log("add-save-first" + add_random_save);
    //so 1
    //   l0 = 0 = (0 * 1) * 15
    //   l1 = +15 = (1 * 1) * 15
    //   l2 = +30 = (2 * 1) * 15
    //   l3 = +45 = = (3 * 1) * 15



    var degree_add;
    if (pos_now == pos_pause) {
      degree_add = number_circle * 360;
    } else {
      // (vi tri moi - vi tri cu) * goc moi item
      degree_add = (number_circle * 360) - ((pos_pause - pos_now) * degree_item);
    }
    pos_now = pos_pause;

    // check wheel first spin
    if (wheel_first == 1) {
      degree_stop = degree_stop + degree_add - add_first - add_random;
      wheel_first = 2;
    } else {
      degree_stop = degree_stop + degree_add + add_random_save - add_random;
    }

    // check set so
    if (pos_pause == 0) {
      quaydeu();
    } else {
      quaystop(degree_stop, time_spin);
      add_random_save = add_random;
    }
    console.log('pos_now: ' + pos_now);
    console.log('pos_pause: ' + pos_pause);
  }





  function quaydeu() {
    var degquaydieu = 90000;
    var timquaydieu = 50;

    // $('#wheel').addClass('spindieu');
    $('#wheel').css({
      'transition': "transform 6000ms cubic-bezier(.15,.17,.99,.96)"
    });
  }

  function quaystop(degstop, time) {
    $('#wheel').css({
      "transform": "rotate(" + degstop + "deg)",
      "transition": "transform " + time + "ms cubic-bezier(1, .1, .1, 1)",
      "-ms-transform": "transform " + time + "ms cubic-bezier(1, .1, .1, 1)",
      "-webkit-transform": "transform " + time + "ms cubic-bezier(1, .1, .1, 1)"
    });
  }


  function random(a, b) {
    return Math.floor((Math.random() * b) + a);
  }

  // random so am
  function randomAm(a, b) {
    return Math.floor((Math.random() * (2 * a)) - b);
  }

  function spinHasItem(itemhas) {
    if (itemhas <= 0) {
      setTimeout(function () {
        spinHasItem();
      }, 10);
    }

  }


  // Detect End animation
  function whichTransitionEvent() {
    var t,
      el = document.createElement("fakeelement");

    var transitions = {
      "transition": "transitionend",
      "OTransition": "oTransitionEnd",
      "MozTransition": "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();

  $('#button').on('click', function () {
    var number_random = random(1, 8);
    add_random = randomAm(Math.round(add_first - 1), Math.round(add_first - 1));

    console.log('add_random' + add_random);

    if (is_start) {
      is_start = 0;
      setItem(number_random);
      setTimeout(function () {
        spin_wheel();
        // detect end animation
        $(this).one(transitionEvent,
          function (event) {
            // alert("The transition has ended!");
            timeClickAgain();
            showqua(pos_now);
            console.log(img_src + '-' + name_item);
          });
      }, 5);

      

      // setTimeout(function () {
      //  timeClickAgain();
      //  if (pos_pause != 0) {
      //    showqua(pos_now);
      //    console.log(img_src + '-' + name_item);
      //  }
      // }, time_spin + time_show_info);

    }
  });


  $('#button2').click(function () {
    setItem(2);
  });

  $('.rotate-circle').hover(function(){
    $(this).closest('.spin-wheel-main').find('.img-muiten').toggleClass('img-muiten-ani');
  });

  
});