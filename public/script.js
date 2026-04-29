function goToForm() {
  document.getElementById("rankForm").scrollIntoView({
    behavior: "smooth"
  });
}

document.getElementById("leadForm")
.addEventListener("submit", async function (e) {

  e.preventDefault();

  const formData = new FormData(this);

  const data = {
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    rank: formData.get("rank"),
    studentClass: formData.get("studentClass")
  };

  try {

    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    document.getElementById("msg").innerText = result.message;

    if (result.success) {
      this.reset();
    }

  } catch (error) {
    document.getElementById("msg").innerText =
      "Something went wrong!";
  }

});

let totalSeconds =
5 * 24 * 60 * 60 +
12 * 60 * 60 +
45 * 60 +
30;

function updateTimer() {

  let d = Math.floor(totalSeconds / 86400);
  let h = Math.floor((totalSeconds % 86400) / 3600);
  let m = Math.floor((totalSeconds % 3600) / 60);
  let s = totalSeconds % 60;

  document.getElementById("timer").innerText =
    String(d).padStart(2, "0") + " : " +
    String(h).padStart(2, "0") + " : " +
    String(m).padStart(2, "0") + " : " +
    String(s).padStart(2, "0");

  if (totalSeconds > 0) totalSeconds--;
}

setInterval(updateTimer, 1000);
updateTimer();