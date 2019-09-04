
'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');
  var branch = require('../controller/cabang/cabangController');
  var gate = require('../controller/gate/gateController');

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

};

