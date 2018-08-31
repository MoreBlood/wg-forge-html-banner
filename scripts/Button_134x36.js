/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2017 ALL RIGHTS RESERVED                 --------------
----------------------------------------------------------------------------------------
--------------                        VERSION: 1.20                       --------------
--------------------------------------------------------------------------------------*/
/* eslint-disable */

//var font = 'Arial';
var canvasInteractive = document.getElementById('ad');

var Button = {}
Button.glowAng = -Math.PI/2;
Button.glowCounter = 0;
Button.glowMax = 0;
Button.ang = 0;
Button.alpha = 0;
Button.isOver = false;
Button.clickable = true;
Button.ownCanvas = false;
Button.rotation = 0;

var drawButton = function(ctx) {
	if(Button.ownCanvas)
	{
		ctx.clearRect(0, 0, w, h);
	}
	
	ctx.save();
	ctx.translate(Button.x,Button.y);
	ctx.scale(Button.scale,Button.scale);
	ctx.rotate(Button.rotation)
	ctx.globalAlpha = Button.alpha;

	ctx.beginPath();
	ctx.moveTo(67,-15);
	ctx.quadraticCurveTo(67,-18,64,-18);
	ctx.lineTo(-64,-18);
	ctx.quadraticCurveTo(-67,-18,-67,-15);
	ctx.lineTo(-67,15);
	ctx.quadraticCurveTo(-67,18,-64,18);
	ctx.lineTo(64,18);
	ctx.quadraticCurveTo(67,18,67,15);
	ctx.lineTo(67,-15);
	ctx.closePath();

	ctx.translate(-67, -18);
	var pattern = ctx.createPattern(Button.pic, 'repeat');
	ctx.fillStyle = pattern;
	ctx.shadowColor = "black";
	ctx.shadowBlur = 10;
	ctx.shadowOffsetY = 2;
	ctx.fill();
	ctx.shadowColor = "transparent";
	ctx.translate(+67, +18);		
	
	ctx.shadowColor = "#8E1A0D";
	ctx.shadowBlur = 0; 
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#FFFFFF";
	
//drawButtonText1_Ru
	ctx.font = "bold 10pt "+ font || 'Arial';
	ctx.fillText("ИГРАЙ БЕСПЛАТНО", 0, 0);
//
	if(Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100 > 0)
	{
		var grd = ctx.createLinearGradient(Math.cos(Button.glowAng)*-70,Math.sin(Button.glowAng)*-70,Math.cos(Button.glowAng)*70,Math.sin(Button.glowAng)*70);
		grd.addColorStop(0.9, "rgba(255, 255, 255, 0)");
		grd.addColorStop(0.53, "rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")");
		grd.addColorStop(0.47, "rgba(255, 255, 255, "+Math.round((Math.sin(Button.glowAng)+1)/2.5*100)/100+")");		
		grd.addColorStop(0.1, "rgba(255, 255, 255, 0)");			
		ctx.fillStyle = grd;		
		ctx.globalCompositeOperation = "lighter";
		ctx.fill();		
	}	
	ctx.restore();	
};

function showButton()
{
	Button.alpha = 1.2;
	Button.glowAng =  -Math.PI/2;
	Button.scale = 1;	
	Button.glowCounter = 0;
	Button.isOver = false;
	Button.outComp = true;	
	setButtonMouse();
	TweenLite.from(Button, 0.8, {scale:1.8, alpha:0, ease: Bounce.easeOut, onUpdate:onUpdateButton, onUpdateParams:[Button.ctx]});
}

function setButtonMouse()
{
	canvasInteractive.addEventListener('mousemove', buttonMove, false);
	canvasInteractive.addEventListener('mouseout', buttonOut, false);	
	canvasInteractive.addEventListener('click', buttonClick, false);	
	if(Button.glowCounter < Button.glowMax)
	{
		showGlow();
	}	
}

function showGlow()
{	
	Button.glowCounter++;
	Button.glowAng =  -Math.PI/2;
	TweenLite.to(Button, 2, {glowAng:3*Math.PI/2, ease:Power1.easeOut});	
	if(Button.glowCounter < Button.glowMax)
	{
		TweenLite.delayedCall(5, showGlow);
	}	
}

function buttonClick(evt)
{
	mousePos = getMousePos(evt);
	if(hitTestButton(mousePos)==true&&Button.clickable==true)
	{
		setURL();
	}
}

function buttonMove(evt)
{
	mousePos = getMousePos(evt);
	if(Button.isOver==false&&hitTestButton(mousePos)==true)
	{
		Button.isOver = true;				
		buttonOver();
	}	
	if(Button.isOver==true&&hitTestButton(mousePos)==false)
	{
		Button.isOver = false;					
		buttonOut();
	}
}

function hitTestButton(mousePos)
{
	var leftBorder = Button.x-Button.pic.width*Button.scale/2;
	var topBorder = Button.y-Button.pic.height*Button.scale/2;
	if(mousePos.x > leftBorder && mousePos.x < (leftBorder + Button.pic.width*Button.scale) && mousePos.y > topBorder && mousePos.y < topBorder+Button.pic.height*Button.scale)
	{		
		return true;
	}
	else
	{	
		return false;	
	}		
}

function hideButton()
{
	TweenLite.killTweensOf(Button);
	TweenLite.to(Button, 0.2, {alpha:0, scale:0.8, ease:Power1.easeOut, onUpdate:onUpdateButton, onUpdateParams:[Button.ctx]});
	canvasInteractive.removeEventListener('mousemove', buttonMove, false);
	canvasInteractive.removeEventListener('mouseout', buttonOut, false);	
	canvasInteractive.removeEventListener('click', buttonClick, false);
}

function buttonOver(e)
{		
	Button.outComp = true;
	TweenLite.to(Button, 0.2, {scale:1.14, ease: Back.easeOut, onUpdate:onUpdateButton, onUpdateParams:[Button.ctx]});				
}
function buttonOut(e)
{	
	if(Button.outComp==true)
	{
		Button.outComp = false;
		TweenLite.to(Button, 0.2, {scale:1, ease: Back.easeOut, onUpdate:onUpdateButton, onUpdateParams:[Button.ctx], onComplete:function (){Button.outComp = true;}});
	}
}

function onUpdateButton(ctx)
{
	if(Button.ownCanvas == true)
	{
		Button.drawButton(ctx);
	}
}
