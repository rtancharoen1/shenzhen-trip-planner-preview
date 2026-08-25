
    const chips=[...document.querySelectorAll('.chips button')];
    const valid=new Set(['all','nanshan','futian','hqb','longgang','baoan','qianhai','luohu']);
    function applyArea(id,scroll=true){
      const areas=[...document.querySelectorAll('.area')];
      const area=valid.has(id)?id:'all';
      chips.forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.area===area)));
      areas.forEach(section=>{section.hidden=area!=='all'&&section.id!==area});
      if(!scroll)return;
      const target=document.getElementById(area==='all'?'map':area);
      if(target)target.scrollIntoView({block:'start'});
      history.replaceState(null,'',area==='all'?location.pathname:('#'+area));
    }
    async function boot(){
      const names=['nanshan','futian','hqb','longgang','baoan','qianhai','luohu'];
      const host=document.getElementById('areas');
      const parts=await Promise.all(names.map(n=>fetch(n+'.html').then(r=>r.text())));
      host.innerHTML=parts.join('');
      chips.forEach(chip=>chip.addEventListener('click',()=>applyArea(chip.dataset.area)));
      applyArea((location.hash||'#all').slice(1),false);
    }
    boot();
