const GU = {
  name:"GU",
  resource : {
    document : ["retrieve"],
    complaint : ["doc-create"],
    taboo : ["create"],
    promotion: ["create"],
    user: ["create", "update", "retrieve", "delete"]
  }
};

const OU = JSON.parse(JSON.stringify(GU));
OU.name = "OU";
Array.prototype.push.apply(OU.resource.document, ["create", "lock", "unlock", "update", "delete", "search"]);
Array.prototype.push.apply(OU.resource.complaint, ["user-create", "doc-retrieve", "doc-process", "doc-delete"]);
Array.prototype.push.apply(OU.resource.user, ["search"]);

const SU = JSON.parse(JSON.stringify(OU));
SU.name = "SU";
Array.prototype.push.apply(SU.resource.document, ["unlock-master"]);
Array.prototype.push.apply(SU.resource.complaint, ["user-retrieve", "user-process", "user-delete"]);
Array.prototype.push.apply(SU.resource.taboo, ["approve", "retrieve", "delete"]);
Array.prototype.push.apply(SU.resource.promotion, ["approve", "retrieve", "deny"]);

module.exports = {GU, OU, SU};
