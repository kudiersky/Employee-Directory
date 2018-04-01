
const results = 12; //the results per enquiry

getJSON();
hideModal();
closeModal();

var array = [];

var employee = {
};

  function hideModal(){
  $('#modal').hide();
};

  function showModal(){

  let id = this.id;
  employee.Email = this.querySelector('#employee-Email').innerText
  employee.img = this.querySelector('#employee-img').innerHTML
  employee.FName = this.querySelector('#employee-FName').innerText
  employee.LName = this.querySelector('#employee-LName').innerText
  employee.city = this.querySelector('#employee-Town').innerHTML


  let imgHTML = array[id].img
  var modalHTML = '<div id= "employee-image" class="modal-content-image"><img id="modal-img" src='+ imgHTML +' ></div>'
  modalHTML += '<div id= "m-employee-Name" class="modal-content-text-name">'+ employee.FName + ' '+ employee.LName +'</div>'
  modalHTML += '<div id= "m-employee-Email" class="modal-content-text-alpha">' + employee.Email +'</div>'
  let city = upperCaseAllFirstLetters(array[id].City);
  modalHTML += '<div id= "m-employee-State" class="modal-content-text-alpha">'+ city +'</div>'
  modalHTML += '<hr>'
  let Cell = array[id].Cell
  modalHTML += '<div id= "m-employee-Cell" class="modal-content-text-bravo"><p>'+ Cell + '</p></div>'
  let Address = formatAddress(array[id].Street, array[id].Country, array[id].PostCode);
  modalHTML += '<div id= "m-employee-address" class="modal-content-text-bravo"><p>'+Address+'</p></div>'
  let Birthday = formatYear(array[id].Birthday);
  modalHTML += '<div id= "m-employee-bday" class="modal-content-text-bravo"><p>'+Birthday+'</p></div>'

$('#modal-cotent-container').html(modalHTML)

  $('#modal').show();
};

  function closeModal(){
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

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatYear(string) {
  let year =  string.substring(2, 4);
  let month =  string.substring(5, 7);
  let day = string.substring(8, 10);
  let formatedYear = day+'/'+month+'/'+year;
  return formatedYear;
}


function upperCaseAllFirstLetters(string) {
  var splitString = string.toLowerCase().split(' ');
  for (var i = 0; i < splitString.length; i++) {
      splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
  }

  let capitalizedstring =  splitString.join(' ');
  return capitalizedstring;
}

function formatAddress(street, countryCode, postcode) {

let capitalizedStreet = upperCaseAllFirstLetters(street);

let formattedAddress = capitalizedStreet + ', ' + countryCode + ', ' + postcode;
return formattedAddress;
};

function getJSON() {

      $.ajax({
          url: 'http://api.randomuser.me/?format=json&results='+ results +'',
          dataType: 'jsonp',
          success: function (data) {

            console.log(data)

            var table = '';
            var rows = 4;
            var columns = 3;
            var i = 0;

            for(var r = 0; r < rows; r++)
            {
              table += '<tr>';
                for(var c = 0; c < columns; c++)
                {
                  table += '<td id=' + i + ' class="employee-item">';
                  table += '<div class="employee-details">';
                  table += '<img class="avatar" id = "employee-img" src=' + data.results[i].picture.large + '>';
                  table += '<div class="Names">';
                  let Fname = upperCaseFirstLetter(data.results[i].name.first)
                  table += '<span id = "employee-FName" class="alphas"><h2>' + Fname + '</h2></span>';
                  let Lname = upperCaseFirstLetter(data.results[i].name.last)
                  table += '<span id = "employee-LName" class="alphas"><h2>' + Lname + '</h2></span>';
                  table += '</div>';
                  table += '<div class="furtherInfo">';
                  table += '<span id = "employee-Email" class="bravos"><h2>' + data.results[i].email + '</h2></span><br>';
                  table += '<span id = "employee-Town" class="charlies"><h2>' + data.results[i].location.city + '</h2></span>';
                  table += '</div>';
                  table += '</div>';
                  table += '</td>';


                  const employee = {
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
                array.push(employee)
                  i++
                }
                table += '</tr>';


            }
              $('#employee-table').append(table)
              activateBoxes();
             } //end if success function
          }); //end of ajax()
        }; //end of search ()


//sesarch


var SearchElement = $('input#searchfield')
//var searchTerm = $('input').val().toLowerCase()

SearchElement.keyup(function(e) {

});
