const conn = require('../dbConnection');

module.exports = {
    getTest: function (subject) {
        return new Promise(function (resolve, reject) {
            const sub = subject + '_QandA';
            console.log(sub);
            conn.collection(sub).aggregate([{
                $sample: {
                    size: 3
                }
            }]).sort({qid: 1}).toArray(function (err, result) {
                console.log(result);
                if (err) reject(-1);
                else resolve(result);
            })
        });
    },

    submitTest: function(test) {
        return new Promise(function(resolve, reject) {
            // { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
            console.log(test);
            // var init = '{ $or: [';
            // let i = 0;
            // for(i=0;i<test.length;i++) {
            //     init= init + '{"qid": '+test[i].qid+'},';
            // }
            // init = init + ']}';
            // var ob = JSON.parse(init);
            // console.log(ob);
            // conn.collection('physics_QandA').find(ob).toArray(function(err, result){
            //     console.log(result);
            // })
        });
    }

};