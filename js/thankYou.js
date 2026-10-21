const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxZAnKEtOlYFw9bR7wcEexKBnoityngZZVtkpzfylq_3_GgbQ3lx0JC4xb_X2FP6FOE/exec";

async function sendFormData() {
  const raw = localStorage.getItem("formData");
  if (!raw) return void console.log("Malumotlar yoq");
  const data = JSON.parse(raw);
  const body = new FormData();
  body.append("sheetName", "Lead");
  body.append("Ism", data.Ism);
  body.append("Telefon raqam", data.TelefonRaqam);
  body.append("Royhatdan o'tgan vaqti", data.SanaSoat);
  try {
    const res = await fetch(SHEET_URL, { method: "POST", body });
    if (!res.ok) throw new Error("API response was not ok");
    localStorage.removeItem("formData");
  } catch (err) {
    console.error("Error submitting form:", err);
    const el = document.getElementById("errorMessage");
    if (el) el.style.display = "block";
  }
}
window.onload = sendFormData;
