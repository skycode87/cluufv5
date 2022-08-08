import React, { useState } from "react";
import { AutoComplete } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Button, Link } from "@mui/material";

const { Option } = AutoComplete;

import { getClienths } from "../../hooks/useClienths";

import "antd/dist/antd.css";

const ClienteAutocomplete = ({ setClientAutocomplete }) => {
  const [result, setResult] = useState([]);

  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState([]);

  const handleSearch = () => {
    let res = [];

    /*
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "163.com", "qq.com"].map(
        (domain) => `${value}@${domain}`
      );
    }
    */

    setResult(resultado);
  };

  const onChange = async (value) => {
    setTexto(value);
    if (String(value).length > 3) {
      let { data, status } = getClienths({ value });
      // setClientAutocomplete(data);
      setResultado(data);
    }
  };

  return (
    <Grid container className="fadeIn">
      <Grid item>
        <AutoComplete
          style={{
            width: 200,
          }}
          onSearch={handleSearch}
          placeholder="input here"
          onChange={onChange}
        >
          {result.map((email) => (
            <Option key={email} value={email}>
              {email}
            </Option>
          ))}
        </AutoComplete>
      </Grid>
      <Grid item>
        &nbsp; &nbsp;
        <Link>
          <Button color="secondary" className="circular-btn" type="button">
            <SearchIcon />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ClienteAutocomplete;
