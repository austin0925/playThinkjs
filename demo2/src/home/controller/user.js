const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  helloAction(){
    let result = {"NG":"456"}
    let ac_user = new think.model('ac_user');
    result = ac_user.select();
    return this.json({"OK":"123", "result":result});
  }
};