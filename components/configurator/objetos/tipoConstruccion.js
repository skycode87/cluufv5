import { tipoBloqueoDV1, tipoBloqueoDV2 } from "./tipoBloqueo";

export const TIPOCONSTRUCCION = {
  V1: "SIN_GUARDACUERPO",
  V2: "ENTREPAÑO",
  V3: "ENTREPAÑO_GUARDACUERPOS_DOBLE",
  V4: "ENTREPAÑO_GUARDACUERPOS_TRIPLE",
};

////////////////////////////////

export const tipoConstruccionDV1 = {
  code: TIPOCONSTRUCCION.V1,
  id: "dv1",
  name: "tipoConstruccion",
  title: "SIN GUARDACUERPO",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=bfd7c772-23c9-4bd9-b378-e1b918b618cd_1",
  helpUrl: "",
};

export const tipoConstruccionDV2 = {
  code: TIPOCONSTRUCCION.V2,
  id: "dv2",
  name: "tipoConstruccion",
  title: "ENTREPAÑO",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=e7743d5d-3950-43c8-9a43-60ec627a4a61_1",
  helpUrl: "",
};

export const tipoConstruccionDV3 = {
  code: TIPOCONSTRUCCION.V3,
  id: "dv3",
  name: "tipoConstruccion",
  title: "ENTREPAÑO CON GUARDACUERPOS DOBLE",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=52199622-1a3a-4886-b0a3-efbbf735ffdd_1",
  helpUrl: "",
};

export const tipoConstruccionDV4 = {
  code: TIPOCONSTRUCCION.V4,
  id: "dv3",
  name: "tipoConstruccion",
  title: "ENTREPAÑO CON GUARDACUERPOS TRIPLE",
  imageUrl:
    "https://e-services.blum.com/opc/graphic/?gid=3f136ccf-335a-49eb-8f59-769bc3e9c8cc_1",
  helpUrl: "",
};

export const tipoConstruccionDefaultValues = () => {
  const result = [];
  result.push(tipoConstruccionDV1);
  result.push(tipoConstruccionDV2);
  result.push(tipoConstruccionDV3);
  result.push(tipoConstruccionDV4);

  return result;
};

////////////////////////////////

const tipoConstruccionTipoBloqueo = (data) => {
  const result = [];

  if (
    data.code === TIPOCONSTRUCCION.V2 ||
    data.code === TIPOCONSTRUCCION.V3 ||
    data.code === TIPOCONSTRUCCION.V4
  ) {
    result.push(tipoBloqueoDV1);
    result.push(tipoBloqueoDV2);
  }
  return result;
};

const Settings = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  setModules,
  modules,
}) => {
  setSetting({
    ...setting,
    tipoConstruccion: data,
    tipoBloqueo: null,
    sincronizacion: null,
  });
  setOptions({
    ...options,
    tipoBloqueo: tipoConstruccionTipoBloqueo(data),
  });

  if (data.code === TIPOCONSTRUCCION.V1)
    setModules({ ...modules, medicion: true });
};

const Opened = ({ data, setOpened, openedDefaultValues }) => {
  setOpened({ ...openedDefaultValues, tipoBloqueo: true });
};

export const tipoConstruccionHandler = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  openedDefaultValues,
  setOpened,
  modules,
  setModules,
}) => {
  Settings({
    data,
    setSetting,
    setting,
    setOptions,
    options,
    modules,
    setModules,
  });
  Opened({ data, setOpened, openedDefaultValues });
};
