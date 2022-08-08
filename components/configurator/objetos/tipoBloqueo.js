import { sincronizacionDV2, sincronizacionDV1 } from "./sincronizacion";

export const TIPOBLOQUEO = {
  V1: "SIN_BLOQUEO",
  V2: "SISTEMA_BLOQUEO_ENTREPAÑO",
};

////////////////////////////////

export const tipoBloqueoDV1 = {
  code: TIPOBLOQUEO.V1,
  id: "dv1",
  name: "tipoBloqueo",
  title: "SIN BLOQUEO",
  imageUrl:
    "https://static6.depositphotos.com/1054850/600/i/600/depositphotos_6004696-stock-photo-red-forbidden-sign.jpg",
  helpUrl: "",
};

export const tipoBloqueoDV2 = {
  code: TIPOBLOQUEO.V2,
  id: "dv2",
  name: "tipoBloqueo",
  title: "SISTEMA DEL BLOQUEO DEL ENTREPAÑO",
  imageUrl:
    "https://www.blum.com/corporate/media/bilder/produkte/fuehrungssysteme/tablararretierung/a_295h5700.png?r=1800794",
  helpUrl: "",
};

export const tipoBloqueoDefaultValues = () => {
  const result = [];
  result.push(tipoBloqueoDV1);
  result.push(tipoBloqueoDV2);
  return result;
};

const tipoBloqueoSincronizacion = (data) => {
  const result = [];

  if (data.code === TIPOBLOQUEO.V1 || data.code === TIPOBLOQUEO.V2) {
    result.push(sincronizacionDV1);
    result.push(sincronizacionDV2);
  }

  return result;
};

////////////////////////////////

const Settings = ({ data, setSetting, setting, setOptions, options }) => {
  setSetting({ ...setting, tipoBloqueo: data });
  setOptions({
    ...options,
    sincronizacion: tipoBloqueoSincronizacion(data),
  });
};

const Opened = ({ data, setOpened, openedDefaultValues }) => {
  setOpened({ ...openedDefaultValues, sincronizacion: true });
};

export const tipoBloqueoHandler = ({
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
