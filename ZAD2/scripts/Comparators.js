function Comparators() {
    var self = this;
    self.state = false;

    // self.byLp = function(person1, person2) {
    //     if (self.state)
    //         return person1.id - person2.id;
    //     else return -(person1.id - person2.id);
    // };

    self.byId = function(person1, person2) {
        if (self.state)
            return person1.id - person2.id;
        else return -(person1.id - person2.id);
    };

    self.byName = function(person1, person2) {
        if (self.state)
            return -person1.firstName.localeCompare(person2.firstName);
        else return person1.firstName.localeCompare(person2.firstName);
    };

    self.bySurname = function(person1, person2) {
        if (self.state)
            return person1.lastName.localeCompare(person2.lastName);
        else return -person1.lastName.localeCompare(person2.lastName);
    };

    self.byGender = function(person1, person2) {
        if (self.state)
            return person1.gender.localeCompare(person2.gender);
        else return -person1.gender.localeCompare(person2.gender);
    };

    self.byEmail = function(person1, person2) {
        if (self.state)
            return person1.email.localeCompare(person2.email);
        else return -person1.email.localeCompare(person2.email);
    };

    self.byIncome = function(person1, person2) {
        if (self.state)
            return person1.income - person2.income;
        else return -(person1.income - person2.income);
    };

    self.byAge = function(person1, person2) {
        if (self.state)
            return person1.age - person2.age;
        else return -(person1.age - person2.age);
    };

    self.byBirthsday = function(person1, person2) {
        if (self.state)
            return person1.birthsday.localeCompare(person2.birthsday);
        else return -person1.birthsday.localeCompare(person2.birthsday);
    };

    self.setState = function() {
        if (self.state) { self.state = false; } else if (!self.state) { self.state = true; }
    };
}