// Garden Gnome Software - Skin
// Pano2VR 6.1.2/17873
// Filename: skin-loteos-dev.ggsk
// Generated 2023-04-04T15:28:44

function pano2vrSkin(player,base) {
	player.addVariable('ht_ani', 2, true);
	player.addVariable('descriptionPopUp', 0, "");
	player.addVariable('OpenPopUp', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._popup=document.createElement('div');
		els=me._popup__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Popup";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 169px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 171px;';
		hs+='height: 85px;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		hs+="background-color:rgba(0,0,0,0.6);";
		els.setAttribute('style',hs);
		me._popup.ggUpdateText=function() {
			var hs=player.getVariableValue('descriptionPopUp')+"<br\/><br\/>[CERRAR]<br\/><br\/>OK";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._popup.ggUpdateText();
		player.addListener('timer', function() {
			me._popup.ggUpdateText();
		});
		el.appendChild(els);
		me._popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('OpenPopUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup.style[domTransition]='';
				if (me._popup.ggCurrentLogicStateVisible == 0) {
					me._popup.style.visibility=(Number(me._popup.style.opacity)>0||!me._popup.style.opacity)?'inherit':'hidden';
					me._popup.ggVisible=true;
				}
				else {
					me._popup.style.visibility="hidden";
					me._popup.ggVisible=false;
				}
			}
		}
		me._popup.onclick=function (e) {
			player.setVariableValue('descriptionPopUp', "");
			player.setVariableValue('OpenPopUp', false);
		}
		me._popup.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._popup);
		el=me._timer_1=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=500;
		el.ggId="Timer 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 492px;';
		hs+='position : absolute;';
		hs+='top : 26px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_1.ggIsActive=function() {
			return (me._timer_1.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._timer_1.ggTimestamp) / me._timer_1.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_1.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_1.style[domTransition]='';
				if (me._timer_1.ggCurrentLogicStateVisible == 0) {
					me._timer_1.style.visibility="hidden";
					me._timer_1.ggVisible=false;
				}
				else {
					me._timer_1.style.visibility=(Number(me._timer_1.style.opacity)>0||!me._timer_1.style.opacity)?'inherit':'hidden';
					me._timer_1.ggVisible=true;
				}
			}
		}
		me._timer_1.ggActivate=function () {
			player.setVariableValue('ht_ani', !player.getVariableValue('ht_ani'));
		}
		me._timer_1.ggCurrentLogicStateVisible = -1;
		me._timer_1.ggUpdateConditionTimer=function () {
			me._timer_1.logicBlock_visible();
		}
		me._timer_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_1);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_disponible_changenode = function(){
		if(hotspotTemplates['ht_disponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_disponible'].length; i++) {
				if (hotspotTemplates['ht_disponible'][i]._rectangle_enable && hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_alpha) {
					hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_disponible'][i]._rectangle_enable && hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_scaling) {
					hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_disponible_mouseover = function(){
		if(hotspotTemplates['ht_disponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_disponible'].length; i++) {
				if (hotspotTemplates['ht_disponible'][i]._text_10 && hotspotTemplates['ht_disponible'][i]._text_10.logicBlock_visible) {
					hotspotTemplates['ht_disponible'][i]._text_10.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_disponible_varchanged_ht_ani = function(){
		if(hotspotTemplates['ht_disponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_disponible'].length; i++) {
				if (hotspotTemplates['ht_disponible'][i]._rectangle_enable && hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_alpha) {
					hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_disponible'][i]._rectangle_enable && hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_scaling) {
					hotspotTemplates['ht_disponible'][i]._rectangle_enable.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodisponible_changenode = function(){
		if(hotspotTemplates['ht_noDisponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_noDisponible'].length; i++) {
				if (hotspotTemplates['ht_noDisponible'][i]._rectangle_disable && hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_alpha) {
					hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_noDisponible'][i]._rectangle_disable && hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_scaling) {
					hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodisponible_mouseover = function(){
		if(hotspotTemplates['ht_noDisponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_noDisponible'].length; i++) {
				if (hotspotTemplates['ht_noDisponible'][i]._text_1 && hotspotTemplates['ht_noDisponible'][i]._text_1.logicBlock_visible) {
					hotspotTemplates['ht_noDisponible'][i]._text_1.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_nodisponible_varchanged_ht_ani = function(){
		if(hotspotTemplates['ht_noDisponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_noDisponible'].length; i++) {
				if (hotspotTemplates['ht_noDisponible'][i]._rectangle_disable && hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_alpha) {
					hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_noDisponible'][i]._rectangle_disable && hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_scaling) {
					hotspotTemplates['ht_noDisponible'][i]._rectangle_disable.logicBlock_scaling();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me._timer_1.ggLastIsActive!=me._timer_1.ggIsActive()) {
			me._timer_1.ggLastIsActive=me._timer_1.ggIsActive();
			if (me._timer_1.ggLastIsActive) {
				player.setVariableValue('ht_ani', !player.getVariableValue('ht_ani'));
			} else {
			}
		}
		me._timer_1.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_disponible(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_disponible=document.createElement('div');
		el.ggId="ht_disponible";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_disponible.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_disponible.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_disponible.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_disponible.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_disponible']=true;
			me._text_10.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_disponible.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_disponible']=false;
			me._text_10.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_disponible.ontouchend=function (e) {
			me.elementMouseOver['ht_disponible']=false;
			me._text_10.logicBlock_visible();
		}
		me._ht_disponible.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectangle_enable=document.createElement('div');
		el.ggId="Rectangle_enable";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #00ff00;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 14px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 14px;';
		hs+='pointer-events:auto;';
		hs+='border-radius:50%;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_enable.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_enable.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_ani') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_enable.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_enable.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_enable.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._rectangle_enable.ggCurrentLogicStateScaling == 0) {
					me._rectangle_enable.ggParameter.sx = 0.85;
					me._rectangle_enable.ggParameter.sy = 0.85;
					me._rectangle_enable.style[domTransform]=parameterToTransform(me._rectangle_enable.ggParameter);
				}
				else {
					me._rectangle_enable.ggParameter.sx = 1;
					me._rectangle_enable.ggParameter.sy = 1;
					me._rectangle_enable.style[domTransform]=parameterToTransform(me._rectangle_enable.ggParameter);
				}
			}
		}
		me._rectangle_enable.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_ani') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_enable.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_enable.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_enable.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._rectangle_enable.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_enable.style.visibility=me._rectangle_enable.ggVisible?'inherit':'hidden';
					me._rectangle_enable.style.opacity=0.4;
				}
				else {
					me._rectangle_enable.style.visibility=me._rectangle_enable.ggVisible?'inherit':'hidden';
					me._rectangle_enable.style.opacity=1;
				}
			}
		}
		me._rectangle_enable.onclick=function (e) {
			player.setVariableValue('descriptionPopUp', me.hotspot.description);
			player.setVariableValue('OpenPopUp', true);
		}
		me._rectangle_enable.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_disponible.appendChild(me._rectangle_enable);
		el=me._text_10=document.createElement('div');
		els=me._text_10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : -32px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.79999;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 79px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._text_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_10.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_disponible'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._text_10.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._text_10.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._text_10.style[domTransition]='';
				if (me._text_10.ggCurrentLogicStateVisible == 0) {
					me._text_10.style.visibility=(Number(me._text_10.style.opacity)>0||!me._text_10.style.opacity)?'inherit':'hidden';
					me._text_10.ggVisible=true;
				}
				else {
					me._text_10.style.visibility="hidden";
					me._text_10.ggVisible=false;
				}
			}
		}
		me._text_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((77-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_disponible.appendChild(me._text_10);
		me.__div = me._ht_disponible;
	};
	function SkinHotspotClass_ht_nodisponible(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_nodisponible=document.createElement('div');
		el.ggId="ht_noDisponible";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_nodisponible.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_nodisponible.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodisponible.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodisponible.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_nodisponible']=true;
			me._text_1.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodisponible.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_nodisponible']=false;
			me._text_1.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_nodisponible.ontouchend=function (e) {
			me.elementMouseOver['ht_nodisponible']=false;
			me._text_1.logicBlock_visible();
		}
		me._ht_nodisponible.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectangle_disable=document.createElement('div');
		el.ggId="Rectangle_disable";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #aa0000;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 14px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 14px;';
		hs+='pointer-events:auto;';
		hs+='border-radius:50%;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_disable.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rectangle_disable.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('ht_ani') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._rectangle_disable.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._rectangle_disable.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._rectangle_disable.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._rectangle_disable.ggCurrentLogicStateScaling == 0) {
					me._rectangle_disable.ggParameter.sx = 0.85;
					me._rectangle_disable.ggParameter.sy = 0.85;
					me._rectangle_disable.style[domTransform]=parameterToTransform(me._rectangle_disable.ggParameter);
				}
				else {
					me._rectangle_disable.ggParameter.sx = 1;
					me._rectangle_disable.ggParameter.sy = 1;
					me._rectangle_disable.style[domTransform]=parameterToTransform(me._rectangle_disable.ggParameter);
				}
			}
		}
		me._rectangle_disable.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('ht_ani') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rectangle_disable.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rectangle_disable.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rectangle_disable.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._rectangle_disable.ggCurrentLogicStateAlpha == 0) {
					me._rectangle_disable.style.visibility=me._rectangle_disable.ggVisible?'inherit':'hidden';
					me._rectangle_disable.style.opacity=0.4;
				}
				else {
					me._rectangle_disable.style.visibility=me._rectangle_disable.ggVisible?'inherit':'hidden';
					me._rectangle_disable.style.opacity=1;
				}
			}
		}
		me._rectangle_disable.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_nodisponible.appendChild(me._rectangle_disable);
		el=me._text_1=document.createElement('div');
		els=me._text_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : -32px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.79999;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 79px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._text_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_nodisponible'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._text_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._text_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._text_1.style[domTransition]='';
				if (me._text_1.ggCurrentLogicStateVisible == 0) {
					me._text_1.style.visibility=(Number(me._text_1.style.opacity)>0||!me._text_1.style.opacity)?'inherit':'hidden';
					me._text_1.ggVisible=true;
				}
				else {
					me._text_1.style.visibility="hidden";
					me._text_1.ggVisible=false;
				}
			}
		}
		me._text_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((77-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_nodisponible.appendChild(me._text_1);
		me.__div = me._ht_nodisponible;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_disponible') {
			hotspot.skinid = 'ht_disponible';
			hsinst = new SkinHotspotClass_ht_disponible(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_disponible_changenode();;
			me.callChildLogicBlocksHotspot_ht_disponible_mouseover();;
			me.callChildLogicBlocksHotspot_ht_disponible_varchanged_ht_ani();;
		} else
		{
			hotspot.skinid = 'ht_noDisponible';
			hsinst = new SkinHotspotClass_ht_nodisponible(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_nodisponible_changenode();;
			me.callChildLogicBlocksHotspot_ht_nodisponible_mouseover();;
			me.callChildLogicBlocksHotspot_ht_nodisponible_varchanged_ht_ani();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_disponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_disponible'].length; i++) {
				hotspotTemplates['ht_disponible'][i] = null;
			}
		}
		if(hotspotTemplates['ht_noDisponible']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_noDisponible'].length; i++) {
				hotspotTemplates['ht_noDisponible'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._popup.logicBlock_visible();
	player.addListener('changenode', function(args) { me._popup.logicBlock_visible(); });
	player.addListener('varchanged_OpenPopUp', function(args) { me._popup.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_disponible_changenode();me.callChildLogicBlocksHotspot_ht_nodisponible_changenode(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_disponible_mouseover();me.callChildLogicBlocksHotspot_ht_nodisponible_mouseover(); });
	player.addListener('varchanged_ht_ani', function(args) { me.callChildLogicBlocksHotspot_ht_disponible_varchanged_ht_ani();me.callChildLogicBlocksHotspot_ht_nodisponible_varchanged_ht_ani(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};