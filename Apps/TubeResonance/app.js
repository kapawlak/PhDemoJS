
////////////////////Canvas Variables//////////////////////////////////
var canvas_sim=document.getElementById('sim_canvas')
var ctx_i = canvas_sim.getContext('2d');


var len_slider=document.getElementById("length")


/////Audio
var audioCtx= new AudioContext()
var o = audioCtx.createOscillator()
var  g = audioCtx.createGain()

o.connect(g)
g.gain.value=1
o.type = "sine"
o.frequency.setValueAtTime(170, audioCtx.currentTime)
g.connect(audioCtx.destination)



///////////////////Format Options/////////////////////////////////////
var color_tube='rgba( 17, 17, 17, 0.4)';
var color_tube_end='rgba(191,191, 191, 1)';

//////////////////Time////////////////////////////////////////////////

//Real time
var time = new Date();
var t0=new Date().valueOf()


//////////////////Geometry Options////////////////////////////////////
  //Get Canvas Size
  var c_w=canvas_sim.width//get canvas size
  var c_h=canvas_sim.height 
  var c_c=[c_w*0.5,c_h*0.5]
  var slider_len=0


  //wavelength
  var lambda=100

  //volume graph

  voldivs=500

  var volume=[]
  for(i=0;i<voldivs;i++){
    volume.push(50)
  }

 


  
//////////////////Update Functions////////////////////////////////////


/////////////////////////////////////////////////////////////


// Arrow drawing function
function canvas_arrow(context, fromx, fromy, tox, toy, headl) {
  //var headlen = 10; // length of head in pixels
  var headlen= 5//Math.floor(headl)
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

//ArrowHead
function canvas_arrowhead(context, fromx, fromy, headl) {
  //var headlen = 10; // length of head in pixels
  var headlen= Math.floor(headl)
  context.moveTo(fromx - headlen, fromy-0.6*headlen);
  context.lineTo(fromx, fromy);
  context.lineTo(fromx - headlen, fromy+0.6*headlen);
  context.closePath();
  context.fill()
}
//ArrowHead
function canvas_arrowhead_rot(context, tipx, tipy, headl, angle) {
  //var headlen = 10; // length of head in pixels
  var headlen= Math.floor(headl)
  //context.moveTo(tipx - headlen, tipy-0.6*headlen);
  var angle_true =angle
  if(vel<0){
    angle_true=angle+(1.4)*Math.PI

  }
  
  context.moveTo(tipx, tipy);
  context.lineTo(tipx - headlen*Math.cos(angle_true), tipy- headlen*Math.sin(angle_true));
  context.stroke()
}
// Labeled Point Drawing function
function labeled_point(ctx,x_p,y_p,x_l,y_l,pointsize, l_text){
  ctx.moveTo(x_p,y_p)
  if(pointsize>0){
    ctx.arc(x_p, y_p, pointsize, 0, 2 * Math.PI, false);
  }
  ctx.fillText(l_text, x_p+x_l, y_p+y_l)
}




///////////////////////////Draw Loop////////////////////////////////////////////////////

var ear_img=new Image()
ear_img.src='https://kapawlak.github.io/PhDemoJS/Apps/TubeResonance/ear.png'

var spk_img=new Image()
spk_img.src='https://kapawlak.github.io/PhDemoJS/Apps/TubeResonance/speaker.png'


function draw() {
  
  //Clear draw area
  // ctx_i.globalCompositeOperation = 'source-over';
  ctx_i.clearRect(0, 0, c_w, c_h); // clear canvas
  ctx_i.lineWidth = 2;

  //Image Draw
  
  ctx_i.drawImage(ear_img, 0.53*c_w+1*slider_len,0.45*c_h,40,50)
  ctx_i.drawImage(spk_img, 0,0.45*c_h,35,45)


 //Cosine wave draw
  ctx_i.beginPath();
  ctx_i.strokeStyle = "blue";
  ctx_i.moveTo(50,0.6*c_h)
  for(i=1;i<1000;i++){
    dx=i*(0.4*c_w+1*slider_len)/1000
    ctx_i.lineTo(50+dx+1,0.5*c_h+0.1*c_h*Math.cos(Math.PI*dx/lambda))
  }
  ctx_i.stroke();

 
  ctx_i.strokeStyle = "red";
  ctx_i.beginPath();
  ctx_i.moveTo(50,0.4*c_h)
  for(i=1;i<1000;i++){
    dx=i*(0.4*c_w+1*slider_len)/1000
    ctx_i.lineTo(50+dx+1,0.5*c_h-0.1*c_h*Math.cos(Math.PI*dx/lambda))
  }
  ctx_i.stroke();

  //Tube Draw
    ctx_i.fillStyle = color_tube;
    ctx_i.beginPath();
    ctx_i.rect(50 , 0.4*c_h, 0.4*c_w+1*slider_len, 0.2*c_h);
    ctx_i.fill()
  
    
    ctx_i.lineWidth = 2;
   
   

    ////Tube Caps ///////////////////////////////////////////////////
    ctx_i.strokeStyle='black'
    ctx_i.fillStyle = color_tube_end;
    ctx_i.beginPath();
    ctx_i.lineWidth = 2;
    ctx_i.ellipse(50, 0.5*c_h, 10, 0.1*c_h, 0, 0,2* Math.PI )
    ctx_i.stroke();
    ctx_i.fill();
  
    ctx_i.fillStyle = color_tube;
    ctx_i.beginPath();
    ctx_i.ellipse(50+0.4*c_w+1*slider_len, 0.5*c_h, 10, 0.1*c_h, 0,-0.5*Math.PI,0.5*Math.PI )
    ctx_i.stroke();
    ctx_i.fill()
  
    ctx_i.fillStyle = 'rgb(95,95,95)'
    ctx_i.strokeStyle='rgb(75,75,75)'
    ctx_i.setLineDash([5, 5]);
    ctx_i.beginPath();
    ctx_i.ellipse(50+0.4*c_w+1*slider_len, 0.5*c_h, 10, 0.1*c_h, Math.PI, -0.5* Math.PI,0.5* Math.PI )
    ctx_i.stroke();
    ctx_i.strokeStyle='black'
  
  
    ctx_i.setLineDash([]);
    
    ctx_i.beginPath()
    ctx_i.moveTo(50 , 0.4*c_h)
    ctx_i.lineTo(50+0.4*c_w+1*slider_len,0.4*c_h)
    ctx_i.moveTo(50 , 0.6*c_h) 
    ctx_i.lineTo(50+0.4*c_w+1*slider_len,0.6*c_h)
    ctx_i.stroke()


    ///////////////////////////////////////////////////////  
  ctx_i.lineWidth = 3;
  // Volume Meter Draw
  ctx_i.strokeStyle = "black";
  ctx_i.fillStyle = "white";
  ctx_i.beginPath();
  ctx_i.rect(20 , 0.7*c_h-5, c_w-40, 0.2*c_h +10);
  ctx_i.stroke();
  ctx_i.fill()
  ctx_i.lineWidth = 1.5;
  ctx_i.beginPath();
  ctx_i.moveTo(21,0.8*c_h-volume[0])
  for(i=0;i<voldivs;i++){
    ctx_i.lineTo(21+( (c_w-40)/voldivs)*i,0.8*c_h-volume[i])
  }
  ctx_i.stroke();

  volume.shift()
  volume.push(volume_func(Math.cos(Math.PI*((0.4*c_w+1*slider_len))/(0.5*lambda))))

  //g.gain.value=0.01*volume[voldivs-1]
  if(!is_muted){
  g.gain.value=0.01*(volume[voldivs-1]+50)
  }

  
  ctx_i.strokeStyle = "blue";
  ctx_i.fillStyle = "blue";
  ctx_i.beginPath();
  ctx_i.rect(c_w-25 , 0.7*c_h-6, 20, 0.2*c_h +12);
  ctx_i.stroke();
  ctx_i.fill()



  ctx_i.fillStyle = "white";
  ctx_i.beginPath();
  ctx_i.rect(c_w-24 , 0.7*c_h-4, 18,50- volume[voldivs-1]);
  ctx_i.fill()

  ctx_i.font = "20px Georgia";
  ctx_i.textAlign = "center";
  ctx_i.fillStyle='black'
  ctx_i.fillText('perceived volume', c_w/2, 0.95*c_h)
  

  window.requestAnimationFrame(draw);
}

draw()



function changelen(){
  slider_len=len_slider.value
  document.getElementById("currentval").innerHTML= (1.0*(2+0.01*len_slider.value)).toFixed(2)
}



function volume_func(a){
  half_wid=0.3
  invval= (1+ ((1-a)/half_wid)**2)

  return 100/invval-50
}

mutebutt=document.getElementById("mutebutt")
var is_playing=0
var is_muted=0
function voiceMute() {

  if (is_playing==0){
    o.start()
    is_playing=1
  }

  if(mutebutt.id == "") {
    // 0 means mute. If you still hear something, make sure you haven't
    // connected your source into the output in addition to using the GainNode.
    g.gain.setValueAtTime(0, audioCtx.currentTime);
    mutebutt.id = "activated";
    mutebutt.innerHTML = "Unmute";
    is_muted=1
  } else {
    g.gain.setValueAtTime(1, audioCtx.currentTime);
    mutebutt.id = "";
    mutebutt.innerHTML = "Mute";
    is_muted=0
  }
}