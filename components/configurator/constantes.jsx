export const programData = {
  name: "program",
  id: "1000",
  data: [
    {
      title: "Mesa",
      imageUrl:
        "https://limobelinwo.com/wp-content/uploads/2021/05/aurora-24.jpg",
      helpUrl: "",
      code: programCode.P1000,
    },
    {
      title: "TANDEMBOX",
      imageUrl:
        "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~ANTARO.jpg",
      helpUrl: "",
      code: programCode.P2000,
    },
    {
      title: "METABOX",
      imageUrl:
        "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~METABOX.jpg",
      helpUrl: "",
      code: programCode.P3000,
    },
  ],
};

const data = {
  movento: {
    extension: ["extensionTotal"],
  },
  taden: {
    extension: ["extensionTotal", "extensionParcial"],
  },
  standar: {
    extension: [extensionParcial],
    color: ["colorGeneral"],
  },
};
