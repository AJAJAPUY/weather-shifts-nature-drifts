const loader=document.getElementById('pageLoader');
setTimeout(()=>loader?.classList.add('done'),650);

function ecoSprint(){
  clearInterval(interval);
  const rounds=[
    ['Bring a refillable water bottle.','Keep it'],['Leave chargers plugged in all day.','Skip it'],['Walk or cycle for a short trip.','Keep it'],['Throw batteries in the regular bin.','Skip it'],['Repair an item before replacing it.','Keep it'],['Print every document just in case.','Skip it']
  ];
  let index=0,score=0,seconds=35,finished=false;
  function finish(){if(finished)return;finished=true;clearInterval(interval);updateProgress(rounds.length);stage.innerHTML=`<h3>Eco Sprint results</h3><p>You made ${score} planet-smart choices out of ${rounds.length}.</p><div class="sprint-score"><b>${score}/${rounds.length}</b><span>${score>=5?'Amazing eco instincts! 🌟':score>=3?'Great start — play once more to beat your score!':'Keep going — every choice is a chance to learn.'}</span></div><div class="game-actions"><button id="sprintAgain">Race again</button></div>`;stage.querySelector('#sprintAgain').onclick=ecoSprint}
  function render(){if(index===rounds.length){finish();return}const [action,answer]=rounds[index];stage.innerHTML=`<span class="timer">⚡ <i>${seconds}</i>s</span><h3>Eco Sprint</h3><p>Round ${index+1} of ${rounds.length}: What should you do?</p><div class="sprint-action">${action}</div><div class="sprint-buttons"><button data-choice="Keep it">🌱 Keep it</button><button data-choice="Skip it">🛑 Skip it</button></div><div class="game-note" aria-live="polite"></div>`;stage.querySelectorAll('[data-choice]').forEach(button=>button.onclick=()=>{const right=button.dataset.choice===answer;if(right)score++;stage.querySelector('.game-note').textContent=right?'Nice choice! +1':'Not this time — think about the planet.';stage.querySelectorAll('[data-choice]').forEach(choice=>choice.disabled=true);setTimeout(()=>{index++;render()},430)})}
  render();interval=setInterval(()=>{seconds--;const display=stage.querySelector('.timer i');if(display)display.textContent=seconds;if(seconds<=0)finish()},1000);
}
games.sprint=ecoSprint;
