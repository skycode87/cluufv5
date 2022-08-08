import { tipoAcoplamientoDefaultValues } from "./tipoAcoplamiento";

export const VARIANTEMONTAJE = {
  V1: "ACOPLAMIENTO",
  V2: "TECNICA_DE_ENCASTRAR",
};

////////////////////////////////

export const varianteMontajeDV1 = {
  code: VARIANTEMONTAJE.V1,
  id: "dv1",
  name: "varianteMontaje",
  title: "ACOPLAMIENTO",
  imageUrl: null,
  helpUrl: "",
};

export const varianteMontajeDV2 = {
  code: VARIANTEMONTAJE.V2,
  id: "dv2",
  name: "varianteMontaje",
  title: "TECNICA DE ENCASTRAR",
  imageUrl: null,
  helpUrl: "",
};

export const varianteMontajeDefaultValues = () => {
  const result = [];
  result.push(varianteMontajeDV1);
  result.push(varianteMontajeDV2);
  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, varianteMontaje: data });
  setOptions({
    ...options,
    tipoAcoplamiento: tipoAcoplamientoDefaultValues(),
  });
};

const Opened = ({
  data,
  setOpened,
  openedDefaultValues,
  setModules,
  modules,
}) => {
  setOpened({ ...openedDefaultValues, tipoAcoplamiento: true });
  setModules({ ...modules, medicion: true });
};

export const varianteMontajeHandler = ({
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
