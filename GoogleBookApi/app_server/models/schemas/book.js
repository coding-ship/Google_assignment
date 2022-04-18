var mongoose = require( 'mongoose' );

var bookSchema = new mongoose.Schema({ 
    query : {type : String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);