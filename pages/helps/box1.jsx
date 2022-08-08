import React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";

import profilePic from "../../public/box1.jpeg";

const box1 = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: "800px", height: "400px", overflow: "scroll" }}
    >
      <Grid item xs={12} sm={6}>
        <Image alt="diseodelgado" src={profilePic} width={300} height={300} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <h2> Diseño delgado</h2>
        <p>
          Las sorprendentemente delgadas paredes laterales de 12,8 mm y rectas
          tanto por dentro como por fuera se integran armónicamente en cualquier
          mueble. Los componentes individuales combinan óptimamente entre sí y
          presentan cambios armoniosos.
        </p>
      </Grid>

      <Grid item xs={12} sm={6}>
        <h2> Diseño delgado</h2>
        <p>
          Las sorprendentemente delgadas paredes laterales de 12,8 mm y rectas
          tanto por dentro como por fuera se integran armónicamente en cualquier
          mueble. Los componentes individuales combinan óptimamente entre sí y
          presentan cambios armoniosos.
        </p>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Image alt="diseodelgado" src={profilePic} width={300} height={300} />
      </Grid>

      <Grid item xs={12} sm={12}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/VFIx-C3F67I"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </Grid>
    </Grid>
  );
};

export default box1;
