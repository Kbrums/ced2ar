function popup(t,e){$("#info").html().trim()||hasTaken(e)||($("#info").html(t),$("."+e+" button").click(function(){setTaken(e)}))}function setTaken(t){var e=new Date,n=365;e.setTime(e.getTime()+24*n*60*60*1e3);var i="expires="+e.toGMTString();document.cookie="cdr-"+t+"=true; "+i}function hasTaken(t){for(var e="cdr-"+t,n=e+"=",i=document.cookie.split(";"),r=0;r<i.length;r++){var o=i[r].trim();if(0===o.indexOf(n))return o.substring(n.length,o.length)}return!1}$(document).ready(function(){baseURI=$("#meta_uri").html()});