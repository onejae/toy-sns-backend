import { Static, Type } from '@sinclair/typebox'

export const SignIn = Type.Object({
  username: Type.String(),
})

export type SignInType = Static<typeof SignIn>
