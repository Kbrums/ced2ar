function upload(){$(".fileUploadBtn").click(function(){return $(this).next(".fileUploadHidden").click(),!1}),$(".fileUploadHidden").change(function(){var e=$(this).val().split("\\").pop();$(this).next(".fileUploadDisplay").val(e)})}function chooseFileType(){$("input[name='fileLocSelect']").unbind(),$("input[name='fileLocSelect']").change(function(){"online"==$(this).val()?($("#fileOnline").removeClass("hidden"),$("#fileOffline").addClass("hidden")):($("#fileOffline").removeClass("hidden"),$("#fileOnline").addClass("hidden"))})}function listenObj(){$("#provFileAdd").change(function(){checkObj()})}function checkObj(){if("online"===$("input:checked[name='fileLocSelect']").val()){if(""===$("#objURL").val())return;checkFieldComplete()}else{if("offline"!==$("input:checked[name='fileLocSelect']").val())return;if(""===$("#fileOffline .fileUploadHidden").val())return;checkFieldComplete()}}function checkFieldComplete(){""!==$("#provFileAdd select").val()&&""!==$("#objLabel").val()&&null!==$("#provFileAdd").val()?$("#fileAddButton").removeClass("disabled"):$("#fileAddButton").addClass("disabled")}function listenSubmit(){$("#fileAddButton").click(function(){return $("#provStatus").empty(),$("#provError").empty(),$("input[name=objLocal]").val($("input[name=offlineDisplay]").val()),submitProvInput(),!1})}function submitProvInput(){$(".modal-backdrop").remove(),$("#duplicateOverride").unbind(),$.ajax({cache:!1,type:"POST",data:$("#provFileAdd").serialize(),url:baseURI+"/edit/prov2",success:function(e){if(200==e.status){var i=e.getResponseHeader("objectID"),t=e.responseText+"<br /> <a href='"+baseURI+"+/edit/prov/"+i+"'>See details</a>";return $("#provStatus").html(t),$("input[name=idOverride]").val(""),$("#duplicatePrompt").modal("hide"),void $("#provFileAdd")[0].reset()}},error:function(e,i,t){var l=e.getResponseHeader("objectID");if($("#provStatus").html(""),200===e.status){var n=e.responseText+"<br /> <a href='"+baseURI+"/edit/prov/"+l+"'>See details</a>";return $("#provStatus").html(n),$("input[name=idOverride]").val(""),$("#duplicatePrompt").modal("hide"),void $("#provFileAdd")[0].reset()}if("duplicateID"===e.responseText){var a="A entity with the same name already exists. Please rename ";a+="<input name='idOverride' value='"+l+"' type='text'>",$("#duplicateMessage").html(a),$("#duplicatePrompt").modal("show"),$("#duplicateOverride").click(function(){$("#duplicatePrompt").modal("hide"),submitProvInput()})}else $("#provErrors").html(e.responseText)}})}$(document).ready(function(){baseURI=$("#meta_uri").html(),upload(),chooseFileType(),listenObj(),listenSubmit()});