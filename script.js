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
           document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+papertitle+" ====== \r\n [["+url+"|" + papertitle + "]]  [["+highlightactionurl+"&ur="+url+"|Hightlight]]--"+timestamp+"\r\n\n";
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        		  
                }
           let selectedTextString = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value;
            document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += selectedTextString + selectedText + "\n\n";
        }
 
    function markjs(){
			let selectedText = window.getSelection();
            selectedTextString = selectedText.toString();
			var instance = new Mark(document.getElementById("wanttext"));
            instance.mark(selectedTextString, {
            "element": "span",
            "className": "mark2",
            "acrossElements": true,
            "separateWordSearch": false,
            "diacritics": false}); 
			
			//selectedTextStringNN=selectedTextString.replace(/(\r\n|\n|\r)/gm, "");
			document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += selectedTextStringNN + selectedText + "\n\n";
   
			//let selectedText = window.getSelection();
            //selectedText = selectedText.toString();

	        //console.log(selectedText);
            //highlight(selectedText);
            
            
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
	"element": "span",
	"className": "mark2",
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
            if (document.getElementsByTagName("title")[1] !=null){
	    var papertitle = document.getElementsByTagName("title")[1].textContent;
		}else{
	    var papertitle = url;
		}
           if (document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value == ""){
           document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+papertitle+" ====== \r\n [["+url+"|" + papertitle + "]]  [["+highlightactionurl+"&ur="+url+"|Hightlight]]--"+timestamp+"\r\n\n";
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        		  
}}