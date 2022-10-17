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
            
              var papertitle = document.getElementsByTagName("title")[1].textContent;
           // document.testform.selectedtext.value += selectedText +"\n";
           if (document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value == ""){
           document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+papertitle+" ====== \r\n [["+url+"|" + papertitle + "]][["+highlightactionurl+"&ur="+url+"|Hightlight]]--"+timestamp+"\r\n\n";
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        
                }
 
            document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += selectedText + "\n\n";
        }
 
    function highlight2(){
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


var hlwanttext =  document.getElementById('wanttext');
if (typeof(hlwanttext) != 'undefined' && hlwanttext != null)
{
  document.getElementById("wanttext").scrollIntoView();// Exists.
}

     


 
	var pageX, pageY;
   

	document.addEventListener("selectionchange", () => {
        if (typeof(hlwanttext) != 'undefined' && hlwanttext != null)
{
    document.getElementById("wanttext").scrollIntoView();
    let selection = document.getSelection();
    let selectedText = selection.toString();
    var menu = document.querySelector(".highlightmenu");
    if (selectedText !== "") {
		let rect = document.querySelector("#wanttext").getBoundingClientRect();
		menu.style.display = "block";
		menu.style.left = pageX;  //- Math.round(rect.left) + "px";
		menu.style.top = pageY;  - 150 //- Math.round(rect.top) - 58 + "px";
 
		window.addEventListener("click", (event) => {
			if (event.target == menu) {
			}
		});
		} else {
		menu.style.display = "none";
		}
}

	});
	document.addEventListener("pointerdown", (e) => {
		pageX = e.pageX;
		pageY = e.pageY;
	});
 //	document.addEventListener("pointerup", (e) => {
//		pageX = e.pageX;
//		pageY = e.pageY;
//	});
 

 

		function edittag(){
      var newtagselection = window.getSelection()
	  var newtagcomponent = newtagselection.toString();
            newtagcomponent =newtagcomponent.trim();
      if(newtagcomponent.match(/\s/)){
        newtagcomponent = "\""+newtagcomponent+"\"";  
      }
	  console.log(newtagcomponent.toString());
	  var textArea = document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value; 
      var newtextArea
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

	function copytext(){
 
	  let copyText = window.getSelection(); 
	  console.log(copyText.toString());

            if (document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value == "") {
          document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "====== "+titlestring+" ====== \r\n [["+url+"|"+titlestring+"]][["+highlightactionurl+"&ur="+url+"|Hightlight]]--"+timestamp+"\r\n\n";
           
            document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += "{{tag> }}\r\n\n"; //add tag syntax        
 
                }
                
            document.getElementById("edtop").contentWindow.document.getElementsByTagName("textarea")[0].value += copyText.toString() + "\n\n";
        }
 
