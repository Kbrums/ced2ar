function inputTypeListen(){$("#workflowAdd input[name=inputType]").change(function(){"existing"==$(this).val()?($("#inputNew").css("display","none"),$("#inputExisting").css("display","block"),$("#inputSelector").chosen(),newInput=!1):($("#inputNew").css("display","block"),$("#inputExisting").css("display","none"),newInput=!0)})}function workflowSubmit(){return $("#workflowAdd").submit(function(){var t=!1,e=$("#inputID").val().trim();if(newInput||(e=$("#inputSelector :selected").val(),$("#inputName").val(e),$("#inputURI").val("http://cornell.edu")),$(".inputErrorMsg").html(""),$("#inputNew input[type!='radio'][type!='select']").each(function(){""===$(this).val().trim()&&(console.log($(this).id),t=!0,$(this).parent().next(".inputErrorMsg").html("This field is required"))}),t)return $("#provError").html("You are missing fields"),!1;var r=$("#progID").val().trim(),n=$("#outputID").val().trim();return n===e||n===r||r===e?($("#provError").html("IDs must be unique"),!1):($.ajax({cache:!1,type:"POST",data:$("#workflowAdd").serialize(),url:baseURI+"/edit/prov3",success:function(t){$("#provError").empty(),$("#provSuccess").html("Graph successfully generated <a href='/ced2ar-web/prov2'>View Graph</a>"),$("#provShuffle").click()},error:function(t,e,r){$("#provSuccess").empty(),$("#provError").html(t.responseText)}}),!1)}),!1}var newInput=!1;$(document).ready(function(){inputTypeListen(),workflowSubmit()});