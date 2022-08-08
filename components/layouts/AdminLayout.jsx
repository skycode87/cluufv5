import { useEffect, useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { AdminNavbar } from "../admin";

import { SideMenu } from "../ui";
import { AuthContext } from "../../context/auth";
import { validateToken } from "../../handlers/user";

export const AdminLayout = ({ children, title, subTitle, icon }) => {
  const { user, isLoggedIn, isAdmin, isRoot, isUser } = useContext(AuthContext);
  const [datax, setDatax] = useState([]);

  const validateRoot = async () => {
    const { data, ok } = await validateToken();

    if (ok) {
      setDatax(data.user);
    }
  };

  useEffect(() => {
    validateRoot();
  }, []);

  return datax ? (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  ) : (
    <>
      {" "}
      <CircularProgress />
    </>
  );
};
