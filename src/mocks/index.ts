import { setupWorker, rest } from 'msw'

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
    rest.post('/api/login', async (req, res, ctx) => {
        const { username, password } = await req.json();
        if (username === "admin" && password === "12345")
            return res(
                ctx.delay(1000),
                ctx.json({
                    accessToken: "AAA"
                })
            )
        else
            return res(
                ctx.delay(1000),
                ctx.status(403, 'Mocked status'),
                ctx.json({
                    message: 'UserName or Password is incorect',
                }))
    }),
    rest.get('/api/login-info', (req, res, ctx) => {
        const isLogin = req.headers.get("Authorization") === "AAA"
        if (isLogin)
            return res(
                ctx.delay(1000),
                ctx.status(200, 'ok'),
                ctx.json({
                    username: "admin"
                }),
            )
        else
            return res(
                ctx.delay(1000),
                ctx.status(401, 'unauthorize'),
                ctx.json({
                    message: 'Unauthorize',
                }),
            )
    }),
)



export const MockService = worker;