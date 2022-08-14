import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { green } from "@mui/material/colors";

import { useForm, SubmitHandler } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import { useRouter } from "next/router";

import { loginUser } from "../../handlers/user";

const showError = false;

const LoginPage = () => {
  const router = useRouter();
  const { instance } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);

  // const { loginUser, user, isLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;
    const isValidLogin = await loginUser(email, password, company);
    Cookies.set("instance",company);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setLoading(false);
      return;
    }
    setLoading(false);
    const destination = router.query.p?.toString() || "/plan/list";
    router.replace(destination);
  };

  useEffect(() => {
    setCompany(instance);
    setValue("company", instance);
  }, [instance]);

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                sx={{
                  color: "#fff",
                  display: "block",
                  margin: "auto",
                  textAlign: "center",
                }}
                component="h1"
              >
                Cluuf
              </Typography>

              <img
                style={{ display: "block", margin: "auto", marginBottom: 20 }}
                alt="Logo"
                src="/walter.gif"
                width="120px"
              />

              <Typography variant="h2" sx={{ color: "#fff" }} component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                label="company"
                variant="filled"
                fullWidth
                {...register("company", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.company}
                helperText={errors.company?.message}
                sx={{ background: "#fff" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="ematextil"
                label="Login"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ background: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ background: "#fff" }}
              />
            </Grid>

            <Grid item xs={12}>
              {!isLoading ? (
                <Button
                  type="submit"
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  fullWidth
                >
                  Ingresar
                </Button>
              ) : (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Grid>

            {/*
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' } 
                                passHref>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                    */}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
