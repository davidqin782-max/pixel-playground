function parkour(){
  let x=135,y=340,vy=0,ground=340,speed=5,started=false,gameOver=false,runFrame=0,dashing=0;
  const dashLength=profile.purchases.hyperDash?34:22;
  const coinValue=profile.purchases.coinBoost?300:150;
  let barriers=[{x:430,w:28,h:65},{x:675,w:42,h:90},{x:940,w:30,h:55}];
  let energy=[{x:260,y:270},{x:360,y:205},{x:475,y:145},{x:600,y:245},{x:735,y:180},{x:850,y:285}];
  function frame(){
    if(!running)return;
    bg('#090b20');ctx.fillStyle='#11183d';ctx.fillRect(0,0,900,480);ctx.strokeStyle='#263b82';ctx.lineWidth=2;
    for(let gx=-40;gx<940;gx+=45){ctx.beginPath();ctx.moveTo(gx,480);ctx.lineTo(450+(gx-450)*.25,290);ctx.stroke()}
    for(let gy=305;gy<480;gy+=28){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(900,gy);ctx.stroke()}
    ctx.fillStyle='#141c4b';for(let i=0;i<12;i++){let bx=i*95-(score*2%95);ctx.fillRect(bx,185-(i%4)*22,48,155+(i%3)*20)}ctx.fillStyle='#ff2bd6';ctx.fillRect(0,405,900,5);
    if(gameOver&&(keys['r']||keys[' '])){startGame('parkour');return}
    if(keys[' ']||keys['arrowup']){started=true;if(y>=ground)vy=-15}
    if(keys['shift']&&started&&dashing<=0){dashing=dashLength;speed=profile.purchases.hyperDash?12:10}
    if(started&&!gameOver){runFrame++;vy+=.7;y+=vy;if(y>ground){y=ground;vy=0}barriers.forEach(o=>o.x-=speed);energy.forEach(e=>e.x-=speed);while(energy.length<6){let last=energy[energy.length-1];energy.push({x:Math.max(920,last?last.x+80:920),y:135+Math.random()*165})}score+=.15;dashing--;if(dashing===0)speed=5;if(barriers[0].x+barriers[0].w<0){let last=barriers[barriers.length-1];barriers.shift();barriers.push({x:Math.max(980,last.x+185+Math.random()*125),w:24+Math.random()*26,h:42+Math.random()*48})}if(energy[0]&&energy[0].x<0)energy.shift();energy=energy.filter(e=>{if(Math.abs(e.x-x)<30&&Math.abs(e.y-(y-18))<35){score+=coinValue;speed=Math.min(profile.purchases.hyperDash?12:8,speed+.4);return false}return e.x>-30});if(y>ground-28&&barriers.some(o=>o.x<x+20&&o.x+o.w>x-12&&y+8>ground-o.h)&&dashing<=0){started=false;gameOver=true;y=ground;messageEl.textContent='RUN OVER';livesEl.textContent='♥ ♥ ♡';speed=5}}
    barriers.forEach(o=>{ctx.shadowBlur=14;ctx.shadowColor='#ff2bd6';ctx.fillStyle='#ff2bd6';ctx.fillRect(o.x,ground+35-o.h,o.w,o.h);ctx.shadowBlur=0;ctx.fillStyle='#ffd23f';ctx.fillRect(o.x+7,ground+43-o.h,5,o.h-15)});
    energy.forEach(e=>{ctx.shadowBlur=18;ctx.shadowColor='#35f6ff';ctx.fillStyle='#35f6ff';ctx.fillRect(e.x-7,e.y-7,14,14);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.fillRect(e.x-2,e.y-2,4,4)});
    if(dashing>0){ctx.fillStyle='rgba(53,246,255,.45)';ctx.fillRect(x-55,y-24,45,7);ctx.fillRect(x-80,y-11,65,5)}
    let airborne=y<ground-2,bob=started&&!gameOver&&!airborne?Math.floor(runFrame/5)%2:0;ctx.fillStyle='#35f6ff';ctx.shadowBlur=14;ctx.shadowColor='#35f6ff';ctx.fillRect(x,y-28+bob,23,28);ctx.shadowBlur=0;ctx.fillStyle='#090b20';ctx.fillRect(x+5,y-20+bob,4,4);ctx.fillRect(x+16,y-20+bob,4,4);ctx.fillStyle='#ff2bd6';if(airborne){ctx.shadowBlur=10;ctx.shadowColor='#ff2bd6';ctx.fillRect(x-3,y+1,11,7);ctx.fillRect(x+17,y+1,11,7);ctx.shadowBlur=0;ctx.fillStyle='rgba(53,246,255,.45)';ctx.fillRect(x-11,y+13,10,4);ctx.fillRect(x+24,y+13,10,4)}else{let step=started&&!gameOver&&runFrame%10<5?5:-2;ctx.fillRect(x+2,y+step,9,7);ctx.fillRect(x+16,y-step,9,7)}
    if(gameOver){ctx.fillStyle='rgba(9,11,32,.84)';ctx.fillRect(145,105,610,250);ctx.strokeStyle='#ff2bd6';ctx.lineWidth=3;ctx.strokeRect(145,105,610,250);text('RUN OVER',450,175,42,'#ff2bd6','center');text(`FINAL SCORE  ${String(Math.floor(score)).padStart(4,'0')}`,450,225,17,'#ffd23f','center');text('PRESS R OR SPACE TO RESTART',450,280,16,'#35f6ff','center');text('OR USE THE RESTART BUTTON BELOW',450,310,11,'#f4eee5','center')}else if(!started)text('SPACE TO JUMP  ·  SHIFT TO DASH',450,210,18,'#35f6ff','center');hud();raf=requestAnimationFrame(frame)
  }frame();
}
