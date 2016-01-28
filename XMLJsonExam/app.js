
var entry = {
  profile: {
    name: '태연',
    job: 'Singer'
  }
};

// var jstoxml = require('jstoxml');
// var xmlContent = jstoxml.toXML(entry, {head: true});
var xml2json = require('xml2json');
var xmlContent = xml2json.toXml(entry);
console.log(xmlContent);

// var xml2json = require('xml2json')
var json = xml2json.toJson(xmlContent)
console.log(json);

var jsonObj = JSON.parse(json);
console.log(jsonObj);

var jsonStr = JSON.stringify(jsonObj);
console.log(jsonStr);