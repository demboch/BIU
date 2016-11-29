function ListOfPeople() {
    var people = [];
    var self = this;
    self.addPerson = function(json) {
        people.push(new Person(json));
    };

    var generateTableHeader = function() {
        return '<tr><th id="column-a"><button>LP</button></th> <th id="column-b"><button onclick="viewModel.sort(comparator.byId)">ID</button></th> <th id="column-c"><button onclick="viewModel.sort(comparator.byName)">Name</button></th> <th id="column-d"><button onclick="viewModel.sort(comparator.bySurname)">Surname</button></th>  <th id="column-e"><button onclick="viewModel.sort(comparator.byGender)">Gender</button></th> <th id="column-f"><button onclick="viewModel.sort(comparator.byAge)">Age</button></th> <th id="column-g"><button onclick="viewModel.sort(comparator.byEmail)">Email</button></th>  <th id="column-h"><button onclick="viewModel.sort(comparator.byIncome)">Income</button></th> <th id="column-i"><button onclick="viewModel.sort(comparator.byBirthsday)">Birthsday</button></th></tr>';
    }

    var hide = function() {
        return '<button type="button" data-column="#column-a" id="select-show-td">Hide LP</button>' +
            '<button type="button" data-column="#column-b" id="select-show-td">Hide ID</button>' +
            '<button type="button" data-column="#column-c" id="select-show-td">Hide Name</button>' +
            '<button type="button" data-column="#column-d" id="select-show-td">Hide Surname</button>' +
            '<button type="button" data-column="#column-e" id="select-show-td">Hide Gender</button>' +
            '<button type="button" data-column="#column-f" id="select-show-td">Hide Age</button>' +
            '<button type="button" data-column="#column-g" id="select-show-td">Hide Email</button>' +
            '<button type="button" data-column="#column-h" id="select-show-td">Hide Income</button>' +
            '<button type="button" data-column="#column-i" id="select-show-td">Hide Birthsday</button>';
        // '<select id="select-hide-td">' +
        // '<option value="gender">Gender</option>' +
        // '<option value="firstName">Name</option>' +
        // '<option value="lastName">Surname</option>' +
        // '<option value="email">Email</option>' +
        // '<option value="income">Income</option>' +
        // '<option value="birthsday">Birthsday</option>' +
        // '<option value="age">Age</option>' +
        // '</select>' +
    }

    $(document).on("click", "[data-column]", function() {
        var button = $(this),
            header = $(button.data("column")),
            table = header.closest("table"),
            index = header.index() + 1, // convert to CSS's 1-based indexing
            selector = "tr td:nth-child(" + index + ")",
            column = table.find(selector).add(header);

        column.toggleClass("hidden");
    });

    self.toTable = function() {
        var table = hide() + '<table>';
        table += generateTableHeader;
        for (var i = 0; i < people.length; i++) {
            table += people[i].toTableRow(i + 1);
        }
        table += '</table>';
        return table;
    };

    self.clear = function() {
        people = [];
    };

    //    var generateTableHeader = function () {
    //        return '<tr><th>ID</th> <th>Name</th> <th>Surname</th> <th>Gender</th> <th>Age</th> <th>Email</th> <th>Birthsday</th></tr>';
    //    }; 
}