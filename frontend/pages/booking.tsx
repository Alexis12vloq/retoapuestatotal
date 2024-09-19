import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { bookFlight, getFlightDetails } from "../utils/api";
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

const BookingPage = () => {
  const router = useRouter();
  const [flightInfo, setFlightInfo] = useState(null);
  const { flightId } = router.query;

  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    seats_reserved: 1,
    total_price: 0,
  });

  const [error, setError] = useState(null); // Para mostrar errores en la interfaz
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (flightId) {
        const data = await getFlightDetails(flightId);
        setFlightInfo(data);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Verificar disponibilidad en tiempo real
    try {
      const latestFlightInfo = await getFlightDetails(flightId); // Obtener datos actualizados del vuelo

      if (passengerInfo.seats_reserved > latestFlightInfo.seats_available) {
        setError(
          `Solo hay ${latestFlightInfo.seats_available} asientos disponibles, no puedes reservar ${passengerInfo.seats_reserved}.`
        );
        setIsSubmitting(false);
        return;
      }

      // Calcular el precio total
      passengerInfo.total_price =
        parseInt(latestFlightInfo.price) * passengerInfo.seats_reserved;

      // Realizar la reservación
      const reservation = await bookFlight(flightId, passengerInfo);
      router.push(`/payment?reservationId=${reservation.id}`);
    } catch (error) {
      console.error("Error booking flight:", error);
      setError("Hubo un error al intentar reservar el vuelo.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Reserva de Vuelos
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
        <Paper elevation={1} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Reservar Vuelo
          </Typography>

          {/* Mostrar detalles del vuelo */}
          {flightInfo && (
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Detalles del Vuelo
              </Typography>
              <Typography variant="body1">
                <strong>Destino:</strong> {flightInfo.destination}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de salida:</strong>{" "}
                {new Date(flightInfo.departure_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Precio por asiento:</strong> {flightInfo.price} USD
              </Typography>
              <Typography variant="body1">
                <strong>Asientos disponibles:</strong>{" "}
                {flightInfo.seats_available}
              </Typography>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={passengerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={passengerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Asientos Reservados"
                  name="seats_reserved"
                  type="number"
                  value={passengerInfo.seats_reserved}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: "1", max: flightInfo?.seats_available }} // Máximo de asientos disponibles
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Proceder al Pago"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default BookingPage;
