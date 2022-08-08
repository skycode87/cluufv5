export const EXTENSION = {
  V1: "EXTENSION_PARCIAL",
  V2: "EXTENSION_TOTAL",
};

////////////////////////////////

export const extensionDV1 = {
  code: EXTENSION.V1,
  id: "dv1",
  name: "extension",
  title: "EXTENSIÓN PARCIAL",
  imageUrl:
    "https://e-services.blum.com/opc/resources/img/configuration/Oeffnung~Teilauszug.jpg",
  helpUrl: "",
};

export const extensionDV2 = {
  code: EXTENSION.V2,
  id: "dv2",
  name: "extension",
  title: "EXTENSIÓN TOTAL",
  imageUrl:
    "https://e-services.blum.com/opc/resources/img/configuration/Oeffnung~Teilauszug.jpg",
  helpUrl: "",
};

////////////////////////////////

const extensionSettings = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
}) => {
  setSetting({ ...setting, extension: data });
  setOptions({
    ...options,
  });
};

const extensionOpened = ({ data, setOpened, openedDefaultValues }) => {
  setOpened({ ...openedDefaultValues, color: true });
};

export const extensionHandler = ({
  data,
  setSetting,
  setting,
  setOptions,
  options,
  openedDefaultValues,
  setOpened,
}) => {
  extensionSettings({
    data,
    setSetting,
    setting,
    setOptions,
    options,
  });
  extensionOpened({ data, setOpened, openedDefaultValues });
};
