var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type : String, required : "L'adresse mail est obligatoire"},
    password: { type : String, required : "Le mot de passe est obligatoire"},
    nom: { type : String, required : "Le nom est obligatoire"},
    prenom: { type : String, required : "Le prénom est obligatoire"},
    nombreBornes: { type : Number, default : 0 },
    markers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marker' }]
});

mongoose.model('User', UserSchema); 