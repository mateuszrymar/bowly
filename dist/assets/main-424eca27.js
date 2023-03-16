var S=Object.defineProperty;var T=(e,t,s)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var c=(e,t,s)=>(T(e,typeof t!="symbol"?t+"":t,s),s);import{i as L,a as E,b,c as A,d as x,g as C,e as N,f as j,h as l}from"./results-df80abc1.js";function M(e){return e}var z="[object Map]",_="[object Set]",$=Object.prototype,D=$.hasOwnProperty;function U(e){if(e==null)return!0;if(L(e)&&(E(e)||typeof e=="string"||typeof e.splice=="function"||b(e)||A(e)||x(e)))return!e.length;var t=C(e);if(t==z||t==_)return!e.size;if(N(e))return!j(e).length;for(var s in e)if(D.call(e,s))return!1;return!0}function v(e,t){for(var s,r=-1,n=e.length;++r<n;){var o=t(e[r]);o!==void 0&&(s=s===void 0?o:s+o)}return s}function k(e){return e&&e.length?v(e,M):0}const K=1e6,y=document.querySelector(".upload__file-error-msg"),W=e=>new Promise(function(t,s){const r=new FileReader;r.onerror=s,r.onload=function(){t(r.result)},r.readAsText(e)}),q=e=>{const t=`${e}`,s=RegExp(/(?<name>^[^,|\n]+)\n(?<results>[\d|,| |-]+$)/gm),r=[...t.matchAll(s)],n=[];return r.forEach(o=>{n.push({name:o[1],rolls:o[2].replace(/\s+/g,"").split(",").map(i=>Number(i))})}),console.log(r),n},F=e=>{if(y!==null)y.innerHTML=e;else return},B=()=>{if(y!==null)y.innerHTML="";else return},H=e=>{const t="File's too large.";if(e.size>K)throw F(t),new Error(t);console.log(`The file size is ${e.size}b. OK.`)},V=e=>{const t=e.name.split(".")[1],s="Wrong extension.";if(t!=="txt")throw F(s),new Error(s);console.log(`The file extension is ${t}. OK.`)},J=e=>{const t="No matching names and results found.",s=q(e);if(s.length<=0)throw F(t),new Error(t);return B(),console.log(`Found ${s.length} matches. OK.`),s},G=(e,t)=>(H(t),V(t),J(e)),I=async e=>{var r,n;console.log("passed to processUpload",(r=e.target)==null?void 0:r.files);const t=(n=e.target)==null?void 0:n.files;let s;if(t[0]){s=t[0];const o=W(s);console.log(o);const i=G(await o,s);return console.log(i),i}else return[]},Q=e=>{const t=l(e);return!U(t.flat())},X=e=>{const t=l(e);let s=!1;return console.log(e),t[0]!==void 0&&t[0]>30&&(console.log("Wrong input: Frame #10 is over 30 points."),s=!0),s},Y=e=>{const t=l(e);let s=!1;return t.forEach(r=>{r>10&&(console.log("Wrong input: one of the frames #1-9 is over 10 points."),s=!0)}),s},Z=e=>{const s=l(e).map(a=>k(a)),r=s.splice(9),n=Y(s);return X(r)||n},ee=e=>{let t=!1;const s=l(e);for(let r=0;r<s.length;r++){const n=s[r];r<9?n.length>2&&(t=!0):(n.length>3&&(t=!0),n[0]+n[1]<10&&n.length>2&&(t=!0))}return t},te=e=>{let t=!1;return l(e).flat().forEach(r=>{console.log(r),(r<0||r>10)&&(t=!0)}),t},se=e=>{const t=l(e);return!(Q(t)===!1||te(t)===!0||Z(t)===!0||ee(t)===!0)},re=e=>{let t=[],s=l(e),r=1;for(let n=0;n<s.length;){let o=s[n],i=s[n+1],a=[];if(r<10)a.length===0&&o===10?(t.push([o]),n++,r++):(t.push([o,i].filter(u=>u!==void 0)),n+=2,r++);else{let u=s.slice(n);t.push(u);break}}return t};class ne{constructor(t,s){c(this,"frameId");c(this,"rolls");c(this,"isStrike");c(this,"isSpare");c(this,"pointResult");const r=l(t),n=(o,i,a,u)=>{const m=l(o),p=m[i].reduce((h,g)=>h+g,0);if(i>=9)return p;{const h=m.slice(i+1).flat(),g=h.at(0),w=g===void 0?0:g,P=h.at(1),R=P===void 0?0:P;return a?p+w+R:u?p+w:p}};this.frameId=s,this.rolls=t[s],this.isStrike=this.rolls.length===1&&this.rolls[0]===10,this.isSpare=this.rolls.length===2&&this.rolls[0]+this.rolls[1]===10,this.pointResult=n(r,s,this.isStrike,this.isSpare)}}const oe=e=>{const t=[...e];let s=[];for(let r=0;r<t.length;r++)s.push(new ne(t,r));return s};class ie{constructor(t){c(this,"name");c(this,"result");c(this,"frames");const s=l(t),r=s.name,n=s.rolls;let o,i;const a=re(n);se(a)===!0?(i=oe(a),o=k(i.map(m=>m.pointResult))):(i=[],o=null),this.name=r,this.result=o,this.frames=i}}const le=e=>{const t=l(e);let s=[];return console.log("player data is now in results module:",t),t.forEach(r=>{s.push(new ie(r))}),s};function ce(e){return e===Object.prototype||e===Function.prototype||e===RegExp.prototype}function ae(e,t){const s=typeof t=="function"?t:r=>t.add(r);Object.getOwnPropertyNames(e).forEach(s),Object.getOwnPropertySymbols(e).forEach(s)}function ue(e){const t=new Set;return ce(e)?[]:(ae(e,t),Array.from(t))}function fe(e){return O(e,new WeakMap)}function O(e,t){let s,r;if(t.has(e))return t.get(e);if(Array.isArray(e)){for(r=Array(s=e.length),t.set(e,r);s--;)r[s]=O(e[s],t);return r}if(Object.prototype.toString.call(e)==="[object Object]"){r=Object.create(Object.getPrototypeOf(e)),t.set(e,r);const n=ue(e);for(const o of n)r[o]=O(e[o],t);return r}return e}const d=document.querySelector(".upload__button"),f=document.querySelector(".upload__input");d==null||d.addEventListener("click",e=>{e.preventDefault(),f==null||f.click()}),f==null||f.addEventListener("change",async e=>{e.preventDefault();const t=I(e);me(await t)});const me=e=>{const t=l(e),s=le(t);pe(s),s.length!==0&&he()};function pe(e){const t=fe(e),s=JSON.stringify(t);window.sessionStorage.setItem("playerResults",s)}function he(){const e=`${window.location.origin}/pages/results.html`;window.location.replace(e)}