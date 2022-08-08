import { useState } from "react";
import { Card, Typography, Link, CardMedia, CardContent } from "@mui/material";
import Modal from "./modal";

export default function MediaCard({
  imagenUrl = null,
  title,
  helpUrl,
  code,
  setSetting,
  active,
  data,
  name,
}) {
  const [help, setHelp] = useState(false);

  return (
    <>
      <Link onClick={() => setSetting(data)}>
        <Card
          className="cardConfig"
          sx={{
            maxWidth: "100%",
            cursor: "pointer",
            ...active({ ...data, name }),
          }}
        >
          {imagenUrl && (
            <CardMedia
              component="img"
              height="140"
              image={imagenUrl}
              alt={title}
            />
          )}
          <CardContent>{title && <Typography>{title}</Typography>}</CardContent>

          {/*
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setHelp(true);
            }}
          >
            Conocer más
          </Button>
        </CardActions> */}
        </Card>
      </Link>
      {/*  <Modal open={help} text={text} title={title} setOpen={setHelp}>
        {helpUrl}
        </Modal> */}
    </>
  );
}
