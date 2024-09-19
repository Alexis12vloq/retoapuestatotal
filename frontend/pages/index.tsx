import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getFlights } from "../utils/api";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formatFlightDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd 'de' MMMM 'del' yyyy, hh:mm aaaa", { locale: es });
};

const HomePage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (error) {
        console.error("Error al obtener los vuelos:", error);
      }
    };

    fetchFlights();
  }, []);

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
          <Button color="inherit" onClick={() => (window.location.href = "/")}>
            Inicio
          </Button>
          <Button
            color="inherit"
            onClick={() => (window.location.href = "/about")}
          >
            Acerca de
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Vuelos Disponibles
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#3f51b5",
                  }}
                  align="center"
                >
                  Destino
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#3f51b5",
                  }}
                  align="center"
                >
                  Fecha de Salida
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#3f51b5",
                  }}
                  align="center"
                >
                  Asientos Disponibles
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell align="center">{flight.destination}</TableCell>
                  <TableCell align="center">
                    {formatFlightDate(flight.departure_date)}
                  </TableCell>
                  <TableCell align="center">{flight.seats_available}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        (window.location.href = `/booking?flightId=${flight.id}`)
                      }
                    >
                      Reservar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default HomePage;
