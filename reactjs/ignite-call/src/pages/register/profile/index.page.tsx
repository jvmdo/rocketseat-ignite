import { AppContainer } from '@/components/AppContainer'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { StepInstructions } from '../components/StepInstructions'
import { Avatar, Button, Text, TextArea } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { ProfileBox } from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationMessage } from '@/components/ValidationMessage'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const ProfileFormSchema = z.object({
  bio: z
    .string()
    .min(1, {
      message:
        'Fale um pouco sobre você. Isto será exibido em sua página pessoal.',
    })
    .trim(),
})

type ProfileFormData = z.infer<typeof ProfileFormSchema>

export default function Profile() {
  const session = useSession()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      bio: '',
    },
  })
  const router = useRouter()

  async function handleOnSubmit(data: ProfileFormData) {
    const { bio } = data
    await api.put('/users/profile', {
      bio,
    })
    router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <AppContainer>
      <StepInstructions
        title="Defina sua disponibilidade"
        body="Por último, uma breve descrição e uma foto de perfil."
        step={4}
      />
      <ProfileBox as="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="head">
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </div>
        <div className="body">
          <Text>Sobre você</Text>
          <TextArea placeholder="Breve biografia" {...register('bio')} />
          <ValidationMessage name="bio" errors={errors} />
        </div>
        <Button disabled={isSubmitting}>
          Finalizar <ArrowRight size={20} weight="bold" />
        </Button>
      </ProfileBox>
    </AppContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
