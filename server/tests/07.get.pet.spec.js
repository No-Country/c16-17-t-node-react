const session = require('supertest-session');
const { expect } = require('chai');
const app = require('../src/app');
const userSchema = require('../src/models/userSchema');
const petSchema = require('../src/models/petSchema');

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

describe('Route Users - GET /pets/:id \n', () => {
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

	it('does get a pet, get correct data', async () => {
		await testSession1
			.get(`/pets/${petTest1.id}`)
			.send(petTest1)
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
				expect(res.body.nickName).to.equal(petTest1.nickName);
				expect(res.body.breed).to.equal(petTest1.breed);
				expect(res.body.birth).to.equal(petTest1.birth);
				expect(res.body.lost).to.equal(false);
				expect(res.body.description).to.equal(petTest1.description);
				expect(res.body.images).to.be.a('Array');
				expect(res.body.images[0]).to.have.property('id');
				expect(res.body.images[0]).to.have.property('url');
				expect(res.body.owner.id).to.equal(testSession1.id);
				expect(res.body.owner).to.have.property('id');
				expect(res.body.owner).to.have.property('name');
				expect(res.body.owner).to.have.property('telephone');
			});
	});

	after(async () => {
		await userSchema.deleteMany({});
		await petSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
	await petSchema.deleteMany({});
});
