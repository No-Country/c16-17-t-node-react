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
	lost: true,
};
const petTest2 = {
	nickName: 'oni',
	breed: 'white',
	birth: 1234,
	images: [{ id: 2, url: 'https://' }],
	description: 'Un bonito conejo blanco',
	lost: true,
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
		await testSession1
			.post('/pets')
			.set('authorization', `Bearer ${testSession1.accessToken}`)
			.send(petTest2)
			.then((res) => {
				petTest2.id = res.body.id;
			});
	});

	it('does get a pets lost, correct data', async () => {
		await testSession1
			.get('/pets/lost')
			.expect(200)
			.expect((res) => {
				expect(res.body[0]).to.have.property('id');
				expect(res.body[0]).to.have.property('nickName');
				expect(res.body[0]).to.have.property('breed');
				expect(res.body[0]).to.have.property('birth');
				expect(res.body[0]).to.have.property('description');
				expect(res.body[0]).to.have.property('images');
				expect(res.body[0]).to.have.property('owner');
				expect(res.body[0].nickName).to.equal(petTest1.nickName);
				expect(res.body[0].breed).to.equal(petTest1.breed);
				expect(res.body[0].birth).to.equal(petTest1.birth);
				expect(res.body[0].description).to.equal(petTest1.description);
				expect(res.body[0].images).to.be.a('Array');
				expect(res.body[0].images[0]).to.have.property('id');
				expect(res.body[0].images[0]).to.have.property('url');
				expect(res.body[0].owner.id).to.equal(testSession1.id);
				expect(res.body[0].owner).to.have.property('id');
				expect(res.body[0].owner).to.have.property('name');
				expect(res.body[0].owner).to.have.property('telephone');
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
