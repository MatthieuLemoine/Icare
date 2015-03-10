var mongoose = require('mongoose');

var MarkerSchema = new mongoose.Schema({
    latitude: { type : Number, required : "La latitude est obligatoire"},
    longitude: { type : Number, required : "La longitude est obligatoire"},
    nombreBornes : {type : Number, default : 1},
    adresse : {type : String, required : "L'adresse est obligatoire"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    disponible: {type : Boolean, default : true}
});

mongoose.model('Marker', MarkerSchema);