const pathname = location.pathname;
const publicPath=pathname.includes('threejs')?'/threejs':''

const importmap=`
{
  "imports": {
    "three": "https://unpkg.com/three@0.162.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.162.0/examples/jsm/"
  }
}
`
const script2 = document.createElement("script");
script2.type="importmap"
script2.innerHTML=importmap
document.head.appendChild(script2)

const str = `
<nav id="nav">
    <a href="${publicPath}/src/dy.html">自有形状</a>
    <a href="${publicPath}/src/model.html">3d模型</a>
    <a href="${publicPath}/src/text.html">文字</a>
</nav>
`;

const div = document.createElement("div");
div.innerHTML = str;
document.body.insertBefore(div, document.body.firstChild);

const script = document.createElement("script");
script.type = "module";
script.src = pathname.replace("html", `js`);
document.body.appendChild(script);
