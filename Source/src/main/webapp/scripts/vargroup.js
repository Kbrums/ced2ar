function checkForm(){$("#createGroup").submit(function(){var r=!1;return $(".inlineError").remove(),$(".inlineError2").remove(),$(this).find(".requiredInput").each(function(){var e=$(this).val();0===$.trim(e).length&&(r=!0,$(this).hasClass("form-control")?$("<span class='inlineError2'>Required</span>").insertAfter($(this)):$("<span class='inlineError'>Required</span>").insertAfter($(this)))}),r?!1:void 0})}$(document).ready(function(){baseURI=$("#meta_uri").html(),checkForm()});