<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<c:choose>
	<c:when test="${type.equals('accs')}">
		<c:set var="lciw" value="col-xs-offset-2 col-sm-offset-3 col-md-offset-4 col-xs-6 col-sm-5 col-md-4" />
	</c:when>
	<c:when test="${editorType.equals('0')}">
		<c:set var="lciw" value="col-sm-offset-1 col-md-offset-2 col-xs-12 col-sm-10 col-md-8" />
	</c:when>
	<c:otherwise>
		<c:set var="lciw" value="col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-xs-10 col-sm-8 col-md-6" />
	</c:otherwise>
</c:choose>
<div id="loadCoverInner" class="editControlB no Select ${lciw}">
	<div class="nav nav-tabs">
		<a id="editDiscard" href="#" class="closeWindow" title="Discard Changes">×</a>
		<h2>${title}</h2>		
		<form id="editForm" action="${handle}/edit" method="POST" class="lb2">
			
			<a href="#" title="Save changes" id="editSave"
				class="editControl3 editIcon" onclick="return false;"> <i
				class="fa fa-floppy-o"></i>
			</a> 
			<c:choose>
				<c:when test="${type.equals('attr')}"></c:when>
				<c:when test="${type.equals('accs')}">
					<select name="newValue" class="newAccs">
						<option value="">undefined</option>
						<c:forEach var="level" items="${accessLevels}">
							<c:if test="${not empty level}">
								<option value="${level}"
									<c:if test="${level eq curAccs}">selected="selected"</c:if>>
									${level}</option>
							</c:if>
						</c:forEach>
					</select>
				</c:when>
				<c:when test="${type.equals('elem')}">		
					<c:choose>
						<c:when test="${editorType.equals('0')}">
							<script src="${baseURI}/scripts/tinymce/tinymce.min.js"></script>
							<script type="text/javascript">
								$("#editSave").css("display","none");
								
								tinymce.init({		
								    selector: "textarea",
								    menubar : false,
								    content_css : "${baseURI}/styles/tinymce.css",
								    oninit : "setPlainText",
								    browser_spellcheck : true,
								    plugins: "paste save link code",
								    target_list: [{title: 'None', value: ''}],
								    paste_as_text: true,
								    toolbar: "save | undo redo | link | bullist | italic | code | git",
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
				</c:when>
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
			<input type="hidden" name="currentValue" value="${curVal}" /> 
			<input type="hidden" name="field" value="${field}" /> 
			<input type="hidden" name="index" value="${index}" /> 
			<input type="hidden" name="append" value="${append}" /> 
		</form>	

	</div>
	<%--Bootstrap tabs don't work on dom refresh --%>
	<script type="text/javascript">
		$("#loadCoverInner .nav .tabs a").click(function(){
			$("#loadCoverInner .nav .tabs li").removeClass("active");
			$(this).parent().addClass("active");
			$("#loadCoverInner .tab-pane").hide();
			
			var currentTab = $(this).attr("href");
			$(currentTab).show();
			return false;
		});
	</script>
</div>