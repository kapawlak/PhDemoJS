/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////// This file contains the physics simulation ///////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

 

// Default Conditions //////////////////////////
var x_d=-40.0, vx_d=50.0, y_d=0.0, vy_d=0.0 //Kinematic
var b_d=0.2, t_d=0.0 //External
var q_d=1.0, m_d=1.0// Particle

// User Conditions //////////////////////////
var x_0=x_d, vx_0=vx_d, y_0=y_d, vy_0=vy_d //Kinematic
var b_0=b_d, t_0=0 //External
var q_0=1, m_0=1 // Particle
var t_live=t_0
var tf=1
var t_in=Math.abs(x_0/vx_0), t_out=t_in+ Math.abs( Math.PI/((-q_0 /m_0)*b_0*1.0))
var A = Math.sqrt(vx_0*vx_0 +vy_0*vy_0)*1.0
var w = (-q_0 /m_0)*b_0*1.0

// Data ////////////////////////////////////////
var x=[], vx=[], y=[], vy=[]
var x_live=[x_0], y_live=[y_0]

// Simulation Parameters ///////////////////////
var dt=Math.abs(0.025), steps=10000.0


// Equations of Motion /////////////////////////
function B_traj(t,x0,y0){
  
  A = Math.sqrt(vx_0*vx_0 +vy_0*vy_0)*1.0
  w = (-q_0 /m_0)*b_0

  x_now =  x0+ (A/w)*Math.sin(w*t) 
  y_now = 1.0*y0 -  (A/w)*(Math.cos(w*t)-1)
  vx_now =  (m_0/2)*A*Math.cos(w*t) 
  vy_now = (m_0/2)*A*Math.sin(w*t)
  return [x_now,y_now,vx_now,vy_now]
  
}

function trajectory_compute(){
  A = Math.sqrt(vx_0*vx_0 +vy_0*vy_0)*1.0
  w = (-q_0 /m_0)*b_0*1.0
  if(b_0==0){
    t_in=100000000
    t_out=1000000000
  }else{
  t_in=Math.abs(x_0/vx_0)
  t_out=t_in+ Math.abs( 1.0*Math.PI/w)
  }
  x=[x_0]
  y=[y_0]
  vx=[vx_0]
  vy=[vy_0]
  var t_cross=0, y_cross=y_0, x_cross=0
  console.log('called')
  if(b_0==0){
    for (t=1;t<steps-1;t++){
    vx.push(vx[t-1])
    vy.push(vy[t-1])
    x.push(1.0*x[t-1]+1.0*dt*vx[t-1])
    y.push(1.0*y[t-1]+1.0*dt*vy[t-1])
    if(x[t-1]>60){
        tf=t
        break
      }
    }
  }else{
  for (t=1;t<steps-1;t++){
    if(x[t-1]>=0 && t*dt<t_out){
      console.log('b_traj')
      xy=B_traj(Number(t*dt-t_in),x_cross,y_cross)  
      x.push(xy[0])
      y.push(xy[1])
      vx.push(xy[2])
      vy.push(xy[3])
      console.log(xy)
    }else if(x[t-1]<0 && t*dt<t_out){
      console.log('v in')
      vx.push(vx[t-1])
      vy.push(vy[t-1])
      x.push(1.0*x[t-1]+1.0*dt*vx[t-1])
      y.push(1.0*y[t-1]+1.0*dt*vy[t-1])
      t_cross=t
    //  y_cross=y[t-1]
    }else{
      console.log('v out')
      vx.push(-vx_0)
      vy.push(-vy_0)
      x.push(-1.0*(t*dt-t_out)*vx_0)
      y.push(1.0*y_0 +2*(A/w))
    //  y_cross=y[t-1]
    }
    if(x[t-1]<-40){
      tf=t
      break;
    }else if(x[t-1]>60){
      tf=t
      break;
    }
    }

   
  }
  trace_particle_traj.x=x.slice(0,t_live)
  trace_particle_traj.y=y.slice(0,t_live)
}


// Initialize the Simulation ///////////////////
function initialize(){
}

function reset_all(){
x_0=x_d, vx_0=vx_d, y_0=y_d, vy_0=vy_d //Kinematic
b_0=b_d, t_0=0 //External
q_0=1, m_0=1 // Particle
}

    
// update loop that terminates when the ball hits the ground. not sure how to interupt it onclick yet.
function update() {
  compute()
  Plotly.animate('graph', 
  {
    data: [trace_particle_traj, trace_particle], 
    layout: layout},
  {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false
    }
  }
  )
  if(t_live<tf && !quit_run){
  requestAnimationFrame(update)
  }

}

function compute(){
  
  x_live=[x_0], y_live=[y_0]
  x_live=[x[t_live]]
  y_live=[y[t_live]]
 // console.log(x_live)
  trace_particle.x=x_live
  trace_particle.y=y_live
  trace_particle_traj.x=x.slice(0,t_live)
  trace_particle_traj.y=y.slice(0,t_live)
  t_live+=2
}
    
    
    
   