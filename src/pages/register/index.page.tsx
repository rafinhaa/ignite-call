import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter no mínimo 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário só pode conter letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' })
    .transform((username) => username.toLowerCase()),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleRegister = (data: RegisterFormSchema) => {
    console.log(data)
  }

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
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

export default Register
