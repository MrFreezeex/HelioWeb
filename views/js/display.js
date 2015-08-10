/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of the repository.
 * Copyright (C) 2015 by OUTHENIN-CHALANDRE Arthur. All right reserved.
 */
$(document).ready(function() {

	var presentation = $("#containerInfo").offset().top;
	var build = $("#slider").offset().top;
	var contact = $("#contact").offset().top;

	var slideNbr = $('#sliderContainer > .slide').length;
	var slidePos = 0;

	var presentationHeight = $('#presentation').height() + 30;
	$('.slideChevron').css('top', presentationHeight + 250);

	$(window).resize(function() {
		presentation = $("#containerInfo").offset().top;
		build = $("#slider").offset().top;

		var presentationHeight = $('#presentation').height() + 30;
		$('.slideChevron').css('top', presentationHeight + 250);
	});
	$('.scrollTo').click( function(event) {
		event.preventDefault();
		var page = $(this).attr('href');
		var speed = 750;
		$('html, body').animate( { scrollTop: $(page).offset().top - 52 }, speed );
		return false;
	});
	function toScrollNav() {
		$("nav").addClass( "navbar-fixed" );
		$("nav").addClass( "navbar-scroll", 500, "swing" );
	}
	function toDefaultNav() {
		$("nav").removeClass( "navbar-fixed" );
		$("nav").removeClass( "navbar-scroll", 500, "swing" );
	}

	function clearActive () {
		$('.active').removeClass('active');
	}
	function presentationActive () {
		$('.active').removeClass('active');
		$('#presentationNav').addClass('active');
	}	
	function buildActive () {
		$(".active").removeClass('active');
		$('#buildNav').addClass('active');
	}	
	function contactActive () {
		$('.active').removeClass('active');
		$('#contactNav').addClass('active');
	}

var slideReady = true;
function slide() {
	if (slideReady) {
		slideReady = false;

		if (slidePos < slideNbr - 1) {
			slidePos++;
			$('#sliderContainer').animate({right:'+=100%'}, 1000, 'swing', function() {
				slideReady = true;
				slideTimeout = setTimeout(slide, 12000);
			});
		} else {
			slidePos = 0;
			$('#sliderContainer').animate({right:'0'}, 1000, 'swing', function() {
				slideReady = true;
				slideTimeout = setTimeout(slide, 12000);
			});
		}
	}
}
var slideTimeout = setTimeout(slide, 12000);

	$(window).scroll(function() {
		// console.log($(window).scrollTop())
		if ($(window).scrollTop() == 0 && $('nav').hasClass('navbar-fixed')) {
			toDefaultNav();
		} else if ($(window).scrollTop() != 0 && !$('nav').hasClass('navbar-fixed')) {
			toScrollNav();
		}

		if ($(window).scrollTop() >= presentation - 120 && $(window).scrollTop() < build - 120 && !$('#presentationNav').hasClass('active')) {
			presentationActive();
		} else if ($(window).scrollTop() >= build - 120 && $(window).scrollTop() <= contact - 350 && !$('#buildNav').hasClass('active')) {
			buildActive();
		} else if ($(window).scrollTop() >= contact - 350 && !$('#contactNav').hasClass('active')) {
			contactActive();
		} else if ($(window).scrollTop() < presentation - 120) {
			clearActive();
		}
	});

	$('#containerInfo').on('click', '.slideChevron', function (event) {
		if (slideReady) {
			clearTimeout(slideTimeout);
			slideReady = false;
			if ($(this).hasClass('slideChevronLeft')) {
				if (slidePos != 0) {
					slidePos--;
					$('#sliderContainer').animate({right:'-=100%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				} else {
					slidePos = slideNbr - 1;
					$('#sliderContainer').animate({right: (slideNbr - 1)*100+'%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				}
			} else {
				if (slidePos < slideNbr - 1) {
					slidePos++;
					$('#sliderContainer').animate({right:'+=100%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				} else {
					slidePos = 0;
					$('#sliderContainer').animate({right:'0'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				}
			}
		}
	});
});