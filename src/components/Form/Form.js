import {
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import React from "react";
import { useState } from "react";
export const diseases = [
  [
    "Dores musculares",
    "Dores nas juntas",
    "Dores de cabeça",
    "Dores no estômago",
    "Dores nos olhos",
    "Dores no pescoço",
    "Dor abdominal",
    "Dor nas costas",
  ],
  [
    "Sangramento nasal",
    "Sangramento bucal",
    "Sangue nas fezes",
    "Sangramento na gengiva",
    "Febre",
    "Vômito",
    "Manchas vermelhas",
    "Diarreia",
  ],
  [
    "Inchaço",
    "Náuseas",
    "Calafrios",
    "Problemas Digestivos",
    "Fadiga",
    "Lesões na pele",
    "Fraqueza",
    "Perda de peso",
  ],
  [
    "Inflamação",
    "Vermelhidão nos olhos",
    "Falta de apetite",
    "Incontinência urinária",
    "Arritmia cardíaca",
    "Sensibilidade à luz",
    "Olhos amarelos",
    "Deformação facial",
  ],
];

const transformDataToAI = (data) => {
  let result = [];

  for (let i = 0; i < diseases.length; i++) {
    for (let j = 0; j < diseases[i].length; j++) {
      result.push(data.includes(diseases[i][j]) ? 1 : 0);
    }
  }
  console.log(result);
  console.log(result.length);
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function FirstStep({ onClick }) {
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      gap={3}
      alignItems={"center"}
      width={"100%"}
    >
      <Typography
        variant="h1"
        fontWeight="Bold"
        fontSize={32}
        textAlign={"center"}
        color="black"
      >
        Login
      </Typography>
      <Typography
        variant="body1"
        fontWeight="medium"
        fontSize={18}
        color="black"
        sx={{ marginTop: -3 }}
        textAlign={"center"}
      >
        Digite o código disponibilizado para realizar o login
      </Typography>
      <TextField
        id="outlined-basic"
        label="Codigo"
        fullWidth
        variant="outlined"
        value={code}
        sx={{ maxWidth: 300 }}
        onChange={(e) => setCode(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{
          maxWidth: 300,
          padding: "15px 10px",
          fontSize: "15px",
          position: "inherit",
          top: 1,
        }}
        onClick={() => {
          if (code !== "1618") {
            setInvalid(true);
          } else {
            onClick();
          }
        }}
      >
        Confirmar
      </Button>
      {invalid && (
        <Typography
          variant="body1"
          fontWeight="Bold"
          fontSize={14}
          color="red"
          textAlign={"center"}
        >
          Código inválido, Tente novamente!
        </Typography>
      )}
    </Box>
  );
}

export function SecondStep({ step, submit, onChange, selected }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpenMsgError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        textAlign={"center"}
        variant="h1"
        fontWeight="Bold"
        fontSize={32}
        color="black"
      >
        Teste
      </Typography>
      <FormGroup sx={{ marginTop: 5 }}>
        {diseases[step].map((disease, index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.includes(disease)}
                onChange={() => onChange(disease)}
              />
            }
            key={index}
            label={disease}
          />
        ))}
      </FormGroup>
      {step === 3 && (
        <Button
          variant="contained"
          sx={{ marginTop: 5, padding: "15px 0px", fontSize: "15px" }}
          onClick={async () => {
            try {
              setIsLoading(true);
              await submit();
              handleClick();
            } catch (error) {
              handleOpenMsgError();
              setIsLoading(false);
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading || selected.length === 0}
        >
          Enviar
        </Button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Alta demanda no servidor, tente novamente mais tarde!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export function ThirdStep({ result }) {
  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h1"
        fontWeight="Bold"
        fontSize={32}
        color="black"
      >
        Resultado
      </Typography>
      <Typography
        variant="body1"
        fontSize={18}
        color="black"
        textAlign={"center"}
        sx={{ marginTop: -3 }}
      >
        Seus sintomas correspondem a {result}!
      </Typography>

      <Typography
        variant="body1"
        fontSize={18}
        color="black"
        textAlign={"center"}
        sx={{ marginTop: -3 }}
      >
        Aguarde o profissional capacitado
      </Typography>
    </>
  );
}
