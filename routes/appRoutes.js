
'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');
  var branch = require('../controller/cabang/cabangController');
  var gate = require('../controller/gate/gateController');
  var tariff = require('../controller/tariff/tariffController');
  var restarea = require('../controller/restarea/restareaController');
  var cctv = require('../controller/cctv/cctvController');
  var mdd = require('../controller/mdd/mddController.js');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
   
   app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  // branch Routes
  app.route('/branch')
    .get(branch.list_all_branch)
    .post(branch.create_a_branch);
   
   app.route('/branch/:branchID')
    .get(branch.read_a_branch)
    .put(branch.update_a_branch)
    .delete(branch.delete_a_branch);

  // gate routes
  app.route('/gate/:branchID')
    .get(gate.read_gate_by_branch);

  // Tariff Routes
  app.route('/tariff')
    .post(tariff.read_tariff_by_filter);

  // Rest Area Routes
  app.route('/restarea')
    .get(restarea.list_all_restarea);

  // Cctv routes
  app.route('/cctv/:branchID')
    .get(cctv.read_cctv_byBranch);

  // MDD routes
  app.route('/mdd')
    .post(mdd.login_mdd_device);

};

