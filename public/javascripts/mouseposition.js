/**********************************************************\
* This notice must stay intact for use                     *
* Visit http://www.EhudAshkenazi.com for more information  *
* http://ehudashkenazi.com/mouse-pointer-location-browser *
\**********************************************************/

// global variables to hold mouse position and detect IE
var iMouseX;
var iMouseY;
var IEDetected;
IEDetected = document.all;

// attach event listeners to capture mouse movement events
// check if IE
if (IEDetected)
{
     // IE detected - attach event listeners
     document.attachEvent("onmousemove",trackMouseLocationXY);
     document.attachEvent("onclick",saveMouseLocationXY);
}
else
{
     // Not IE � add event listeners
     document.addEventListener("mousemove",trackMouseLocationXY,false);
     document.addEventListener("click",saveMouseLocationXY,false);
} 

// tracks the location of the mouse and displays it in a small tooltip next to the mouse cursor
function trackMouseLocationXY(e)
{
    // get mouse cursor location
    getMouseLocationXY(e);
    
    // display mouse cursor location inside div and position the div next to the cursor
    document.getElementById("MoveLocation").innerHTML = nick;
    document.getElementById("MoveLocation").style.top = iMouseY+10+"px";
    document.getElementById("MoveLocation").style.left = iMouseX+10+"px";
    document.getElementById("MoveLocation").style.display = "block";
    defer(function(){
        socket.emit("mousemoving", {iMouseY: iMouseY, iMouseX: iMouseX, nick: nick});        
    },10);
    
}

function displayMouse(position){
    var id = position.nick;
    if (document.getElementById(position.nick) == undefined){
        $('body').append('<div class="other" id='+id+'></div>');
        console.log('div created!');
    }
    
    // display mouse cursor location inside div and position the div next to the cursor
    document.getElementById(position.nick).innerHTML = position.nick;
    document.getElementById(position.nick).style.top = position.iMouseY+"px";
    document.getElementById(position.nick).style.left = position.iMouseX+"px";
    document.getElementById(position.nick).style.display = "block";    
}
// saves the location of the mouse and displays it in browser window
function saveMouseLocationXY(e)
{
    // get mouse cursor location
    getMouseLocationXY(e);
}

// gets the location of the mouse inside the browser window
function getMouseLocationXY(e)
{
    // check if IE
    if (document.all) 
    { 
        iMouseX = event.clientX;
        iMouseY = event.clientY;
    }
    else
    {  
        iMouseX = e.pageX;
        iMouseY = e.pageY;
    }  
}
