const departamentos = [
    "Exatas",
    "Humanas",
    "Científicas",
    "Qualidade",
    "Enfermagem",
    "PD",
    "Mecânica",
    "Geodésia",
    "Edificações"
] as const;

export type Departamento = typeof departamentos[number];
export default departamentos;
