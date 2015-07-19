Template.AdminDashboardView.rendered = ->
	table = @$('.dataTable').DataTable();

Template.AdminDashboardView.helpers
	hasDocuments: ->
		AdminCollectionsCount.findOne({collection: Session.get 'admin_collection_name'})?.count > 0
	newPath: ->
		FlowRouter.path "/admin/new/:coll",{coll: Session.get 'admin_collection_name' }
	admin_table: ->
		AdminTables[Session.get 'admin_collection_name']


Template.adminEditBtn.helpers path: ->
  FlowRouter.path '/admin/edit/:coll/:_id',
    coll: Session.get('admin_collection_name')
    _id: @_id

Template.AdminHeader.helpers
	profilepath: -> FlowRouter.path '/admin/edit/:coll/:_id',
	  coll: 'Users'
	  _id: Meteor.userId()

Template.AdminDashboardEdit.rendered = ->
	editcollectionName = FlowRouter.getParam 'collectionName'
	editId	= FlowRouter.getParam '_id'
	Session.set 'admin_doc', adminCollectionObject(editcollectionName).findOne _id : editId

Template.AdminDashboardEdit.helpers 
	fadmin_doc: ->
	  editcollectionName = FlowRouter.getParam 'collectionName'
	  editId	= FlowRouter.getParam '_id'
	  adminCollectionObject(editcollectionName).findOne _id : editId if editcollectionName && editId

Template.AdminDashboardUsersEdit.helpers 	
  user: -> Meteor.users.find(FlowRouter.getParam '_id').fetch()
  roles: -> Roles.getRolesForUser(FlowRouter.getParam '_id')
  otherRoles: -> _.difference _.map(Meteor.roles.find().fetch(), (role) -> role.name), Roles.getRolesForUser(FlowRouter.getParam '_id')