import { Container } from "@chakra-ui/react";
import { MainForm } from "./components/main-form";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <Container as="main" maxW="6xl">
      <MainForm />
    </Container>
  );
}
