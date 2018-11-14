const Doc = require('doc');

const inputdoc = (req, res) => {
  let docinst = new Doc({
    name: req.body.name,
    file: req.body.text,
    owner_id: req.body.owner_id,
    locked: false,
    revision_id: 0,
    last_revised: null
  });
  let tabooSchema = new Schema({
    word: String
  })
  taboo = mongoose.model('Taboo', tabooSchema);
  try {
    const results = await taboo.find({});
    console.log(results);
  } catch (err) {
    throw err;
  }
  taboo_words_arr = results;
  //Modify file
  docinst.filter(taboo_words_arr);
  docinst.save(function (err, doc) {
    if (err) return console.error(err);
      console.log(doc.name + " saved to Document collection.");
  });     
};

module.exports = {inputdoc};
