<?php
/**
 * DokuWiki Plugin highlight2wiki (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  dodotori <dodotori@localhost>
   CRC64 function adapted from https://gist.github.com/hightemp/4da5ac39b8d57fcd7e7988b90a48017d
   several function adapted from stackoverflow
   
bookmarklet: 
javascript:Q=document.selection?document.selection.createRange().text:document.getSelection(); void(window.open(%27https://yourwebsite.com/dokuwiki/doku.php?do=highlight2wiki&te=%27+encodeURIComponent(Q)+%27&ur=%27+ encodeURIComponent(location.href)+%27%27,%27dokuwikiadd%27,%27scrollbars=yes,resizable=yes,toolbars=yes,status=yes%27));

   
 */
class action_plugin_highlight2wiki extends \dokuwiki\Extension\ActionPlugin
{

    /** @inheritDoc */
    public function register(Doku_Event_Handler $controller)
    {
      //  $controller->register_hook('TOOLBAR_DEFINE', 'AFTER', $this, 'handle_toolbar_define',array());
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,'_hookjs');
        $controller->register_hook('ACTION_ACT_PREPROCESS', 'BEFORE',  $this, 'allowMyAction');
        $controller->register_hook('TPL_ACT_UNKNOWN', 'BEFORE',  $this, 'performMyAction');
    
    }

    /**
     * FIXME Event handler for
     *
     * @param Doku_Event $event  event object by reference
     * @param mixed      $param  optional parameter passed when event was registered
     * @return void
     */
    public function _hookjs(Doku_Event $event, $param) {
        $event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src'     => DOKU_BASE.'lib/plugins/highlight2wiki/script.js');
    }
    public function allowMyAction(Doku_Event $event, $param) {
        if($event->data != 'highlight2wiki') return; 
        $event->preventDefault();

    }
 
    public function performMyAction(Doku_Event $event, $param) {
    if($event->data != 'highlight2wiki') return; 
    $event->preventDefault();  
	global $ACT, $JSINFO, $ID, $INPUT, $auth, $TPL, $INFO; 

 		//LOGIN NEEDED ?8 		//NOT LOGGED IN ? -> FORCE LOGIN
 		if( $INFO['userinfo']== null ) {
 		  header("Location: ?do=login");
 		  die('<a href="?do=login">LOGIN</a>');
 		}    
	    
	    
	    
        $timestamp = date("Y:m:d:H:i:s");
        //$title=$_GET['ti'];     // things to log : title
        //$titlestring = preg_replace('/%u([0-9A-F]+)/', '&#x$1;', $title); // convert the unicode dont need title parameter anymore
        //$titlestring = html_entity_decode($titlestring, ENT_COMPAT, 'UTF-8');
        $url=$_GET['ur'];
        $urlkey = crc64($url); 
        $yournamespace = $this->getConf('highlight_namespace');
        $allowed_tags = $this->getConf('allowed_tags');            
	$targeturl= DOKU_BASE."doku.php?id=$yournamespace:$urlkey&do=edit"; 
        $highlightactionurl = DOKU_BASE."doku.php?do=highlight2wiki";
	
        echo '<p>'.$urlkey.'</p>';
	echo '<p>'.$yournamespace.'</p>';
        echo '<script>
            var titlestring ="'.$titlestring.'";
            var url = "'.$url.'"
            var urlkey = "'.$urlkey.'";
            var timestamp = "'.$timestamp.'";
            var targeturl = "'.$targeturl.'";
            var highlightactionurl ="'.$highlightactionurl.'";
            console.log(titlestring + url + urlkey);
            </script>';
        
        echo'<div id="wanttext">';

// From URL to get webpage contents.
 
 function parseurl($newurl="") // to convert encode url
{
   // $newurl = rawurlencode($newurl);
    $a = array("%3A","%2F","%40","+");
    $b = array(":","/","@"," ");
    $newurl = str_replace($a,$b,$newurl);
    return $newurl;
}
 
$purl = parseurl($url);

	
// Initialize a CURL session.
$ch = curl_init();
   $agent = 'Mozilla/5.0 (Linux; Android 12; SM-G998U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36';
  $curl=curl_init();
  curl_setopt($ch, CURLOPT_USERAGENT, $agent);// Return Page contents.
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
//grab URL and pass it to the variable.
curl_setopt($ch, CURLOPT_URL, $url);
 
$result = curl_exec($ch);

	    
echo $result;
/*  DOM parser stripper from https://stackoverflow.com/questions/8021543/extract-all-the-text-and-img-tags-from-html-in-php  */
if($result!=""){
//$result = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $result);
//$allowed_tags = '<html><head><sub><sup><u><frame><svg><table><th><tr><td><col><tfoot><thead><span><title><body><a><font><dt><img><br><code><data><canvas><li><p><h1><h2><h3><h4><h5>';            


$allowed_attributes = array('lang','src'); 

$html = strip_tags($result, $allowed_tags);
$dom = new DOMDocument();

$dom->loadHTML($result);

foreach($dom->getElementsByTagName('*') as $node)
{
    foreach($node->attributes as $attribute)
    {
        if (in_array($attribute->name, $allowed_attributes)) continue;
        $node->removeAttributeNode($attribute);
    }
}

$html = $dom->saveHTML($dom->getElementsByTagname('html')->item(0));

//echo $html;
        

}          

 



echo "</div>";  

/*  dokuwiki editor iframe  */
echo '<iframe src="'.$targeturl.'" id="edtop" width="100%" height="800 px"></iframe>';
 
        echo'<div id="ednavbar">
        <!--Button to invoke the 
         function to get the selected text-->
        <input type="button" value="Highlight" class="unibutton"   onpointerup="getSelectedText()">
         <!--       <input type="button" value="Highlight2"  class="unibutton" onpointerup="highlight2()" hidden="hidden" >  -->     
         <input type="button" value="Load" class="unibutton" onpointerup="loadhighlight();">  
         <input type = "button" value="Tag" class="unibutton" onclick="edittag();">
         <!-- <input type="text" id="tagarea"  class="unienter" width="48" hidden="hidden" >-->
         <input type="button" class="unibutton" value="GotoTo" onpointerup="document.getElementById(\'wanttext\').scrollIntoView();" >  

</div>';
 

echo '    
        <!--Form to show the selected text as output-->
        <form align="right"
          <input type="button" value="Go to Top " onclick="document.getElementById(\'wanttext\').scrollIntoView();" > 
          <p> </p>
 
        </form>
';
      //  <form name="testform" hidden="hidden" >
           // <textarea name="selectedtext" 
                      //rows="3"
                      //cols="20"
                     // hidden="hidden"></textarea> 
       // </form>    
  
    
    
} //end of performMyAction












}

function crc64Table() //CRC64 hasing for encoding 
{
    $crc64tab = [];
 
    // ECMA polynomial
    $poly64rev = (0xC96C5795 << 32) | 0xD7870F42;
 
    // ISO polynomial
    // $poly64rev = (0xD8 << 56);
 
    for ($i = 0; $i < 256; $i++)
    {
        for ($part = $i, $bit = 0; $bit < 8; $bit++) {
            if ($part & 1) {
                $part = (($part >> 1) & ~(0x8 << 60)) ^ $poly64rev;
            } else {
                $part = ($part >> 1) & ~(0x8 << 60);
            }
        }
 
       $crc64tab[$i] = $part;
    }
 
    return $crc64tab;
}
 
/**
* @param string $string
* @param string $format
* @return mixed
*
* Formats:
*  crc64('php'); // afe4e823e7cef190
*  crc64('php', '0x%x'); // 0xafe4e823e7cef190
*  crc64('php', '0x%X'); // 0xAFE4E823E7CEF190
*  crc64('php', '%d'); // -5772233581471534704 signed int
*  crc64('php', '%u'); // 12674510492238016912 unsigned int
*/
function crc64($string, $format = '%x')
{
    static $crc64tab;
 
    if ($crc64tab === null) {
        $crc64tab = crc64Table();
    }
 
    $crc = 0;
 
    for ($i = 0; $i < strlen($string); $i++) {
        $crc = $crc64tab[($crc ^ ord($string[$i])) & 0xff] ^ (($crc >> 8) & ~(0xff << 56));
    }
 
    return sprintf($format, $crc);
}     
