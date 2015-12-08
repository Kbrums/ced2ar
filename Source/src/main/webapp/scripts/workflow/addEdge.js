function loadSelector(e,t,r){$.ajax({url:baseURI+"/prov/data/workflow?l=1000&t="+t+"&q="+r,dataType:"json",success:function(r){var a=r.results[0].data;for(var o in a){var s=a[o].row,n=s[0],c=s[1],i=s[2],d=""===t?c+" ("+i+")":c,p="<option value='"+n+"."+i+"'>"+d+"</option>";e.append(p)}e.chosen({placeholder_text_single:"Select a node"})}})}function selectorChange(){source.change(function(){loadPreds()}),target.change(function(){loadPreds()})}function loadPreds(){type.empty(),typeError.empty();var e=source.val(),t=target.val();if(""!==e&&""!==t){switch(e=String(e).split("."),t=String(t).split("."),e[1]){case"Dataset":switch(t[1]){case"Dataset":noPredicate(e[1],t[1]);break;case"Program":type.append("<option value='Used_by'>used by</option>");break;case"Provider":noPredicate(e[1],t[1])}break;case"Program":switch(t[1]){case"Dataset":type.append("<option value='Produced'>produced</option>");break;case"Program":noPredicate(e[1],t[1]);break;case"Provider":noPredicate(e[1],t[1])}break;case"Provider":switch(t[1]){case"Dataset":type.append("<option value='Provides'>provides</option>");break;case"Program":noPredicate(e[1],t[1]);break;case"Provider":noPredicate(e[1],t[1])}}type.change()}}function noPredicate(e,t){e=e.toLowerCase(),t=t.toLowerCase(),typeError.append("Sorry, no relationship exists from a "+e+" to a "+t)}function isComplete(){type.change(function(){preview.empty(),null!==type.val()?(submit.prop("disabled",!1),writePreview()):submit.prop("disabled",!0)})}function writePreview(){var e=source.next(".chosen-container-single").children(".chosen-single").children("span").html(),t=target.next(".chosen-container-single").children(".chosen-single").children("span").html(),r=type.children("option:selected").text();preview.html([e,r,t].join(" "))}function addEdge(){$("#addEdge").submit(function(){return error.empty(),success.empty(),$.ajax({cache:!1,type:"POST",data:$("#addEdge").serialize(),url:baseURI+"/edit/workflow/edge",success:function(e){successMsg(e)},error:function(e,t,r){e.status<400?successMsg(e):error.html(e.responseText)}}),!1})}function successMsg(){var e=String(source.val()).split(".")[0],t=baseURI+"/edit/workflow/n/"+e,r="<a href='"+t+"'>View source node.</a>";success.html("Added new edge. "+r)}baseURI=$("#meta_uri").html();var source=$("select[name='source']"),target=$("select[name='target']"),type=$("select[name='type']"),typeError=$("#typeError"),submit=$("#addEdge input[type='submit']"),preview=$("#triplePreview"),error=$("#edgeError"),success=$("#edgeSuccess");$(document).ready(function(){loadSelector(source,"",""),loadSelector(target,"",""),submit.prop("disabled",!0),selectorChange(),isComplete(),addEdge()});