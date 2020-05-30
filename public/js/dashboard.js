$(".btn_RequirementDetails").click(function () {
            $(".RequirementDetails").hide();
            $(this).parent(".dash-block").children(".RequirementDetails").show();
            return false;
});

$('.closeThis').click(function() {
	$(".RequirementDetails").hide();
	return false;
});

$('.closeThis').click(function() {
  $(this).parents(".popback").fadeOut();
  $("body").css('overflow', 'auto');
  $(".popback.active").removeClass("active");
  return false;
});
