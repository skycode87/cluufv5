import { useState, useEffect } from "react";
import { Grid, Typography, Button, Chip, Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EuroIcon from "@mui/icons-material/Euro";
import Atomo from "./atomo";

import { defaultValues } from "./data/maestro";
import { presupuesto } from "./data/presupuestos";

import { programHandler, programDV1 } from "./objetos/programa";

const Logs = [];
const presupuestoFinal = [];

let total = 0;

const SectionPlay = ({ setting, setSetting }) => {
  const [opened, setOpened] = useState({
    program: true,
  });

  const selecciones = [];

  const [modules, setModules] = useState({
    producto: true,
    construccion: false,
    medicion: false,
    adicional: false,
  });

  const [options, setOptions] = useState({
    program: programDV1,
  });

  const activeCss = { border: "4px solid orange" };

  const activeOption = (data) => {
    if (data.name === "program") {
      return setting.program?.code === data.code ? activeCss : {};
    }
  };

  const [selected, setSelected] = useState(defaultValues["corte"]);
  const [primary, setPrimary] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recomendations, setRecomendations] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  const handleChange = (e) => {
    let xxx = [];
    let temporal = primary;

    const found2 = temporal.filter(
      (element) =>
        String(element.code).indexOf(String(e.code).split("-")[0]) < 0
    );
    xxx.push(...found2);

    xxx.push(e);
    Logs.push(e);

    xxx.sort(function (a, b) {
      return a.order - b.order;
    });

    setPrimary(xxx);
    selecciones.push(e);

    if (e.delete !== undefined) {
      const found3 = xxx.filter(
        (element) =>
          String(element.code).indexOf(String(e.delete).split("-")[0]) < 0
      );

      found3.sort(function (a, b) {
        return a.order - b.order;
      });
      setPrimary(found3);
    }
  };

  const traductorRecomendaciones = (code) => {
    const found2 = Logs.filter((element) => String(element.code) === code);

    if (found2.length > 0) {
      return found2[0].title;
    }

    return "";
  };

  const buscar = (e) => {
    setSelected(defaultValues[String(e.code).split("-")[0]]);
  };

  useEffect(() => {
    setVisible(false);

    const found = primary.find((element) => element.code === "sombreros-03");
    const found1 = primary.some((element) => element.code === "sombreros-03");

    const found2 = primary.filter(
      (element) => String(element.code).indexOf("sombreros") < 0
    );

    let yyy = [];
    primary.forEach((item) => {
      let zzz = presupuesto.filter(
        (element) => String(element.tag).indexOf(item.code) >= 0
      );

      yyy.push(...zzz);
    });

    setRecomendations(yyy);

    //console.log(found2);
    setVisible(true);
  }, [primary]);

  const xxxx = () => {
    return primary.map((item, index) => (
      <Grid item key={index}>
        <Button
          className="text-left"
          xs={4}
          onClick={() => {
            buscar(item);
          }}
        >
          {item.image ? (
            <img src={item.image} alt={item.title} width="60px" />
          ) : (
            item.title
          )}
        </Button>
      </Grid>
    ));
  };

  const makeid = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const saveRecomendations = (item) => {
    let xxx = [];
    xxx.push(...confirmed);
    xxx.push({
      ...item,
      id: makeid(),
    });
    setConfirmed(xxx);
  };

  const yyyy = () => {
    return recomendations.map((item, index) => (
      <>
        <Button
          className="text-left"
          onClick={() => {
            saveRecomendations(item);
          }}
          key={index}
          style={{
            fontSize: "12px",
            paddingLeft: "2px",
            width: "100%",
          }}
        >
          {item.title}
          {"  "}
          <Chip
            sx={{ ml: 2 }}
            variant="outlined"
            color="success"
            label={traductorRecomendaciones(item.tag)}
          />
        </Button>
        <hr />
      </>
    ));
  };

  const zzzz = () => {
    const OKOK = [];
    total = 0;
    confirmed.forEach((item, index) => {
      total = total + item.price;

      OKOK.push({
        title: item.title,
        referencia: traductorRecomendaciones(item.tag),
        price: item.price,
        id: item.id,
      });
    });

    presupuestoFinal = OKOK;
    return OKOK.map((item, index) => (
      <>
        <Grid container key={index} sx={{ fontSize: 12 }}>
          <Grid item xs={10}>
            <Button onClick={() => deletePresupuesto(item.id)}>
              <DeleteOutlineIcon />
            </Button>
            {item.title}
            <b> ref: {item.referencia}</b>
          </Grid>

          <Grid item xs={2} sx={{ fontSize: 14 }}>
            {item.price} <EuroIcon sx={{ fontSize: 14 }} />
          </Grid>
        </Grid>
        <hr />
      </>
    ));
  };

  const deletePresupuesto = (id) => {
    setVisible(false);
    let xxx = [];
    const found2 = confirmed.filter((element) => element.id !== id);
    xxx.push(...found2);
    setConfirmed(xxx);
    setVisible(true);
  };

  const savePresupuesto = () => {
    console.log(presupuestoFinal);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}>
        <Paper elevation="3" sx={{ p: 2 }}>
          <Atomo
            handleChange={handleChange}
            setPrimary={setPrimary}
            primary={primary}
            selecciones={selecciones}
            setSelected={setSelected}
            selected={selected}
            defaultValues={defaultValues}
            subtitle="Programa"
            title={setting.program?.title || ""}
            matrix={options.program}
            setSetting={() => {}}
            open={opened.program}
            active={activeOption}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={2} sx={{ overflow: "scroll" }}>
        <Paper elevation="3" sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom component="div">
            Selecciones
          </Typography>
          {visible ? xxxx() : <p>Cargando...</p>}
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation="3" sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom component="div">
            Seleccione algunas sugerencias
          </Typography>
          <Paper sx={{ overflow: "scroll", height: "600px" }}>
            {visible ? yyyy() : <p>Cargando...</p>}
          </Paper>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation="3" sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom component="div">
            Presupuesto{" "}
            <b>
              Total: {total} <EuroIcon sx={{ fontSize: 12 }} />
            </b>
          </Typography>
          {visible ? zzzz() : <p>Cargando...</p>}
          <hr />
          <Button color="primary" onClick={() => savePresupuesto()}>
            Guardar Presupuesto
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SectionPlay;
