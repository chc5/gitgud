const GU = {
  name:"GU",
  resource : {
    document : ["retrieve"],
    complaint : ["doc-create"],
    taboo : ["create"],
    applications: ["create"],
    user: []
  }
};

const OU = JSON.parse(JSON.stringify(GU));
OU.name = "OU";
Array.prototype.push.apply(OU.resource.document, ["create", "lock", "unlock", "update", "delete", "search"]);
Array.prototype.push.apply(OU.resource.complaint, ["user-create", "doc-retrieve"]);
Array.prototype.push.apply(OU.resource.user, ["search"]);

const SU = JSON.parse(JSON.stringify(OU));
SU.name = "SU";
Array.prototype.push.apply(SU.resource.document, ["unlock-master"]);
Array.prototype.push.apply(SU.resource.complaint, ["user-process"]);
Array.prototype.push.apply(SU.resource.taboo, ["approve", "retrieve", "delete"]);
Array.prototype.push.apply(SU.resource.applications, ["approve", "retrieve", "delete"]);

module.exports = {GU, OU, SU};
