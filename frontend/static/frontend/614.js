(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[614],{3614:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h});var n=a(7294),r=a(4793),l=a(381),s=a.n(l),m=a(5697),o=a.n(m);const c=({values:e})=>{return n.createElement("div",{className:"comment"},n.createElement("div",{className:"left-item"},n.createElement("img",{src:e.author.avatar,className:"avatar"}),n.createElement("span",null,e.author.username),e.author.is_staff?n.createElement("b",null,"Staff Member"):n.createElement("b",null,"User"),n.createElement("p",null,(t=e.created_at,s()(t).fromNow()))),n.createElement("div",{className:"right-item"},e.body));var t};c.propTypes={values:o().object};const u=c;var d=a(5323);const i=Object.freeze({body:""}),g=({slug:e})=>{const[t,a]=(0,n.useState)([]),[l,s]=(0,n.useState)(0),[m,o]=(0,n.useState)(i),[c,g]=(0,n.useState)(!1),[h,p]=(0,n.useState)(0),[E,b]=(0,n.useState)({}),f=(0,n.useRef)(),y=t.length/6;return(0,n.useEffect)((()=>{b({}),g(!1),r.Z.get(`comments/${e}/`).then((e=>a(e.data))).catch((e=>console.log(e.message)))}),[c]),(0,n.useEffect)((()=>{const e=E["Too Many Requests"];e&&p(parseInt(e.split(" ")[2],10))}),[E]),(0,n.useEffect)((()=>{if(h>0){let e=setTimeout((()=>p(h-1)),1e3);return()=>clearTimeout(e)}}),[h]),n.createElement(n.Fragment,null,h>0&&n.createElement("p",{className:"comment-countdown"},"Please wait ",h," seconds before posting another comment."),n.createElement(n.Fragment,null,n.createElement("form",{className:"comment-form",onSubmit:t=>{t.preventDefault(),r.Z.post(`comments/${e}/send/`,{body:m.body}).then((()=>{g(!0),o(i),f.current.value=""})).catch((e=>{b(e.response.data)}))},noValidate:!0},n.createElement("label",{htmlFor:"body"},E.body&&n.createElement("span",{className:"invalid-value"},E.body),E.detail&&n.createElement("span",{className:"invalid-value"},E.detail)),n.createElement("textarea",{id:"body",name:"body",ref:f,onChange:e=>{e.target.style.height="inherit",e.target.style.height=`${e.target.scrollHeight}px`,o({...m,[e.target.name]:e.target.value.trim()})},placeholder:"Write your own comment here...",maxLength:"255",rows:4,style:E.body||h?{borderColor:"var(--danger)"}:{borderColor:"var(--secondary)"}}),n.createElement("p",{className:"info"},m.body.length," / 255"),n.createElement("button",{className:"animated-button",type:"submit"},n.createElement("span",null,n.createElement("strong",null,"Comment"))))),n.createElement("div",{className:"comments"},0===t.length&&n.createElement("h1",{className:"error"},"No comments yet"),t.slice(6*l,6*l+6).map((e=>n.createElement(u,{key:e.id,values:e})))),n.createElement(d.Z,{page:l,maxPages:y,handleChange:s}))};g.propTypes={slug:o().string};const h=g}}]);