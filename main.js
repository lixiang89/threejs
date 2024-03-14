const str = `
<nav id="nav">
    <a href="/src/dy.html">自有形状</a>
    <a href="/src/model.html">3d模型</a>
    <a href="/src/text.html">文字</a>
</nav>
`;

const div = document.createElement("div");
div.innerHTML = str;
document.body.insertBefore(div, document.body.firstChild);

const pathname = location.pathname;

const script = document.createElement("script");
script.type = "module";
script.src = pathname.replace("html", `js`);
document.body.appendChild(script);
