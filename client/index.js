const myForm = document.getElementById("myForm");
const myInput = document.querySelector(".myInput");

myForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const searchParams = new URLSearchParams();

  searchParams.append("longUrl", formData.get("longUrl"));

  await fetch("http://localhost:5001/createShortUrl", {
    method: "POST",
    body: searchParams,
  })
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      myInput.value = text;
    });
});
