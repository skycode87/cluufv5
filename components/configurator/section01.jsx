import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import Accordion from "../../components/configurator/accordion";
import Resume from "../../components/configurator/resume";

import { programHandler, programDV1 } from "./objetos/programa";
import { extensionHandler } from "./objetos/extension";
import { tipoCajonHandler, tipoCajonDefaultValues } from "./objetos/tipoCajon";
import { tipoConstruccionHandler } from "./objetos/tipoConstruccion";
import { tipoBloqueoHandler } from "./objetos/tipoBloqueo";
import { sincronizacionHandler } from "./objetos/sincronizacion";
import { varianteMontajeHandler } from "./objetos/varianteMontaje";
import { tipoAcoplamientoHandler } from "./objetos/tipoAcoplamiento";
import { tecnologiaMovimientoHandler } from "./objetos/tecnologiaMovimiento";

import { capacidadCargaLargoHandler } from "./objetos/capacidadCargaLargo";

import Tabs from "./tabs";
import ResumenTable from "./resumenTable";

import NumberSelector from "./numberSelector";

const openedDefaultValues = {
  color: false,
  program: false,
  extension: false,
  tipoCajon: false,
  tipoConstruccion: false,
  tipoBloqueo: false,
  sincronizacion: false,
  capacidadCargaLargo: false,
  varianteMontaje: false,
  tipoAcoplamiento: false,
  tecnologiaMovimiento: false,
  resultado: false,
};

const Section01 = ({ setting, setSetting }) => {
  const [opened, setOpened] = useState({
    ...openedDefaultValues,
    program: true,
  });

  const [modules, setModules] = useState({
    producto: true,
    construccion: false,
    medicion: false,
    adicional: false,
  });

  const [options, setOptions] = useState({
    program: programDV1,
    color: [],
    extension: [],
    tipoCajon: [],
    tipoConstruccion: [],
    tipoBloqueo: [],
    sincronizacion: [],
    capacidadCargaLargo: [],
    varianteMontaje: [],
    tecnologiaMovimiento: [],
    tipoAcoplamiento: [],
  });

  const activeCss = { border: "4px solid orange" };

  const activeOption = (data) => {
    if (data.name === "program") {
      return setting.program?.code === data.code ? activeCss : {};
    }

    if (data.name === "extension") {
      return setting.extension?.code === data.code ? activeCss : {};
    }

    if (data.name === "color") {
      return setting.color?.code === data.code ? activeCss : {};
    }

    if (data.name === "tipoCajon") {
      return setting.tipoCajon?.code === data.code ? activeCss : {};
    }

    if (data.name === "tipoConstruccion") {
      return setting.tipoConstruccion?.code === data.code ? activeCss : {};
    }

    if (data.name === "tipoBloqueo") {
      return setting.tipoBloqueo?.code === data.code ? activeCss : {};
    }

    if (data.name === "sincronizacion") {
      return setting.sincronizacion?.code === data.code ? activeCss : {};
    }

    if (data.name === "capacidadCargaLargo") {
      return setting.capacidadCargaLargo?.code === data.code ? activeCss : {};
    }

    if (data.name === "varianteMontaje") {
      return setting.varianteMontaje?.code === data.code ? activeCss : {};
    }

    if (data.name === "tipoAcoplamiento") {
      return setting.tipoAcoplamiento?.code === data.code ? activeCss : {};
    }

    if (data.name === "tecnologiaMovimiento") {
      return setting.tecnologiaMovimiento?.code === data.code ? activeCss : {};
    }
  };

  const defaultParams = {
    setSetting,
    setting,
    setOptions,
    options,
    openedDefaultValues,
    setOpened,
    opened,
    setModules,
    modules,
  };

  const setAncho = (ancho) => {
    setSetting({ ...setting, ancho });
  };

  const setProgram = (program) => {
    programHandler({
      data: program,
      ...defaultParams,
    });
  };

  const setExtension = (extension) => {
    extensionHandler({
      data: extension,
      ...defaultParams,
    });
  };

  const setTipoCajon = (tipoCajon) => {
    tipoCajonHandler({
      data: tipoCajon,
      ...defaultParams,
    });
  };

  const setTipoConstruccion = (tipoConstruccion) => {
    tipoConstruccionHandler({
      data: tipoConstruccion,
      ...defaultParams,
    });
  };

  const setTipoBloqueo = (tipoBloqueo) => {
    tipoBloqueoHandler({
      data: tipoBloqueo,
      ...defaultParams,
    });
  };

  const setCapacidadCargaLargo = (capacidadCargaLargo) => {
    capacidadCargaLargoHandler({
      data: capacidadCargaLargo,
      ...defaultParams,
    });
  };

  const setSincronizacion = (sincronizacion) => {
    sincronizacionHandler({
      data: sincronizacion,
      ...defaultParams,
    });
  };

  const setVarianteMontaje = (varianteMontaje) => {
    varianteMontajeHandler({
      data: varianteMontaje,
      ...defaultParams,
    });
  };

  const setTecnologiaMovimiento = (tecnologiaMovimiento) => {
    tecnologiaMovimientoHandler({
      data: tecnologiaMovimiento,
      ...defaultParams,
    });
  };

  const setTipoAcoplamiento = (tipoAcoplamiento) => {
    tipoAcoplamientoHandler({
      data: tipoAcoplamiento,
      ...defaultParams,
    });
  };

  const setColor = (color) => {
    setSetting({ ...setting, color });
  };

  const openSection = (value) => {
    setOpened({ ...openedDefaultValues, ...value });
  };

  useEffect(() => {
    if (
      (setting.tipoCajon?.code === undefined &&
        setting.program?.code === "MOVENTO" &&
        setting.extension?.code === "EXTENSION_PARCIAL") ||
      (setting.program?.code === "TANDEM" &&
        (setting.extension?.code === "EXTENSION_PARCIAL" ||
          setting.extension?.code === "EXTENSION_TOTAL")) ||
      (setting.program?.code === "STANDART" &&
        setting.extension?.code === "EXTENSION_TOTAL" &&
        (setting.color?.code === "BLANCO_CREMA" ||
          setting.color?.code === "MARRON"))
    ) {
      if (setting.tipoCajon?.code === undefined) {
        setOpened({ ...opened, tipoCajon: true });
        setModules({ ...modules, construccion: true });
      }

      setOptions({ ...options, tipoCajon: tipoCajonDefaultValues() });
    } else {
      // setOpened({ ...opened, tipoCajon: null, tipoConstruccion: null });
      // setSetting({ ...setting, tipoCajon: [], tipoConstruccion: [] });
    }
  }, [setting]);

  useEffect(() => {
    // console.log("options", options);
  }, [options]);

  useEffect(() => {
    // console.log("opened", opened);
  }, [opened]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3} sx={{ overflow: "scroll" }}>
        <Resume setting={setting} openSection={openSection} />
      </Grid>
      <Grid item xs={12} sm={9}>
        {modules.producto && (
          <>
            {opened.program === true && (
              <Accordion
                subtitle="Programa"
                title={setting.program?.title || ""}
                matrix={options.program}
                setSetting={setProgram}
                open={opened.program}
                active={activeOption}
              />
            )}

            {opened.extension === true && (
              <Accordion
                title={`Tipo Extensión: ${setting.extension?.title || ""}`}
                matrix={options.extension}
                setSetting={setExtension}
                open={opened.extension}
                active={activeOption}
              />
            )}

            {opened.color === true && (
              <Accordion
                title={`Color /superficie del sistema de extracción: ${
                  setting.color?.title || ""
                }`}
                matrix={options.color}
                setSetting={setColor}
                open={opened.color}
                active={activeOption}
              />
            )}
          </>
        )}

        {modules.construccion && (
          <>
            {opened.tipoCajon === true && (
              <Accordion
                subtitle="Tipo Cajón:"
                title={setting.tipoCajon?.title || ""}
                matrix={options.tipoCajon}
                setSetting={setTipoCajon}
                open={opened.tipoCajon}
                active={activeOption}
              />
            )}

            {opened.tipoConstruccion === true && (
              <Accordion
                subtitle="Tipo Construcción:"
                title={setting.tipoConstruccion?.title || ""}
                matrix={options.tipoConstruccion}
                setSetting={setTipoConstruccion}
                open={opened.tipoConstruccion}
                active={activeOption}
              />
            )}

            {opened.tipoBloqueo === true && (
              <Accordion
                subtitle="Tipo Bloqueo:"
                title={setting.tipoBloqueo?.title || ""}
                matrix={options.tipoBloqueo}
                setSetting={setTipoBloqueo}
                open={opened.tipoBloqueo}
                active={activeOption}
              />
            )}

            {opened.sincronizacion === true && (
              <Accordion
                subtitle="Sincronización para inmovilización de entrepaño: "
                title={setting.sincronizacion?.title || ""}
                matrix={options.sincronizacion}
                setSetting={setSincronizacion}
                open={opened.sincronizacion}
                active={activeOption}
              />
            )}
          </>
        )}

        {modules.medicion && (
          <>
            {opened.capacidadCargaLargo === true && (
              <Accordion
                subtitle="Capacidad de carga dinámica | Largo nominal:"
                title={setting.capacidadCargaLargo?.title || ""}
                matrix={options.capacidadCargaLargo}
                setSetting={setCapacidadCargaLargo}
                open={opened.capacidadCargaLargo}
                active={activeOption}
              />
            )}

            {opened.varianteMontaje === true && (
              <Accordion
                subtitle="Variante Montaje: "
                title={setting.varianteMontaje?.title || ""}
                matrix={options.varianteMontaje}
                setSetting={setVarianteMontaje}
                open={opened.varianteMontaje}
                active={activeOption}
              />
            )}

            {opened.tipoAcoplamiento === true && (
              <Accordion
                subtitle="Tipo Acomplamiento: "
                title={setting.tipoAcoplamiento?.title || ""}
                matrix={options.tipoAcoplamiento}
                setSetting={setTipoAcoplamiento}
                open={opened.tipoAcoplamiento}
                active={activeOption}
              />
            )}

            {opened.tecnologiaMovimiento === true && (
              <Accordion
                subtitle="Tecnología de movimiento: "
                title={setting.tecnologiaMovimiento?.title || ""}
                matrix={options.tecnologiaMovimiento}
                setSetting={setTecnologiaMovimiento}
                open={opened.tecnologiaMovimiento}
                active={activeOption}
              />
            )}

            {opened.resultado === true && (
              <>
                <Typography variant="h1">Resultados</Typography>
                <Tabs resumenTable={<ResumenTable setting={setting} />} />
              </>
            )}

            {/*
            <NumberSelector
              title="Ancho interior del mueble"
              suffix="mm"
              setSetting={setAncho}
              min={1000}
              max={3000}
            />
            */}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Section01;
