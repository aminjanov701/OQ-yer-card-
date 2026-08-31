// ===============================
// OQ YER — ELDOR DIGITAL CARD
// Replace the placeholders below
// when the final contact details
// are available.
// ===============================

const DATA = {
  firstName: "Eldor",
  lastName: "",
  title: "Asoschi",
  organization: "OQ YER CHOYXONASI",
  phone: "+998 90 300 18 18",                 // Example: +998901234567
  telegramUsername: "",      // Example: eldor_oqyer
  oqyerTelegram: ""          // Example: oqyerchoyxonasi
};

const phoneLink = document.getElementById("phoneLink");
const phoneText = document.getElementById("phoneText");
const telegramLink = document.getElementById("telegramLink");
const telegramText = document.getElementById("telegramText");
const oqyerTelegram = document.getElementById("oqyerTelegram");
const oqyerTelegramText = document.getElementById("oqyerTelegramText");
const saveContact = document.getElementById("saveContact");
const toast = document.getElementById("toast");

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function setupContacts() {
  const phone = normalizePhone(DATA.phone);

  if (phone) {
    phoneLink.href = `tel:${phone}`;
    phoneText.textContent = DATA.phone;
  } else {
    phoneLink.href = "#";
    phoneText.textContent = "Telefon raqami";
    phoneLink.addEventListener("click", e => {
      e.preventDefault();
      showToast("Telefon raqami keyin qo‘shiladi");
    });
  }

  if (DATA.telegramUsername) {
    const username = DATA.telegramUsername.replace(/^@/, "");
    telegramLink.href = `https://t.me/${username}`;
    telegramText.textContent = `@${username}`;
  } else {
    telegramLink.href = "#";
    telegramText.textContent = "@username";
    telegramLink.addEventListener("click", e => {
      e.preventDefault();
      showToast("Telegram keyin qo‘shiladi");
    });
  }

function escapeVCard(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function makeVCard() {
  const fullName = [DATA.firstName, DATA.lastName].filter(Boolean).join(" ");
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(DATA.lastName)};${escapeVCard(DATA.firstName)};;;`,
    `FN:${escapeVCard(fullName)}`,
    `ORG:${escapeVCard(DATA.organization)}`,
    `TITLE:${escapeVCard(DATA.title)}`
  ];

  if (DATA.phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(DATA.phone)}`);
  if (DATA.telegramUsername) {
    const username = DATA.telegramUsername.replace(/^@/, "");
    lines.push(`URL;TYPE=Telegram:https://t.me/${escapeVCard(username)}`);
  }

  lines.push("ADR;TYPE=WORK:;;Farg‘ona, Uzbekistan;;;;");
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

saveContact.addEventListener("click", () => {
  const blob = new Blob([makeVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Eldor-OQ-YER.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Kontakt yuklab olindi");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

setupContacts();
