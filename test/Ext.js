var assert = require('chai').assert;
var should = require('chai').should();

var Ext = require('./../ext-4.2.1.883/src/Ext.js').Ext;

describe('Ext', function() {
    it('is exist', function() {
        should.exist(Ext);
    });
});

