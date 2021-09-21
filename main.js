$(document).ready(function () {
  function fillField() {
      let check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let position;
      for (let i = 0; i < 16; i++) {
          $('#gameStart>.game__cell').attr('value', 'fill');
          $('#gameEnd>.game__cell').removeAttr('value');
          do {
              position = Math.round(Math.random() * 15);
          }
          while (check[position])
          $(`.game__item:eq(${i})`).attr('value', `${position + 1}`);
          $(`#gameStart>.game__cell:eq(${i})`).append($(`.game__item:eq(${i})`));
          check[position] = 1;

      }
      $('.game__item').css('background-image', "url('./img/logo2.png')");
  }

  fillField();

  let count = 0;
  let timer;
  let checkCell = 1;

  $('.start').click(function () {
      $('.min').html(1);
      $('.second1').html('00');
      $('.text').html(`You still have time, you sure? 0<span class="min">1</span>:<span class="second1">00</span>`);
      $('.check2').css('display', 'block')
      $('.buttons2').css('display', 'flex')
      count = 0;
      $('.start').prop('disabled', true);
      $('.check').prop('disabled', false);
      $('.game__cell').sortable({
          connectWith: '.game__cell',
          containment: '.game',
          cursor: "move",
          scroll: false,
          receive: function (event, ui) {
              if ($(this).attr('value') == 'fill') {
                  checkCell = 1;
              }
              else {
                  $(this).attr('value', 'fill');
                  checkCell = 0;
              }
          },
          stop: function (event, ui) {
              if (checkCell) {
                  $(this).sortable('cancel');
              }
              else {
                  $(this).removeAttr('value', 'fill');
              }
          },
      })

      timer = setInterval(MyTimer, 1000);
      function MyTimer() {
          let minText = $('.min').html();
          if ($('.min').html() == 1) {
            $('.min').html(minText - 1)
          }

          if ($('.min').html() == 0) { 
              $('.second1').html(59 - count);
              if ($('.min').html() == 00 && $('.second1').html() == 00) {
                  clearInterval(timer);
              }
          }

          if ($('.min').html() == 00 && $('.second1').html() == 00) {
              $('.modalContianer').show();
              $('.modalContianer').animate({
                  top: '20px',
                  css: $('.modalContianer').css({
                      backgroundColor: 'red'
                  })
              }, 1000)
              $('.text').text('it is a pity, but you lost!');
              $('.blackScreen').show()
          }

          count++;

          $('.newGame').click(function () {
              location.reload();
          })
      }
  })

  $('.close').click(function () {
      $('.modalContianer').animate({
          top: '-160px'
      }, 1000, function () {
          $('.modalContianer').css('display', 'none');
          $('.blackScreen').css('display', 'none')
      })
  })

  $('.check').click(function () {
      $('.modalContianer').css('display', 'block');
      $('.blackScreen').css('display', 'block')
      $('.modalContianer').animate({
          top: '20px',
      }, 1000)

  })

  $('.check2').click(function () {
      gameCheck()
  })

  function gameCheck() {
      let checkResult = 0;
      for (let i = 0; i < 15; i++) {
          if ($(`#gameEnd>.game__cell:eq(${i})>.game__item`).attr('value') == i + 1) {
              checkResult++;
          } else {
              checkResult += 0;
          }
      }
      if (checkResult == 15) {
          $('.start').prop('disabled', false);
          $('.text').text('Whooho, well done, you did it!');
          $('.check2').css('display', 'none');
          clearInterval(timer);
      } else {
          $('.start').prop('disabled', false);
          $('.text').text('It is a pity, but you lost!');
          $('.check2').css('display', 'none')
          clearInterval(timer);
      }
  }
})