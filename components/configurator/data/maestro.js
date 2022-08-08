const canteadora = {
  code: "canteadora",
  title: "canteadora",
  type: "text",
  options: [
    {
      title: "SI es canteadora",
      code: "canteadora-yes",
      next: "cantosMinimos",
      order: "2",
    },
    {
      title: "NO es canteadora",
      code: "canteadora-no",
      next: "fin",
      order: "2",
    },
  ],
};

const cantosMinimos = {
  code: "cantosMinimos",
  title: "Cantos minimos",
  type: "text",
  options: [
    {
      title: "SI (Cantos minimos)",
      code: "cantos-minimos-yes",
      next: "fin",
      order: "2",
    },
    {
      title: "NO (Cantos minimos)",
      code: "cantos-minimos-no",
      next: "fin",
      order: "2",
    },
  ],
};

const fin = {
  code: "fin",
  title: "Finalizacion",
  type: "text",
  options: [
    {
      title: "Proceda a seleccionar el sugerencias y guardar el presupuesto",
      code: "finalizacion-yes",
      order: "2",
      disabled: true,
    },
  ],
};

/*
    {
      title: "Agrupamiento de piezas idénticas",
      code: "escuadradoras-02",
      next: "zapatos",
      delete: "sombreros",
      order: "2",
    },
    {
      title: "Desagrupamiento de piezas idénticas",
      code: "escuadradoras-03",
      next: "zapatos",
      delete: "sombreros",
      order: "2",
    },
    {
      title: "Mezcla de materias primas",
      code: "escuadradoras-04",
      next: "zapatos",
      delete: "sombreros",
      order: "2",
    },
    {
      title: "Macros",
      code: "escuadradoras-05",
      next: "zapatos",
      delete: "sombreros",
      order: "2",
    },
    */

export const defaultValues = {
  corte: {
    code: "corte",
    title: "Tipo de corte",
    type: "text",
    options: [
      {
        title: "Escuadradora",
        code: "corte-escuadradora",
        next: "canteadora",
        order: "1",
      },
      {
        title: "Seccionadora",
        code: "corte-seccionadora",
        next: "canteadora",
        order: "1",
      },
      {
        title: "Nesting",
        code: "corte-nesting",
        next: "canteadora",
        order: "1",
      },
    ],
  },
  canteadora,
  cantosMinimos,
  fin,
};
