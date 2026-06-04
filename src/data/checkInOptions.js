// Opciones hardcodeadas a falta de endpoint que exponga enums de check-in
/* Ejemplos que podrían ser:
GET /api/checkIn/emotional-states
GET /api/checkIn/contexts
GET /api/catalogs/check-in
*/

export const emotionOptions = [
  { value: "Feliz / Con energía", label: "Feliz", emoji: "😊" },
  { value: "Tranquilo / Enfocado", label: "Tranquilo", emoji: "🙂" },
  { value: "Cansado / Aburrido", label: "Cansado", emoji: "😐" },
  { value: "Triste / Desanimado", label: "Triste", emoji: "😢" },
  { value: "Nervioso / Ansioso", label: "Ansioso", emoji: "😟" },
  { value: "Enojado / Frustrado", label: "Enojado", emoji: "😠" },
];

export const contextOptions = [
  { id: "Inicio de Jornada", value: "Inicio de Jornada", label: "Inicio de jornada" },
  { id: "Fin de Jornada", value: "Fin de Jornada", label: "Fin de jornada" },
  { id: "Antes de un Examen", value: "Antes de un Examen", label: "Antes de un examen" },
  { id: "Post-Evaluación", value: "Post-Evaluación", label: "Post-evaluación" },
  { id: "Durante la Clase", value: "Durante la Clase", label: "Durante la clase" },
  { id: "En el Recreo", value: "En el Recreo", label: "En el recreo" },
  { id: "En Casa", value: "En Casa", label: "En casa" },
  { id: "Espacio de Gabinete", value: "Espacio de Gabinete", label: "Espacio de gabinete" },
  { id: "En otro lado", value: "En otro lado", label: "En otro lado" },
];