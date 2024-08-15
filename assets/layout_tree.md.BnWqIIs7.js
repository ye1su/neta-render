import{N as a}from"./chunks/NetaGraph.Bfvpf5Cn.js";import{y as o,o as r,c as s,a4 as n}from"./chunks/framework.VLLYMu_m.js";const i=n('<h1 id="树布局-tree" tabindex="-1">树布局 Tree <a class="header-anchor" href="#树布局-tree" aria-label="Permalink to &quot;树布局  Tree&quot;">​</a></h1><h2 id="attrs" tabindex="-1">Attrs <a class="header-anchor" href="#attrs" aria-label="Permalink to &quot;Attrs&quot;">​</a></h2><h3 id="attrs-type" tabindex="-1">Attrs.type <a class="header-anchor" href="#attrs-type" aria-label="Permalink to &quot;Attrs.type&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tree</span></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><h3 id="options-direction" tabindex="-1">Options.direction <a class="header-anchor" href="#options-direction" aria-label="Permalink to &quot;Options.direction&quot;">​</a></h3><p>树的渲染方向 </p><p><strong>值为</strong> <code>&quot;tb&quot; | &quot;bt&quot; | &quot;lr&quot; | &quot;rl&quot;</code></p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div id="canvans" style="width:688px;height:600px;"></div>',10),l=[i],h=JSON.parse('{"title":"树布局  Tree","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"layout/tree.md","filePath":"layout/tree.md"}'),d={name:"layout/tree.md"},m=Object.assign(d,{setup(c){return o(()=>{const e=new a({rendererType:"canvas",el:document.getElementById("canvans"),backgroundColor:"#ffe",layout:{type:"tree"}}),t={nodes:[{id:"1",label:"Company1"},{id:"2",label:"Company2"},{id:"3",label:"Company3"},{id:"4",label:"Company4"},{id:"5",label:"Company5"},{id:"6",label:"Company6"},{id:"7",label:"Company7"},{id:"8",label:"Company8"},{id:"9",label:"Company9"},{id:"10",label:"Company10"},{id:"11",label:"Company11"},{id:"12",label:"Company12"}],edges:[{source:"1",target:"2"},{source:"1",target:"3"},{source:"2",target:"5"},{source:"5",target:"6"},{source:"3",target:"4"},{source:"4",target:"7"},{source:"1",target:"8"},{source:"1",target:"9"},{source:"5",target:"10"},{source:"5",target:"11"},{source:"3",target:"12"}]};e.read(t),e.render()}),(e,t)=>(r(),s("div",null,l))}});export{h as __pageData,m as default};