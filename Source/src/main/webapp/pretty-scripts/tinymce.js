$(document).ready(function () {
	baseURI = $('#meta_uri').html();
	tinymce.init({
	    selector: "textarea",
	    plugins: "link code",
	    removed_menuitems: 'newdocument strikethrough superscript subscript formats',
	    toolbar: "undo redo | bold italic | link" 
	});
});