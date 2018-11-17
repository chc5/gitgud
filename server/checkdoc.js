const Doc = require('doc');
const Taboo = require('taboo');

const inputdoc = (req, res) => {
  let docinst = new Doc({
    title: req.body.name,
    content: req.body.text,
    owner_id: req.body.owner_id,
    locked: false,
    revision_id: 0,
    last_revised: null
  });

  Taboo.find({}, function (err, results) {
    if (err) {
      throw err;
    }
    else {
      console.log(results);
      var taboo_words_arr = results;
    }
  });

  //Modify file
  docinst.filter(taboo_words_arr);
  docinst.save(function (err, doc) {
    if (err) return console.error(err);
      console.log(doc.name + " saved to Document collection.");
  });     
};

module.exports = {inputdoc};
