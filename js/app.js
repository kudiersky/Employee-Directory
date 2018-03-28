$('#modal').hide()

const results = 12;
var SearchButton = document.getElementById('search');

getJSON();

$("#employee-table").on("click", "td", function() {

   });



function getJSON() {

      $.ajax({
          url: 'http://api.randomuser.me/?format=json&results='+ results +'',
          dataType: 'jsonp',
          success: function (data) {

            var table = '';
            var rows = 4;
            var columns = 3;
            var i = 0;

            for(var r = 0; r < rows; r++)
            {
              table += '<tr>';
                for(var c = 0; c < columns; c++)
                {
                  table += '<td id=' + i + 'class="employee-item">';
                  table += '<div class="employee-details">';
                  table += '<img class="avatar" src=' + data.results[i].picture.large + '>';
                  table += '<div class="Names">';
                  table += '<span id = "employee-FName" class="alphas"><h2>' + data.results[i].name.first + '</h2></span>';
                  table += '<span id = "employee-LName" class="alphas"><h2>' + data.results[i].name.last + '</h2></span>';
                  table += '</div>';
                  table += '<div class="furtherInfo">';
                  table += '<span id = "employee-Email" class="bravos"><h2>' + data.results[i].email + '</h2></span><br>';
                  table += '<span id = "employee-Town" class="charlies"><h2>' + data.results[i].location.city + '</h2></span>';
                  table += '</div>';
                  table += '</div>';
                  table += '</td>';
                  i++
                }
                table += '</tr>';

            }
              $('#employee-table').append(table)
             } //end if success function
          }); //end of ajax()
        }; //end of search ()
