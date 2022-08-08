import { capacidadCargaLargoDefaultValues } from "./capacidadCargaLargo";

export const SINCRONIZACION = {
  V1: "SIN_SINCRONIZACION",
  V2: "CON_SINCRONIZACION",
};

////////////////////////////////

export const sincronizacionDV1 = {
  code: SINCRONIZACION.V1,
  id: "dv1",
  name: "sincronizacion",
  title: "SIN SINCRONIZACION",
  imageUrl: null,
  helpUrl: "",
};

export const sincronizacionDV2 = {
  code: SINCRONIZACION.V2,
  id: "dv2",
  name: "sincronizacion",
  title: "CON SINCRONIZACION",
  imageUrl: null,
  helpUrl: "",
};

export const sincronizacionDefaultValues = () => {
  const result = [];
  result.push(sincronizacionDV1);
  result.push(sincronizacionDV2);
  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, sincronizacion: data });
  setOptions({
    ...options,
    capacidadCargaLargo: capacidadCargaLargoDefaultValues(),
  });
};

const Opened = ({
  data,
  setOpened,
  openedDefaultValues,
  setModules,
  modules,
}) => {
  setOpened({ ...openedDefaultValues, capacidadCargaLargo: true });
  setModules({ ...modules, medicion: true });
};

export const sincronizacionHandler = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  openedDefaultValues,
  setOpened,
  setModules,
  modules,
}) => {
  Settings({
    data,
    setSetting,
    setting,
    setOptions,
    options,
    setModules,
  });
  Opened({ data, setOpened, openedDefaultValues, setModules, modules });
};
