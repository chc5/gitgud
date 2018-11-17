const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const date = require('date-and-time');

const DocSchema = new Schema({
  title: {type: String, required:true},
  content: {type: String, required:true},
  owner_id: {type: Schema.Types.ObjectId, ref: 'User'},
  locked: Boolean,
  revisions:[
    {type: Schema.Types.ObjectId, ref: 'Revision'}
  ],
  date_created: {type: Date, 
    default: Data.now
  }
})

DocSchema.methods.findAllTabooIdx = function(taboo_words){
  //A String is considered a word if there is a space
  //Checks all the words and see if any are in taboo words and replaces those words
  //returns indexes of all taboo words, format at each index: [start, end + 1]
  idx_list = [];
  for(let i = 0; i < taboo_words.length; i++){
    let current_idx = 0;
    let start_idx = 0;
    while((start_idx = this.content.indexOf(taboo_words[i], current_idx)) > -1){
      idx_list[length] = [start_idx, start_idx + len(taboo_words[i])];
      current_idx = start_idx + len(taboo_words[i]);  
    }
  }
  return idx_list;
};

const doc = mongoose.model('Document', DocSchema); 
module.exports = doc;
