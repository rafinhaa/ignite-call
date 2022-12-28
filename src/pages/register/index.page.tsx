import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Form, Header } from './styles'

const Register = () => {
  return (
    <Container>
      <Header>
        <Heading as="strong">
          Bem vindo ao Ignite Call!
          <Text>
            Precisamos de algumas informações para criar o seu perfil! Ah, você
            pode editar essas informações
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Heading>
      </Header>
      <Form as="form">
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" />
        </label>
        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

export default Register
