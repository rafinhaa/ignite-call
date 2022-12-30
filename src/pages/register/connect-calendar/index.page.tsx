import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

const Register = () => {
  return (
    <Container>
      <Header>
        <Heading as="strong">
          Conecte sua agenda!
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos á medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Heading>
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Register
