let ball = []
ball=document.getElementById("ball")
let currentDroppable = null;
var coordsnow = [0,0]

for (i=0;i<2;i++){
ball.onmousedown = function(event) {

  ball=ball
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);
 
  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
    coordsnow=[ pageX - shiftX,pageY - shiftY]
    ball.innterHTML= coordsnow
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');
    if (currentDroppable != droppableBelow) {
      if (currentDroppable) { // null when we were not over a droppable before this event
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) { // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

}
};

function enterDroppable(elem) {
  elem.style.background = 'pink';
}

function leaveDroppable(elem) {
  elem.style.background = '';
}

ball.ondragstart = function() {
  return false;
};


///////////////////////////////////////

var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

  window.requestAnimationFrame(draw);
}


function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}


function draw() {
  var ctx = document.getElementById('cnv').getContext('2d');
  var color_wire='rgba(191, 201, 199, 0.98)';
  var time = new Date();

  function abs_time(speed){
    return 0.0001*speed*(time.valueOf())
    //return speed*((1 / 6) * time.getSeconds() +(1/6000)* time.getMilliseconds())
  }
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 600, 600); // clear canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';

  // Point on loop
  angle_start= -0.5*Math.PI
  function angle_motion(){
    return (10*((2 * Math.PI) / 60) * time.getSeconds() +10* ((2 * Math.PI) / 60000) * time.getMilliseconds());
  }
  var new_pos = [75* Math.sin(angle_start)+150,50* Math.cos(angle_start)+150] 
    
  ctx.beginPath();
  ctx.lineWidth=1.0
  ctx.strokeStyle = 'rgba(0, 8, 0, 1)';
  canvas_arrow(ctx, new_pos[1],600, parseInt(ball[0].style.left,10), parseInt(ball[0].style.top,10))
  ctx.stroke();

  //r vec
  ctx.beginPath();
  ctx.lineWidth=1.0
  ctx.strokeStyle = 'rgba(0, 8, 0, 1)';
  ctx.moveTo(abs_time(400)%300, 150)
  ctx.lineTo(new_pos[1],new_pos[0]);
  canvas_arrow(ctx, new_pos[1],new_pos[0], abs_time(400)%300, 150)
  ctx.stroke();
  

  //top layer wire
  ctx.beginPath();
  ctx.lineWidth= 4;
  ctx.strokeStyle = color_wire;
  ctx.moveTo(0, 150)
  ctx.lineTo(150, 150)
  canvas_arrow(ctx, 0, 150, (abs_time(1000) )% 160 ,150)
  canvas_arrow(ctx, 0, 150, (abs_time(1000) +75 )% 160 ,150)
  ctx.stroke();
  ctx.save();
  ctx.translate(150, 150);


  

  
  
  ctx.scale(0.5,0.75)
  ctx.rotate(angle_motion());
  ctx.scale(1.0,1.0)
  ctx.translate(100, 0);
  //ctx.drawImage(earth, -12, -12);



  
  ctx.restore();


  ctx.beginPath();
  ctx.lineWidth=3.0
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.5)';
  ctx.ellipse(150, 150, 50, 75, Math.PI , 0, 2 * Math.PI);
  ctx.stroke();


  ctx.beginPath();
  ctx.lineWidth= 4
  ctx.strokeStyle = color_wire;
  ctx.moveTo(0, 150)
  ctx.lineTo(300, 150)
  canvas_arrow(ctx, 150, 150, (( abs_time(1000))% 160)+160 , 150)
  canvas_arrow(ctx, 150, 150, (( abs_time(1000)+75)% 160)+160 , 150)
  ctx.stroke();

  

 
  //ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);
}

init();
