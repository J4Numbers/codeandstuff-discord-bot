const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

const importFresh = require('import-fresh');
const clearModule = require('clear-module');
const mockRequire = require('mock-require');

process.env.NODE_ENV = 'test';

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;

global.testRequire = (module) => require(module);
global.importFresh = (module) => importFresh(module);
global.clearModule = (module) => clearModule(module);
