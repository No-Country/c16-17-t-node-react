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
const petTest2 = {
	nickName: 'oni',
	breed: 'white',
	birth: 1234,
	images: [{ id: 2, url: 'https://' }],
	description: 'Un bonito conejo blanco',
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
				// console.log(res.body);
				expect(res.body).to.be.a('Array');
			});
	});

	after(async () => {
		await userSchema.deleteMany({});
	});
});

after(async () => {
	await userSchema.deleteMany({});
});
