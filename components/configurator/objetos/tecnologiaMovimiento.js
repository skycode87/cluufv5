export const TECNOLOGIAMOVIMIENTO = {
  V1: "BLUMOTION",
  V2: "TIP-ON",
  V3: "SIN",
};

////////////////////////////////

export const tecnologiaMovimientoDV1 = {
  code: TECNOLOGIAMOVIMIENTO.V1,
  id: "dv1",
  name: "tecnologiaMovimiento",
  title: "BLUMOTION",
  imageUrl: null,
  helpUrl: "",
};

export const tecnologiaMovimientoDV2 = {
  code: TECNOLOGIAMOVIMIENTO.V2,
  id: "dv2",
  name: "tecnologiaMovimiento",
  title: "TIP-ON",
  imageUrl: null,
  helpUrl: "",
};

export const tecnologiaMovimientoDV3 = {
  code: TECNOLOGIAMOVIMIENTO.V3,
  id: "dv3",
  name: "tecnologiaMovimiento",
  title: "SIN",
  imageUrl: null,
  helpUrl: "",
};

export const tecnologiaMovimientoDefaultValues = () => {
  const result = [];
  result.push(tecnologiaMovimientoDV1);
  result.push(tecnologiaMovimientoDV2);
  result.push(tecnologiaMovimientoDV3);
  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, tecnologiaMovimiento: data });
  setOptions({
    ...options,
  });
};

const Opened = ({
  data,
  setOpened,
  openedDefaultValues,
  setModules,
  modules,
}) => {
  setOpened({ ...openedDefaultValues, resultado: true });
  setModules({ ...modules, resumen: true });
};

export const tecnologiaMovimientoHandler = ({
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
