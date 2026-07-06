export const VAT_RATE = 0.21;

export function splitVat(gross: number) {
  const net = gross / (1 + VAT_RATE);
  const vat = gross - net;
  return { net: Math.round(net), vat: Math.round(vat), gross: Math.round(gross) };
}
