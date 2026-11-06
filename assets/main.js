(()=>{'use strict';const toggle=document.querySelector('.menu-toggle');const menu=document.getElementById('mobile-menu');if(toggle&&menu){const close=()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开导航菜单');menu.hidden=true;};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'打开导航菜单':'关闭导航菜单');menu.hidden=open;});menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});const mq=window.matchMedia('(min-width: 951px)');const handler=()=>{if(mq.matches)close()};if(mq.addEventListener)mq.addEventListener('change',handler);else if(mq.addListener)mq.addListener(handler);}})();


/* Wall style filters + accessible image preview. Other pages unaffected. */
(()=>{'use strict';
  const gallery=document.querySelector('.wall-gallery');
  if(!gallery)return;
  const tabs=[...document.querySelectorAll('[data-wall-filter]')];
  const cards=[...gallery.querySelectorAll('[data-wall-category]')];
  const status=document.querySelector('.wall-result');
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    const category=tab.dataset.wallFilter;
    tabs.forEach(t=>{const active=t===tab;t.classList.toggle('is-active',active);t.setAttribute('aria-pressed',String(active));});
    let n=0;
    cards.forEach(card=>{const show=category==='all'||card.dataset.wallCategory===category;card.hidden=!show;if(show)n++;});
    if(status)status.textContent=`展示 ${n} 种墙面风格`;
  }));
  const data=[
    ['奶油柔雾','温润柔和的米白色，适合客厅、卧室和走廊；建议结合室内采光确认细腻哑光效果。','assets/wall-soft-cream.webp'],
    ['侘寂手作','暖灰褐手工抹纹，适合木作和亚麻材质搭配；纹理疏密与收边需先看样板。','assets/wall-handmade-plaster.webp'],
    ['自然细砂','以颗粒感和侧光变化呈现层次；建议在重点墙面局部使用，避免盲目做得过粗。','assets/wall-fine-sand.webp'],
    ['现代水泥质感','低对比度的浅暖灰色与平整连贯的视觉观感，适合电视背景墙、现代住宅。','assets/wall-microcement-look.webp'],
    ['暖陶肌理','温暖的陶土色与手作抹痕，适合玄关、餐区及局部展示墙，建议控制面积和饱和度。','assets/wall-terracotta.webp'],
    ['灰绿矿物感','低饱和灰绿色带来安静柔和的空间氛围，搭配暖灯和天然木色更协调。','assets/wall-sage-green.webp']
  ];
  const dialog=document.getElementById('wall-lightbox');
  if(!dialog||typeof dialog.showModal!=='function')return;
  const image=dialog.querySelector('.wall-lightbox-image img');
  const title=dialog.querySelector('.wall-lightbox-details h3');
  const description=dialog.querySelector('.wall-lightbox-description');
  const counter=dialog.querySelector('.wall-lightbox-counter');
  let current=0,lastTrigger=null;
  function render(){const d=data[current];image.src=d[2];image.alt=d[0]+'墙面风格参考示意图';title.textContent=d[0];description.textContent=d[1];counter.textContent=String(current+1).padStart(2,'0')+' / 06';}
  gallery.addEventListener('click',e=>{const button=e.target.closest('[data-wall-open]');if(!button)return;current=Number(button.dataset.wallOpen)||0;lastTrigger=button;render();dialog.showModal();});
  dialog.querySelector('.wall-lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-wall-prev]').addEventListener('click',()=>{current=(current+data.length-1)%data.length;render();});
  dialog.querySelector('[data-wall-next]').addEventListener('click',()=>{current=(current+1)%data.length;render();});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();current=(current+data.length-1)%data.length;render();}if(e.key==='ArrowRight'){e.preventDefault();current=(current+1)%data.length;render();}});
  dialog.addEventListener('close',()=>{if(lastTrigger)lastTrigger.focus({preventScroll:true});});
})();
