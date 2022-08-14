import { useEffect, useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { AdminNavbar } from "../admin";

import { SideMenu } from "../ui";
import { isToken, setSession } from "../../handlers/user";

export const AdminLayout = ({ children, title, subTitle, icon }) => {
  //const { user, isLoggedIn, isAdmin, isRoot, isUser } = useContext(AuthContext);
  const [datax, setDatax] = useState([]);

  const validateSession = async () => {
    const { data, ok } = await isToken();
    if (ok) {
      setDatax(data.user);
      setSession(data.user);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await validateSession();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return datax && datax?._id ? (
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
