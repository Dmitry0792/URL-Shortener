const myForm = document.getElementById("myForm");
const copy = document.getElementById("copy")
const ret_shortUrl = document.querySelector(".ret_shortUrl");
const shortUrlNone = document.querySelector(".shortUrlNone");



myForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const searchParams = Object.fromEntries(formData.entries());

  await fetch("http://localhost:5001/createShortUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(searchParams),
  })
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      ret_shortUrl.value = text;
    });
    
    shortUrlNone.classList.add("shortUrlContent");
});

copy.addEventListener("click", function () {

  ret_shortUrl.select();
  document.execCommand("copy");

  copy.innerHTML = "copied";
  setTimeout(function () {copy.innerHTML = "copy"}, 1500);
});



