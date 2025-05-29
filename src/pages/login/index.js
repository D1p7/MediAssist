"use client";

import { useEffect, useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Navbar from "@/components/Navbar"; // Certifique-se que o caminho está correto
import { Box, Button } from "@mui/material";
import AboutUs from "./AboutUs"; // Certifique-se que o caminho está correto
import { FirstStep, SecondStep, ThirdStep } from "../../components/Form/Form"; // Certifique-se que o caminho está correto
// import axios from "axios"; // Não precisamos mais do axios para esta mockagem

export default function Home() {
  const [page, setPage] = useState("Home");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [testResult, setTestResult] = useState([]); // Corrigido de testTesult para testResult

  const possibleOutcomes = ['Dengue', 'Zika', 'Chikungunya', 'Yellow Fever', 'Malaria'];

  const sendToAi = async () => {
    // Simula um pequeno atraso, como uma chamada de API real
    await new Promise(resolve => setTimeout(resolve, 500));

    // Seleciona uma doença aleatória da lista
    const randomIndex = Math.floor(Math.random() * possibleOutcomes.length);
    const randomDisease = possibleOutcomes[randomIndex];

    // Define o resultado do teste com a doença aleatória
    // Mantendo a estrutura esperada (result.data.dtc)
    const mockApiResponse = {
      data: {
        dtc: randomDisease
      }
    };
    setTestResult(mockApiResponse.data.dtc);
    handleNext();
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleCheckbox = (disease) => {
    setSelectedDiseases((prevSelectedDiseases) => {
      // console.log(prevSelectedDiseases); // Você pode manter ou remover este log
      const isDiseaseSelected = prevSelectedDiseases.includes(disease);
      if (isDiseaseSelected) {
        return prevSelectedDiseases.filter((selected) => selected !== disease);
      } else {
        return [...prevSelectedDiseases, disease];
      }
    });
  };

  const Stepper = {
    0: (
      <FirstStep
        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
      />
    ),
    1: (
      <SecondStep
        step={activeStep - 1}
        onChange={handleCheckbox}
        selected={selectedDiseases}
      />
    ),
    2: (
      <SecondStep
        step={activeStep - 1}
        onChange={handleCheckbox}
        selected={selectedDiseases}
      />
    ),
    3: (
      <SecondStep
        step={activeStep - 1}
        onChange={handleCheckbox}
        selected={selectedDiseases}
      />
    ),
    4: (
      <SecondStep
        step={activeStep - 1}
        onChange={handleCheckbox}
        selected={selectedDiseases}
        submit={sendToAi} // A função sendToAi agora usa o mock
      />
    ),
    5: <ThirdStep result={testResult} onClick={() => setActiveStep(0)} />, // Corrigido para testResult
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  var w;
  if (typeof window !== 'undefined') {
    w = window.innerWidth;
    window.addEventListener("resize", () => {
      w = window.innerWidth;
    });
  }

  return (
    <Box
      display="flex"
      flex={1}
      height={"100vh"}
      flexDirection="column"
      justifyContent={"center"}
      bgcolor={"#5e95ff"}
      paddingTop={15}
    >
      <Navbar handleNav={setPage} />
      <Box
        display="flex"
        flexDirection="column"
        height={"100%"}
        border={0}
        bgcolor={"#fff"}
        padding={6}
        gap={5}
        sx={{ borderRadius: "40px 40px 0 0" }}
      >
        {page === "Home" ? (
          <>
            {Stepper[activeStep]}
            {activeStep !== 0 && activeStep < 5 && ( // activeStep != 0 é o mesmo que activeStep !== 0
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                alignItems="center"
              >
                <MobileStepper
                  variant="dots"
                  steps={4} // O número de steps no MobileStepper é 4 (de 0 a 3 para os SecondStep)
                  position="bottom"
                  activeStep={activeStep - 1} // activeStep aqui vai de 0 a 3 para os SecondStep
                  sx={
                    w <= 900
                      ? { flexGrow: 1 }
                      : {
                          width: "100%",
                          marginTop: 5,
                          marginBottom: 5,
                          justifyContent: "center",
                          gap: 20,
                        }
                  }
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      // O botão "Próximo" deve ser desabilitado no último SecondStep (activeStep === 4)
                      // Se o último step visível do MobileStepper é o 3 (quando activeStep é 4),
                      // e o envio ocorre no activeStep 4, então o handleNext do MobileStepper
                      // não deveria levar para o activeStep 5 diretamente, pois o sendToAi já faz isso.
                      // No entanto, a lógica original permite isso, então vamos manter.
                      // A desabilitação aqui deve ser activeStep === 4 se o submit é no activeStep 4
                      // Ou activeStep === 5 se o stepper controlasse até o resultado.
                      // Considerando que sendToAi chama handleNext, o botão "Próximo" no step 4
                      // não deveria existir ou deveria ser o botão de "Submit".
                      // O componente SecondStep no activeStep 4 já tem o prop 'submit',
                      // então o botão 'Próximo' do MobileStepper pode não ser necessário nesse step.
                      // Vamos manter como estava, mas é um ponto de atenção.
                      disabled={activeStep === 4} // Desabilitar quando estiver no último passo antes do resultado
                    >
                      Próximo
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 1} // Desabilitar quando estiver no primeiro SecondStep
                    >
                      <KeyboardArrowLeft />
                      Anterior
                    </Button>
                  }
                />
              </Box>
            )}
          </>
        ) : (
          <AboutUs />
        )}
      </Box>
    </Box>
  );
}
