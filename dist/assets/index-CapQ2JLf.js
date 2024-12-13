(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();async function q(e){try{return await(await fetch(e)).json()}catch(t){return console.error(`Erreur lors du chargement du fichier ${e} :`,t),null}}async function v(){const e=await q("data/config.json"),t=await q("data/scale.json"),o=await q("data/ems.json"),n=await q("data/questions.json");if(!e||!t||!o||!n)throw new Error("Erreur lors du chargement des données");return{config:e,scale:t,emsList:o,questions:n.questions}}let d={currentQuestion:-1,currentSchema:"",questions:[],responses:[],remainingTime:0,timer:null,config:null,scale:null,emsList:null,app:null};function f(){return d}function S(e){const{config:t,scale:o,questions:n,emsList:s}=e;d={...d,config:t,scale:o,questions:n,emsList:s,app:document.getElementById("app"),currentQuestion:-1,responses:[],remainingTime:t.timerDuration}}function p(e){return d={...d,...e},d}let h;function b(e,t){const o=document.getElementById("timer");let n=e;return h&&clearInterval(h),h=setInterval(()=>{n--,o&&(o.textContent=n),n===0&&(clearInterval(h),typeof t=="function"&&t())},1e3),h}const u={welcome:{title:"Bienvenue dans le questionnaire YSQ",scaleIntro:"Vous répondrez à des questions avec une échelle de notation :",questionsInfo:"Ce questionnaire comporte <strong>{count} questions</strong> divisées en <strong>{groups} groupes</strong> et devrait prendre environ <strong>{time}</strong>.",timeOff:"Une pause sera mise en place à la fin de chaque groupe de question.",startButton:"Commencer",simulateResults:"Simulation"},progress:{total:"Progression totale",currentSchema:"Schéma en cours"},pause:{title:"Pause entre les schémas",message:"Vous avez terminé un schéma. Prenez un moment pour vous reposer avant de continuer.",continueButton:"Continuer"},summary:{title:"Résumé des réponses par schéma",schema:"Schéma",ysqCode:"YSQ Code",total:"Total (max)",restartButton:"Recommencer",valueCount:"Valeur {value}: {count} réponses"},errors:{initialization:"Erreur lors de l'initialisation."}};function y(e,t){return e.replace(/{(\w+)}/g,(o,n)=>t[n]!==void 0?t[n]:o)}function Q({responses:e,emsList:t,questions:o,scale:n}){return t.map(s=>{const r=o.filter(c=>c.ysqCode===s.ysqCode),i=e.filter(c=>r.some(m=>m.question===c.question)),a=i.reduce((c,m)=>c+(m.response>3?m.response:0),0),l=n.map(c=>({value:c.value,count:i.filter(m=>m.response===c.value).length}));return{name:s.name,ysqCode:s.ysqCode,maxScore:s.maxScore,total:a,counts:l}})}function $(e){console.log(e);const{responses:t,emsList:o,questions:n,scale:s,app:r}=e,i=Q({responses:t,emsList:o,questions:n,scale:s});r.innerHTML=`
    <h2>${u.summary.title}</h2>
    <table>
      <thead>
        <tr>
          <th>${u.summary.schema}</th>
          <th>${u.summary.ysqCode}</th>
          <th>${u.summary.total}</th>
        </tr>
      </thead>
      <tbody>
        ${i.map(a=>`
          <tr>
            <td>${a.name}</td>
            <td>${a.ysqCode}</td>
            <td class="dotted" title="${a.counts.map(l=>y(u.summary.valueCount,{value:l.value,count:l.count})).join(`
`)}">${a.total} (${a.maxScore})</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <button onclick="restart()">${u.summary.restartButton}</button>
  `}function C(e){const t=Math.floor(e/86400),o=Math.floor(e%86400/3600),n=Math.floor(e%3600/60),s=e%60,r=[];return t&&r.push(`${t} jours`),o&&r.push(`${o} heures`),n&&r.push(`${n} minutes`),s&&r.push(`${s} secondes`),r.join(" ")}function T(e){return e?`<button onclick="simulateResults()">${u.welcome.simulateResults}</button>`:""}function I(e){const{questions:t,scale:o,config:n}=e,s=t.length,r=s*n.timerDuration;return`
    <h2>${u.welcome.title}</h2>
    <p>${u.welcome.scaleIntro}</p>
    <ul>
      ${o.map(i=>`<li>${i.value} - ${i.label}</li>`).join("")}
    </ul>
    <p>${y(u.welcome.questionsInfo,{count:s,groups:18,time:C(r)})}</p>
    <p>${u.welcome.timeOff}</p>
    <button onclick="startQuestionnaire()">${u.welcome.startButton}</button>
    ${T(n.showSimulateButton)}
  `}function L(e){const{currentQuestion:t,currentSchema:o,questions:n,responses:s}=e,r=(t+1)/n.length*100,i=n.filter(l=>l.ysqCode===o),a=i.length>0?s.filter(l=>i.some(c=>c.question===l.question)).length/i.length*100:0;return`
    <div class="progress-container">
      <label>${u.progress.total}</label>
      <div class="progress-bar" style="width: ${r}%"></div>
    </div>
    <div class="progress-container">
      <label>${u.progress.currentSchema}</label>
      <div class="progress-bar" style="width: ${a}%"></div>
    </div>
  `}function B(e){const{currentQuestion:t,questions:o,scale:n,remainingTime:s}=e;return`
    ${L(e)}
    <h2>${o[t].question}</h2>
    <div class="timer" id="timer">${s}</div>
    <div class="button-group">
      ${n.map(r=>`
        <button class="response-button" onclick="submitAnswer(${r.value})">${r.label}</button>
      `).join("")}
    </div>
  `}function j(){return`
    <h2>${u.pause.title}</h2>
    <p>${u.pause.message}</p>
    <button onclick="nextSchema()">${u.pause.continueButton}</button>
  `}function g(){const e=f(),{currentQuestion:t,questions:o,app:n}=e;if(t===-1){n.innerHTML=I(e);return}if(t>=o.length){$(e);return}n.innerHTML=B(e),b(e.remainingTime,()=>w(null))}function M(){let e=f();const{questions:t,scale:o}=e,n=t.map(s=>({question:s.question,ysqCode:s.ysqCode,response:Math.ceil(Math.random()*o.length)}));console.log("responses",n),e=p({responses:n,currentQuestion:t.length}),$(e)}function x(){const e=f();p({currentQuestion:0,currentSchema:e.questions[0].ysqCode,remainingTime:e.config.timerDuration}),g()}function w(e){var r;const t=f(),{currentQuestion:o,questions:n,timer:s}=t;if(s&&clearInterval(s),o>=0&&o<n.length){const i=[...t.responses];i.push({question:n[o].question,ysqCode:n[o].ysqCode,response:e});const a=(r=n[o+1])==null?void 0:r.ysqCode;if(t.currentSchema&&t.currentSchema!==a){p({responses:i,currentSchema:a}),t.app.innerHTML=j();return}p({responses:i,currentQuestion:o+1,remainingTime:t.config.timerDuration}),g()}}function E(){var o;const e=f(),t=e.currentQuestion+1;p({currentQuestion:t,currentSchema:(o=e.questions[t])==null?void 0:o.ysqCode,remainingTime:e.config.timerDuration}),g()}function P(){p({currentQuestion:-1,responses:[],remainingTime:f().config.timerDuration}),g()}window.startQuestionnaire=x;window.simulateResults=M;window.submitAnswer=w;window.nextSchema=E;window.restart=P;async function z(){try{const e=await v();S(e),g()}catch(e){document.getElementById("app").innerHTML=`<h2>${u.errors.initialization}</h2>`,console.error(e)}}z();
