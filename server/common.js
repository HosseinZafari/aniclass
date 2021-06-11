module.exports = {
    checkIsNaNCallback: async (value, error, success) => {
        if (this.checkIsNaN(value)) {
            error();
        } else {
            success();
        }
    },

    checkIsNaN: value => {
        if (isNaN(Number(value))) {
            return true;
        } else {
            return false;
        }
    },

    getMiliSecOfDays: numberOfDays => numberOfDays * 24 * 60 * 60 * 1000,

    getStartTimes: [
        {id: 1 ,  time:"06:00:00" , capacity: 0} ,
        {id: 2 ,  time:"07:00:00" , capacity: 0} ,
        {id: 3 ,  time:"08:00:00" , capacity: 0} ,
        {id: 4 ,  time:"09:00:00" , capacity: 0} ,
        {id: 5 ,  time:"10:00:00" , capacity: 0} ,
        {id: 6 ,  time:"11:00:00" , capacity: 0} ,
        {id: 7 ,  time:"12:00:00" , capacity: 0} ,
        {id: 8 ,  time:"13:00:00" , capacity: 0} ,
        {id: 9 ,  time:"14:00:00" , capacity: 0} ,
        {id: 10 , time:"15:00:00" , capacity: 0} ,
        {id: 11 , time:"16:00:00" , capacity: 0} ,
        {id: 12 , time:"17:00:00" , capacity: 0} ,
        {id: 13 , time:"18:00:00" , capacity: 0} ,
        {id: 14 , time:"19:00:00" , capacity: 0} ,
        {id: 15 , time:"20:00:00" , capacity: 0} ,
        {id: 16 , time:"21:00:00" , capacity: 0}
    ]
}