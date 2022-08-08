import { varianteMontajeDefaultValues } from "./varianteMontaje";

export const CAPACIDADCARGALARGO = {
  V1: "250MM/30KG",
  V2: "260MM/30KG",
  V3: "270MM/30KG",
  V4: "285MM/30KG",
  V5: "300MM/30KG",
  V6: "310MM/30KG",
  V7: "320MM/30KG",
};

////////////////////////////////

export const capacidadCargaLargoDV1 = {
  code: CAPACIDADCARGALARGO.V1,
  id: "dv1",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 250mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV2 = {
  code: CAPACIDADCARGALARGO.V2,
  id: "dv2",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 260mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV3 = {
  code: CAPACIDADCARGALARGO.V3,
  id: "dv3",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 270mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV4 = {
  code: CAPACIDADCARGALARGO.V4,
  id: "dv4",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 285mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV5 = {
  code: CAPACIDADCARGALARGO.V5,
  id: "dv5",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 300mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV6 = {
  code: CAPACIDADCARGALARGO.V6,
  id: "dv6",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 310mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDV7 = {
  code: CAPACIDADCARGALARGO.V7,
  id: "dv7",
  name: "capacidadCargaLargo",
  title: "Largo nominal: 320mm \n Carga Dinamica: 30Kg",
  imageUrl: null,
  helpUrl: "",
};

export const capacidadCargaLargoDefaultValues = () => {
  const result = [];
  result.push(capacidadCargaLargoDV1);
  result.push(capacidadCargaLargoDV2);
  result.push(capacidadCargaLargoDV3);
  result.push(capacidadCargaLargoDV4);
  result.push(capacidadCargaLargoDV5);
  result.push(capacidadCargaLargoDV6);
  result.push(capacidadCargaLargoDV7);
  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, capacidadCargaLargo: data });
  setOptions({
    ...options,
    varianteMontaje: varianteMontajeDefaultValues(),
  });
};

const Opened = ({ data, setOpened, openedDefaultValues }) => {
  setOpened({ ...openedDefaultValues, varianteMontaje: true });
};

export const capacidadCargaLargoHandler = ({
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
