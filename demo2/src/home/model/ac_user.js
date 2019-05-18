module.exports = class extends think.Model {

    getList(){
        return this.field("USER_ID").select();
    }
    
};
