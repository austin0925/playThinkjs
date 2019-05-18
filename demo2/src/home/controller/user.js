const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async helloAction(){
    let result = {"NG":"456"}
    let ac_user = new think.model('ac_user');
    result = await ac_user.select();
    return this.json({"OK":"123", "result":result});
  }

  async transAction(){
    let ac_user = new think.model('ac_user');
    let result = {"NG":"456"}
    let sql = "select * from sql";
    try{
      await ac_user.startTrans();
      result = await ac_user.limit(0,1).select();
      throw new Error('HATL!!!');
      // sql = ac_user.format('select * from sys_fun');
      // result = await think.model.format('select * from ac_user');
      await ac_user.commit();
    }catch(err){
      think.logger.error(err);
      // think.logger.info(err);
      await ac_user.rollback();
      return this.json({"NNN":"GGG5","err":err.message,"stack":err.stack});
    }
    return this.json({"OK":"123", "result":result, "sql":sql});
  }

  async prepareAction(){
    let sql = "select * from ac_user where USER_ID = '%d'";
    let ac_user = new think.model('ac_user');
    sql = await ac_user.parseSql(sql, 2);
    let result = await ac_user.query(sql);
    return this.json({"sql":sql,"result":result});
  }

  async arrayAction(){
    let userArr = [1, 2, 3, 4, 5];
    let ac_user = new think.model(`ac_user`);
    let sql = await ac_user.parseSql('select * from ac_user where USER_ID in (%s)', userArr);
    think.logger.warn(sql);
    let result = await ac_user.query(sql);
    let sqlCount = await ac_user.parseSql('select count(*) as TOTAL from (%s) as AAAAAAAAAA', sql.sql);
    think.logger.warn(sqlCount);
    let count = await ac_user.query(sqlCount);
    return this.json({"OK":"123", "result":result, "count":count});
  }

};