// Categorías Hardcodeadas a falta de endpoint que las exponga
/* Ejemplos que podrían ser: 
GET /api/referrals/categories
GET /api/enums/referral-categories
GET /api/catalogs/referral-categories
*/

export const referralCategories = [
  {
    value: "Dificultades de Aprendizaje",
    label: "Dificultades de aprendizaje",
  },
  {
    value: "Conducta y Convivencia",
    label: "Conducta y convivencia",
  },
  {
    value: "Socioemocional/Familiar",
    label: "Socioemocional / familiar",
  },
  {
    value: "Complejo/Multifactorial",
    label: "Complejo / multifactorial",
  },
];

export const REFERRAL_PENDING_STATUS = "Pendiente de aceptación";