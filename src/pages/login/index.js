"use client";

import { useEffect, useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Navbar from "@/components/Navbar";
import { Box, Button } from "@mui/material";
import AboutUs from "./AboutUs";
import { FirstStep, SecondStep, ThirdStep } from "../../components/Form/Form";
import axios from "axios";

export default function Home() {
  const [page, setPage] = useState("Home");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [testTesult, setTestResult] = useState([]);

  const sendToAi = async () => {
    const result = await axios.post(
      "https://mediassist-gamma.vercel.app/api/AI",
      selectedDiseases
    );
    setTestResult(result.data.dtc);
    handleNext();
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleCheckbox = (disease) => {
    setSelectedDiseases((prevSelectedDiseases) => {
      console.log(prevSelectedDiseases);
      // Verifica se a doença já está presente em selectedDiseases
      const isDiseaseSelected = prevSelectedDiseases.includes(disease);

      // Se estiver presente, remove a doença, senão adiciona
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
        submit={sendToAi}
      />
    ),
    5: <ThirdStep result={testTesult} onClick={() => setActiveStep(0)} />,
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //acompanha o currentWidth do browser
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
      flexDirection="column"
      justifyContent={"center"}
      bgcolor={"#5e95ff"}
    >
      <Navbar handleNav={setPage} />
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        border={0}
        // alignItems={"center"}
        justifyContent={"center"}
        marginTop={5}
        bgcolor={"#fff"}
        padding={6}
        gap={5}
        sx={{ borderRadius: "40px 40px 0 0" }}
      >
        {page === "Home" ? (
          <>
            {Stepper[activeStep]}
            {activeStep != 0 && activeStep < 5 && (
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                alignItems="center"
              >
                <MobileStepper
                  variant="dots"
                  steps={4}
                  position="bottom"
                  activeStep={activeStep - 1}
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
                      disabled={activeStep === 4}
                    >
                      Próximo
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 1}
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
