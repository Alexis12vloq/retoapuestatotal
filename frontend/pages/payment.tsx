import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { processPayment, getReservationDetails } from "../utils/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

const PaymentPage = () => {
  const router = useRouter();
  const { reservationId } = router.query;
  const [paymentDetails, setPaymentDetails] = useState({
    card_number: "",
    cvv: "",
    expiration_date: "",
  });
  const [reservationInfo, setReservationInfo] = useState(null); // Estado para almacenar los detalles de la reservación
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const [isFormValid, setIsFormValid] = useState(false); // Estado para habilitar/deshabilitar el botón

  // useEffect para obtener los detalles de la reservación
  useEffect(() => {
    const fetchReservationDetails = async () => {
      if (reservationId) {
        try {
          const data = await getReservationDetails(reservationId);
          setReservationInfo(data); // Guarda los detalles de la reservación
          setLoading(false); // Detiene el indicador de carga
        } catch (error) {
          console.error(
            "Error al obtener los detalles de la reservación:",
            error
          );
        }
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  // Valida el formulario para habilitar/deshabilitar el botón de pago
  useEffect(() => {
    const isValid =
      paymentDetails.card_number.length === 16 &&
      paymentDetails.cvv.length === 3 &&
      /^[0-9]{2}\/[0-9]{2}$/.test(paymentDetails.expiration_date); // Valida formato MM/AA
    setIsFormValid(isValid);
  }, [paymentDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reservationInfo) {
      const createPaymentDto = {
        reservationId: reservationInfo.id,
        amount: reservationInfo.total_price,
        payment_status: "SUCCESS",
      };

      try {
        const payment = await processPayment(createPaymentDto);
        router.push(`/confirmation?paymentId=${payment.id}`);
      } catch (error) {
        console.error("Error procesando el pago:", error);
      }
    }
  };

  if (loading) {
    return <div>Cargando detalles de la reservación...</div>;
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
            Pago de Reserva
          </Typography>
          <Button color="inherit" onClick={() => router.push("/")}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => router.push("/about")}>
            Acerca de
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "40px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Confirmar Pago
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Reserva para el vuelo:</strong>{" "}
            {reservationInfo?.flight?.destination}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total a pagar:</strong> {reservationInfo?.total_price} USD
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número de Tarjeta"
                  name="card_number"
                  value={paymentDetails.card_number}
                  onChange={handleInputChange}
                  required
                  inputMode="numeric"
                  helperText="Debe contener 16 dígitos"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                  inputMode="numeric" // Acepta solo números
                  helperText="Debe contener 3 dígitos"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Fecha de Expiración"
                  name="expiration_date"
                  value={paymentDetails.expiration_date}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  required
                  inputProps={{ maxLength: 5 }}
                  helperText="Formato MM/AA"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isFormValid}
                >
                  Confirmar Pago - {reservationInfo?.total_price} USD
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentPage;
