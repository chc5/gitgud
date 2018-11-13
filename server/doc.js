const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const date = require('date-and-time');

const docSchema = new Schema({
    name: {type: String, required = true},
    file: {type: String, required = true},
    owner_id: {type: int, required = true},
    locked: int,
    revision_id: int,
    last_revised: {type: Date, required = true}
})

docSchema.methods.filter = function(file_text, taboo_words){
    //A String is considered a word if there is a space
    //Checks all the words and see if any are in taboo words and replaces those words
    let wordsarr = file_text.split(" ");
    for(i = 0; i < wordsarr.length; i++){
        if(taboo_words.indexOf(wordsarr[i]) >= -1){
            wordsarr[i] = "taboo";
        }     
    }
};

docSchema.methods.gendate = function(){
    //gets the current date
    let now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    return now;
};

const doc = mongoose.model('Document', docSchema); 
module.exports = doc;
