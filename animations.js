// Motion diagrams extend the existing original SVG artwork. No network requests or log changes.
function exerciseAnimation(name,slantId){
 const guide=slantId?null:exerciseGuides[name];
 const hold=slantId==='straight'||slantId==='bent'||name==='Supported balance';
 const from=slantId?slantDiagram(slantId,false):movementSVG(name,guide.poses[0]);
 const to=slantId?slantDiagram(slantId,true):movementSVG(name,guide.poses[1]);
 return `<div class="exercise-motion" data-hold="${hold}" data-motion-name="${esc(name)}"><div class="motion-heading"><span class="label">MOVEMENT DEMO</span><span class="motion-state">Loading animation</span></div><div class="motion-stage">${from}</div><template class="motion-target">${to}</template><p class="motion-caption">${hold?'Settle into position and hold still. The loop illustrates a hold, not repeated rocking. Use your session timer for the prescribed hold.':'Watch the controlled movement out and back. Demonstration speed is illustrative; follow your prescribed reps and comfortable range.'}</p><div class="motion-controls"><button type="button" data-motion-toggle aria-label="Pause ${esc(name)} animation">Pause</button><button type="button" data-motion-replay aria-label="Replay ${esc(name)} animation">Replay</button><label>Speed <select data-motion-speed aria-label="${esc(name)} animation speed"><option value="1">Normal</option><option value="0.5">Slow</option></select></label></div><p class="small">Schematic demonstration · Read the form cues and graphics below.</p></div>`;
}
function resampleMotionPoints(value,count){
 const numbers=value.trim().split(/[ ,]+/).map(Number),points=[];
 for(let i=0;i<numbers.length;i+=2)points.push([numbers[i],numbers[i+1]]);
 if(points.length===count)return value;
 const distances=[0];for(let i=1;i<points.length;i++)distances.push(distances[i-1]+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
 const total=distances.at(-1);if(!total)return Array(count).fill(points[0].join(',')).join(' ');
 return Array.from({length:count},(_,i)=>{const target=total*i/(count-1);let j=1;while(j<distances.length-1&&distances[j]<target)j++;const ratio=(target-distances[j-1])/(distances[j]-distances[j-1]||1);return points[j].map((v,k)=>(points[j-1][k]+(v-points[j-1][k])*ratio).toFixed(2)).join(',')}).join(' ');
}
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionVisibility;
function setMotionPlaying(card){
 const svg=card.querySelector('.motion-stage svg'),playing=card.dataset.userPaused!=='true'&&card.dataset.inView==='true'&&document.querySelector('#session').open&&!document.hidden;
 if(playing)svg.unpauseAnimations();else svg.pauseAnimations();
 card.querySelector('[data-motion-toggle]').textContent=card.dataset.userPaused==='true'?'Play':'Pause';
 card.querySelector('[data-motion-toggle]').setAttribute('aria-label',`${card.dataset.userPaused==='true'?'Play':'Pause'} ${card.dataset.motionName} animation`);
 card.querySelector('.motion-state').textContent=playing?'Playing':card.dataset.userPaused==='true'?'Paused':'Paused while out of view';
}
function initializeExerciseAnimations(){
 motionVisibility?.disconnect();
 motionVisibility=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.dataset.inView=String(entry.isIntersecting);setMotionPlaying(entry.target)}),{root:document.querySelector('#session'),threshold:0.15});
 document.querySelectorAll('.exercise-motion').forEach(card=>{
  const svg=card.querySelector('.motion-stage svg'),target=card.querySelector('template').content.querySelector('svg'),hold=card.dataset.hold==='true';
  svg.setAttribute('aria-label',`${card.dataset.motionName}, animated demonstration`);
  const first=Array.from(svg.querySelectorAll('path,polyline,circle,ellipse,rect')),last=Array.from(target.querySelectorAll('path,polyline,circle,ellipse,rect'));
  first.forEach((element,i)=>{
   const end=last[i];if(!end||element.tagName!==end.tagName)return;
   for(const attr of ['cx','cy','x','y','rx','ry','points','d']){
    let a=element.getAttribute(attr),b=end.getAttribute(attr);if(a===null||b===null||a===b)continue;
    if(attr==='points'){const size=Math.max(a.trim().split(/[ ,]+/).length,b.trim().split(/[ ,]+/).length)/2;a=resampleMotionPoints(a,size);b=resampleMotionPoints(b,size);element.setAttribute(attr,a);}
    if(attr==='d'&&a.replace(/-?\d*\.?\d+/g,'')!==b.replace(/-?\d*\.?\d+/g,''))continue;
    const animation=document.createElementNS('http://www.w3.org/2000/svg','animate');
    animation.setAttribute('attributeName',attr);animation.setAttribute('values',`${a};${a};${b};${b};${a}`);animation.setAttribute('keyTimes',hold?'0;0.02;0.06;0.96;1':'0;0.12;0.45;0.57;1');animation.setAttribute('keySplines','0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1');animation.setAttribute('calcMode','spline');animation.setAttribute('dur',hold?'34s':'6s');animation.dataset.baseDuration=hold?'34':'6';animation.setAttribute('repeatCount','indefinite');element.append(animation);
   }
  });
  if(hold){const indicator=document.createElementNS('http://www.w3.org/2000/svg','circle');indicator.setAttribute('cx','18');indicator.setAttribute('cy','18');indicator.setAttribute('r','5');indicator.setAttribute('fill','#789b46');const pulse=document.createElementNS('http://www.w3.org/2000/svg','animate');pulse.setAttribute('attributeName','opacity');pulse.setAttribute('values','0.35;1;0.35');pulse.setAttribute('dur','4s');pulse.dataset.baseDuration='4';pulse.setAttribute('repeatCount','indefinite');indicator.append(pulse);svg.append(indicator);}
  card.dataset.userPaused=String(motionPreference.matches);card.dataset.inView='false';svg.setCurrentTime(0);svg.pauseAnimations();setMotionPlaying(card);motionVisibility.observe(card);
 });
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-motion-toggle],[data-motion-replay]');if(!button)return;
 const card=button.closest('.exercise-motion');
 if(button.hasAttribute('data-motion-replay'))card.querySelector('.motion-stage svg').setCurrentTime(0);
 else card.dataset.userPaused=String(card.dataset.userPaused!=='true');
 setMotionPlaying(card);
});
document.addEventListener('change',event=>{if(!event.target.matches('[data-motion-speed]'))return;const card=event.target.closest('.exercise-motion'),speed=Number(event.target.value);card.querySelectorAll('animate').forEach(a=>a.setAttribute('dur',Number(a.dataset.baseDuration)/speed+'s'));card.querySelector('.motion-stage svg').setCurrentTime(0);setMotionPlaying(card)});
document.addEventListener('visibilitychange',()=>document.querySelectorAll('.exercise-motion').forEach(setMotionPlaying));
motionPreference.addEventListener('change',event=>{if(event.matches)document.querySelectorAll('.exercise-motion').forEach(card=>{card.dataset.userPaused='true';setMotionPlaying(card)})});
new MutationObserver(initializeExerciseAnimations).observe(document.querySelector('#sessionContent'),{childList:true});
document.querySelector('#session').addEventListener('close',()=>{motionVisibility?.disconnect();document.querySelectorAll('.motion-stage svg').forEach(svg=>svg.pauseAnimations())});
