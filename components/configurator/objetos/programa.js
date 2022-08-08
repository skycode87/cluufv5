import { extensionDV1, extensionDV2 } from "./extension.js";
import { colorDV1, colorDV2 } from "./color.js";

const programCode = {
  P1000: "MOVENTO",
  P2000: "TANDEM",
  P3000: "STANDART",
};

export const programDV1 = [
  {
    title: "MOVENTO",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~MOVENTO.jpg",
    helpUrl: "",
    code: programCode.P1000,
    name: "program",
  },
  {
    title: "TANDEM",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~TANDEM.jpg",
    helpUrl: "",
    code: programCode.P2000,
    name: "program",
  },
  {
    title: "STANDART",
    imageUrl:
      "https://e-services.blum.com/opc/resources/img/configuration/PROGLI~STANDARD.jpg",
    helpUrl: "",
    code: programCode.P3000,
    name: "program",
  },
];

const programExtension = (data) => {
  const result = [];

  if (data.code === programCode.P1000) result.push(extensionDV1);
  else if (data.code === programCode.P2000) {
    result.push(extensionDV1);
    result.push(extensionDV2);
  } else if (data.code === programCode.P3000) result.push(extensionDV2);

  return result;
};

const programColor = (data) => {
  const result = [];

  if (data.code === programCode.P3000) {
    result.push(colorDV1);
    result.push(colorDV2);
  }
  return result;
};

const programOpened = ({ data, setOpened, openedDefaultValues }) => {
  if (data.code === programCode.P1000) {
    setOpened({ ...openedDefaultValues, extension: true });
  } else if (data.code === programCode.P2000) {
    setOpened({ ...openedDefaultValues, extension: true });
  } else if (data.code === programCode.P3000) {
    setOpened({ ...openedDefaultValues, extension: true, color: true });
  }
};

const programSettings = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
}) => {
  let objetos_nulos = {
    extension: null,
    color: null,
    tipoCajon: null,
    tipoConstruccion: null,
    tipoBloqueo: null,
    sincronizacion: null,
  };
  setSetting({ ...setting, program: data, ...objetos_nulos });

  setOptions({
    ...options,
    extension: programExtension(data),
    color: programColor(data),
  });
};

export const programHandler = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  openedDefaultValues,
  setOpened,
}) => {
  programSettings({
    data,
    setSetting,
    setting,
    setOptions,
    options,
  });
  programOpened({ data, setOpened, openedDefaultValues });
};
