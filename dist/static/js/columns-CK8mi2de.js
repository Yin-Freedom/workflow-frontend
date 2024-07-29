var b=Object.defineProperty;var u=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var f=(t,e,a)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,p=(t,e)=>{for(var a in e||(e={}))x.call(e,a)&&f(t,a,e[a]);if(u)for(var a of u(e))C.call(e,a)&&f(t,a,e[a]);return t};import{m as c,Q as g,x as L,a2 as w,cP as y}from"./index-DfmCOzbx.js";import{f as z}from"./generator-BV8EWXvD.js";function k(){const t=c([]),e=c(!0),a=[{label:"序号",prop:"index"},{label:"模版名",prop:"templateName"},{label:"创建人",prop:"creator"},{label:"操作",fixed:"right",slot:"operation"}],o=g({pageSize:10,currentPage:1,pageSizes:[10,20,30],total:0,align:"right",background:!0,small:!1}),l=g({text:"正在加载第一页...",viewBox:"-10, -10, 50, 50",spinner:`
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `}),h={offsetBottom:110};function m(n){}function d(n){l.text=`正在加载第${n}页...`,e.value=!0,w(600).then(()=>{e.value=!1})}function i(){z({}).then(({content:n,numberOfElements:B})=>{t.value=[];const s=[];s.push(y(n,!0)),s.flat(1/0).forEach((v,r)=>{t.value.push(p({id:r,index:r+1},v))}),o.total=t.value.length,e.value=!1})}return L(()=>{i()}),{loading:e,columns:a,dataList:t,pagination:o,loadingConfig:l,adaptiveConfig:h,onSizeChange:m,onCurrentChange:d,blur:i}}export{k as useColumns};
