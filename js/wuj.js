/*jshint devel:true */
var windowWidth;
var windowHeight;

$(document).ready(function(){
	windowWidth = $( window ).width();
	windowHeight = $( window ).height();

	//var mobileQuery = 600;
	//jQuery.fn.reverse = [].reverse;
	//listItems.reverse().each(function(){ ... });

// toggle menu
var menuBtn = $('.menu-btn');
var navList = $('#nav-list');
var listItems = navList.find('li');
var bar = $('#indicator-line');
var sectionTitle = $('.section-title');
bar.velocity({scaleX:0},{duration:0});
sectionTitle.velocity({opacity:0, left:-10},{duration:0});
listItems.each(function(){
	$(this).velocity({left:-50,opacity:0},{duration:0, visibility: 'hidden'});
});

menuBtn.data({active:false});
bar.data({active:false});

function toggleBar(){
	setTimeout(function(){
		if ( bar.data('active') === false){
			bar.velocity({scaleX:1},{duration:500});
			setTimeout(function(){
				sectionTitle.velocity({opacity:1, left: 0},{duration:500});
			},500);
			bar.data({active:true});
		} else{
			bar.velocity({scaleX:0},{duration:500});
			setTimeout(function(){
				sectionTitle.velocity({opacity:0, left: -10},{duration:500});
			},500);
			bar.data({active:false});
		}
	},500);
}


menuBtn.click(function(event) {
	event.preventDefault();
	if (menuBtn.data('active') === false){
		toggleBar();
		listItems.each(function(index){
			$(this).velocity({left:0,opacity:1},{delay: index * 100, duration:500, visibility: 'visible'});
		});
		menuBtn.toggleClass('active-nav');
		menuBtn.data({active:true});
	} else{
		toggleBar();
		listItems.each(function(index){
			$(this).velocity({left:-50,opacity:0},{delay: index * 100, duration:500, visibility: 'hidden'});
		});
		menuBtn.toggleClass('active-nav');
		menuBtn.data({active:false});

	}

});




// scroll up & waypoints
// var scrollArrow = $('.up-arrow');
// var toggleArrow = new Waypoint({
//   element: document.getElementById('scroll-trigger'),
//   handler: function(direction) {
//     console.log(direction);
//     if (direction === "up"){
//     	scrollArrow.velocity({scaleX:0.1, scaleY:0.1, opacity:0},{duration:300});
// 		scrollArrow.data.visible = false;
//     } else {
//     	scrollArrow.velocity({scaleX:1, scaleY:1, opacity:1},{duration:300});
// 		scrollArrow.data.visible = true;
//     }
//   }
// });
$('.up-arrow').data({visible:false});
$('.up-arrow').click(function() {
	//var el = $(this);
	$('body').velocity("scroll", {
		duration: 1000,
		complete: function(){
			//el.velocity({scaleX:0.1, scaleY:0.1, opacity:0},{duration:300});
			//el.data.visible = false;
		}
	});
});

// project template
var defaultOpacity = 0.3;
var imageContainer = $('.image-container-col');
var hiddenThumbnail = $('.hidden-li');

function showHiddenListEl(selectedCircle){
	selectedCircle.velocity({width:16},{duration:300, easing: 'easeOutCubic', delay: 200,
		complete: function(){
			hiddenThumbnail.velocity({height: 50, opacity: defaultOpacity, marginBottom: 8},{duration: 500, delay: 100, visibility: 'visible'});
		}
});
}

function changeImage(event){
	var index = event.data.index;
	var thumbnail = event.data.element;
	var listElement = thumbnail.parent();
	var totalThumbnails = event.data.total;
	var thumbnailIndex = 'img/project-img-' + index + '.jpg';
	var selectedCircle = listElement.find('.thumbnail-selected-circle');
	$('.image-thumbnail').each(function(i){
		console.log(i);
		if ($(this).data('active') === true){
			console.log('reset');
			$(this).siblings('.thumbnail-selected-circle').velocity({width:0},{duration:300, easing: 'easeOutCubic', delay: 200});
			$(this).data({active: false});
		}
	});
	listElement.velocity({opacity:1},{duration:500});
	thumbnail.data({active: true});

	// bound thumbnail image
	//bounceEl(listElement, 'left', 10, 100, showHiddenListEl(selectedCircle));
	showHiddenListEl(selectedCircle);

	// display hidden list item
	//hiddenThumbnail.velocity({height: 50, opacity: defaultOpacity, marginBottom: 8},{duration: 500, delay: 100, visibility: 'visible'});
	// change image
	imageContainer.velocity({opacity:0},{duration:500})
	.velocity('reverse',{duration:500, delay: 800,
				begin: function (){
					imageContainer.css({'background-image': 'url(' +thumbnailIndex+ ')'});
					}
				});


}
var imageCount = $('.image-thumbnail').length;
$('.image-thumbnail').each(function(i) {
	var el = $(this);
	var parent = el.parent();
	var info = parent.find('.thumbnail-info');
	el.data({active:false});
	//console.log();
	parent.hover(function() {
		info.velocity("finish");
		info.velocity({left:0, opacity:1},{duration:300});
	}, function() {
		info.velocity({left:-50, opacity:0},{duration:300});
	});
	el.click({element: el, index: i, total: imageCount}, changeImage);
});


// toggle filter


var filterBtn = $('.filter-btn');
var filterList = $('.tag-list');
//filterListHeight = filterList.outerHeight();
//filterList.velocity({height:0},{duration:0});
var tagListItems = filterList.find('li');

function toggleTags(state, callback){
	
	if (state === false){
		$(tagListItems.get()).each(function(i){

			console.log(i);
			if (i !== 7){
				$(this).velocity({opacity:1, left: '0px'},{duration:200, visibility: 'visible', delay: 50 * i});
			} else{
				$(this).velocity({opacity:1, left: '0px'},{easing:[100,8], visibility: 'visible', delay: 70 * i});
			}
		});
		filterBtn.data({ active: true });
	} else {

		$(tagListItems.get().reverse()).each(function(i) {
			if (i !== 7){
				$(this).velocity({opacity:0, left: '-20px'},{duration: 200, visibility: 'hidden', delay: 50 * i});
			} else{
				$(this).velocity({opacity:0, left: '-20px'},{
					duration: 200,
					visibility: 'hidden',
					delay: 60 * i,
					complete: function(){
						callback();
					}
				});
			}

		});
		filterBtn.data({ active: false });
	}


	
}


filterBtn.data({ active : false });
filterBtn.click(function() {
	//var btn = $(this);
	var cross =$ ('#cross');
	var dataState = filterBtn.data('active');
	if (dataState === false){
		filterBtn.velocity({left:5}, {duration:200, loop:1,
			complete: function(){
				cross.velocity({rotateZ: '180deg'},{ duration:500, begin: function(){toggleTags(dataState); } });
			}
		});
	} else{
		toggleTags(dataState, function(){
			filterBtn.velocity({left:-5}, {duration:200, loop:1});
			cross.velocity({rotateZ: '0deg'},{ duration:300});
		});
		//
	}
}); // end of click

// fade-in (projects)
var workList = $('.work-list');
var workItems = $('.work-list figure');

workItems.each(function(i){
	var el = $(this);
	var caption = el.find('figcaption');
	var captionWidth = caption.innerWidth();
	var captionSide;
	var workImg = el.find('.work-img');
	var btn = caption.find('.standard-btn');

	function collapseContent(otherProjects, thisFig){
		otherProjects.each(function(i){
			console.log(i);
			if (i !== 3){
				$(this).velocity({height:0 },{duration: 250, delay: i * 350 });
			} else{
				$(this).velocity({height:0 },{
					duration: 250,
					delay: i * 350,
					complete: function(){
						thisFig.velocity({ top: '-10px' } , {
							duration:100,
							loop: 1,
							complete: function(){
								thisFig.velocity({opacity:0},{
									duration: 500,
									delay: 500,
									complete: function(){
										console.log('new page');
									}
								});
							}
						});
					}
				});
			}
		});
	}
// selection project (click button)
	btn.click(function(){
		var parent = $(this).parents('.work-container');
		var thisFig = $(this).parents('figure');
		var otherProjects = $('.work-list .work-container').not(parent);
		//otherProjects.velocity({opacity:0.3});
		$('body').velocity("scroll", { 
			duration: 600,
			complete: function(){

					// collapse tags
					if (filterBtn.data('active') === true ){
						toggleTags(true);
						setTimeout(function(){
							filterBtn.velocity({left:-5}, {duration:200, loop:1});
							collapseContent(otherProjects,thisFig);
						},800);
					} else {
						collapseContent(otherProjects,thisFig);
					}

				}
			});

		var href = $(this).attr('href');
		console.log(href);
	});

	// fade in
	el.velocity({opacity:1},{
		delay: ( i + 1 ) * 400,
		duration:500,
		complete: function(){
			if (captionSide === "left"){
				caption.velocity({ left: 0 }, { duration: 600, delay: 400 });
			} else{
				caption.velocity({ left: 0 }, { duration: 600, delay: 400 });
			}
		}
	});
	if( el.find(">:first-child").is('figcaption') ){
		caption.velocity({ left:captionWidth },{ duration:0 });
		captionSide = 'left';
		caption.data({ side: 'left' });
		workImg.data({ side: 'right' });
	} else {
		caption.velocity({ left:-captionWidth },{ duration:0 });
		captionSide = 'right';
		caption.data({ side: 'right' });
		workImg.data({ side: 'left' });
	}
});

$('.div').hover(function() {
	/* Stuff to do when the mouse enters the element */
}, function() {
	/* Stuff to do when the mouse leaves the element */
});
// filter
$('.work-list li').each(function(){
	var listEl = $(this);
	var tags = $(this).children('span');
	listEl.data({
		mobile:false,
		proto:false,
		d3:false,
		web:false,
		installation:false,
		framer:false,
		processing:false,
		filtered: false
	});
	$.each( tags, function() {
			//var tagClass = $(this).attr('class');
			if($(this).hasClass('tag-mobile')){ listEl.data('mobile', true); }
			if($(this).hasClass('tag-proto')){ listEl.data('proto', true); }
			if($(this).hasClass('tag-d3')){ listEl.data('d3', true); }
			if($(this).hasClass('tag-web')){ listEl.data('web', true); }
			if($(this).hasClass('tag-installation')){ listEl.data('installation', true); }
			if($(this).hasClass('tag-mobile')){ listEl.data('mobile', true); }
			if($(this).hasClass('tag-framer')){ listEl.data('framer', true); }
			if($(this).hasClass('tag-processing')){ listEl.data('processing', true); }
		});
		//console.log(listEl.data());
	});

function getClassName(str) {
	var className = str.split('-tag ')[1];
	var data = str.split('tag-')[1];
	return [className, data];
}
var landingOpacity = 0.5;
var fadeDuration = 300;

$('#tag-ul li').each(function(){

	$(this).data({active:false});

	$(this).click(function() {
			var spanEl = $(this).find('span'); // tag element span (circles)
			var el = $(this); // tag element
			var classNames = spanEl.attr('class');
			var returnArray = getClassName(classNames);
			var selectedClass = returnArray[0];
			var filterData = returnArray[1];
			//selectedClass = "." + selectedClass;
			var selected = $(".work-list li:has(." + selectedClass + ')'); // WORK LIST
			if ($(this).hasClass('filter-reset')){
				$('.work-list li').velocity({opacity:landingOpacity},{duration:fadeDuration});
			} else {


				if (el.data('active') === false){
					$('.work-list li span').not(selected).velocity({opacity:landingOpacity},{duration:fadeDuration});
					console.log($('.work-list li').not(selected));
					el.toggleClass('active-tag');
					$.each( selected, function() {
						if ( $(this).data('filtered') === false){
							$(this).velocity({opacity:1},{duration:fadeDuration});
							$(this).data.filtered = true;
						} else{
							$(this).velocity({opacity:landingOpacity},{duration:fadeDuration});
							$(this).data.filtered = true;
						}
					});
					el.data({active:true});
				} else {
					el.toggleClass('active-tag');
					$('.work-list li').velocity({opacity:1},{duration:fadeDuration});
					$('.work-list li').data.filtered = true;
					el.data({active:false});

				}
			} // end of reset btn condition statement
			console.log($('.work-list li').data())
			}); // end of click
		}); // end of each


// old filter
// $('#tag-ul li').each(function(){

// 		$(this).data({active:false});

// 		$(this).click(function() {
// 			var spanEl = $(this).find('span'); // tag element span (circles)
// 			var el = $(this); // tag element
// 			var classNames = spanEl.attr('class');
// 			var returnArray = getClassName(classNames);
// 			var selectedClass = returnArray[0];
// 			var filterData = returnArray[1];
// 			selectedClass = "." + selectedClass;
// 			var selected = $(".work-list li:has(" + selectedClass + ')'); // WORK LIST

// 			if ($(this).hasClass('filter-reset')){
// 				$('.work-list li').velocity({opacity:landingOpacity},{duration:fadeDuration});
// 			} else {


// 				if (el.data('active') === false){
// 					el.toggleClass('active-tag');
// 					$.each( selected, function() {
// 						if ( $(this).data('filtered') === false){
// 							$(this).velocity({opacity:1},{duration:fadeDuration});
// 							$(this).data.filtered = true;
// 						} else{
// 							$(this).velocity({opacity:landingOpacity},{duration:fadeDuration});
// 							$(this).data.filtered = true;
// 						}
// 					});
// 					el.data({active:true});
// 				} else {
// 					el.toggleClass('active-tag');
// 					$.each( selected, function() {
// 						if ( $(this).data('filtered') === false){
// 							$(this).velocity({opacity:landingOpacity},{duration:fadeDuration});
// 							$(this).data.filtered = true;
// 						} else{
// 							$(this).velocity({opacity:1},{duration:fadeDuration});
// 							$(this).data.filtered = false;
// 						}
// 					});
// 					el.data({active:false});
// 				}
// 			} // end of reset btn condition statement
// 			}); // end of click
// 		}); // end of each
function bounceEl(el, moveDirection, distance, aLength, callback){
	//console.log(el, direction, distance, aLength);
	//direction.replace('"','_');
	var argLength = arguments.length;
	if (moveDirection === "top"){
		el.velocity({top: distance},{loop: 1, duration: aLength});
	}
	if (moveDirection === "left"){
		if (argLength !== 5){
			el.velocity({left: distance},{loop: 1, duration: aLength});
		} else {
			el.velocity({left: distance},{loop: 1, duration: aLength, complete: callback});
		}
	}
	if (moveDirection === "padding-right"){
		console.log('run');
		el.velocity({paddingRight: distance},{loop: 1, duration: aLength});
	}
}
// giants link
var giantsLink = $('.giants-link');
var picture = $('.profile-pic');
var goBack = $('.profile-back-btn');
picture.data({state:'profile'});
giantsLink.click(function() {
	if (picture.data('state') === 'profile'){
		picture.velocity({opacity:0},{
			duration:500,
			begin: function(){
					bounceEl(giantsLink, "top", -5 , 100);
			},
			complete: function(){
				picture.css({'background':'url(img/giants-yeah.jpg)', 'background-size': 'cover'});
			}
		})
		.velocity({opacity:1},{duration:500,delay:300,
			complete: function(){
				goBack.velocity({left:6},{duration:300, visibility:'visible', easing: 'easeOutCubic' });
			}
		});
		picture.data({state:'giants'});
}
}); // end of click

// change back to profile pic
goBack.click(function() {
	goBack.velocity({left:-30},{duration:300, visibility:'visible', easing: 'easeInCubic',
	complete: function(){
		picture.velocity({opacity:0},{duration:500,
			complete: function(){
				picture.css({'background':'url(img/profile.jpg)', 'background-size': 'cover'});
			}
		}).velocity('reverse', {duration: 500, delay:300,
			complete: function(){
				picture.data({state:'profile'});
			}
		});
		
	}
});
});
// bio btn
$('.bio-btn-list .btn-text').each(function(){
	var hiddenEl = $(this).parent().find('.hidden-btn');
	var hiddenWidth = hiddenEl.outerWidth();
	var el = $(this);
	el.data({active:false});
	hiddenEl.velocity({width:0, borderColor: '#fff', padding:0},{duration:0});
	el.click(function() {
		var attribute = $(this).parent().attr('class');
		if (el.data('active') === false){
			

			if(attribute === 'btn-email'){
				hiddenEl.velocity({width:200, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
				$('.email-address').typed({
					strings: ["mattwujek@gmail.com"],
					contentType: 'html',
					typeSpeed: 50,
					showCursor: false
				});
			} else {
				bounceEl($(this),'padding-right',25,100);
				hiddenEl.velocity({width:hiddenWidth, borderColor: '#ccc', paddingRight:20,paddingLeft:20},{duration:500});
			}
			el.data({active:true});
		} else{
			console.log('shrink');
			hiddenEl.velocity({width:0, borderColor: '#fff', paddingRight:0,paddingLeft:0},{duration:500});
			el.data({active:false});
		}
	});
});


// AJAX loading
// var newHash      = "",
// $mainContent = $("#ajax-container");

// $("#nav-list li").delegate("a", "click", function() {
// 	window.location.hash = $(this).attr("href");
// 	return false;
// });

// $mainContent.delegate("a.project-link", "click", function() {
// 	window.location.hash = $(this).attr("href");
// 	return false;
// });

// $(window).bind('hashchange', function(){

// 	newHash = window.location.hash.substring(1);

// 	if (newHash) {
// 		$mainContent.css('opacity', 0);
// 		$loadingCanvas.css('opacity', 1);
// 		setTimeout(function(){
// 			$mainContent.load(newHash + " #content", function(){

// 				$mainContent.css('opacity', 1);
// 				$('#ajax-container .col').each(function(index) {
// 					$loadingCanvas.css('opacity', 0);

// 					var el = $(this);
// 					el.css('opacity',0);
// 					setTimeout(function(){
// 						el.css('opacity',1);
// 					}, (index + 1) * 250);
//                 		 //console.log(index);
//                 		});
// 				if(windowWidth < mobileQuery){
// 					toggleNavElementsMobile('exitNav');
// 				} else{
// 		    		toggleNavElements();
// 		   		}

// 		   		// blog stuff
// 		   		if(newHash === "blog.php"){
// 		   			$('.blog-heading-img').each(function(){
// 		   				var infoBlock = $(this).parents('.blog-roll').find('.post-info');
// 		   				$(this).appendTo(infoBlock);
// 		   			});
// 		   		}
// 			});
// 		},500);


//          // adjust link styles
//          $("#nav-list .menu-circle").removeClass("active-nav-link");
//          $("#nav-list a[href="+'"'+newHash+'"'+"]").find('.menu-circle').addClass("active-nav-link");


//         }
//     });

//$(window).trigger('hashchange');



}); // end of ready function


$( window ).resize(function() {
	windowWidth = $( window ).width();
	windowHeight = $( window ).height();
});