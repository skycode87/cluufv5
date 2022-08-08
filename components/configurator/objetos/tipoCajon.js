import {
  tipoConstruccionDV1,
  tipoConstruccionDV2,
  tipoConstruccionDV3,
  tipoConstruccionDV4,
} from "./tipoConstruccion";

export const tipoCajonCode = {
  TIPOCAJON_V1: "Cajon",
  TIPOCAJON_V2: "CajonInterior",
  TIPOCAJON_V3: "EntrepanoConFrente",
  TIPOCAJON_V4: "EntrepanoMontajeInterior",
};

export const TIPOCAJON = {
  V1: "Cajon",
  V2: "CajonInterior",
  V3: "EntrepanoMontajeInterior",
  V4: "EntrepanoConFrente",
};

////////////////////////////////

export const tipoCajonDV1 = {
  code: TIPOCAJON.V1,
  id: "dv1",
  name: "tipoCajon",
  title: "CAJON / CACEROLERO",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=5b1fbf9d-fd72-4ebc-bd24-a8f5b7d60d6d_1",
  helpUrl: "",
};

export const tipoCajonDV2 = {
  code: TIPOCAJON.V2,
  id: "dv2",
  name: "tipoCajon",
  title: "CAJON INTERIOR/ CACEROLERO INTERIOR",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=e3f8e4d1-fc60-47c4-84b4-c2feac70d744_1",
  helpUrl: "",
};

export const tipoCajonDV3 = {
  code: TIPOCAJON.V3,
  id: "dv3",
  name: "tipoCajon",
  title: "ENTREPAÑO CON FRENTE",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=e7743d5d-3950-43c8-9a43-60ec627a4a61_1",
  helpUrl: "",
};

export const tipoCajonDV4 = {
  code: TIPOCAJON.V4,
  id: "dv3",
  name: "tipoCajon",
  title: "ENTREPAÑO DE MONTAJE INTERIOR",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=bccee13a-d0a6-4caf-83b2-9b75f8519228_1",
  helpUrl: "",
};

export const tipoCajonDefaultValues = () => {
  const result = [];
  result.push(tipoCajonDV1);
  result.push(tipoCajonDV2);
  result.push(tipoCajonDV3);
  result.push(tipoCajonDV4);
  return result;
};

const tipoCajonTipoConstruccion = (data) => {
  const result = [];

  if (data.code === TIPOCAJON.V1) result.push(tipoConstruccionDV1);
  else if (data.code === TIPOCAJON.V2) result.push(tipoConstruccionDV1);
  else if (data.code === TIPOCAJON.V3) result.push(tipoConstruccionDV2);
  else if (data.code === TIPOCAJON.V4) {
    result.push(tipoConstruccionDV2);
    result.push(tipoConstruccionDV3);
    result.push(tipoConstruccionDV4);
  }

  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({
    ...setting,
    tipoCajon: data,
    tipoConstruccion: null,
    tipoBloqueo: null,
    sincronizacion: null,
  });
  setOptions({
    ...options,
    tipoConstruccion: tipoCajonTipoConstruccion(data),
  });
};

const Opened = ({ data, setOpened, openedDefaultValues }) => {
  setOpened({ ...openedDefaultValues, tipoConstruccion: true });
};

export const tipoCajonHandler = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  openedDefaultValues,
  setOpened,
}) => {
  Settings({
    data,
    setSetting,
    setting,
    setOptions,
    options,
  });
  Opened({ data, setOpened, openedDefaultValues });
};
