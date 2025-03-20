const handlers = require('./index')

describe('Endpoints', () => {
    describe('Users', () => {
      describe('Get', () => {
        it('Should return a list of users', async() => {
            
            const axios = {
                get: jest.fn().mockResolvedValue({data : 1}),
                
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            await handlers({axios}).get({},res)

            expect(res.status.mock.calls).toEqual([
                [200]
            ])
            expect(res.send.mock.calls).toEqual([
                [1]
            ])
        })  
    })
    describe('Post', () => {
        it('Create a user', async() => {
            const axios = {
                post: jest.fn().mockResolvedValue({data : 1}),
                
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            const req = {
                body: 'request body'
            }
            await handlers({axios}).post(req,res)

            expect(res.status.mock.calls).toEqual([
                [201]
            ])
            expect(res.send.mock.calls).toEqual([
                [1]
            ])

            expect(axios.post.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users', 'request body']
            ])
        })        
    })
    describe('Put', () => {
        it('Update a user', async() => {
            const axios = {
                put: jest.fn().mockResolvedValue({data : 1}),
                
            }
            const res ={
                sendStatus: jest.fn(),
            }

            const req = {
                body: 'request body',
                params: {
                    id: 11
                },
            }
            await handlers({axios}).put(req,res)

            expect(res.sendStatus.mock.calls).toEqual([
                [204]
            ])

            expect(axios.put.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users/11', 'request body']
            ])

        })
    })
    describe('Delete', () => {
        it('Delete a user', async() => {
            const axios = {
                delete: jest.fn(),
                
            }
            const req = {
                params: {
                    id: 11
                },
            }

            const res ={
                sendStatus: jest.fn(),
            }
            await handlers({axios}).delete(req,res)

            expect(axios.delete.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users/11']
            ])

            expect(res.sendStatus.mock.calls).toEqual([
                [204]
            ])
        })
    })
})
    })