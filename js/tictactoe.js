var oneClick = 0;

$('.box').click(function() {
  var tally = oneClick ++;
  if ( tally % 2 === 0 ) {
    if ( $(this).children('.o').hasClass('active')){
      oneClick --;
    } else{
      $(this).children('.x').addClass('active');
    }
  } else {
    if ( $(this).children('.x').hasClass('active')){
      oneClick --;
    } else{
      $(this).children('.o').addClass('active');
    }
  }

  var xChild1 = $('.box:nth-child(1)').children('.x').hasClass('active'),
      oChild1 = $('.box:nth-child(1)').children('.o').hasClass('active'),
      xChild2 = $('.box:nth-child(2)').children('.x').hasClass('active'),
      oChild2 = $('.box:nth-child(2)').children('.o').hasClass('active'),
      xChild3 = $('.box:nth-child(3)').children('.x').hasClass('active'),
      oChild3 = $('.box:nth-child(3)').children('.o').hasClass('active'),
      xChild4 = $('.box:nth-child(4)').children('.x').hasClass('active'),
      oChild4 = $('.box:nth-child(4)').children('.o').hasClass('active'),
      xChild5 = $('.box:nth-child(5)').children('.x').hasClass('active'),
      oChild5 = $('.box:nth-child(5)').children('.o').hasClass('active'),
      xChild6 = $('.box:nth-child(6)').children('.x').hasClass('active'),
      oChild6 = $('.box:nth-child(6)').children('.o').hasClass('active'),
      xChild7 = $('.box:nth-child(7)').children('.x').hasClass('active'),
      oChild7 = $('.box:nth-child(7)').children('.o').hasClass('active'),
      xChild8 = $('.box:nth-child(8)').children('.x').hasClass('active'),
      oChild8 = $('.box:nth-child(8)').children('.o').hasClass('active'),
      xChild9 = $('.box:nth-child(9)').children('.x').hasClass('active'),
      oChild9 = $('.box:nth-child(9)').children('.o').hasClass('active');

  if(  xChild1 && xChild2 && xChild3 ){

    $('.top-hor').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild1 && oChild2 && oChild3 ){
    $('.top-hor').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild4 && xChild5 && xChild6 ){
    $('.mid-hor').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild4 && oChild5 && oChild6 ){
    $('.mid-hor').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild7 && xChild8 && xChild9 ){
    $('.bottom-hor').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild7 && oChild8 && oChild9 ){
    $('.mid-hor').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild1 && xChild4 && xChild7 ){
    $('.left-vert').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild1 && oChild4 && oChild7 ){
    $('.left-vert').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild2 && xChild5 && xChild8 ){
    $('.mid-vert').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild2 && oChild5 && oChild8 ){
    $('.mid-vert').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild3 && xChild6 && xChild9 ){
    $('.right-vert').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild3 && oChild6 && oChild9 ){
    $('.right-vert').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild1 && xChild5 && xChild9 ){
    $('.ltr-diag').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild1 && oChild5 && oChild9 ){
    $('.ltr-diag').addClass('active');
    $('.o-wins').addClass('active');
  } else if(  xChild3 && xChild5 && xChild7 ){
    $('.rtl-diag').addClass('active');
    $('.x-wins').addClass('active');
  } else if(  oChild3 && oChild5 && oChild7 ){
    $('.rtl-diag').addClass('active');
    $('.o-wins').addClass('active');
  }
});

$('.js-wins, .reset').on('click', function(){
  $('.js-wins').removeClass('active');
  $('.x').removeClass('active');
  $('.o').removeClass('active');
  $('.red-line').removeClass('active');
  oneClick = 0;
});
