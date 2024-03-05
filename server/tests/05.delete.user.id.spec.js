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

describe('Route Users - DELETE /users/:id \n', () => {
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

	it('not delete a user, other id', async () => {
		await testSession1
			.delete(`/users/${testSession2.id}`)
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.expect(400)
			.expect((res) => {
				expect(res.body.name).to.be.equal('ValidationError');
				expect(res.body.message).to.be.equal('Insufficient permissions');
			});
	});
	it('delete a user, correct data', async () => {
		await testSession1
			.delete(`/users/${testSession1.id}`)
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.expect(200)
			.expect((res) => {
				expect(res.body).to.have.property('acknowledged');
				expect(res.body).to.have.property('deletedCount');
				expect(res.body.acknowledged).to.equal(true);
				expect(res.body.deletedCount).to.equal(1);
			});
	});

	after(async () => {
		await userSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
