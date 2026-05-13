import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { client } from "@/db" // your mongodb client

export const auth = betterAuth({
  database: mongodbAdapter(client),
  secret: process.env.BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_URL,
})
