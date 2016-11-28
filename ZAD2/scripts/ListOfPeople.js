function ListOfPeople() {
    var people = [];
    var self = this;
    self.addPerson = function(json) {
        people.push(new Person(json));
    };

    var generateTableHeader = function() {
        return '<tr><th><button>LP</button></th> <th><button onclick="viewModel.sort(comparator.byId)">ID</button></th> <th id="column"><button onclick="viewModel.sort(comparator.byName)">Name</button></th> <th><button onclick="viewModel.sort(comparator.bySurname)">Surname</button></th>  <th><button onclick="viewModel.sort(comparator.byGender)">Gender</button></th> <th><button onclick="viewModel.sort(comparator.byAge)">Age</button></th> <th><button onclick="viewModel.sort(comparator.byEmail)">Email</button></th>  <th><button onclick="viewModel.sort(comparator.byIncome)">Income</button></th>  <th><button onclick="viewModel.sort(comparator.byBirthsday)">Birthsday</button></th></tr>';
    }

    var hide = function() {
        return '<th class="show-hide">' +
            // '<select id="select-hide-td">' +
            // '<option value="gender">Gender</option>' +
            // '<option value="firstName">Name</option>' +
            // '<option value="lastName">Surname</option>' +
            // '<option value="email">Email</option>' +
            // '<option value="income">Income</option>' +
            // '<option value="birthsday">Birthsday</option>' +
            // '<option value="age">Age</option>' +
            // '</select>' +
            '<button type="button" data-column="#column" id="select-show-td">Hide</button>' +
            '</th>';
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