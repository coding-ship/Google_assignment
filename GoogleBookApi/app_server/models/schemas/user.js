var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({ 
    name : {type : String, required: true}
});


module.exports = mongoose.model('User', userSchema);