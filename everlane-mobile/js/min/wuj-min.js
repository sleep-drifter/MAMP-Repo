$(document).ready(function(){var t=$("#bag"),e=$("#fs"),i=$(".product-container"),n,c;i.data({active:!1,section:"first"}),t.click(function(){i.data("active")===!1?(i.velocity({left:"-85%"},{duration:300}),i.data({active:!0,section:"first"})):(i.velocity({left:0},{duration:300}),i.data({active:!1,section:"first"}))}),e.click(function(){i.data("active")===!0&&(i.velocity({left:"0"},{duration:300}),i.data({active:!1,section:"first"}))}),$("#checkout-section-1").delegate("#add-new-address","click",function(){var t=$("#new-address");t.velocity({left:0},{duration:500})}),$("#back-new-address").click(function(){var t=$("#new-address");t.velocity({left:"-100%"},{duration:500})}),$("#checkout-section-1").delegate("#add-new-payment","click",function(){var t=$("#new-payment");t.velocity({left:0},{duration:500})}),$("#back-new-payment").click(function(){var t=$("#new-payment");t.velocity({left:"-100%"},{duration:500})}),$("#save-payment").click(function(){var t=$("#new-payment"),e=$("#checkout-section-1").find("#hidden-payment"),i=$("#checkout-section-1").find("#inside-hidden-payment"),n=$("#checkout-section-1").find("#payment-list"),c=$("#checkout-section-1").find("#payment-info").children(".expand"),a=i.parent();console.log(c),t.velocity({left:"-100%"},{duration:500}),setTimeout(function(){e.velocity({height:54},{duration:500}),i.find(".active-btn").text("select"),i.find(".active-btn").removeClass("active-btn"),e.find(".right-col-btn p").addClass("active-btn"),e.find(".right-col-btn p").text("selected");var t=e.find("ul").html();n.html(t)},500),setTimeout(function(){c.data({active:!1}),c.velocity({rotateZ:"0deg"},{duration:300}),a.velocity({height:0},{duration:300})},1400)}),$("#save-address").click(function(){var t=$("#new-address");t.velocity({left:"-100%"},{duration:500});var e=$("#checkout-section-1").find("#hidden-address"),i=$("#checkout-section-1").find("#inside-hidden-address"),n=$("#checkout-section-1").find("#address-list"),c=$("#checkout-section-1").find("#shipping-info").children(".expand"),a=i.parent();setTimeout(function(){e.velocity({height:54},{duration:500}),i.find(".active-btn").text("select"),i.find(".active-btn").removeClass("active-btn"),e.find(".right-col-btn p").addClass("active-btn"),e.find(".right-col-btn p").text("selected");var t=e.find("ul").html();n.html(t)},500),setTimeout(function(){c.data({active:!1}),c.velocity({rotateZ:"0deg"},{duration:300}),a.velocity({height:0},{duration:300})},1400)}),$("#checkout-section-1").delegate(".cross","click",function(){var t=$(this).parents(".product-in-cart"),e=t.find(".product-image, .description"),i=t.find(".undo");e.velocity({opacity:0},{duration:300,display:"none"}),setTimeout(function(){i.velocity({opacity:1},{duration:300})},500)}),$("#checkout-section-1").delegate(".undo-btn","click",function(){var t=$(this).parents(".product-in-cart"),e=t.find(".product-image, .description"),i=t.find(".undo");i.velocity({opacity:0},{duration:300}),setTimeout(function(){e.velocity({opacity:1},{duration:300,display:"block"})},500)}),$("#checkout-section-1").delegate(".expand","click",function(){var t=$(this).parent().find(".expanded-content"),e=$(this).parents(".card").find(".expanded-content"),i=e.attr("id"),a;a="payment"===i?n:c,$(this).data("active")===!1||void 0===$(this).data("active")?($(this).data({active:!0}),$(this).velocity({rotateZ:"45deg"},{duration:300}),t.velocity({height:a},{duration:300})):($(this).data({active:!1}),$(this).velocity({rotateZ:"0deg"},{duration:300}),t.velocity({height:0},{duration:300}))}),$("#checkout-section-1").delegate(".info-selection-section .select-btn","click",function(){var t=$(this).find("p"),e=$(this).parents(".inside-hidden").find(".active-btn"),i=$(this).parents(".info-selection-section").find("ul");if($(this).find("p").hasClass("active-btn"));else{e.toggleClass("active-btn"),t.toggleClass("active-btn"),e.text("select"),t.text("selected");var n=$(this).parents(".card-section").find(".main-list"),c=$(this).parents(".card-section"),a=c.find(".expanded-content"),o=c.find(".expand"),d=i.html();n.html(d),setTimeout(function(){o.data({active:!1}),o.velocity({rotateZ:"0deg"},{duration:300}),a.velocity({height:0},{duration:300})},500)}});var a=500;$("#checkout-btn a").on("click",function(t){t.preventDefault();var e=this.href;$(".checkout-container").fadeOut(a),setTimeout(function(){$("#load").remove()},a),setTimeout(function(){$("#ajax-content").load(e+" #load",function(){n=$("#ajax-content").find("#payment").outerHeight(),c=$("#ajax-content").find("#shipping").outerHeight(),$("#ajax-content").find(".expanded-content").velocity({height:0},{duration:0})}).fadeIn(a),$("#checkout-section-1").velocity({backgroundColor:"#f7f7f7"},{duration:500})},a+100)})});