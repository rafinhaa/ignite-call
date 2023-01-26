import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { ArrowRight, Check } from 'phosphor-react'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

const ConnectCalendar = () => {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  const ButtonConnect = () =>
    isSignedIn ? (
      <Button variant="secondary" size="sm" disabled>
        Conectado
        <Check />
      </Button>
    ) : (
      <Button variant="secondary" size="sm" onClick={handleConnectCalendar}>
        Conectar
        <ArrowRight />
      </Button>
    )

  const handleConnectCalendar = async () => await signIn('google')

  const handleNavigateNextStep = async () => {
    await router.push(`/register/time-intervals`)
  }

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
          <ButtonConnect />
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button
          onClick={handleNavigateNextStep}
          type="submit"
          disabled={!isSignedIn}
        >
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
    </Container>
  )
}

export default ConnectCalendar
