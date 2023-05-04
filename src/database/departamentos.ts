const departamentos = [
    "Exatas",
    "Humanas",
    "Científicas",
    "Qualidade",
    "Enfermagem",
    "Desenvolvimento de Sistemas",
    "Mecânica",
    "Geodésia",
    "Edificações"
] as const;

export type Departamento = typeof departamentos[number];
export default departamentos;
