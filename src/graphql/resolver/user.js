export const getAllUser = async (_, __) => {
    const data = [{
        name: "Teguh",
        password: "password"
    }, {
        name: "Teguh Setiawan",
        password: "password"
    }]

    return { __typename: "getNameOK", data}
}

export default {
    Query: {
        getAllUser
    }
}