function toggleDisableVS(){$("#accessvars input:checkbox:checked").length>0?$("#accessBtn").removeClass("disabled"):$("#accessBtn").addClass("disabled")}function saListen(){$("#sa").click(function(){$(this).is(":checked")?($(".cc input").prop("checked",!0),$(".even").addClass("selectedRow"),$(".odd").addClass("selectedRow")):($(".cc input").prop("checked",!1),$(".even").removeClass("selectedRow"),$(".odd").removeClass("selectedRow")),toggleDisableVS()})}function saXpathListen(){$("input[name='subpaths_all']").click(function(){$(this).is(":checked")?$("input[name='subpaths']").prop("checked",!0):$("input[name='subpaths']").prop("checked",!1)})}function sXpathlisten(){$("input[name='subpaths']").change(function(){$(this).is(":checked")?$("input[name='subpaths_all']").is(":checked")||$("input[name='subpaths']").length===$("input[name='subpaths']:checked").length&&$("input[name='subpaths_all']").prop("checked",!0):$("input[name='subpaths_all']").prop("checked",!1)})}function sListen(){$(".cc input").change(function(){var e=$(this).parent().parent().parent();if($(this).is(":checked")){var s=$(".cc :checked").length;s===varCount&&$("#sa").prop("checked",!0),$(e).addClass("selectedRow")}else $("#sa").prop("checked",!1),$(e).removeClass("selectedRow");toggleDisableVS()})}function submitListen(){$("#accessvars").submit(function(){$("#accessBtn").prop("disabled",!0),$("#accessBtn").after(" <i id='accessLoadingSpinner' class='fa fa-circle-o-notch fa-spin fa-2x'></i>");var e=baseURI+"/edit/codebooks/"+baseHandle+"/v/"+version+"/accessvars2";return $("#accessFeedback").empty(),$.ajax({cache:!1,type:"POST",data:$("#accessvars").serialize(),url:e,success:function(e){$("#accessLoadingSpinner").remove(),$("#accessFeedback").html("Access levels updated"),$("#accessBtn").prop("disabled",!1)},error:function(e,s,a){console.log(e.status),e.status<400?($("#accessLoadingSpinner").remove(),$("#accessFeedback").html("Access levels updated"),$("#accessBtn").prop("disabled",!1)):($("#accessLoadingSpinner").remove(),$("#accessFeedback").html("An error occured, access levels not updated"),$("#accessBtn").prop("disabled",!1))}}),!1})}var baseHandle=null,version=null;$(document).ready(function(){baseURI=$("#meta_uri").html(),baseHandle=$("input[name='baseHandle']").val(),version=$("input[name='version']").val(),varCount=$(".cc").length;var e=$("#results th").first();$(e).html("<label title='Select All'><input id='sa' name='sa' value='true' type='checkbox'></label>"),saListen(),sListen(),toggleDisableVS(),submitListen(),saXpathListen(),sXpathlisten()});