import{j as a,m as de,M as S,E as U,y as Ee,z as le,D as ze,F as Ie,o as Be,G as ne,H as Fe,I as Le,S as $e,V as ce,J as Te,b as R,K as pe}from"./index.js";import{a as c,ad as Pe,af as Ve,b as Re,h as Ae,M as O,T as me,G as qe}from"./icons-7HDabJbr.js";import{T as Ke,a as ie,b as K,c as He}from"./Tab-CJ36zQ4_.js";import{A as Ue}from"./AddRemoteServerForm-CzUvpd39.js";import{S as De}from"./SkillBotMarket-DftkgrgY.js";import"./mermaid-B6Csw7mp.js";function ue(e){return e.install?.args??[]}function b(e){return`${e.type}:${e.id}:${e.path}`}function _e(e){return(e??"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function D(e){const r=(e??"").split(/[\\/]/).filter(Boolean),o=r.at(-1);if(o)return o.toLowerCase()==="skill.md"&&r.length>1?r.at(-2):o.replace(/\.[^.]+$/,"")}function ge(e){const r=e?.split("#")[0]?.split("?")[0];return D(r)}function ve(e){return e?.replace(/-[0-9a-f]{12}$/i,"")}function u(e,r){const o=_e(r);o&&o!=="skill"&&e.add(o)}function Ge(e){const r=new Set;u(r,e.id),u(r,e.name);const o=ue(e);for(let n=0;n<o.length;n++){const l=o[n];if((l==="--skill"||l==="-s")&&o[n+1]){u(r,o[n+1]),n++;continue}const i=l.split("@").at(1);if(i){u(r,i);continue}(l.includes("/")||l.includes("\\"))&&u(r,ge(l))}return r}function Oe(e){if(e.type==="skill")return Ge(e);const r=new Set;u(r,e.id),u(r,e.name);const[o]=ue(e);return e.type==="plugin"?(u(r,o),u(r,ve(ge(o)))):e.type==="mcp"&&u(r,o),r}function Qe(e){const r=new Set;return u(r,e.id),u(r,e.name),e.type==="skill"?u(r,D(e.path)):e.type==="plugin"&&u(r,ve(D(e.path))),r}function Je(e,r){if(e.type!==r.type)return!1;const o=Oe(e);for(const n of Qe(r))if(o.has(n))return!0;return!1}const _=[{type:"skill",label:"技能",singular:"技能",plural:"技能",title:"技能",description:a.jsxs(a.Fragment,{children:["可按需加载的可复用指令集，供 NORINCO Code Agent 在特定任务中使用，而不会一直占用无关工作的上下文。浏览更多："," ",a.jsx(R,{href:"https://agentskills.io/",children:"Agent Skills"}),"。"]}),icon:Pe},{type:"mcp",label:"MCP",singular:"MCP 服务器",plural:"MCP 服务器",title:"MCP 服务器",description:a.jsxs(a.Fragment,{children:["通过 ",a.jsx(R,{href:"https://modelcontextprotocol.io/",children:"MCP"})," 服务器将 NORINCO Code Agent 连接到外部 API、本地工具和托管服务。"]}),icon:Ve},{type:"plugin",label:"插件",singular:"插件",plural:"插件",title:"插件",description:a.jsxs(a.Fragment,{children:[a.jsx(R,{href:"https://docs.cline.bot/sdk/plugins",children:"插件"}),"是比单个 MCP 服务器或 skill 更复杂的能力扩展，可包含自定义工具、hooks、规则、斜杠命令或捆绑的 skills。"]}),icon:Re}],We=new Set(["plugin"]),he=_.filter(e=>!We.has(e.type)),Ye=[{type:"installed",label:"已安装"},{type:"marketplace",label:"市场"}];function H(e){return he.some(r=>r.type===e)}function f(e){return`${e.type}:${e.id}`}function ke(e){return e.install?.args??[]}function Xe(e){return _.find(r=>r.type===e)??_[0]}function fe(e){if(e.source==="global")return"全局";if(e.source==="workspace")return"工作区";if(e.source==="remote")return"远程"}function Ze(e){const r=e.install?.env??[];if(r.length===0&&!e.install?.notes)return;const o=r.filter(n=>n.required).map(n=>n.name);return o.length>0?`需要 ${o.join(", ")}`:r.length>0?`使用 ${r.map(n=>n.name).join(", ")}`:e.install?.notes}function A(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function G(e){const r=new Map;for(const o of e.tags){const n=A(o);n&&r.set(n,o)}for(const o of e.tagObjects??[]){const n=A(o.label);n&&r.set(n,o.label)}return[...r.values()]}function ea(e){return[e.id,e.name,e.tagline,e.description,e.author,...G(e),...ke(e),...(e.install?.env??[]).map(r=>r.name)].filter(Boolean).join(" ").toLowerCase()}const aa=()=>a.jsx("style",{children:`
		.marketplace-view {
			background: var(--vscode-sideBar-background);
			color: var(--vscode-foreground);
			min-width: 0;
		}

		.marketplace-view > div:first-of-type {
			margin-bottom: 4px;
		}

		.marketplace-shell {
			min-height: 0;
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.marketplace-nav {
			flex: 0 0 auto;
			display: flex;
			align-items: center;
			min-width: 0;
			overflow-x: auto;
			overflow-y: hidden;
			border-bottom: 1px solid var(--vscode-panel-border);
			background: var(--vscode-sideBar-background);
			padding: 0 8px;
		}

		.marketplace-tab {
			width: auto;
			flex: 0 1 auto;
			min-width: fit-content;
			height: 34px;
			border: 0;
			border-bottom: 2px solid transparent;
			background: transparent;
			color: var(--vscode-descriptionForeground);
			font: inherit;
			font-size: var(--vscode-font-size);
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			padding: 0 12px;
			text-align: center;
			cursor: pointer;
		}

		.marketplace-tab:hover {
			background: var(--vscode-list-hoverBackground);
			color: var(--vscode-foreground);
		}

		.marketplace-tab[aria-selected="true"] {
			background: var(--vscode-list-activeSelectionBackground);
			color: var(--vscode-list-activeSelectionForeground);
			border-bottom-color: var(--vscode-list-activeSelectionForeground, var(--vscode-foreground));
		}

		.marketplace-tab-label {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.marketplace-content {
			min-width: 0;
			background: var(--vscode-editor-background);
		}

		.marketplace-inner {
			box-sizing: border-box;
			width: 100%;
			max-width: 760px;
			margin: 0 auto;
			padding: 14px 18px 20px;
		}

		.marketplace-primitive-description {
			margin-bottom: 12px;
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.9);
			line-height: 1.4;
		}

		.marketplace-primitive-description vscode-link {
			font-size: inherit;
		}

		.marketplace-error {
			border: 1px solid var(--vscode-inputValidation-errorBorder);
			background: var(--vscode-inputValidation-errorBackground);
			color: var(--vscode-inputValidation-errorForeground, var(--vscode-foreground));
			padding: 8px 10px;
			margin-bottom: 12px;
			font-size: calc(var(--vscode-font-size) * 0.92);
			line-height: 1.4;
			white-space: pre-wrap;
			word-break: break-word;
		}

		.marketplace-subnav {
			display: flex;
			align-items: center;
			gap: 0;
			min-width: 0;
			margin: 0 0 12px;
			border-bottom: 1px solid var(--vscode-panel-border);
		}

		.marketplace-subtab {
			height: 30px;
			border: 0;
			border-bottom: 2px solid transparent;
			background: transparent;
			color: var(--vscode-descriptionForeground);
			font: inherit;
			font-size: calc(var(--vscode-font-size) * 0.92);
			padding: 0 10px;
			cursor: pointer;
		}

		.marketplace-subtab:hover {
			background: var(--vscode-list-hoverBackground);
			color: var(--vscode-foreground);
		}

		.marketplace-subtab:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		.marketplace-subtab:disabled:hover {
			background: transparent;
			color: var(--vscode-descriptionForeground);
		}

		.marketplace-subtab[aria-selected="true"] {
			color: var(--vscode-foreground);
			border-bottom-color: var(--vscode-focusBorder);
		}

		.marketplace-section {
			margin-bottom: 20px;
		}

		.marketplace-section-header {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 6px;
			padding-bottom: 5px;
			border-bottom: 1px solid var(--vscode-panel-border);
		}

		.marketplace-section-title {
			font-size: calc(var(--vscode-font-size) * 0.92);
			font-weight: 600;
			color: var(--vscode-foreground);
			margin: 0;
		}

		.marketplace-section-count {
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.85);
		}

		.marketplace-list {
			display: grid;
			gap: 7px;
			background: transparent;
		}

		.marketplace-row {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 10px;
			align-items: start;
			min-height: 42px;
			padding: 9px 10px;
			border: 1px solid var(--vscode-panel-border);
			background: var(--vscode-sideBar-background);
		}

		.marketplace-row:hover {
			background: var(--vscode-list-hoverBackground);
		}

		.marketplace-row-main {
			min-width: 0;
		}

		.marketplace-row-title {
			display: flex;
			align-items: center;
			gap: 7px;
			min-width: 0;
			color: var(--vscode-foreground);
			font-size: var(--vscode-font-size);
			font-weight: 500;
			line-height: 1.35;
		}

		.marketplace-row-name {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.marketplace-row-description {
			margin-top: 2px;
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.9);
			line-height: 1.35;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			overflow-wrap: anywhere;
			word-break: break-word;
		}

		.marketplace-row-description code {
			overflow-wrap: anywhere;
			word-break: break-word;
			white-space: normal;
		}

		.marketplace-row-meta {
			margin-top: 4px;
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
			align-items: center;
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.82);
			line-height: 1.3;
		}

		.marketplace-pill {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			max-width: 100%;
			min-width: 0;
			padding: 1px 5px;
			border-radius: 2px;
			border: 1px solid var(--vscode-badge-background);
			background: color-mix(in srgb, var(--vscode-badge-background) 20%, transparent);
			color: var(--vscode-descriptionForeground);
			white-space: normal;
			overflow-wrap: anywhere;
			word-break: break-word;
		}

		.marketplace-path {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;
			overflow-wrap: anywhere;
			word-break: break-word;
			font-family: var(--vscode-editor-font-family);
		}

		.marketplace-action {
			display: flex;
			gap: 6px;
			justify-content: flex-end;
			align-items: center;
		}

		.marketplace-local-toggle {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			min-height: 24px;
		}

		.marketplace-icon-button {
			width: 24px;
			height: 24px;
			border: 1px solid transparent;
			border-radius: 3px;
			background: transparent;
			color: var(--vscode-icon-foreground);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			cursor: pointer;
		}

		.marketplace-icon-button:hover:not(:disabled) {
			background: var(--vscode-toolbar-hoverBackground);
			color: var(--vscode-foreground);
		}

		.marketplace-icon-button:focus-visible {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 1px;
		}

		.marketplace-icon-button:disabled {
			cursor: default;
			opacity: 0.65;
		}

		.marketplace-icon-button-danger {
			color: var(--vscode-errorForeground, var(--vscode-icon-foreground));
		}

		.marketplace-icon-button svg {
			width: 14px;
			height: 14px;
		}

		.marketplace-icon-spin {
			animation: marketplace-spin 0.9s linear infinite;
		}

		@keyframes marketplace-spin {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		.marketplace-search {
			margin: 0 0 10px;
		}

		.marketplace-search vscode-text-field {
			width: 100%;
		}

		.marketplace-clear-search {
			all: unset;
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--vscode-descriptionForeground);
		}

		.marketplace-clear-search:hover {
			color: var(--vscode-foreground);
		}

		.marketplace-clear-search:focus-visible {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 2px;
		}

		.marketplace-filters {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;
			margin: 0 0 10px;
			min-width: 0;
		}

		.marketplace-filter-scroll {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
			min-width: 0;
		}

		.marketplace-tag-button {
			display: inline-flex;
			align-items: center;
			gap: 5px;
			height: 24px;
			border: 1px solid var(--vscode-button-border, var(--vscode-panel-border));
			border-radius: 3px;
			background: var(--vscode-button-secondaryBackground);
			color: var(--vscode-button-secondaryForeground);
			font: inherit;
			font-size: calc(var(--vscode-font-size) * 0.86);
			padding: 0 7px;
			white-space: nowrap;
			cursor: pointer;
		}

		.marketplace-tag-button:hover {
			background: var(--vscode-button-secondaryHoverBackground);
		}

		.marketplace-tag-button[data-active="true"] {
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
			border-color: var(--vscode-button-background);
		}

		.marketplace-tag-count {
			color: inherit;
			opacity: 0.75;
		}

		.marketplace-mcp-panel {
			display: grid;
			gap: 10px;
		}

		.marketplace-mcp-managed {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 8px 10px;
			border-left: 3px solid var(--vscode-textLink-foreground);
			background: var(--vscode-textBlockQuote-background);
			color: var(--vscode-foreground);
			font-size: calc(var(--vscode-font-size) * 0.92);
			line-height: 1.35;
		}

		.marketplace-mcp-settings {
			display: grid;
			gap: 8px;
			margin-top: 10px;
		}

		.marketplace-mcp-settings vscode-button {
			width: 100%;
		}

		.marketplace-mcp-advanced {
			margin-top: -3px;
			text-align: center;
			font-size: calc(var(--vscode-font-size) * 0.88);
		}

		.marketplace-mcp-form {
			border: 1px solid var(--vscode-panel-border);
			background: var(--vscode-sideBar-background);
		}

		.marketplace-mcp-form > div {
			padding: 12px;
		}

		.marketplace-empty,
		.marketplace-loading {
			min-height: 72px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			border: 1px dashed var(--vscode-panel-border);
			color: var(--vscode-descriptionForeground);
			background: var(--vscode-sideBar-background);
			font-size: calc(var(--vscode-font-size) * 0.92);
			text-align: center;
			padding: 12px;
		}

		.marketplace-loading vscode-progress-ring {
			width: 18px;
			height: 18px;
		}

		.marketplace-text-button {
			display: inline-flex;
			align-items: center;
			gap: 5px;
			height: 24px;
			padding: 0 10px;
			border: 1px solid var(--vscode-button-border, var(--vscode-panel-border));
			border-radius: 3px;
			background: var(--vscode-button-secondaryBackground);
			color: var(--vscode-button-secondaryForeground);
			font: inherit;
			font-size: calc(var(--vscode-font-size) * 0.9);
			white-space: nowrap;
			cursor: pointer;
		}

		.marketplace-text-button:hover:not(:disabled) {
			background: var(--vscode-button-secondaryHoverBackground);
		}

		.marketplace-text-button:focus-visible {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: 1px;
		}

		.marketplace-text-button:disabled {
			cursor: default;
			opacity: 0.65;
		}

		.marketplace-text-button-primary {
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
			border-color: var(--vscode-button-background);
		}

		.marketplace-text-button-primary:hover:not(:disabled) {
			background: var(--vscode-button-hoverBackground);
		}

		.marketplace-text-button svg {
			width: 14px;
			height: 14px;
		}

		.marketplace-form {
			display: grid;
			gap: 12px;
		}

		.marketplace-form-summary {
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.9);
			line-height: 1.4;
			overflow-wrap: anywhere;
			word-break: break-word;
		}

		.marketplace-form-instructions {
			margin: 0;
			padding-left: 18px;
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.9);
			line-height: 1.5;
		}

		.marketplace-field {
			display: grid;
			gap: 4px;
		}

		.marketplace-field-label {
			color: var(--vscode-foreground);
			font-size: var(--vscode-font-size);
			font-weight: 500;
		}

		.marketplace-required {
			color: var(--vscode-errorForeground, var(--vscode-foreground));
			margin-left: 3px;
		}

		.marketplace-field-hint {
			color: var(--vscode-descriptionForeground);
			font-size: calc(var(--vscode-font-size) * 0.82);
			line-height: 1.3;
			overflow-wrap: anywhere;
			word-break: break-word;
		}

		.marketplace-field-input {
			box-sizing: border-box;
			width: 100%;
			min-height: 26px;
			padding: 3px 6px;
			border: 1px solid var(--vscode-input-border, transparent);
			border-radius: 2px;
			background: var(--vscode-input-background);
			color: var(--vscode-input-foreground);
			font: inherit;
			font-size: var(--vscode-font-size);
			resize: vertical;
		}

		.marketplace-field-input:focus {
			outline: 1px solid var(--vscode-focusBorder);
			outline-offset: -1px;
		}

		.marketplace-field-input::placeholder {
			color: var(--vscode-input-placeholderForeground);
		}

		.marketplace-form-actions {
			display: flex;
			justify-content: flex-end;
			gap: 8px;
			padding-top: 4px;
		}

		.marketplace-result-pre {
			margin: 0;
			padding: 10px;
			border: 1px solid var(--vscode-panel-border);
			background: var(--vscode-sideBar-background);
			color: var(--vscode-foreground);
			font-family: var(--vscode-editor-font-family);
			font-size: calc(var(--vscode-font-size) * 0.9);
			white-space: pre-wrap;
			word-break: break-word;
			overflow: auto;
		}

		@media (max-width: 520px) {
			.marketplace-nav {
				padding: 0 4px;
			}

			.marketplace-tab {
				flex: 1 1 0;
				min-width: 0;
				gap: 5px;
				padding: 0 6px;
			}

			.marketplace-inner {
				padding: 12px 10px 16px;
			}

			.marketplace-filters {
				align-items: flex-start;
				flex-direction: column;
				gap: 6px;
			}

			.marketplace-filter-scroll {
				width: 100%;
			}
		}
	`}),ta=({children:e,count:r,empty:o,showHeader:n=!0,title:l})=>a.jsxs("section",{className:"marketplace-section",children:[n&&a.jsx("div",{className:"marketplace-section-header",children:a.jsx("h3",{className:"marketplace-section-title",children:l})}),r>0?a.jsx("div",{className:"marketplace-list",children:e}):a.jsx("div",{className:"marketplace-empty",children:o})]}),ra=({children:e,count:r,empty:o,filters:n,search:l,showHeader:i=!0})=>a.jsxs("section",{className:"marketplace-section",children:[i&&a.jsx("div",{className:"marketplace-section-header",children:a.jsx("h3",{className:"marketplace-section-title",children:"市场"})}),l,n,r>0?a.jsx("div",{className:"marketplace-list",children:e}):a.jsx("div",{className:"marketplace-empty",children:o})]}),oa=({counts:e,onSelect:r,selectedTag:o,tags:n})=>n.length===0?null:a.jsx("div",{className:"marketplace-filters",children:a.jsx("div",{className:"marketplace-filter-scroll",children:n.map(l=>a.jsxs("button",{className:"marketplace-tag-button","data-active":o===l.id,onClick:()=>r(o===l.id?null:l.id),type:"button",children:[a.jsx("span",{children:l.label}),a.jsx("span",{className:"marketplace-tag-count",children:e.get(l.id)??0})]},l.id))})}),sa=({marketplaceMetadataByServerName:e,showHeader:r=!0,showServerList:o=!0})=>{const{mcpServers:n,navigateToSettings:l,remoteConfigSettings:i}=de(),[p,v]=c.useState(!1),h=i?.blockPersonalRemoteMCPServers!==!0,N=i?.remoteMCPServers&&i.remoteMCPServers.length>0;return a.jsxs("section",{className:"marketplace-section",children:[r&&a.jsx("div",{className:"marketplace-section-header",children:a.jsx("h3",{className:"marketplace-section-title",children:"已安装的 MCP 服务器"})}),(o||N)&&a.jsxs("div",{className:"marketplace-mcp-panel",children:[N&&a.jsxs("div",{className:"marketplace-mcp-managed",children:[a.jsx("span",{className:"codicon codicon-lock"}),a.jsx("span",{children:"你的组织管理着部分 MCP 服务器"})]}),o&&a.jsx($e,{hasTrashIcon:!0,isExpandable:!0,listGap:"small",marketplaceMetadataByServerName:e,servers:n})]}),a.jsxs("div",{className:"marketplace-mcp-settings",children:[h&&!p&&a.jsxs(ce,{appearance:"primary",onClick:()=>v(!0),children:[a.jsx("span",{className:"codicon codicon-add",style:{marginRight:"6px"}}),"添加远程服务器"]}),h&&p&&a.jsx("div",{className:"marketplace-mcp-form",children:a.jsx(Ue,{onCancel:()=>v(!1),onServerAdded:()=>v(!1),showEditConfiguration:!1})}),a.jsxs(ce,{appearance:"secondary",onClick:()=>{Te.openMcpSettings(U.create({})).catch(I=>{console.error("Error opening MCP settings:",I)})},children:[a.jsx("span",{className:"codicon codicon-server",style:{marginRight:"6px"}}),"编辑配置"]}),a.jsx("div",{className:"marketplace-mcp-advanced",children:a.jsx(R,{onClick:()=>l("features"),children:"高级 MCP 设置"})})]})]})},la=({entry:e,onUninstall:r,onToggle:o,toggling:n,uninstalling:l})=>{const i=fe(e),p=!(e.type==="skill"&&e.path?.startsWith("remote:"));return a.jsxs("div",{className:"marketplace-row",children:[a.jsxs("div",{className:"marketplace-row-main",children:[a.jsx("div",{className:"marketplace-row-title",children:a.jsx("span",{className:"marketplace-row-name",children:e.name||e.id})}),e.description&&a.jsx("div",{className:"marketplace-row-description",children:e.description}),a.jsxs("div",{className:"marketplace-row-meta",children:[i&&a.jsx("span",{className:"marketplace-pill",children:i}),e.path&&a.jsx("span",{className:"marketplace-path",children:e.path})]})]}),a.jsxs("div",{className:"marketplace-action",children:[a.jsx(pe,{"aria-label":`${e.enabled?"禁用":"启用"} ${e.name||e.id}`,checked:e.enabled,disabled:n,onClick:()=>o(e,!e.enabled),title:`${e.enabled?"禁用":"启用"} ${e.name||e.id}`}),a.jsx("button",{"aria-label":`卸载 ${e.name||e.id}`,className:"marketplace-icon-button marketplace-icon-button-danger",disabled:l||!p,onClick:()=>r(e),title:p?`卸载 ${e.name||e.id}`:"远程管理的 skills 无法在此卸载",type:"button",children:l?a.jsx(O,{"aria-hidden":!0,className:"marketplace-icon-spin"}):a.jsx(me,{"aria-hidden":!0})})]})]})},na=({entry:e,matchedLocalEntries:r,onToggle:o,onUninstall:n,togglingLocalId:l,uninstalling:i})=>{const p=r[0],v=`卸载 ${e.name||e.id}`;return a.jsxs("div",{className:"marketplace-row",children:[a.jsxs("div",{className:"marketplace-row-main",children:[a.jsxs("div",{className:"marketplace-row-title",children:[a.jsx(Ae,{"aria-hidden":!0,className:"h-3.5 w-3.5"}),a.jsx("span",{className:"marketplace-row-name",children:e.name||e.id})]}),(e.description||e.tagline)&&a.jsx("div",{className:"marketplace-row-description",children:e.description||e.tagline}),a.jsxs("div",{className:"marketplace-row-meta",children:[a.jsx("span",{className:"marketplace-pill",children:"市场"}),r.map(h=>{const N=fe(h);return a.jsxs("span",{className:"contents",children:[N&&a.jsx("span",{className:"marketplace-pill",children:N}),h.path&&a.jsx("span",{className:"marketplace-path",children:h.path})]},b(h))})]})]}),a.jsxs("div",{className:"marketplace-action",children:[p&&a.jsx(pe,{"aria-label":`${p.enabled?"禁用":"启用"} ${e.name||e.id}`,checked:p.enabled,disabled:l===b(p),onClick:()=>o(p,!p.enabled),title:`${p.enabled?"禁用":"启用"} ${e.name||e.id}`}),a.jsx("button",{"aria-label":v,className:"marketplace-icon-button marketplace-icon-button-danger",disabled:i,onClick:()=>n(e),title:v,type:"button",children:i?a.jsx(O,{"aria-hidden":!0,className:"marketplace-icon-spin"}):a.jsx(me,{"aria-hidden":!0})})]})]})},ca=({entry:e,installing:r,onInstall:o})=>{const n=Ze(e),l=ke(e).length>0&&!r,i=`安装 ${e.name||e.id}`;return a.jsxs("div",{className:"marketplace-row",children:[a.jsxs("div",{className:"marketplace-row-main",children:[a.jsx("div",{className:"marketplace-row-title",children:a.jsx("span",{className:"marketplace-row-name",children:e.name||e.id})}),(e.description||e.tagline)&&a.jsx("div",{className:"marketplace-row-description",children:e.description||e.tagline}),a.jsxs("div",{className:"marketplace-row-meta",children:[n&&a.jsx("span",{className:"marketplace-pill",children:n}),e.author&&a.jsx("span",{children:e.author})]})]}),a.jsx("div",{className:"marketplace-action",children:a.jsx("button",{"aria-label":i,className:"marketplace-icon-button",disabled:!l,onClick:()=>o(e),title:i,type:"button",children:r?a.jsx(O,{"aria-hidden":!0,className:"marketplace-icon-spin"}):a.jsx(qe,{"aria-hidden":!0})})})]})},va=({initialType:e="skill",onDone:r})=>{const{environment:o,remoteConfigSettings:n}=de(),[l,i]=c.useState(e),[p,v]=c.useState("installed"),[h,N]=c.useState([]),[I,Q]=c.useState([]),[B,xe]=c.useState(new Set),[be,J]=c.useState(null),[W,Y]=c.useState(null),[X,F]=c.useState(null),[M,L]=c.useState(""),[w,$]=c.useState(null),[we,Z]=c.useState(!0),[T,k]=c.useState(null),j=c.useCallback(async()=>{Z(!0),k(null);try{const[t,s]=await Promise.all([S.getMarketplaceCatalog(U.create({})),S.listMarketplaceLocalInstalledEntries(U.create({}))]),m=t.entries.filter(g=>H(g.type));N(m),Q(s.entries.filter(g=>H(g.type)));const d=await S.listMarketplaceInstalledEntries(Ee.create({entries:m}));xe(new Set(d.installedKeys))}catch(t){k(t instanceof Error?t.message:String(t))}finally{Z(!1)}},[]);c.useEffect(()=>{j()},[j]),c.useEffect(()=>{i(e),L(""),$(null),v("installed")},[e]);const y=l==="mcp"&&n?.mcpMarketplaceEnabled===!1,q=y?"installed":p;c.useEffect(()=>{y&&p==="marketplace"&&v("installed")},[p,y]);const x=Xe(l==="skillbot"?"skill":l),ee=c.useMemo(()=>{const t=M.trim().toLowerCase();return h.filter(s=>s.type===l&&(!t||ea(s).includes(t)))},[h,l,M]),E=c.useMemo(()=>ee.filter(t=>!B.has(f(t))),[ee,B]),P=c.useMemo(()=>{const t=new Map,s=new Map;for(const m of E)for(const d of G(m)){const g=A(d);g&&(t.set(g,d),s.set(g,(s.get(g)??0)+1))}return{counts:s,tags:[...t.entries()].map(([m,d])=>({id:m,label:d})).sort((m,d)=>m.label.localeCompare(d.label))}},[E]);c.useEffect(()=>{w&&!P.counts.has(w)&&$(null)},[w,P.counts]);const ae=c.useMemo(()=>w?E.filter(t=>G(t).some(s=>A(s)===w)):E,[E,w]),V=c.useMemo(()=>I.filter(t=>t.type===l),[I,l]),te=c.useMemo(()=>h.filter(t=>t.type===l),[h,l]),C=c.useMemo(()=>te.filter(t=>B.has(f(t))),[te,B]),z=c.useMemo(()=>{const t=new Map;for(const s of C){const m=V.filter(d=>Je(s,d));m.length>0&&t.set(f(s),m)}return t},[V,C]),re=c.useMemo(()=>{const t=new Set;for(const s of z.values())for(const m of s)t.add(b(m));return t},[z]),oe=c.useMemo(()=>V.filter(t=>!re.has(b(t))),[V,re]),je=c.useMemo(()=>{const t=new Map;for(const s of C){if(s.type!=="mcp")continue;const m=z.get(f(s))??[];for(const d of m){const g=d.name||d.id;g&&t.set(g,{name:s.name||s.id,description:s.description||s.tagline||void 0})}}return t},[C,z]),Ne=c.useCallback(async t=>{J(f(t)),k(null);try{await S.installMarketplaceEntry(le.create({entry:t})),await j(),v("installed")}catch(s){k(s instanceof Error?s.message:String(s))}finally{J(null)}},[j]),Se=c.useCallback(async t=>{F(f(t)),k(null);try{await S.uninstallMarketplaceEntry(le.create({entry:t})),await j()}catch(s){k(s instanceof Error?s.message:String(s))}finally{F(null)}},[j]),ye=c.useCallback(async t=>{F(b(t)),k(null);try{await S.uninstallMarketplaceLocalInstalledEntry(ze.create({entry:t})),await j()}catch(s){k(s instanceof Error?s.message:String(s))}finally{F(null)}},[j]),se=c.useCallback(async(t,s)=>{const m=b(t);Y(m),k(null);try{const d=await S.toggleMarketplaceLocalInstalledEntry(Ie.create({entry:t,enabled:s}));Q(d.entries.filter(g=>H(g.type)))}catch(d){k(d instanceof Error?d.message:String(d))}finally{Y(null)}},[]),Ce=c.useCallback(t=>{i(t),L(""),$(null),v("installed")},[]),Me=c.useCallback(t=>{y&&t==="marketplace"||v(t)},[y]);return a.jsxs(Ke,{className:"marketplace-view",children:[a.jsx(aa,{}),a.jsx(Be,{environment:o,onDone:r,title:"自定义"}),a.jsxs("div",{className:"marketplace-shell",children:[a.jsxs(ie,{className:"marketplace-nav",onValueChange:Ce,value:l,children:[a.jsx(K,{className:"marketplace-tab",value:"skillbot",children:"SkillBot"}),he.map(t=>a.jsxs(K,{className:"marketplace-tab",value:t.type,children:[a.jsx(t.icon,{"aria-hidden":!0,className:"h-4 w-4 shrink-0"}),a.jsx("span",{className:"marketplace-tab-label",children:t.label})]},t.type))]}),a.jsx(He,{className:"marketplace-content",children:a.jsxs("div",{className:"marketplace-inner",children:[l==="skillbot"?a.jsx(De,{onSelect:t=>{(async()=>{const s=await ne({action:"mode",mode:"batch"});await ne({action:"select",listingId:t.id},s?.taskId),r()})().catch(s=>k(String(s.message||s)))}}):a.jsxs(a.Fragment,{children:[a.jsx(ie,{"aria-label":`${x.title} 分区`,className:"marketplace-subnav",onValueChange:Me,value:q,children:Ye.map(t=>a.jsx(K,{className:"marketplace-subtab",disabled:y&&t.type==="marketplace",value:t.type,children:t.label},t.type))}),a.jsx("div",{className:"marketplace-primitive-description",children:x.description}),T&&a.jsx("div",{className:"marketplace-error",children:T}),we?a.jsxs("div",{className:"marketplace-loading",children:[a.jsx(Fe,{}),a.jsxs("span",{children:["正在加载 ",x.plural]})]}):a.jsxs(a.Fragment,{children:[q==="installed"&&(l==="mcp"?a.jsx(sa,{marketplaceMetadataByServerName:je,showHeader:!1,showServerList:!0}):a.jsxs(ta,{count:C.length+oe.length,empty:`暂无已安装的 ${x.plural}。`,showHeader:!1,title:`已安装的 ${x.title}`,children:[C.map(t=>a.jsx(na,{entry:t,matchedLocalEntries:z.get(f(t))??[],onToggle:se,onUninstall:Se,togglingLocalId:W,uninstalling:X===f(t)},f(t))),oe.map(t=>a.jsx(la,{entry:t,onToggle:se,onUninstall:ye,toggling:W===b(t),uninstalling:X===b(t)},b(t)))]})),q==="marketplace"&&a.jsx(ra,{count:ae.length,empty:M||w?`没有匹配搜索的 ${x.plural}。`:`市场中暂无 ${x.plural}。`,filters:a.jsx(oa,{counts:P.counts,onSelect:$,selectedTag:w,tags:P.tags}),search:a.jsx("div",{className:"marketplace-search",children:a.jsxs(Le,{"aria-label":`搜索 ${x.title}`,onInput:t=>L(t.target.value),placeholder:`搜索 ${x.plural}`,value:M,children:[a.jsx("span",{className:"codicon codicon-search",slot:"start"}),M&&a.jsx("button",{"aria-label":"清除搜索",className:"codicon codicon-close marketplace-clear-search",onClick:()=>L(""),slot:"end",type:"button"})]})}),showHeader:!1,children:ae.map(t=>a.jsx(ca,{entry:t,installing:be===f(t),onInstall:Ne},f(t)))})]})]}),l==="skillbot"&&T&&a.jsx("p",{role:"alert",children:T})]})})]})]})};export{aa as MarketplaceStyles,ta as Section,va as default};
