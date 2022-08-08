import { useState } from "react";

import Accordion from "./accordion";
import NumberSelector from "./numberSelector";

const dinamicData = [
  {
    title: "Largo nominal: 299mm \n Carga dinámica: 25 Kg",
    imageUrl:
      "https://limobelinwo.com/wp-content/uploads/2021/05/aurora-24.jpg",
    helpUrl: "",
    code: "dinamic1000",
  },
  {
    title: "Largo nominal: 350mm \n Carga dinámica: 25 Kg",
    imageUrl: null,
    helpUrl: "",
    code: "dinami2000",
  },
  {
    title: "Largo nominal: 400mm \n Carga dinámica: 25 Kg",
    imageUrl: null,
    helpUrl: "",
    code: "dinami3000",
  },
  {
    title: "Largo nominal: 450mm \n Carga dinámica: 25 Kg",
    imageUrl: null,
    helpUrl: "",
    code: "dinami4000",
  },
  {
    title: "Largo nominal: 500mm \n Carga dinámica: 25 Kg",
    imageUrl: null,
    helpUrl: "",
    code: "dinami5000",
  },
  {
    title: "Largo nominal: 550mm \n Carga dinámica: 25 Kg",
    imageUrl: null,
    helpUrl: "",
    code: "dinami6000",
  },
];

const fijacionGuiaData = [
  {
    title: "Tornillo de Aglomerado",
    imageUrl: null,
    helpUrl: "",
    code: "fijacion1000",
  },
  {
    title: "Tornillo Euro",
    imageUrl: null,
    helpUrl: "",
    code: "fijacion2000",
  },
];

const movimientoData = [
  {
    title: "Blumotion",
    imageUrl: null,
    helpUrl: "",
    code: "movimiento1000",
  },
  {
    title: "Sin",
    imageUrl: null,
    helpUrl: "",
    code: "movimiento2000",
  },
];

const Section03 = ({ setting, setSetting }) => {
  const [opened, setOpened] = useState({
    dinamic: true,
    fijacion: false,
    movimiento: false,
  });

  const [options, setOptions] = useState({
    dinamic: dinamicData,
    fijacion: setting.fijacion?.code ? fijacionGuiaData : [],
    movimiento: setting.movimiento?.code ? movimientoData : [],
  });

  const setDinamic = (dinamic) => {
    setSetting({ ...setting, dinamic, movimiento: null, fijacion: null });
    setOptions({
      ...options,
      movimiento: movimientoData,
      fijacion: fijacionGuiaData,
    });
    setOpened({ ...opened, dinamic: false, movimiento: false, fijacion: true });
  };

  const activeDinamic = (data) => {
    if (setting.dinamic?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const activeMovimiento = (data) => {
    if (setting.movimiento?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const activeFijacion = (data) => {
    if (setting.fijacion?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const setAncho = (ancho) => {
    setSetting({ ...setting, ancho });
  };

  const setMovimiento = (movimiento) => {
    setSetting({ ...setting, movimiento });
    setOpened({ ...opened, dinamic: false, movimiento: false });
  };

  const setFijacion = (fijacion) => {
    setSetting({ ...setting, fijacion });
    setOpened({
      ...opened,
      dinamic: false,
      movimiento: true,
      fijacion: false,
    });
  };

  return (
    <>
      <NumberSelector setSetting={setAncho} />

      {options.dinamic?.length > 0 && (
        <Accordion
          title={`Capacidad: ${setting.dinamic?.title || ""} `}
          data={options.dinamic}
          setSetting={setDinamic}
          active={activeDinamic}
          open={opened.dinamic}
          set
        />
      )}

      {options.fijacion?.length > 0 && (
        <Accordion
          title={`Fijación de guía del cuerpo de mueble: ${
            setting.fijacion?.title || ""
          }`}
          data={options.fijacion}
          setSetting={setFijacion}
          open={opened.fijacion}
          active={activeFijacion}
        />
      )}

      {options.movimiento?.length > 0 && (
        <Accordion
          title={`Tecnología de movimiento: ${setting.movimiento?.title || ""}`}
          data={options.movimiento}
          setSetting={setMovimiento}
          open={opened.movimiento}
          active={activeMovimiento}
        />
      )}
    </>
  );
};

export default Section03;
