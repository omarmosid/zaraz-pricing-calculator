import { Container } from "@chakra-ui/react";
import { MainForm } from "./components/main-form";

export default function Home() {
  return (
    <Container as="main" maxW="6xl">
      <MainForm />
    </Container>
  );
}
