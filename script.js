    function highlightRange(range) {
         var newNode = document.createElement('mark2');
         range.surroundContents(newNode);
            }
            // Function to get the Selected Text 
        function getSelectedText() {
            var selectedText = '';
            selectedText = window.getSelection();
           console.log(selectedText);
            // window.getSelection
            
            if (window.getSelection) {
                 selectedText = window.getSelection();
                 for(var i = 0; i < selectedText.rangeCount; i++) {
                        highlightRange(selectedText.getRangeAt(i));
                                }
                }
            // document.getSelection
            else if (document.getSelection) {
                selectedText = document.getSelection();
                 }
            // document.selection
            else if (document.selection) {
                selectedText = document.selection.createRange().text;
            } else return;
            // To write the selected text into the textarea
            if (document.getElementsByTagName("title")[1] !=null){
	    var papertitle = document.getElementsByTagName("title")[1].textContent;
		}else{
	    var papertitle = url;
		}
           // document.testform.selectedtext.value += selectedText +"\n";
           if (document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value == ""){
           document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+papertitle+" ====== \r\n [["+url+"|" + papertitle + "]]  [[?do=highlight2wiki&ur="+url+"|✍Highlight]]--"+timestamp+"\r\n\n";
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        		  
                }
		   
           let selectedTextString = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value;
            document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += selectedTextString + selectedText + "\n\n";
        }
 
    function markjs(){
			let selectedText = window.getSelection();
            selectedTextString = selectedText.toString();
			var instance = new Mark(document.getElementById("wanttext"));
            
			var lines = selectedTextString.split('\n');    // lines is an array of strings
			for (var j = 0; j < lines.length; j++) {
			instance.mark(lines[j], {
            "element": "mark2",
            "acrossElements": true,
            "separateWordSearch": false,
            "diacritics": false}); 
			document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += lines[j] + "\n\n";
   
            }         
        } 

function loadmarkjs(){
var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
 
var lines = textArea.split('\n\n');    // lines is an array of strings
var instance2 = new Mark(document.getElementById("wanttext")); 
// Loop through all lines
for (var j = 0; j < lines.length; j++) {
  //  highlight(lines[j]);
    console.log(lines[j]);

    instance2.mark(lines[j], {
	"element": "mark2",
	"acrossElements": true,
	"separateWordSearch": false,
	"diacritics": false}); 

}	
	
}

function loadmarkjsfr(){
var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
 
var lines = textArea.split('\n\n');    // lines is an array of strings
var instance2 = new Mark(document.getElementById("wanttext")); 
// Loop through all lines
for (var j = 0; j < lines.length; j++) {
  //  highlight(lines[j]);
    console.log(lines[j]);

    instance2.mark(lines[j], {
	"element": "markfr",
	"acrossElements": true,
	"separateWordSearch": false,
	"diacritics": false}); 

}	
	
}





    function highlight_2(){
            let selectedText = window.getSelection();
            selectedText = selectedText.toString();

	        console.log(selectedText);
            highlight(selectedText);
            
            
        } 



function highlight(text) {

    //document.documentElement.innerHTML = document.documentElement.innerHTML.replace(new RegExp(text + '(?!([^<]+)?<)', 'gi'),'<mark2>$&</mark2>');;
  var inputText = document.getElementById("wanttext");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  console.log(index);
  if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<mark2>" + innerHTML.substring(index,index+text.length) + "</mark2>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
  }
}






function loadhighlight(){ // load the hightlight text from dokuwiki textarea
var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
 
var lines = textArea.split('\n\n');    // lines is an array of strings
 
// Loop through all lines
for (var j = 0; j < lines.length; j++) {
    highlight(lines[j]);
    console.log(lines[j]);
 //document.testform.selectedtext.value += lines[j];
}
}


function loadhighlightrevision(){
var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
 
var lines = textArea.split('\n\n');    // lines is an array of strings
 
// Loop through all lines
for (var j = 0; j < lines.length; j++) {
    highlight2(lines[j]);
    console.log(lines[j]);
 //document.testform.selectedtext.value += lines[j];
}
}		


function highlight2(text) {
     // hightlight for revision
    //document.documentElement.innerHTML = document.documentElement.innerHTML.replace(new RegExp(text + '(?!([^<]+)?<)', 'gi'),'<mark2>$&</mark2>');;
  var inputText = document.getElementById("wanttext");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  console.log(index);
  if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<markfr>" + innerHTML.substring(index,index+text.length) + "</markfr>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
  }
}




function edittag(){
      var newtagselection = window.getSelection();
	  var newtagcomponent = newtagselection.toString();
            newtagcomponent =newtagcomponent.trim();
      if(newtagcomponent.match(/\s/)){
        newtagcomponent = "\""+newtagcomponent+"\"";  
      }
	  console.log(newtagcomponent.toString());
	  var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
      var newtextArea;
	  if(textArea.match(/\{{tag>(.+?)\}}/i)!=null){
            console.log("not null");
        	  var textareamatch = textArea.match(/\{{tag>(.+?)\}}/i);
            console.log(textareamatch[1]+" "+ newtagcomponent.toString());
	        newtextArea = textArea.replace(/\{{tag>(.*)\}}/i,"{{tag>"+textareamatch[1]+" "+ newtagcomponent.toString()+"}}");
	         console.log(newtextArea);
	         document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value = newtextArea;
 
 
 
 
	  }else{
	        console.log("null");
	       document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag>" +  newtagcomponent.toString() + "}}\r\n\n";	      
	  }
	}

 
 
 

	 
function loadH2WFunc(){ 
            jQuery('#wanttext *').removeAttr('height width sizes style alt sizes');
			jQuery('#wanttext *').removeClass();
			jQuery('#wanttext link').remove();
			jQuery('#wanttext textarea').remove();
			jQuery('#wanttext input').remove();
			jQuery('#wanttext button').remove();
			
			//add host root to img src
			url_hostns =stripTrailingSlash(url_host);
			jQuery('#wanttext img').each(function(key,value) {
			if(jQuery(this).attr('src')!=null){
            if (jQuery(this).attr('src').includes('http')){
			//console.log('completed url:'+jQuery(this).attr('src'));
            }else{
			//console.log('image src link broken:'+jQuery(this).attr('src'));	
			var scrurl= url_hostns + jQuery(this).attr('src');	
		    jQuery(this).attr('src', scrurl);
		    //console.log('addedhostroot:'+jQuery(this).attr('src'));
	        }

            //convert data-src to src			
            if(jQuery(this).attr('data-src')!=null){
				//console.log('datasrc:'+jQuery(this).attr('data-src'));
				jQuery(this).attr('src', jQuery(this).attr('data-src'));
				//console.log('src change to '+ jQuery(this).attr('src'));
			}
			}
			});

            jQuery('#wanttext *').each(function(key,value) {
			if(jQuery(this).attr('href')!=null){
            if (jQuery(this).attr('href').includes('http')){
			//console.log('link complete url:'+jQuery(this).attr('href'));
            }else{
			//console.log('link broken:'+jQuery(this).attr('href'));
			var scrurl= url_hostns + jQuery(this).attr('href');	
		    jQuery(this).attr('href', scrurl);
		    //console.log('link hostroot added:'+jQuery(this).attr('href'));
	        }
			}
			});









        if (document.getElementsByTagName("title")[1] !=null){
	    var papertitle = document.getElementsByTagName("title")[1].textContent;
		}else{
	    var papertitle = url;
		   }
           if (document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value == ""){
           document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+papertitle+" ====== \r\n [["+url+"|" + papertitle + "]]  [[?do=highlight2wiki&ur="+url+"|✍Highlight]]--"+timestamp+"\r\n\n";
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        		  
           }

 
jQuery('#wanttext').append('<input type="button" class="unibutton" value="Clean!"  onpointerdown="cleanorphantext()" > ');

}

function cleanorphantext(){
jQuery('wanttext').contents().filter(function(){return this.nodeType != 1;}).remove();	
alert('orphan text cleared');
}


function HLdarkmode(){
	
	jQuery('div').toggleClass("dark-mode");
	
}


function stripTrailingSlash(str){
   if(str.charAt(str.length-1) == "/"){ str = str.substr(0, str.length - 1);}
   return str
}
