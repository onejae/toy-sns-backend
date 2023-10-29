export const authCheck = async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}
