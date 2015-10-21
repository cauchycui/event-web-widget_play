(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

function parseData(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<p> <eventTitle>'+  arr[i].occasion + '</eventTitle>' +  '<br>' +
                         'invites: ' +           arr[i].invited_count        +   '<br>'      +
                     'Date: ' +              arr[i].year + '/' + arr[i].month + '/' + arr[i].day +
        
        '</p><br>';
    }
    
    document.getElementById("widget-container").innerHTML = out;
    
}

 function jsonCallback(jsonObject){
               alert(jsonObject.start.count);
           }

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 
        /******* Load CSS *******/
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "style.css" 
        });
        css_link.appendTo('head');          

        /******* Load HTML *******/
        var jsonp_url = "data.json";
        $.getJSON(jsonp_url, function(data) {
       //   $('#widget-container').html("Events: " + data.html);
       console.log(data); 
       parseData(data.events);
       
        });
    });
}

})();