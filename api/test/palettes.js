//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Palette = require('../MyAppAPI/models/palette');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Palettes', () => {
	beforeEach((done) => { //Before each test we empty the database
		Palette.remove({}, (err) => {
		   done();
		});
	});
 /*
  * Test the /GET route
  */
  describe('/GET palette', () => {
	  it('it should GET all the palettes', (done) => {
			chai.request(server)
		    .get('/app/palette')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST palette', () => {
	  it('it should not POST a palette without any props', (done) => {
	  	let palette = {
	  		name: "Just colors",
	  		noflat: false
	  	}
			chai.request(server)
		    .post('/app/palette')
		    .send(palette)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Palette successfuly stored');
			  	res.body.object.should.have.property('name');
			  	res.body.object.should.have.property('noflat');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
 //  describe('/GET/:id book', () => {
	//   it('it should GET a book by the given id', (done) => {
	//   	let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
	//   	book.save((err, book) => {
	//   		chai.request(server)
	// 	    .get('/book/' + book.id)
	// 	    .send(book)
	// 	    .end((err, res) => {
	// 		  	res.should.have.status(200);
	// 		  	res.body.should.be.a('object');
	// 		  	res.body.should.have.property('title');
	// 		  	res.body.should.have.property('author');
	// 		  	res.body.should.have.property('pages');
	// 		  	res.body.should.have.property('year');
	// 		  	res.body.should.have.property('_id').eql(book.id);
	// 	      done();
	// 	    });
	//   	});
 //
	//   });
 //  });
 // /*
 //  * Test the /PUT/:id route
 //  */
 //  describe('/PUT/:id book', () => {
	//   it('it should UPDATE a book given the id', (done) => {
	//   	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	//   	book.save((err, book) => {
	// 			chai.request(server)
	// 		    .put('/book/' + book.id)
	// 		    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
	// 		    .end((err, res) => {
	// 			  	res.should.have.status(200);
	// 			  	res.body.should.be.a('object');
	// 			  	res.body.should.have.property('message').eql('Book updated!');
	// 			  	res.body.book.should.have.property('year').eql(1950);
	// 		      done();
	// 		    });
	// 	  });
	//   });
 //  });
 // /*
 //  * Test the /DELETE/:id route
 //  */
 //  describe('/DELETE/:id book', () => {
	//   it('it should DELETE a book given the id', (done) => {
	//   	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	//   	book.save((err, book) => {
	// 			chai.request(server)
	// 		    .delete('/book/' + book.id)
	// 		    .end((err, res) => {
	// 			  	res.should.have.status(200);
	// 			  	res.body.should.be.a('object');
	// 			  	res.body.should.have.property('message').eql('Book successfully deleted!');
	// 			  	res.body.result.should.have.property('ok').eql(1);
	// 			  	res.body.result.should.have.property('n').eql(1);
	// 		      done();
	// 		    });
	// 	  });
	//   });
 //  });
});
