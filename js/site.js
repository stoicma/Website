"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});


let bookReviews = {
    "Atomic Habits": "It really helped me nail down my routines! Main takeaways: try to stack habits; they are always part of a system; identity > outcome; make it easy to follow good habits",
    "She who became the sun": "Amazing fantasy book about a little girl that is forced to change identity.",
    // Add more books and their reviews here
};

/* Showing and then removing hearts after a button is clicked */

document.addEventListener('DOMContentLoaded', function() {
		// Get the modal
	var modal = document.getElementById("bookReviewModal");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// When the user clicks on the book, open the modal
	document.querySelectorAll('.book-images').forEach(book => {
		book.onclick = function() {
			const bookId = this.getAttribute("data-book-id");
			const reviewText = bookReviews[bookId]; // Retrieve review using bookId
			document.getElementById("bookReviewText").innerText = reviewText; // Set the review text
			modal.style.display = "block";
		}
	})
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	modal.style.display = "none";
		}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	}
});

document.getElementById("button-love").addEventListener("click", function() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
	console.log(heart);
    heart.style.left = Math.random() * 100 + "vw";
	heart.style.top = Math.random()* 100 + "vh";
    heart.style.animationDuration = Math.random() * 2 + 1 + "s";
    document.body.appendChild(heart); 
	// Remove heart after animation completes
	setTimeout(() => {
		heart.remove();
	}, 2000); // Adjust time to match the longest possible animation duration
});

/* Showing and then removing books after a button is clicked */

document.getElementById("button-books").addEventListener("click", function() {
    const book = document.createElement("div");
    book.classList.add("book");
	console.log(book);
    book.style.left = Math.random() * 100 + "vw";
	book.style.top = Math.random()* 100 + "vh";
    book.style.animationDuration = Math.random() * 2 + 1 + "s";
    document.body.appendChild(book); 
	// Remove book after animation completes
	setTimeout(() => {
		book.remove();
	}, 2000); // Adjust time to match the longest possible animation duration
});





