import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPaymentDetails } from "../utils/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const ConfirmationPage = () => {
  const router = useRouter();
  const { paymentId } = router.query;
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const data = await getPaymentDetails(paymentId);
        setPaymentInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchPaymentInfo();
    }
  }, [paymentId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "130px", marginRight: "10px" }}
          />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Confirmación de Reserva
          </Typography>
          <Button color="inherit" onClick={() => router.push("/")}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => router.push("/about")}>
            Acerca de
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          style={{ padding: "30px", maxWidth: "600px", width: "100%" }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary">
            ¡Reserva Confirmada!
          </Typography>
          <Typography variant="body1" align="center">
            Su reserva ha sido confirmada con éxito.
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Detalles del Pago:
          </Typography>
          <Typography variant="body2" align="center">
            <strong>ID de Pago:</strong> {paymentInfo?.id}
          </Typography>
          <Typography variant="body2" align="center">
            <strong>Monto Pagado:</strong> {paymentInfo?.amount} USD
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
            >
              Volver al Inicio
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ConfirmationPage;
