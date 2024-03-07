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

	it('does not update a pet, token is missing', async () => {
		await testSession1
			.post('/pets')
			.set('authorization', 'Bearer ')
			.send(petTest1)
			.expect(401)
			.expect((res) => {
				expect(res.body.name).to.be.equal('JsonWebTokenError');
				expect(res.body.message).to.be.equal('jwt must be provided');
			});
	});
	it('does update a pet, get correct data', async () => {
		await testSession1
			.put(`/pets/${petTest1.id}`)
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.send({
				nickName: 'Loky',
				breed: 'Golden dog',
				birth: 12345,
				images: [{ id: 2, url: 'https://' }],
				description: 'Un gran y bonito perrito dorado',
				lost: true,
			})
			.expect(200)
			.expect((res) => {
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('nickName');
				expect(res.body).to.have.property('breed');
				expect(res.body).to.have.property('birth');
				expect(res.body).to.have.property('lost');
				expect(res.body).to.have.property('description');
				expect(res.body).to.have.property('images');
				expect(res.body).to.have.property('owner');
				expect(res.body.nickName).to.equal('Loky');
				expect(res.body.breed).to.equal('Golden dog');
				expect(res.body.birth).to.equal(12345);
				expect(res.body.lost).to.equal(true);
				expect(res.body.images).to.be.a('Array');
				expect(res.body.images[0]).to.have.property('id');
				expect(res.body.images[0]).to.have.property('url');
				expect(res.body.owner).to.equal(testSession1.id);
				expect(res.body.description).to.equal(
					'Un gran y bonito perrito dorado',
				);
			});
	});

	after(async () => {
		await userSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
