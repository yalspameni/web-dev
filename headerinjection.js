let elem = document.createElement("div");
elem.innerHTML = " <link rel='stylesheet'href='https://yalspameni.github.io/web-dev/header.css'>";
document.body.prepend(elem);

fetch("https://yalspameni.github.io/web-dev/globalheader.html")
.then((result) => result.text())
.then((text) => {elem.innerHTML = elem.innerHTML + text;})
.catch((e) => console.error(e));
