import { useState } from "react";

import Accordion from "./accordion";

const cajonData = [
  {
    title: "Cajón / cacerolero",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=cd455d50-e921-475d-a8b6-186ea1f887e1_1",
    helpUrl: "",
    code: "cajon1000",
  },
  {
    title: "Cajon interior / cacerolero interion:",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=078306a5-401f-4bcc-9d26-75c2bd42ea41_1",
    helpUrl: "",
    code: "cajon2000",
  },
];

const constructionData = [
  {
    title: "Altura D, BOXSIDE de pared simple",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=afbe75a8-ac33-4104-b975-83e37b85c7d4_1",
    helpUrl: "",
    code: "construction1000",
  },
  {
    title: "Altura D, guardacuerpo doble",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=b23567b5-3152-47c3-b3a7-4289a9951846_1",
    helpUrl: "",
    code: "construction2000",
  },
  {
    title: "Altura B, guardacuerpo",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=fb2cf4c7-f218-45f0-bf0a-8ad47a768752_1",
    helpUrl: "",
    code: "construction3000",
  },
  {
    title: "Altura H",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=cefc11e9-5c86-4599-aa7e-cddb88257c76_1",
    helpUrl: "",
    code: "construction4000",
  },
  {
    title: "Altura K",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=591e3cc3-56df-4bd7-8e02-5fa6db3ac9ef_1",
    helpUrl: "",
    code: "construction5000",
  },
  {
    title: "Altura M",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=591e3cc3-56df-4bd7-8e02-5fa6db3ac9ef_1",
    helpUrl: "",
    code: "construction6000",
  },
];

const divisionData1000 = [
  {
    title: "Sin organización",
    imageUrl:
      "https://e-services.blum.com/opc/graphic/?gid=591e3cc3-56df-4bd7-8e02-5fa6db3ac9ef_1",
    helpUrl: "",
    code: "division1000",
  },
];

const Section02 = ({ setting, setSetting }) => {
  const [opened, setOpened] = useState({
    division: false,
    construction: true,
    cajon: false,
  });

  const [options, setOptions] = useState({
    cajon: cajonData,
    construction: setting.construction?.code ? constructionData : [],
    division: setting.division?.code ? divisionData1000 : [],
  });

  const setCajon = (cajon) => {
    setSetting({ ...setting, cajon, construction: null, division: null });
    if (cajon.code === "cajon1000") {
      setOptions({ ...options, construction: constructionData, division: [] });
      setOpened({ ...opened, cajon: false, color: true });
    } else if (cajon.code === "cajon2000") {
      setOptions({ ...options, construction: constructionData, division: [] });
      setOpened({ ...opened, cajon: false, color: true });
    } else if (cajon.code === "cajon3000") {
      setOptions({ ...options, division: divisionData, color: [] });
      setOpened({ ...opened, cajon: false, division: true });
    }
  };

  const activeCajon = (data) => {
    if (setting.cajon?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const activeConstruction = (data) => {
    if (setting.construction?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const activeDivision = (data) => {
    if (setting.division?.code === data.code) {
      return { border: "4px solid orange" };
    } else {
      return {};
    }
  };

  const setConstruction = (construction) => {
    setSetting({ ...setting, construction });
    if (construction.code === "construction2000") {
      setOptions({ ...options, division: divisionData1000 });
    }
  };

  const setDivision = (division) => {
    setSetting({ ...setting, division });
  };

  return (
    <>
      {options.cajon?.length > 0 && (
        <Accordion
          title={`Tipo de Cajon: ${setting.cajon?.title || ""} `}
          data={options.cajon}
          setSetting={setCajon}
          active={activeCajon}
          open={opened.Cajon}
        />
      )}

      {options.construction?.length > 0 && (
        <Accordion
          title={`Tipo Construcción: ${setting.construction?.title || ""}`}
          data={options.construction}
          setSetting={setConstruction}
          open={opened.construction}
          active={activeConstruction}
        />
      )}

      {options.division?.length > 0 && (
        <Accordion
          title={`División: ${setting.division?.title || ""}`}
          data={options.division}
          setSetting={setDivision}
          open={opened.division}
          active={activeDivision}
        />
      )}
    </>
  );
};

export default Section02;
