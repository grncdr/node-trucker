chai = require 'chai'
global.expect = chai.expect

require './findRequires_spec'
require './fileFinder_spec'
require './sourceFileAnalyzer_spec'
require './fileLocationCalculator_spec'
require './changedRequiresByFile_spec'
require './applyToFile_spec'
require './checkForErrors_spec'
