const DATA = {
  firstName: "Eldor",
  lastName: "",
  title: "Asoschi",
  organization: "OQ YER CHOYXONASI",
  phone: "+998 90 300 18 18",
  instagram: "https://www.instagram.com/ekambaraliev?igsi=dm42bHp3Nno2eXZu"
};

const saveContact = document.getElementById("saveContact");
const toast = document.getElementById("toast");

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove("show"),2200);
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
  if(DATA.instagram) lines.push(`URL;TYPE=Instagram:${DATA.instagram}`);
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
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  showToast("Kontakt yuklab olindi");
});
