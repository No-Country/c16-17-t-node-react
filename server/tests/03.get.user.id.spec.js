const session = require('supertest-session');
const { expect } = require('chai');
const app = require('../src/app');
const userSchema = require('../src/models/userSchema');

let testSession1 = null;
const userTest1 = {
	email: 'test1@mail.com',
	password: 'P@ssw0rd',
	name: 'test',
	lastName: 'test',
};
let testSession2 = null;
const userTest2 = {
	email: 'test2@mail.com',
	password: 'P@ssw0rd',
	name: 'test',
	lastName: 'test',
};

describe('Route Users - GET /users/:id \n', () => {
	before(async () => {
		testSession1 = session(app);
		await testSession1.post('/users').send(userTest1);
		await testSession1
			.post('/users/login')
			.send({ email: userTest1.email, password: userTest1.password })
			.then((res) => {
				testSession1.id = res.body.id;
				testSession1.accessToken = res.body.accessToken;
			});
		testSession2 = session(app);
		await testSession2.post('/users').send(userTest2);
		await testSession2
			.post('/users/login')
			.send({ email: userTest2.email, password: userTest2.password })
			.then((res) => {
				testSession2.id = res.body.id;
				testSession2.accessToken = res.body.accessToken;
			});
	});

	it('not get a user, missing accessToken', async () => {
		await testSession1
			.get(`/users/${testSession1.id}`)
			.set('authorization', 'Bearer ')
			.expect(401)
			.expect((res) => {
				expect(res.body.name).to.be.equal('JsonWebTokenError');
				expect(res.body.message).to.be.equal('jwt must be provided');
			});
	});
	it('not get a user, other id', async () => {
		await testSession1
			.get(`/users/${testSession2.id}`)
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal('Insufficient permissions');
			});
	});
	it('get a user, correct data', async () => {
		await testSession1
			.get(`/users/${testSession1.id}`)
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.expect(200)
			.expect((res) => {
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('email');
				expect(res.body).to.have.property('name');
				expect(res.body).to.have.property('lastName');
				expect(res.body).to.have.property('telephone');
				expect(res.body).to.have.property('image');
				expect(res.body).to.have.property('pets');
				expect(res.body.email).to.equal(userTest1.email);
				expect(res.body.name).to.equal(userTest1.name);
				expect(res.body.lastName).to.equal(userTest1.lastName);
				expect(res.body.telephone).to.be.a('null');
				expect(res.body.image).to.be.a('Object');
				expect(res.body.pets).to.be.a('Array');
			});
	});

	after(async () => {
		await userSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
