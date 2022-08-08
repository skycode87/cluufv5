const startdate = {
  code: "startdate",
  title: "Fecha comienzo",
  type: "inputDate",
  options: [
    {
      title: "Fecha",
      code: "startdate",
      next: "comment",
      name: "startdate", // form request
      order: "2",
    },
  ],
};

const comment = {
  code: "comment",
  title: "Comentario",
  type: "input",
  options: [
    {
      title: "Comentario",
      code: "comment",
      name: "comment", // form request
      next: "edad",
      order: "4",
    },
  ],
};

const edad = {
  code: "edad",
  title: "edad",
  type: "input",
  options: [
    {
      title: "Edad",
      code: "edad",
      name: "edad", // form request
      next: "fin",
      order: "5",
    },
  ],
};

const fin = {
  code: "fin",
  title: "Finalizacion",
  type: "text",
  options: [
    {
      title: "Guardar",
      code: "finalizacion-yes",
      order: "20",
      next: "submit",
    },
  ],
};

export const defaultValues = {
  type: {
    code: "type",
    title: "Tipo de tarea",
    type: "text",
    options: [
      {
        title: "Instalacion",
        code: "type-instalacion",
        next: "startdate",
        name: "type", // form request
        order: "1",
      },
      {
        title: "Soporte",
        code: "type-soporte",
        next: "startdate",
        name: "type", // form request
        order: "1",
      },
      {
        title: "Demostración",
        code: "type-demo",
        name: "type", // form request
        next: "startdate",
        order: "1",
      },
      {
        title: "Asesoria",
        code: "type-asesoria",
        next: "startdate",
        name: "type", // form request
        order: "1",
      },
    ],
  },
  startdate,
  comment,
  edad,
  fin,
};
