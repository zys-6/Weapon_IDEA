import{aI as k,j as c,ax as B,a6 as w,ar as l,V as T}from"./index.js";import{m}from"./mermaid-B6Csw7mp.js";import{a as p}from"./icons-7HDabJbr.js";const v={background:"#1e1e1e",textColor:"#ffffff",mainBkg:"#2d2d2d",nodeBorder:"#888888",lineColor:"#cccccc",primaryColor:"#3c3c3c",primaryTextColor:"#ffffff",primaryBorderColor:"#888888",secondaryColor:"#2d2d2d",tertiaryColor:"#454545",classText:"#ffffff",labelColor:"#ffffff",actorLineColor:"#cccccc",actorBkg:"#2d2d2d",actorBorder:"#888888",actorTextColor:"#ffffff",fillType0:"#2d2d2d",fillType1:"#3c3c3c",fillType2:"#454545"};m.initialize({startOnLoad:!1,securityLevel:"loose",theme:"dark",themeVariables:{...v,fontSize:"16px",fontFamily:"var(--vscode-font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif)",noteTextColor:"#ffffff",noteBkgColor:"#454545",noteBorderColor:"#888888",critBorderColor:"#ff9580",critBkgColor:"#803d36",taskTextColor:"#ffffff",taskTextOutsideColor:"#ffffff",taskTextLightColor:"#ffffff",sectionBkgColor:"#2d2d2d",sectionBkgColor2:"#3c3c3c",altBackground:"#2d2d2d",linkColor:"#6cb6ff",compositeBackground:"#2d2d2d",compositeBorder:"#888888",titleColor:"#ffffff"}});function A({code:r}){const e=p.useRef(null),[s,d]=p.useState(!1);p.useEffect(()=>{d(!0)},[r]),k(()=>{e.current&&(e.current.innerHTML=""),m.parse(r,{suppressErrors:!0}).then(o=>{if(!o)throw new Error("Invalid or incomplete Mermaid code");const t=`mermaid-${Math.random().toString(36).substring(2)}`;return m.render(t,r)}).then(({svg:o})=>{e.current&&(e.current.innerHTML=o)}).catch(o=>{console.warn("Mermaid parse/render failed:",o),e.current.innerHTML=r.replace(/</g,"&lt;").replace(/>/g,"&gt;")}).finally(()=>{d(!1)})},500,[r]);const g=async()=>{if(!e.current)return;const o=e.current.querySelector("svg");if(o)try{const t=await S(o);B.openImage(w.create({value:t})).catch(h=>console.error("Failed to open image:",h))}catch(t){console.error("Error converting SVG to PNG:",t)}},n=async()=>{try{await navigator.clipboard.writeText(r)}catch(o){console.error("Copy failed",o)}};return c.jsxs(E,{children:[s&&c.jsx(M,{children:"正在生成 mermaid 图表..."}),c.jsx(L,{children:c.jsx(z,{"aria-label":"复制代码",onClick:n,title:"复制代码",children:c.jsx("span",{className:"codicon codicon-copy"})})}),c.jsx(j,{$isLoading:s,onClick:g,ref:e})]})}async function S(r){console.log("svgToPng function called");const e=r.cloneNode(!0),s=e.getAttribute("viewBox")?.split(" ").map(Number)||[],d=s[2]||e.clientWidth,g=s[3]||e.clientHeight,n=3600,o=n/d,t=g*o;e.setAttribute("width",`${n}`),e.setAttribute("height",`${t}`);const y=new XMLSerializer().serializeToString(e),C=new TextEncoder().encode(y),b=`data:image/svg+xml;base64,${btoa(Array.from(C,u=>String.fromCharCode(u)).join(""))}`;return new Promise((u,x)=>{const f=new Image;f.onload=()=>{const a=document.createElement("canvas");a.width=n,a.height=t;const i=a.getContext("2d");if(!i)return x("Canvas context not available");i.fillStyle=v.background,i.fillRect(0,0,a.width,a.height),i.imageSmoothingEnabled=!0,i.imageSmoothingQuality="high",i.drawImage(f,0,0,n,t),u(a.toDataURL("image/png",1))},f.onerror=x,f.src=b})}const E=l.div`
	position: relative;
	margin: 8px 0;
`,L=l.div`
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 1;
	opacity: 0.6;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 1;
	}
`,M=l.div`
	padding: 8px 0;
	color: var(--vscode-descriptionForeground);
	font-style: italic;
	font-size: 0.9em;
`,j=l.div`
	opacity: ${r=>r.$isLoading?.3:1};
	min-height: 20px;
	transition: opacity 0.2s ease;
	cursor: pointer;
	display: flex;
	justify-content: center;
`,z=l(T)`
	padding: 4px;
	height: 24px;
	width: 24px;
	min-width: unset;
	background-color: var(--vscode-button-secondaryBackground);
	color: var(--vscode-button-secondaryForeground);
	border: 1px solid var(--vscode-button-border);
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	.codicon {
		font-size: 14px;
	}

	&:hover {
		background-color: var(--vscode-button-secondaryHoverBackground);
		border-color: var(--vscode-button-border);
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
`;export{A as default};
