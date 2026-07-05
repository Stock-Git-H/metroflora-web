import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Nastavení webu",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Název firmy", type: "string" }),
    defineField({ name: "address", title: "Adresa provozovny", type: "string" }),
    defineField({ name: "ico", title: "IČO", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "facebookUrl", title: "Facebook", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "shippingPerCarton", title: "Cena dopravy za karton (Kč bez DPH)", type: "number", initialValue: 80 }),
    defineField({ name: "bankAccountIban", title: "Bankovní účet pro QR platbu (IBAN)", type: "string" }),
  ],
});
