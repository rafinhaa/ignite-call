import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { parseCookies, destroyCookie } from 'nookies'
import { prisma } from '../prisma'

export const PrismaAdapter = (
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter => {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdCookies } = parseCookies({ req })
      if (!userIdCookies) {
        throw new Error('User id not found on cookies')
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: userIdCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })
      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: String(updatedUser.email),
        emailVerified: null,
        avatar_url: String(updatedUser.avatar_url),
      }
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: String(user.email),
        emailVerified: null,
        avatar_url: String(user.avatar_url),
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: String(user.email),
        emailVerified: null,
        avatar_url: String(user.avatar_url),
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider_account_id: providerAccountId,
            provider,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: String(user.email),
        emailVerified: null,
        avatar_url: String(user.avatar_url),
      }
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: String(updatedUser.email),
        emailVerified: null,
        avatar_url: String(updatedUser.avatar_url),
      }
    },
    async deleteUser(userId) {
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: String(user.email),
        emailVerified: null,
        avatar_url: String(user.avatar_url),
      }
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
    async unlinkAccount({ providerAccountId, provider }) {},
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      }
    },
    async getSessionAndUser(sessionToken) {
      const getSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!getSession) return null

      const { user, ...session } = getSession

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: String(user.email),
          emailVerified: null,
          avatar_url: String(user.avatar_url),
        },
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: updatedSession.session_token,
        userId: updatedSession.user_id,
        expires: updatedSession.expires,
      }
    },
    async deleteSession(sessionToken) {},
  }
}
