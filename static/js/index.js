var $ = require('jquery');
global.jQuery = $;
global.$ = $;

var thirdParty = require('./thirdparty.js');
thirdParty.setupRollbar();
thirdParty.setupLogfit();
thirdParty.setupSegment();
thirdParty.setupVarsnap();
require('./global.js');
