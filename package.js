Package.describe({
  name: 'sach:flow-db-admin',
  version: '1.2.0',
  // Brief, one-line summary of the package.
  summary: 'Meteor Database Admin package for use with Flow Router',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/sachinbhutani/flow-db-admin',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');

  both = ['client','server']

  api.use(
    [
    'coffeescript',
    'underscore',
    'reactive-var',
    'meteorhacks:unblock@1.1.0',
    'kadira:flow-router@2.12.1',
    'kadira:blaze-layout@2.3.0',
    'zimme:active-route@2.3.2',
    'reywood:publish-composite@1.5.2',
    'aldeed:collection2-core@2.0.1',
    'aldeed:autoform@6.2.0',
    'aldeed:template-extension@4.1.0',
    'alanning:roles@1.2.14',
    'raix:handlebar-helpers@0.2.5',
    'momentjs:moment@2.18.1',
    'aldeed:tabular@2.1.1',
    'mfactory:admin-lte@0.0.2',
	'tmeasday:check-npm-versions@0.3.1',
    'check',
	'ecmascript'
    ],
    both);

  api.use(['less@1.0.0 || 2.5.0','session','jquery','templating'],'client')

  api.use(['email'],'server')

  api.add_files([
    'lib/both/AdminDashboard.coffee',
    'lib/both/routes.js',
    'lib/both/utils.coffee',
    'lib/both/startup.coffee',
    'lib/both/collections.coffee'
    ], both);

  api.add_files([
    'lib/client/html/admin_templates.html',
    'lib/client/html/admin_widgets.html',
    'lib/client/html/fadmin_layouts.html',
    'lib/client/html/admin_sidebar.html',
    'lib/client/html/admin_header.html',
    'lib/client/js/admin_layout.js',
    'lib/client/js/helpers.coffee',
    'lib/client/js/templates.coffee',
    'lib/client/js/events.coffee',
    'lib/client/js/slim_scroll.js',
    'lib/client/js/autoForm.coffee',
    'lib/client/css/admin-custom.less'
    ], 'client');

  api.add_files([
    'lib/server/publish.coffee',
    'lib/server/methods.coffee'
    ], 'server');

  //api.addAssets(['lib/client/css/admin-custom.css'],'client');
  api.export('AdminDashboard',both)

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sach:flow-db-admin');
  api.addFiles('flow-db-admin-tests.js');
});
