import"./index-16336cf9.js";const o=document.querySelector(".results-table__body");(()=>{const e=s();o!==null&&(o.innerHTML=e)})();function s(){const e=window.sessionStorage.getItem("playerResults");let t="No results found.";return e!==null&&(t=JSON.parse(e)),t}