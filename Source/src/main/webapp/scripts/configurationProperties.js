function bugReportEnableListener(){var e=$("input[id=enableRadio]:checked").val();"true"==e?$(".bugReportField").show():$(".bugReportField").hide(),$(".bugReportOn").on("click",function(){$(".bugReportField").show()}),$(".bugReportOff").on("click",function(){$(".bugReportField").hide()})}function editPasswordListener(){$(".editPasswordCell").off("click"),$(".editPasswordCell").on("click",function(){return loadAjax(this.href,!0),$(this).off("click"),$("#info .close").click(),!1})}function loadAjax(e){$.ajax({cache:!1,url:e,success:function(e){l.html(e),l.addClass("loadShow"),$("body").css("overflow-y","hidden"),$("#wrapper").css("padding-right","30px");var s=$("#wrapper").height(),o=$(window).height();o>s&&(s=o),l.css("min-height",s),submitListener()}})}function hideAjax(){l.html(""),l.removeClass("loadShow"),l.css("min-height",0),$("#wrapper").css("padding-right","15px"),$("body").css("overflow-y","scroll"),editPasswordListener()}function submitListener(){notPressed=!0,$(document).keydown(function(e){27==e.keyCode&&notPressed&&(notPressed=!1,hideAjax())}),$("#changeBaseXDBButton").click(function(){var e="processBaseXDBChange?baseXDBUrl="+$("#baseXDBUrl").val()+"&adminPassword="+$("#adminPassword").val()+"&readerPassword="+$("#readerPassword").val()+"&writerPassword="+$("#writerPassword").val();$.post(e,function(e,s){$("#changeBaseXDBMsg").html(e)})}),$("#changePasswordButton").click(function(){var e="processPasswordChange?baseXDBUserId="+$("#baseXDBUserId").val()+"&currentPassword="+$("#currentPassword").val()+"&newPassword="+$("#newPassword").val()+"&confirmPassword="+$("#confirmPassword").val();$.post(e,function(e,s){$("#changePwdMsg").html(e)})}),$("#closeButton").click(function(){return hideAjax(),!1}),$(".dialogClose").click(function(){return hideAjax(),!1}),l.click(function(){hideAjax()}),$("#loadCoverInner").click(function(e){e.stopPropagation()})}$(document).ready(function(){l=$("#load"),baseURI=$("#meta_uri").html(),editPasswordListener(),bugReportEnableListener()});