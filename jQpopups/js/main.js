/* Всё о всплывающих (модальных) окнах */
$(function () {
	$('button[data-popup="true"]').on('click', function () {
		$('.fruit-name').text($(this).attr('data-fruit'));
		$('.overlay').show();
		$('.popup').toggleClass('popup_active');
		$('h4').after('<img class="popup-img" src="'+$('img[data-fruit="'+$(this).attr('data-fruit')+'"]').attr('src')+'" width="300px">')
	});
	$('.close-btn').click(function(){
		$('.overlay').hide();
		$('.popup').toggleClass('popup_active');
		$('.popup-img').remove();
	})
});

// Самый простой вариант всплывающего окна
/*$(document).ready(function() {
 	var modal = $('.popup'),
 					overlay = $('.overlay'),
 					link = $('button[data-popup="true"]'),
 					close = $('.close-btn');
 	link.on('click', function () {
 		overlay.show();
 		modal.show();
 	});
 	close.click(function() {
 		overlay.hide();
 		modal.hide();
 	});
 });	*/ 


// Красивое появляение окна
/*$(document).ready(function() {
 	var modal = $('.popup'),
 					overlay = $('.overlay'),
 					link = $('button[data-popup="true"]'),
 					close = $('.close-btn');

 	close.click(function() {
 		modal.toggleClass('popup_active');
 		overlay.hide();
 	});
 	link.on('click', function () {
 		console.log(modal);
 		overlay.show();
 		modal.toggleClass('popup_active');
 	});
 });*/	 

// Много кнопок - одно окно
/* $(document).ready(function() {
 	var modal = $('.popup'),
 					overlay = $('.overlay'),
 					link = $('button[data-popup="true"]'),
 					close = $('.close-btn'),
 					fruitName = $('.fruit-name');

 	close.click(function() {
 		modal.toggleClass('popup_active');
 		overlay.hide();
 	});
 	link.on('click', function () {
 		fruitName.text($(this).attr('data-fruit'));
 		overlay.show();
 		modal.toggleClass('popup_active');
 	});
 }); */
















