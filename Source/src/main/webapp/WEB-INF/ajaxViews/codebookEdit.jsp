<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<div class="hidden-xs col-sm-1 col-md-2"></div>
<div id="loadCoverInner"
	class="editControlB noSelect col-xs-12 col-sm-10 col-md-8">
	<form id="editForm" action="${handle}/edit" method="POST">
		<a id="editDiscard" href="#" class="closeWindow" title="Discard Changes">×</a>
		<h2>${title}</h2>
		<a href="" title="Save changes" id="editSave"
			class="editControl3 editIcon" onclick="return false;"><i
			class="fa fa-floppy-o"></i>
		</a> 
		<c:choose>
			<c:when test="${editorType.equals('0')}">
				<script src="${baseURI}/scripts/tinymce/tinymce.min.js"></script>
				<script type="text/javascript">
					$("#editSave").css("display","none");
					tinymce.init({						
					    selector: "textarea[name='newValue']",
					    menubar : false,
					    content_css : "${baseURI}/styles/tinymce.css",
					    oninit : "setPlainText",
					    browser_spellcheck : true,
					    paste_as_text: true,
					    plugins: "paste save link code",
					    target_list: [{title: 'None', value: ''}],
					    toolbar: "save | undo redo | link | bullist | italic | code",
					    valid_elements :"a[href|target=_blank],strong/b,em,div,br,p,li,ul",
					    save_onsavecallback: function(){
					    	$("textarea [name=newText]").html(this.getContent());
							$("#editSave").click();
					    }
					});
				</script>
				<textarea name="newValue" style="height:17.5em">${curVal}</textarea>
				
			</c:when>
			<c:otherwise>
				<input type="text" name="newValue" class="newTxtPlain" value="${curVal}" />
			</c:otherwise>
		</c:choose>		
		<p class="hidden editDoc conflictItem">
			Please review the following changes before overwriting them.
			If you wish to discard your edits, simply close the editor.
		</p>
		<div class="hidden conflictItem" id="conflictDiff"></div>
		
		<c:if test="${editorType.equals('0')}">
			<p class="editDoc">
				This field supports ASCII math
				See <a href='${baseURI}/docs/faq#q3' target='_blank'>FAQ</a> for details. <br />	
			</p>
		</c:if>
		<c:if test="${pendingChanges gt 0}">
			<p class="editDoc">
				<i class="fa fa-exclamation-triangle fa-lg"></i>
				Another user is currently editing this field
			</p>
		</c:if>
	
		<input type="hidden" name="field" value="${field}" />
		<input type="hidden" name="index" value="${index}" /> 
		<input type="hidden" name="append" value="${append}" /> 
		<input type="hidden" name="title" value="${title}" /> 
		<div class="hidden">
			<input type="hidden" name="curVal" value='${curVal}' />
		</div>	
	</form>
</div>