




var SearchButton = document.getElementById('search');

SearchButton.onclick = function () {


      $.ajax({
          url: 'http://api.randomuser.me/?format=json',
          dataType: 'jsonp',
          success: function (data) {

            console.log(data)
            var employeeHTML = '<th class="employee-item">'
            employeeHTML += '<div class="employee-details">'
            employeeHTML += '<img class="avatar" src=' + data.results[0].picture.large + '>'
            employeeHTML += '<div class="Names">'
            employeeHTML += '<span id = "employee-FName" class="bravos"><h2>' + data.results[0].name.first + '</h2></span>'
            employeeHTML += '<span id = "employee-LName" class="bravos"><h2>' + data.results[0].name.last + '</h2></span>'
            employeeHTML += '</div>'
            employeeHTML += '<div class="furtherInfo">'
            employeeHTML += '<span id = "employee-Email" class="bravos"><h2>' + data.results[0].email + '</h2></span><br>'
            employeeHTML += '<span id = "employee-Town" class="bravos"><h2>' + data.results[0].location.city + '</h2></span>'
            employeeHTML += '</div>'
            employeeHTML += '</div>'
            employeeHTML += '</th>'

            $('#employee-table').append(employeeHTML)


            }

          });
      };
