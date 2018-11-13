const Doc = require('doc');

const inputdoc = (req, res) => {
    let currentdate = Doc.gendate();
    let docinst = new Doc({
        name: req.body.name,
        file: req.body.text,
        owner_id: req.body.owner_id,
        locked: 0,
        revision_id: 0,
        last_revised: currentDate
    });
};
