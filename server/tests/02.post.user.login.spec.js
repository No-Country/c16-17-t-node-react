const session = require('supertest-session');
const { expect } = require('chai');
const app = require('../src/app');
const userSchema = require('../src/models/userSchema');

let testSession = null;
const userTest1 = {
	email: 'test1@mail.com',
	password: 'P@ssw0rd',
	name: 'test',
	lastName: 'test',
};

before(async () => {
	testSession = session(app);
	await testSession.post('/users').send(userTest1);
});

describe('Route Users - POST /users/login', () => {
	it('should not log in, email is missing', async () => {
		await testSession
			.post('/users/login')
			.send({ email: '', password: 'P@ssw0rd' })
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal('Invalid email or password.');
			});
	});
	it('should not log in, password is missing', async () => {
		await testSession
			.post('/users/login')
			.send({ email: 'P@ssw0rd', password: '' })
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal('Invalid email or password.');
			});
	});
	it('should log in, correct data', async () => {
		await testSession
			.post('/users/login')
			.send({ email: 'test1@mail.com', password: 'P@ssw0rd' })
			.expect(201)
			.expect((res) => {
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('email');
				expect(res.body).to.have.property('name');
				expect(res.body).to.have.property('lastName');
				expect(res.body).to.have.property('telephone');
				expect(res.body).to.have.property('image');
				expect(res.body).to.have.property('pets');
				expect(res.body).to.have.property('accessToken');
				expect(res.body.email).to.equal(userTest1.email);
				expect(res.body.name).to.equal(userTest1.name);
				expect(res.body.lastName).to.equal(userTest1.lastName);
				expect(res.body.telephone).to.be.a('null');
				expect(res.body.image).to.be.a('Object');
				expect(res.body.pets).to.be.a('Array');
				expect(res.body.accessToken).to.be.a('String');
				expect(res.body.id).to.be.a('String');
			})
			.expect((res) => {
				testSession.id = res.body.id;
				testSession.accessToken = res.body.accessToken;
			});
	});

	it('accessing a restricted page', async () => {
		await testSession
			.get(`/users/${testSession.id}`)
			.set('authorization', `Bearer ${testSession.accessToken}`)
			.expect(200);
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
