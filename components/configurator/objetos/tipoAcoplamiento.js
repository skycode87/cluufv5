import { tecnologiaMovimientoDefaultValues } from "./tecnologiaMovimiento";

export const TIPOACOPLAMIENTO = {
  V1: "CON_AJUSTE_DE_ALTURA",
  V2: "SIN_POSIBILIDAD_DE_AJUSTE",
};

////////////////////////////////

export const tipoAcoplamientoDV1 = {
  code: TIPOACOPLAMIENTO.V1,
  id: "dv1",
  name: "tipoAcoplamiento",
  title: "CON AJUSTA DE ALTURA ( T51.1700.04 )",
  imageUrl: null,
  helpUrl: "",
};

export const tipoAcoplamientoDV2 = {
  code: TIPOACOPLAMIENTO.V2,
  id: "dv2",
  name: "tipoAcoplamiento",
  title: "SIN POSIBILIDAD DE AJUSTE(T51.1400)",
  imageUrl: null,
  helpUrl: "",
};

export const tipoAcoplamientoDefaultValues = () => {
  const result = [];
  result.push(tipoAcoplamientoDV1);
  result.push(tipoAcoplamientoDV2);
  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, tipoAcoplamiento: data });
  setOptions({
    ...options,
    tecnologiaMovimiento: tecnologiaMovimientoDefaultValues(),
  });
};

const Opened = ({
  data,
  setOpened,
  openedDefaultValues,
  setModules,
  modules,
}) => {
  setOpened({ ...openedDefaultValues, tecnologiaMovimiento: true });
  setModules({ ...modules, medicion: true });
};

export const tipoAcoplamientoHandler = ({
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
