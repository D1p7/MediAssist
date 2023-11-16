import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Doctor from "../../../assets/images/Doctor.png";
export default function Form() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={13}>
      <Image src={Doctor} alt="Doctor" />
      <Typography variant="h4" textAlign={"center"} sx={{marginBottom: 2}}>Sobre nós</Typography>
      <Box>
        <Typography variant="body1" textAlign={"center"}>
          Bem-vindo ao mediassist, onde estamos dedicados a utilizar a
          inteligência artificial para antecipar e combater doenças transmitidas
          por vetores, como dengue, zika e outras. Reconhecemos a importância de
          prever surtos dessas enfermidades para implementar medidas preventivas
          eficazes.
        </Typography>
        <Box height={20} />
        <Typography variant="h4" textAlign={"center"} sx={{marginBottom: 2}}>Nosso Objetivo</Typography>
        <Typography variant="body1" textAlign={"center"}>
          Buscamos desenvolver modelos de inteligência artificial que possam
          analisar dados epidemiológicos, climáticos e demográficos para prever
          a incidência de doenças transmitidas por vetores. Ao fazê-lo,
          esperamos não apenas melhorar a precisão da previsão, mas também
          contribuir para estratégias proativas na gestão da saúde pública.
        </Typography>
        <Box height={20} />
        <Typography variant="h4"  textAlign={"center"} sx={{marginBottom: 2}}>Por Que Escolher MediAssist</Typography>
        <Typography variant="body1" textAlign={"center"}>
        ▪   Inovação em Saúde Pública: Utilizamos tecnologia de ponta para
          enfrentar desafios de saúde.
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
        ▪   Compromisso com a Precisão: Nosso foco é fornecer previsões
          confiáveis para orientar ações preventivas.
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
        ▪   Visão para o Futuro: Estamos moldando o futuro da prevenção de
          doenças transmitidas por vetores.
        </Typography>
        <Box height={20} />
        <Typography variant="body1" textAlign={"center"}>
          Junte-se a nós na luta contra surtos de doenças transmitidas por
          vetores. Com MediAssist, estamos transformando dados em ações para um
          amanhã mais saudável.
        </Typography>
      </Box>
    </Box>
  );
}
