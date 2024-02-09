const session = require('supertest-session');
// const { expect } = require('chai');
const app = require('../src/app');
const userSchema = require('../src/models/userSchema');
const petSchema = require('../src/models/petSchema');

let testSession = null;

before(() => {
	testSession = session(app);
});

describe('Route Users', () => {
	it('should fail accessing a restricted page', async () => {
		await testSession.get('/users/1').expect(401);
	});
	it('should log in', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: 'P@ssw0rd',
				name: 'test',
				lastName: 'test',
			})
			.expect(201);
	});
	it('should sign in', async () => {
		await testSession
			.post('/users/login')
			.send({ email: 'test1@mail.com', password: 'P@ssw0rd' })
			.expect(201)
			.expect((data) => {
				testSession.id = data.body.id;
				testSession.accessToken = data.body.accessToken;
				return data;
			});
	});
	it('accessing a restricted page', async () => {
		await testSession
			.get(`/users/${testSession.id}`)
			.set('authorization', `Bearer ${testSession.accessToken}`)
			.expect(200);
	});

	after(async () => {
		await userSchema.deleteMany({});
		await petSchema.deleteMany({});
	});
});
