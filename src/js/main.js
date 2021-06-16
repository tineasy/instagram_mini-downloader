let link,
  click = 0;

document.addEventListener("click", (event) => {
  target_class = event.target.className;
  // post
  if (target_class === "_9AhH0") {
    click += 1;
    setTimeout(() => {
      if (click === 2) {
        link = event.target.parentNode.firstChild.firstChild.getAttribute("src");
        // download(link);
        console.log(link);
        click = 0;
      }
    }, 1000);
  }
  // story
  if (target_class === "BPyeS") {
    try {
      link = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelector("video source")
        .getAttribute("src");
    } catch {
      link = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .querySelector("img")
        .getAttribute("src");
    }
    download(link);
  }
  // video
  if (target_class === "fXIG0") {
    click += 1;
    setTimeout(() => {
      if (click === 0) {
        link = event.target.parentNode.querySelector("video").getAttribute("src");
        console.log(link); // FIXME: getting blob link, but no idea how to download from it yet
      }
      click = 0;
    }, 1000);
  }
});
