process.env.NODE_ENV === 'test';
const request = require('supertest');
const jwt = require('jsonschema');

const app = require('../app');
const db = require('../db');
const Book = require('../models/book');
const { response } = require('../app');

describe('Book routes ', function() {
	beforeEach(async function() {
		await db.query('DELETE FROM books');
		let book = Book.create({
			isbn: '0691161518',
			amazon_url: 'http://a.co/eobPtX2',
			author: 'Matthew Lane',
			language: 'english',
			pages: 264,
			publisher: 'Princeton University Press',
			title: 'Power-Up: Unlocking Hidden Math in Video Games',
			year: 2017
		});
	});

	describe('GET /books', function() {
		test('Get all books ', async function() {
			let resopnse = await request(app).get('/books');
			expect(response.statusCode).toEqual(200);
		});
	});

	describe('GET /books/id', function() {
		test('Get single book by id', async function() {
			let resopnse = await request(app).get('/books/0691161518');
			expect(response.statusCode).toEqual(200);
		});
	});
	describe('POST /books/', function() {
		test('Add a new book', async function() {
			let resopnse = await request(app).post('/books').send({
				isbn: '0888888889',
				amazon_url: 'http://a.co/eobPtX2',
				author: 'Marcellous Curtis',
				language: 'english',
				pages: 500,
				publisher: 'The New York Printing Company',
				title: 'Power: The Path to the Inner',
				year: 2017
			});
			expect(resopnse.statusCode).toEqual(201);
		});
	});
	describe('PUT /books/id', function() {
		test('Edit a book by id', async function() {
			let resopnse = await request(app).put('/books/0691161518');
			expect(response.statusCode).toEqual(200);
		});
	});
	// describe('DELETE /books/id', function() {
	// 	test('Delete book by id ', async function() {
	// 		let resopnse = await request(app).delete('/books/0691161518');
	// 		expect(response).toEqual({ message: 'Book deleted' });
	// 	});
	// });
});

afterAll(async function() {
	await db.end();
});
