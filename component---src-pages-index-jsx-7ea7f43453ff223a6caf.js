(self.webpackChunkgatsby_starter_hoodie=self.webpackChunkgatsby_starter_hoodie||[]).push([[230],{1309:function(e,t,n){"use strict";var l=n(7294),o=n(2788),i=n(9583),a=n(9349);const r=o.default.div.withConfig({displayName:"Bio__BioWrapper",componentId:"sc-5v8ml6-0"})(["display:flex;align-items:center;@media (max-width:768px){padding:0 15px;}"]),c="undefined"!=typeof window&&"localhost:8000"===window.location.host?"http://localhost:8000":a.siteUrl,s=o.default.div.withConfig({displayName:"Bio__Profile",componentId:"sc-5v8ml6-1"})(["flex:0 0 auto;margin-right:16px;width:128px;height:128px;border-radius:999px;background-image:url(","/profile.jpeg);background-size:cover;background-position:center;"],c),m=o.default.div.withConfig({displayName:"Bio__Author",componentId:"sc-5v8ml6-2"})(["margin-bottom:4.8px;font-size:24px;font-weight:700;color:",";"],(e=>e.theme.colors.text)),d=o.default.div.withConfig({displayName:"Bio__Description",componentId:"sc-5v8ml6-3"})(["margin-bottom:11.2px;line-height:1.5;font-size:16px;color:",";"],(e=>e.theme.colors.secondaryText)),p=o.default.div.withConfig({displayName:"Bio__LinksWrapper",componentId:"sc-5v8ml6-4"})(["& a{margin-right:9.6px;}& svg{width:25.6px;height:25.6px;cursor:pointer;}& svg path{fill:",";transition:fill 0.3s;}& a:hover svg path{fill:",";}"],(e=>e.theme.colors.icon),(e=>e.theme.colors.text)),u=e=>{let{link:t,children:n}=e;return t?l.createElement("a",{href:t,target:"_blank",rel:"noreferrer"},n):null};t.Z=()=>{const{github:e,kaggle:t,instagram:n,facebook:o,linkedIn:c,email:g,etc:f}=a.links;return l.createElement(r,{id:"bio"},l.createElement(s,null),l.createElement("div",null,l.createElement(m,null,"@",a.author),l.createElement(d,null,a.description),l.createElement(p,null,l.createElement(u,{link:e},l.createElement(i.hJX,null)),l.createElement(u,{link:t},l.createElement(i.jnu,null)),l.createElement(u,{link:n},l.createElement(i.Zf_,null)),l.createElement(u,{link:o},l.createElement(i.Am9,null)),l.createElement(u,{link:c},l.createElement(i.ltd,null)),l.createElement(u,{link:g},l.createElement(i.SRX,null)),l.createElement(u,{link:f},l.createElement(i.gjK,null)))))}},4246:function(e,t,n){"use strict";var l=n(3493),o=n.n(l),i=n(7294),a=n(2788),r=n(1883),c=n(2213),s=n(729),m=n(184);const d=a.default.div.withConfig({displayName:"PostList__PostListWrapper",componentId:"sc-1oqnm6-0"})(["@media (max-width:768px){padding:0 10px;}"]),p=a.default.div.withConfig({displayName:"PostList__PostWrapper",componentId:"sc-1oqnm6-1"})(["position:relative;top:0;transition:all 0.5s;@media (max-width:768px){padding:0 5px;}"]),u=a.default.p.withConfig({displayName:"PostList__Date",componentId:"sc-1oqnm6-2"})(["margin-bottom:16px;font-size:14.4px;color:",";"],(e=>e.theme.colors.tertiaryText)),g=a.default.p.withConfig({displayName:"PostList__Excerpt",componentId:"sc-1oqnm6-3"})(["margin-bottom:32px;line-height:1.7;font-size:16px;color:",";word-break:break-all;"],(e=>e.theme.colors.secondaryText));t.Z=e=>{let{postList:t}=e;const{0:n,1:l}=(0,i.useState)(10),a=o()((()=>{document.documentElement.scrollHeight-document.documentElement.scrollTop<=document.documentElement.clientHeight+100&&n<t.length&&setTimeout((()=>l(n+10)),300)}),250);return(0,i.useEffect)((()=>(window.addEventListener("scroll",a),()=>{window.removeEventListener("scroll",a)})),[n,t]),(0,i.useEffect)((()=>{l(10)}),[t]),i.createElement(d,null,t.slice(0,n).map(((e,l)=>{const{title:o,description:a,date:d,tags:f}=e.frontmatter,{excerpt:h}=e,{slug:E}=e.fields;return i.createElement(i.Fragment,null,i.createElement(p,null,i.createElement(c.Z,{size:"bg"},i.createElement(r.Link,{to:E},o)),i.createElement(u,null,d),a?i.createElement(g,null,a):i.createElement(g,null,h),i.createElement(m.Z,{tagList:f})),n-1!==l&&t.length-1!==l&&i.createElement(s.Z,{mt:"48px",mb:"32px"}))})))}},184:function(e,t,n){"use strict";var l=n(7294),o=n(2788),i=n(1883);const a=o.default.div.withConfig({displayName:"TagList__TagListWrapper",componentId:"sc-s1uz5f-0"})(["margin-bottom:16px;word-break:break-all;"]),r=o.default.div.withConfig({displayName:"TagList__TagLink",componentId:"sc-s1uz5f-1"})(["display:inline-block;padding:9.6px 11.2px;margin-right:8px;margin-bottom:8px;border-radius:50px;background-color:",";color:",";text-decoration:none;font-size:14.4px;transition:all 0.2s;&:hover{background-color:",";}"],(e=>e.selected?e.theme.colors.selectedTagBackground:e.theme.colors.tagBackground),(e=>e.selected?e.theme.colors.selectedTagText:e.theme.colors.tagText),(e=>e.selected?e.theme.colors.hoveredSelectedTagBackground:e.theme.colors.hoveredTagBackground)),c=e=>e.replace(/\s+/g,"-");t.Z=e=>{let{tagList:t,count:n,selected:o}=e;return t?n?l.createElement(a,null,t.map(((e,t)=>l.createElement(i.Link,{key:JSON.stringify({tag:e,i:t}),to:o===e.fieldValue?"/tags":"/tags?q="+e.fieldValue},l.createElement(r,{selected:e.fieldValue===o},c(e.fieldValue)," (",e.totalCount,")"))))):l.createElement(a,null,t.map(((e,t)=>l.createElement(i.Link,{key:JSON.stringify({tag:e,i:t}),to:"/tags?q="+e},l.createElement(r,null,c(e)))))):null}},804:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var l=n(9734),o=n.n(l),i=n(7294),a=n(5038),r=n(5609),c=n(1309),s=n(4246),m=n(5161),d=n.n(m),p=n(2788),u=n(1883);const g=p.default.div.withConfig({displayName:"SideTagList__RelativeWrapper",componentId:"sc-11pn9fc-0"})(["position:relative;"]),f=p.default.aside.withConfig({displayName:"SideTagList__Wrapper",componentId:"sc-11pn9fc-1"})(["position:absolute;left:112%;top:0px;width:200px;height:100px;font-size:16px;@media (max-width:1300px){display:none;}"]),h=p.default.div.withConfig({displayName:"SideTagList__Title",componentId:"sc-11pn9fc-2"})(["margin-bottom:25px;font-weight:bold;color:",";"],(e=>e.theme.colors.secondaryText)),E=p.default.li.withConfig({displayName:"SideTagList__Tag",componentId:"sc-11pn9fc-3"})(["margin-bottom:16px;color:",";cursor:pointer;transition:color 0.3s;&:hover{color:",";}& > a{color:inherit;text-decoration:none;}"],(e=>e.theme.colors.tertiaryText),(e=>e.theme.colors.text));var x=e=>{let{tags:t,postCount:n}=e;return i.createElement(g,null,i.createElement(f,null,i.createElement(h,null,"TAG LIST"),i.createElement("ul",null,i.createElement(E,null,i.createElement(u.Link,{to:"/tags"},"all (",n,")")),d()(t,(e=>i.createElement(E,null,i.createElement(u.Link,{to:"/tags?q="+e.fieldValue},e.fieldValue," (",e.totalCount,")")))))))},k=n(729),v=n(1093),w=n(9349);var b=e=>{let{data:t}=e;const n=t.allMarkdownRemark.nodes,l=o()(t.allMarkdownRemark.group,["totalCount"]).reverse();return 0===n.length?i.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'):i.createElement(a.Z,null,i.createElement(r.Z,{title:w.title,description:w.description,url:w.siteUrl}),i.createElement(v.Z,{size:48}),i.createElement(c.Z,null),i.createElement(k.Z,null),i.createElement(x,{tags:l,postCount:n.length}),i.createElement(s.Z,{postList:n}))}},5161:function(e,t,n){var l=n(9932),o=n(7206),i=n(9199),a=n(1469);e.exports=function(e,t){return(a(e)?l:i)(e,o(t,3))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-7ea7f43453ff223a6caf.js.map