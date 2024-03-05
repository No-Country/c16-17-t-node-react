const session = require('supertest-session');
const { expect } = require('chai');
const app = require('../src/app');
const userSchema = require('../src/models/userSchema');

let testSession = null;

describe('Route Users - POST /users \n', () => {
	before(() => {
		testSession = session(app);
	});

	it('should not sign in, email is missing', async () => {
		await testSession
			.post('/users')
			.send({
				password: 'P@ssw0rd',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'Email, password, name and lastName are required for user creation.',
				);
			});
	});
	it('should not sign in, password is missing', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'Email, password, name and lastName are required for user creation.',
				);
			});
	});
	it('should not sign in, name is missing', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: 'P@ssw0rd',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'Email, password, name and lastName are required for user creation.',
				);
			});
	});
	it('should not sign in, lastName is missing', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: 'P@ssw0rd',
				name: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'Email, password, name and lastName are required for user creation.',
				);
			});
	});
	it('should not sign in, invalid email format', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'mail.com',
				password: 'P@ssw0rd',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'User validation failed: email: Invalid email format. Please enter a valid email address.',
				);
			});
	});
	it('should not sign in, invalid password format', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: 'Password',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'The password must contain at least one special character.',
				);
			});
	});
	it('should not sign in, invalid password format', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: '*',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'Password must be at least 8 characters.',
				);
			});
	});
	it('should not sign in, invalid password format', async () => {
		await testSession
			.post('/users')
			.send({
				email: 'test1@mail.com',
				password: '********',
				name: 'test',
				lastName: 'test',
			})
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal(
					'The password must contain at least one uppercase letter.',
				);
			});
	});
	it('should sign in, correct data', async () => {
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

	after(async () => {
		await userSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
