var canvasInteractive=document.getElementById("ad"),Button={};Button.glowAng=-Math.PI/2,Button.glowCounter=0,Button.glowMax=0,Button.ang=0,Button.alpha=0,Button.isOver=!1,Button.clickable=!0,Button.ownCanvas=!1,Button.rotation=0;var drawButton=function(t){Button.ownCanvas&&t.clearRect(0,0,w,h),t.save(),t.translate(Button.x,Button.y),t.scale(Button.scale,Button.scale),t.rotate(Button.rotation),t.globalAlpha=Button.alpha,t.beginPath(),t.moveTo(67,-15),t.quadraticCurveTo(67,-18,64,-18),t.lineTo(-64,-18),t.quadraticCurveTo(-67,-18,-67,-15),t.lineTo(-67,15),t.quadraticCurveTo(-67,18,-64,18),t.lineTo(64,18),t.quadraticCurveTo(67,18,67,15),t.lineTo(67,-15),t.closePath(),t.translate(-67,-18);var o=t.createPattern(Button.pic,"repeat");if(t.fillStyle=o,t.shadowColor="black",t.shadowBlur=10,t.shadowOffsetY=2,t.fill(),t.shadowColor="transparent",t.translate(67,18),t.shadowColor="#8E1A0D",t.shadowBlur=0,t.shadowOffsetX=1,t.shadowOffsetY=1,t.textBaseline="middle",t.textAlign="center",t.fillStyle="#FFFFFF",t.font="bold 10pt "+font||"Arial",t.fillText("ИГРАЙ БЕСПЛАТНО",0,0),Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100>0){var n=t.createLinearGradient(-70*Math.cos(Button.glowAng),-70*Math.sin(Button.glowAng),70*Math.cos(Button.glowAng),70*Math.sin(Button.glowAng));n.addColorStop(.9,"rgba(255, 255, 255, 0)"),n.addColorStop(.53,"rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")"),n.addColorStop(.47,"rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")"),n.addColorStop(.1,"rgba(255, 255, 255, 0)"),t.fillStyle=n,t.globalCompositeOperation="lighter",t.fill()}t.restore()};function showButton(){Button.alpha=1.2,Button.glowAng=-Math.PI/2,Button.scale=1,Button.glowCounter=0,Button.isOver=!1,Button.outComp=!0,setButtonMouse(),TweenLite.from(Button,.8,{scale:1.8,alpha:0,ease:Bounce.easeOut,onUpdate:onUpdateButton,onUpdateParams:[Button.ctx]})}function setButtonMouse(){canvasInteractive.addEventListener("mousemove",buttonMove,!1),canvasInteractive.addEventListener("mouseout",buttonOut,!1),canvasInteractive.addEventListener("click",buttonClick,!1),Button.glowCounter<Button.glowMax&&showGlow()}function showGlow(){Button.glowCounter++,Button.glowAng=-Math.PI/2,TweenLite.to(Button,2,{glowAng:3*Math.PI/2,ease:Power1.easeOut}),Button.glowCounter<Button.glowMax&&TweenLite.delayedCall(5,showGlow)}function buttonClick(t){mousePos=getMousePos(t),1==hitTestButton(mousePos)&&1==Button.clickable&&setURL()}function buttonMove(t){mousePos=getMousePos(t),0==Button.isOver&&1==hitTestButton(mousePos)&&(Button.isOver=!0,buttonOver()),1==Button.isOver&&0==hitTestButton(mousePos)&&(Button.isOver=!1,buttonOut())}function hitTestButton(t){var o=Button.x-Button.pic.width*Button.scale/2,n=Button.y-Button.pic.height*Button.scale/2;return t.x>o&&t.x<o+Button.pic.width*Button.scale&&t.y>n&&t.y<n+Button.pic.height*Button.scale}function hideButton(){TweenLite.killTweensOf(Button),TweenLite.to(Button,.2,{alpha:0,scale:.8,ease:Power1.easeOut,onUpdate:onUpdateButton,onUpdateParams:[Button.ctx]}),canvasInteractive.removeEventListener("mousemove",buttonMove,!1),canvasInteractive.removeEventListener("mouseout",buttonOut,!1),canvasInteractive.removeEventListener("click",buttonClick,!1)}function buttonOver(t){Button.outComp=!0,TweenLite.to(Button,.2,{scale:1.14,ease:Back.easeOut,onUpdate:onUpdateButton,onUpdateParams:[Button.ctx]})}function buttonOut(t){1==Button.outComp&&(Button.outComp=!1,TweenLite.to(Button,.2,{scale:1,ease:Back.easeOut,onUpdate:onUpdateButton,onUpdateParams:[Button.ctx],onComplete:function(){Button.outComp=!0}}))}function onUpdateButton(t){1==Button.ownCanvas&&Button.drawButton(t)}