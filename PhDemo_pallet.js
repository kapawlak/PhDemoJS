// pallet
var sim_color = 'white'//'#c5e8d4'
var sim_border= 'rgb(4, 54, 46)'
var graph_font_color= 'white'//'263D42'
var blurb_color="rgba(255,255,255,0.2)"
var blurb_font='white' //"#263D42"
var blurb_font_fam= 'roboto, arial, sans-serif';
var obj_color= "8E6C88"
var obj_font= "white"
var marker_color="8E6C88"



var sims=document.getElementsByClassName("sim")
var blurbs= document.getElementsByClassName("blurb")
var objs= document.getElementsByClassName("object")

for (i=0; i<sims.length; i++){
  sims[i].style.backgroundColor=sim_color
  sims[i].style.borderColor=sim_border
}
for (i=0; i<blurbs.length; i++){
  blurbs[i].style.backgroundColor=blurb_color
  blurbs[i].style.color=blurb_font
  blurbs[i].style.fontFamily=blurb_font_fam
}

for (i=0; i<objs.length; i++){
  objs[i].style.backgroundColor=obj_color
  objs[i].style.color=obj_font
}


function sendHeight()
{
    //if(parent.postMessage)
    {
        // replace #wrapper with element that contains 
        // actual page content
        var height= document.body.scrollHeight;
        parent.postMessage(height, '*');
        
    }
}

// Create browser compatible event handler.
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen for a message from the iframe.
eventer(messageEvent, function(e) {

    //if (isNaN(e.data)) return;

    sendHeight();

}, 
false);