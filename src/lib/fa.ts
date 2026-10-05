export const faDigits = (s: string | number): string =>
  String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const faNum = (n: number): string => n.toLocaleString("fa-IR");
