import Joi from "joi"

export interface LoginForm {
  email: string
  password: string
}

export const loginSchema = Joi.object<LoginForm>({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "io"] } }).required(),
})
