import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Objednávka",
  type: "document",
  fields: [
    defineField({ name: "orderNumber", title: "Číslo objednávky (variabilní symbol)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "customerName", title: "Jméno zákazníka", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "address", title: "Doručovací adresa", type: "text" }),
    defineField({
      name: "fulfillment",
      title: "Způsob doručení",
      type: "string",
      options: { list: [
        { title: "Osobní odběr", value: "odber" },
        { title: "TOPTRANS", value: "toptrans" },
      ] },
    }),
    defineField({
      name: "paymentMethod",
      title: "Způsob platby",
      type: "string",
      options: { list: [
        { title: "Hotově při odběru", value: "hotove" },
        { title: "Na dobírku", value: "dobirka" },
        { title: "Převodem předem (QR platba)", value: "prevodem" },
      ] },
    }),
    defineField({
      name: "items",
      title: "Položky",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "wine", title: "Víno", type: "reference", to: [{ type: "wine" }] }),
            defineField({ name: "quantity", title: "Počet lahví", type: "number" }),
            defineField({ name: "unitPrice", title: "Cena za lahev", type: "number" }),
          ],
        },
      ],
    }),
    defineField({ name: "shippingCost", title: "Cena dopravy", type: "number" }),
    defineField({ name: "totalPrice", title: "Celková cena", type: "number" }),
    defineField({
      name: "paymentStatus",
      title: "Stav platby",
      type: "string",
      options: { list: ["čeká na platbu", "zaplaceno", "vyřízeno"] },
      initialValue: "čeká na platbu",
    }),
    defineField({ name: "createdAt", title: "Vytvořeno", type: "datetime" }),
  ],
  preview: {
    select: { title: "orderNumber", subtitle: "customerName" },
  },
});
