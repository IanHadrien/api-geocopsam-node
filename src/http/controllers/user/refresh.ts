import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh (req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  // const { role } = req.user

  const token = await res.jwtSign(
    // { role },
    {
      sign: {
        sub: req.user
      }
    }
  )

  const refreshToken = await res.jwtSign(
    // { role },
    {
      sign: {
        sub: req.user,
        expiresIn: '7d'
      }
    }
  )

  return res
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // O Front va poder ler esse token
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({
      token
    })
}
