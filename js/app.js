

var nationality = 'gb'; //this is the selected nationality for randomuser.me
var results = 12; //results required for page
var searchFilter = constructFilter(nationality, results); //search filter uses the required number of employees and nationality

getJSON();//run the ajax() function
hideModal();//hide modal window
closeModal();//create 'x' to close modal window

var array = []; //array used for holding employee details

var employee = {};//hold employee data

function constructFilter() { //contruct the filter to all natioanility and number of results to be altered
    let searchFilter = 'results=' + results + '&nat=' + nationality + '';
    return searchFilter;
}


function hideModal() {
    $('#modal').hide(); //jquery to hide modal window
};

function showModal() { //show modal details

    let id = this.id;
    employee.Email = this.querySelector('#employee-Email').innerText
    employee.img = this.querySelector('#employee-img').innerHTML
    employee.FName = this.querySelector('#employee-FName').innerText
    employee.LName = this.querySelector('#employee-LName').innerText
    employee.city = this.querySelector('#employee-Town').innerHTML


    let imgHTML = array[id].img //construct modal image HTML
    var modalHTML = '<div id= "employee-image" class="modal-content-image"><img id="modal-img" src=' + imgHTML + ' ></div>' //construct modal HTML
    modalHTML += '<div id= "m-employee-Name" class="modal-content-text-name">' + employee.FName + ' ' + employee.LName + '</div>'
    modalHTML += '<div id= "m-employee-Email" class="modal-content-text-alpha">' + employee.Email + '</div><br>'
    let city = upperCaseAllFirstLetters(array[id].City);
    modalHTML += '<div id= "m-employee-State" class="modal-content-text-alpha">' + city + '</div>'
    modalHTML += '<hr>'
    let Cell = array[id].Cell
    modalHTML += '<div id= "m-employee-Cell" class="modal-content-text-bravo"><p>' + Cell + '</p></div>'
    let Address = formatAddress(array[id].Street, array[id].Country, array[id].PostCode);
    modalHTML += '<div id= "m-employee-address" class="modal-content-text-bravo"><p>' + Address + '</p></div>'
    let Birthday = formatYear(array[id].Birthday);
    modalHTML += '<div id= "m-employee-bday" class="modal-content-text-bravo"><p>' + Birthday + '</p></div>'

    $('#modal-cotent-container').html(modalHTML) //build modal window

    $('#modal').show();//show modal window
};

function closeModal() { //close modal window on 'x' click
    $(".close").on("click", function() {
        hideModal()
    });
};

function activateBoxes() {
    var boxes = document.getElementsByClassName('employee-item')
    for (var i = 0; i < boxes.length; i++) { //for loop to add event listener to each box
        boxes[i].addEventListener('click', showModal);
    };
};

function upperCaseFirstLetter(string) { //uppercase the first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatYear(string) { //format the year into DD/MM/YY
    let year = string.substring(2, 4);
    let month = string.substring(5, 7);
    let day = string.substring(8, 10);
    let formatedYear = day + '/' + month + '/' + year;
    return formatedYear;
}


function upperCaseAllFirstLetters(string) { //uppercase the first letter of string with multiple words
    var splitString = string.toLowerCase().split(' ');
    for (var i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
    }

    let capitalizedstring = splitString.join(' ');
    return capitalizedstring;
}

function formatAddress(street, countryCode, postcode) { //format address into Street , country and poscode

    let capitalizedStreet = upperCaseAllFirstLetters(street);

    let formattedAddress = capitalizedStreet + ', ' + countryCode + ', ' + postcode;
    return formattedAddress;
};

function getJSON() { //run .ajax()


    $.ajax({
        url: 'http://api.randomuser.me/?format=json&' + searchFilter + '', //url of JSON data
        dataType: 'jsonp',// requires JSONP for different web server
        success: function(data) { //on success run code

            var table = ''; //used to build table
            var rows = 4; //rows required for table
            var columns = 3;//colums required for table
            var i = 0; //give TDs an ID of 0-11

            for (var r = 0; r < rows; r++) { //build rows
                table += '<tr>';
                for (var c = 0; c < columns; c++) { //build colums
                    table += '<td id=' + i + ' class="employee-item">'; //build table HTML
                    table += '<div class="employee-details">'; //give td a class
                    table += '<img class="avatar" id = "employee-img" src=' + data.results[i].picture.large + '>'; //add image to td
                    table += '<div class="Names">'; //add td class
                    let Fname = upperCaseFirstLetter(data.results[i].name.first) //format first name to capitalize first letter
                    table += '<span id = "employee-FName" class="alphas"><h2>' + Fname + '</h2></span>';
                    let Lname = upperCaseFirstLetter(data.results[i].name.last)  //format last name to capitalize f letter
                    table += '<span id = "employee-LName" class="alphas"><h2>' + Lname + '</h2></span>';
                    table += '</div>';
                    table += '<div class="furtherInfo">';
                    let email = upperCaseAllFirstLetters(data.results[i].email)  //format email to capitalize first letter
                    table += '<span id = "employee-Email" class="bravos"><h2>' + email + '</h2></span><br>';
                    let city = upperCaseAllFirstLetters(data.results[i].location.city)  //format city to capitalize first letter of each word
                    table += '<span id = "employee-Town" class="charlies"><h2>' + city + '</h2></span>'; //add class to secondary info
                    table += '</div>';
                    table += '</div>';
                    table += '</td>'; //cose td HTML


                    const employee = { //build array for all infor required to assist search/filter
                        Fname: data.results[i].name.first,
                        LName: data.results[i].name.last,
                        img: data.results[i].picture.large,
                        Email: data.results[i].email,
                        Cell: data.results[i].cell,
                        City: data.results[i].location.city,
                        Street: data.results[i].location.street,
                        PostCode: data.results[i].location.postcode,
                        Country: data.results[i].nat,
                        Birthday: data.results[i].dob


                    };
                    array.push(employee) //push all the above info into an array of objects for each employee
                    i++
                }
                table += '</tr>'; //close row HTML


            }
            $('#employee-table').append(table) // append table HTML to table
            activateBoxes(); //activate the boxes to allow modal box
        } //end of success function
    }); //end of ajax()
}; //end of search()


var SearchElement = $('input#searchfield'); //search field

SearchElement.on('keyup', function filter() { //function on key-up dynamic search, removed to fall within guidelines, please untab and tab out line below to have a go. it was tricky :)

    searchResults = []; //search results array, empty initially
    var searchTerm = $('input').val().toLowerCase(); //take search term and change to lower case
    searchTerm = searchTerm.split(" ").join("")//remove white space

    //console.log('searched for ' + searchTerm) //developer to show search term

    $('.employee-item').each(function() { //run each LI through function

        var searchableData = $(this).text().toLowerCase() // prepare data to search
        var index = searchableData.indexOf(searchTerm) //index results
        $(this).addClass('greyout'); //remove grey out for filter


        if (index != -1) { // index of 1 is match
            searchResults.push(this) //if not -1 then this is TRUE, !=-1 === FALSE
            $(this).removeClass('greyout'); //remove class of greyout white filters results

        }
    });
});
