$(function(){
	$("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        labels: {
            finish: "Sign Up",
            next: "Next",
            previous: "Previous"
        }
    });
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
	// ME HERE
	
	$(".actions a[href$='#finish']").click(function(){
		$("form").submit() ;
		
	})
	let region = $(".region")
	region.click(function(event) {
		$(".regionHere")[0].value = event.currentTarget.textContent ;
	})
	let city = $(".city")
	city.click(function(event) {
		$(".cityHere")[0].value = event.currentTarget.textContent ;
	})
	
	
    // Custom Jquery Step Button
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Select Dropdown
    $('html').click(function() {
        $('.select .dropdown').hide(); 
    });
    $('.select').click(function(event){
        event.stopPropagation();
    });
    $('.select .select-control').click(function(){
        $(this).parent().next().toggle();
    })    
    $('.select .dropdown li').click(function(){
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    })
})






