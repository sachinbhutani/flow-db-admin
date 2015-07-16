
var fadminRoutes = FlowRouter.group({
  name: "AdminController",
  prefix: '/admin',
  subscriptions: function() {
    this.register('fadminUsers', Meteor.subscribe('adminUsers'));
    this.register('fadminUser', Meteor.subscribe('adminUser'));
    this.register('fadminCollectionsCount', Meteor.subscribe('adminCollectionsCount'));
  },
 triggersEnter: [
  	function(context) {
  		if(!Roles.userIsInRole (Meteor.userId(),['admin']))
  		{
  			Meteor.call('adminCheckAdmin');
  			//if (typeof AdminConfig.nonAdminRedirectRoute == 'string')
  			//	FlowRouter.go(AdminController.nonAdminRedirectRoute);
  		}
  	},
    function(context) {
      Session.set('adminSuccess', null);
      Session.set('adminError', null);
      Session.set('admin_title', null);
      Session.set('admin_subtitle', null);
      Session.set('admin_collection_name', null);
      Session.set('admin_collection_page', null);
      Session.set('admin_id',null);
      Session.set('admin_doc', null);
    }
  ]
});

fadminRoutes.route('/',{
	name: 'adminDashboard',
	triggersEnter: [
	 function(context){
	 	Session.set('admin_title',"Dashboard");
	 	Session.set('admin_collection_name',"");
	 	Session.set('admin_collection_page',"");
	 }
	],
	action: function ()
	{
		FlowLayout.render('fAdminLayout', {main: 'AdminDashboard'});
	}
});


fadminRoutes.route('/view/:collectionName',{
	triggersEnter: [
		function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'View');
		Session.set('admin_collection_page', 'view');
		Session.set('admin_collection_name', context.params.collectionName);
	}],
	triggersExit: [
		function(context){
			FlowLayout.render('fAdminLayout',{main: 'AdminLoading'});
		}
	],
	action: function(params)
	{	
		FlowLayout.render('fAdminLayout',{main: 'AdminDashboardView'});
	}
});

fadminRoutes.route('/new/:collectionName',{
	triggersEnter: [function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'Create New');
		Session.set('admin_collection_page', 'new');
		Session.set('admin_collection_name', context.params.collectionName);
	}],
	action: function(params)
	{	if(params.collectionName == 'Users')
			FlowLayout.render('fAdminLayout',{main: 'AdminDashboardUsersNew'});
		else 
			FlowLayout.render('fAdminLayout',{main: 'AdminDashboardNew'});
	}
});

fadminRoutes.route('/edit/:collectionName/:_id',{
	triggersEnter: [function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'Edit');
		Session.set('admin_collection_page', 'edit');
		Session.set('admin_collection_name', context.params.collectionName);
		
	}],
	triggersExit: [
		function(context){
			FlowLayout.render('fAdminLayout',{main: 'AdminLoading'});
		}
	],
	subscriptions : function(params){
		this.register('admindoc2edit', Meteor.subscribe('adminCollectionDoc', params.collectionName, parseID(params._id)));
	},
	action: function(params)
	{	
		if(params.collectionName == 'Users')
			FlowLayout.render('fAdminLayout',{main: 'AdminDashboardUsersEdit'});
		else
			FlowLayout.render('fAdminLayout',{main: 'AdminDashboardEdit'});
	}
});



