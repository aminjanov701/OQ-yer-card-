const DATA = {
  firstName: "Eldor",
  lastName: "",
  title: "Asoschi",
  organization: "OQ YER CHOYXONASI",
  phone: "+998 90 300 18 18",
  telegramUsername: ""
};

const phoneText = document.getElementById("phoneText");
const phonePrimary = document.getElementById("primaryContact");
const phoneLine = document.getElementById("phoneLine");
const telegramLine = document.getElementById("telegramLine");
const telegramText = document.getElementById("telegramText");
const saveContact = document.getElementById("saveContact");
const toast = document.getElementById("toast");

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove("show"),2200);
}

function phone(){
  return String(DATA.phone||"").replace(/[^\d+]/g,"");
}

function setup(){
  const p = phone();

  if(p){
    phoneText.textContent = DATA.phone;
    phonePrimary.href = `tel:${p}`;
    phoneLine.setAttribute("role","link");
    phoneLine.addEventListener("click",()=>location.href=`tel:${p}`);
    phoneLine.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();location.href=`tel:${p}`;}
    });
  }else{
    phoneText.textContent = "Telefon raqami";
    const noPhone = e=>{e.preventDefault();showToast("Telefon raqami keyin qo‘shiladi")};
    phonePrimary.href = "#";
    phonePrimary.addEventListener("click",noPhone);
    phoneLine.addEventListener("click",noPhone);
    phoneLine.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();showToast("Telefon raqami keyin qo‘shiladi");}
    });
  }

  if(DATA.telegramUsername){
    const u=DATA.telegramUsername.replace(/^@/,"");
    telegramLine.href=`https://t.me/${u}`;
    telegramText.textContent=`@${u}`;
  }else{
    telegramLine.href="#";
    telegramText.textContent="@username";
    telegramLine.addEventListener("click",e=>{
      e.preventDefault();
      showToast("Telegram keyin qo‘shiladi");
    });
  }
}

function esc(v){
  return String(v||"")
    .replace(/\\/g,"\\\\")
    .replace(/\n/g,"\\n")
    .replace(/;/g,"\\;")
    .replace(/,/g,"\\,");
}

function makeVCard(){
  const full=[DATA.firstName,DATA.lastName].filter(Boolean).join(" ");
  const lines=[
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(DATA.lastName)};${esc(DATA.firstName)};;;`,
    `FN:${esc(full)}`,
    `ORG:${esc(DATA.organization)}`,
    `TITLE:${esc(DATA.title)}`
  ];
  if(DATA.phone) lines.push(`TEL;TYPE=CELL:${esc(DATA.phone)}`);
  if(DATA.telegramUsername){
    const u=DATA.telegramUsername.replace(/^@/,"");
    lines.push(`URL;TYPE=Telegram:https://t.me/${esc(u)}`);
  }
  lines.push("ADR;TYPE=WORK:;;Farg‘ona, Uzbekistan;;;;");
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

saveContact.addEventListener("click",()=>{
  const blob=new Blob([makeVCard()],{type:"text/vcard;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="Eldor-OQ-YER.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Kontakt yuklab olindi");
});

setup();
