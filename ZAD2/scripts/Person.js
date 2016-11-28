function Person(json) {
    var self = this;
    //self.lp = [];
    self.id = json.id;
    self.name = json.firstName;
    self.surname = json.lastName;
    self.gender = json.gender;
    self.email = json.email;
    self.income = json.income;
    self.age = json.age;
    self.birthsday = json.birthsday;

    self.toTableRow = function(lp) {
        return '<tr><td>' +
            lp +
            '</td><td>' +
            self.id +
            '</td><td>' +
            self.name +
            '</td><td>' +
            self.surname +
            '</td><td>' +
            self.gender +
            '</td><td>' +
            self.age +
            '</td><td>' +
            self.email +
            '</td><td>' +
            self.income +
            '</td><td>' +
            self.birthsday +
            '</td></tr>';
    };

    //    var autonumeric = function () {
    //        for (i = 0; i < lp.length; i++) { 
    //            text += lp[i];
    //        }
    //    }

    var sum = function(a, b) {
        return a + " " + b;
    };


    // self.autoIncrement = function () {
    //     for (var i = 0; i < people.length; i++ ) {
    //         lp += lp[i];
    //     }
    //     return lp;
    // };

    self.fullName = function() {
        return sum(self.lp, self.id, self.name, self.surname, self.gender, self.age, self.email, self.birthsday);
    };
}