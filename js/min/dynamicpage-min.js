$(function(){var n=500,a="",t=$("#ajax-container");$("#nav-list li").delegate("a","click",function(){return window.location.hash=$(this).attr("href"),console.log("meow"),!1}),t.delegate("a.project-link","click",function(){return window.location.hash=$(this).attr("href"),!1}),$(window).bind("hashchange",function(){a=window.location.hash.substring(1),a&&(t.css("opacity",0),setTimeout(function(){t.load(a+" #content",function(){setTimeout(function(){t.css("opacity",1)},100)})},n),$("nav a").removeClass("active-nav-link"),$("nav a[href="+a+"]").addClass("active-nav-link"))}),$(window).trigger("hashchange")});