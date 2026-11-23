import { COMPANY } from "../lib/company";

export default function CompanyBlock() {
  return (
    <p>
      <strong>{COMPANY.name}</strong> (brand „{COMPANY.brand}”)<br />
      CUI: {COMPANY.cui} · Nr. Reg. Com.: {COMPANY.regCom}<br />
      Sediu social: {COMPANY.address}<br />
      Telefon / WhatsApp: {COMPANY.phone}
      {COMPANY.email ? <><br />Email: {COMPANY.email}</> : null}
    </p>
  );
}
