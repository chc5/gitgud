const Doc = require('doc');
const Taboo = require('taboo');

const savedoc = (req, res) => {
  let docinst = new Doc({
    title: req.body.name,
    content: req.body.text,
    owner_id: req.body.owner_id,
    locked: false,
    revision_id: 0,
  });

  docinst.save(function (err, doc) {
    if (err) return console.error(err);
      console.log(doc.name + " saved to Document collection.");
  });     
};

const gettaboowords = (req, res) => {
  Taboo.find({}, function (err, results) {
    if (err) {
      throw err;
    }
    else {
      console.log(results);
      res.send(results);
    }
  })
};

module.exports = {inputdoc, gettaboowords};
