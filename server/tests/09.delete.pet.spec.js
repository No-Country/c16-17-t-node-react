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
	telephone: 1234,
};
const petTest1 = {
	nickName: 'loky',
	breed: 'golden',
	birth: 1234,
	images: [{ id: 1, url: 'https://' }],
	description: 'Un bonito perrito dorado',
};

describe('Route Users - PUT /pets/:id \n', () => {
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
		await testSession1
			.post('/pets')
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.send(petTest1)
			.then((res) => {
				petTest1.id = res.body.id;
			});
	});

	it('does not delete a pet, token is missing', async () => {
		await testSession1
			.delete(`/pets/${petTest1.id}`)
			.set('authorization', 'Bearer ')
			.send(petTest1)
			.expect(401)
			.expect((res) => {
				expect(res.body.name).to.be.equal('JsonWebTokenError');
				expect(res.body.message).to.be.equal('jwt must be provided');
			});
	});
	it('does delete a pet, correct data', async () => {
		await testSession1
			.delete(`/pets/${petTest1.id}`)
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
