(() => {
  const root = document.querySelector('.journey');
  const buttons = [...document.querySelectorAll('.step-button')];
  const panels = [...document.querySelectorAll('.step-panel')];
  const phones = [...document.querySelectorAll('.demo-phone')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 761px)');
  let active = 0;
  const select = index => {
    active = index;
    buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    panels.forEach((p,i)=>p.hidden=i!==index);
    phones.forEach((p,i)=>{p.classList.toggle('active',i===index);p.setAttribute('aria-hidden',String(i!==index));});
    document.querySelector('#current-step').textContent=String(index+1).padStart(2,'0');
    document.querySelector('.journey-progress span').style.width=`${(index+1)*25}%`;
  };
  const pinned = () => desktop.matches && !reduced.matches;
  const update = () => {
    if (!pinned()) return;
    const top = root.getBoundingClientRect().top;
    const pinHeight = document.querySelector('.journey-pin').offsetHeight;
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    if(top>headerHeight || top<-(root.offsetHeight-pinHeight))return;
    const distance=root.offsetHeight-pinHeight;
    const progress=Math.max(0,Math.min(.999,(headerHeight-top)/distance));
    const index=Math.floor(progress*4);
    if(index!==active)select(index);
  };
  buttons.forEach((b,i)=>{
    b.addEventListener('click',()=>{
      select(i);
      if(pinned()){
        const headerHeight=document.querySelector('.site-header').offsetHeight;
        const distance=root.offsetHeight-document.querySelector('.journey-pin').offsetHeight;
        window.scrollTo({top:window.scrollY+root.getBoundingClientRect().top-headerHeight+distance*(i+.12)/4,behavior:'instant'});
      }
    });
    b.addEventListener('keydown',e=>{
      let target;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')target=(i+1)%4;
      if(e.key==='ArrowLeft'||e.key==='ArrowUp')target=(i+3)%4;
      if(target!==undefined){e.preventDefault();buttons[target].focus();buttons[target].click();}
    });
  });
  let queued=false;
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{update();queued=false;});}},{passive:true});
  addEventListener('resize',update);
  reduced.addEventListener('change',update);
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.mobile-menu');
  const close=()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');};
  toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){close();toggle.focus();}});
  desktop.addEventListener('change',()=>{close();update();});
  const reveal=document.querySelector('.polaroid-main');
  const gallery=document.querySelector('.event-gallery');
  reveal.addEventListener('click',()=>{const open=gallery.hidden;gallery.hidden=!open;reveal.setAttribute('aria-expanded',String(open));});
  document.querySelectorAll('.faq-item').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.faq-item').forEach(other=>{if(other!==item)other.open=false;});}));
  document.querySelectorAll('[data-passport]').forEach(button=>button.addEventListener('click',()=>{
    const view=button.dataset.passport;
    document.querySelectorAll('[data-passport]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-passport-panel]').forEach(p=>p.hidden=p.dataset.passportPanel!==view);
  }));
  select(0);
  update();
})();
