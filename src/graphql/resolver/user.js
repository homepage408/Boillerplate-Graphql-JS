import { models } from '../models'
import * as PasswordService from '../../services/password-service'
import * as JWT from '../common/jsonWebToken'
import Pagination from '../../services/pagination-service'


export const signUpUsers = async (_, { signUpInput }, ___) => {
    const { email, password } = signUpInput

    const userCheck = await models.Users.findOne({ where: { email: email.toLowerCase() } })
    if (userCheck) return { __typename: "Error", message: "This email has already been taken!" }


    const newUser = await models.Users.create({
        ...signUpInput,
        password: await PasswordService.toHash(password),
        email: email.toLowerCase(),
        isActive: true
    })

    return { __typename: "signupOK", user: newUser }
}

export const login = async (_, { email, password }, __) => {

    const existingUser = await models.Users.findOne({ where: { email: email.toLowerCase() } })
    if (!existingUser) return { __typename: "Error", message: "This email not found" }

    const passwordMatch = await PasswordService.compare(existingUser.password, password)
    if (!passwordMatch) return { __typename: "Error", message: "Password does not match" }

    const token = await JWT.jwtToken(existingUser)

    return { __typename: "token", token: token, user: existingUser }
}



export const getAllUser = async (_, { paginationInput }, ___) => {
    let options = {}
    const paginationService = paginationInput ? new Pagination(paginationInput) : null
    const limitOffset = paginationService ? paginationService.limitOffset() : null

    if (limitOffset) {
        const { limit, offset } = paginationService.limitOffset()
        options.limit = limit
        options.offset = offset
    }

    const { rows: users, count } = await models.Users.findAndCountAll(options)
    return { __typename: "getNameOK", data: users, paginationRes: paginationService ? paginationService.paginationRes(count) : null }
}

export default {
    Query: {
        getAllUser,
        login
    },
    Mutation: {
        signUpUsers: signUpUsers
    }
}