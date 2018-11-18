const Doc = require('doc');
const Taboo = require('taboo');

const savedoc = (req, res) => {
  let docinst = new Doc({
    title: req.body.name,
    content: req.body.text,
    owner_id: req.body.owner_id,
    locked: false,
  });

  docinst.save(function (err, doc) {
    if (err) return console.error(err);
      console.log(doc.name + " saved to Document collection.");
  });
  res.send("Doc saved");     
};

const gettaboowords = static function() {
  Taboo.find({}, function (err, results) {
    if (err) {
      throw err;
    }
    else {
      console.log(results);
      return results;
    }
  })
};

module.exports = {savedoc, gettaboowords};
