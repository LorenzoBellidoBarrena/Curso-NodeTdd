const postHandlers = require('./index')

describe('Endpoints', () => {
    describe('Posts', () => {
        it('Should create', async() => {

            const mockUser = [
                {id: 1},
                {id: 2}
            ]         

            const post = {
                userId: 1,
                title: 'Titulo del Post',
                body: 'Cuerpo del Post'
            }

            const req = {
                body: post,
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            const axios = {
                get: jest.fn().mockResolvedValue({ data: mockUser }),
                post: jest.fn().mockResolvedValue({ data: {id: 1000 }}),
            }
            await postHandlers({axios}).post(req, res)
            expect(res.status.mock.calls).toEqual([
                [201]
            ])
            expect(res.send.mock.calls).toEqual([
                [{id: 1000}]
            ])

            expect(axios.get.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users']
            ])
            expect(axios.post.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/posts']
            ])
        })

        it('Should fail', async() => {
            const mockUser = [
                {id: 1},
                {id: 2}
            ]         

            const post = {
                userId: 3,
                title: 'Titulo del Post',
                body: 'Cuerpo del Post'
            }

            const req = {
                body: post,
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                sendStatus: jest.fn(),
            }

            const axios = {
                get: jest.fn().mockResolvedValue({ data: mockUser }),
                post: jest.fn().mockResolvedValue({ data: {id: 1000 }}),
            }
            await postHandlers({axios}).post(req, res)

            expect(axios.post.mock.calls).toEqual([
                []
            ])

            expect(res.sendStatus.mock.calls).toEqual([
                [500]
            ])
        })
        
    })
})