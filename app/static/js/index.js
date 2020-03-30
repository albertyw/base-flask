var $ = require('jquery');
global.jQuery = $;
global.$ = $;

var thirdParty = require('./thirdparty.js');
thirdParty.setupRollbar();
thirdParty.setupLogfit();
thirdParty.setupVarsnap();
require('./global.js');
