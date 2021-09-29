$(document).ready(async function(){

    // Call session check
    await $.ajax({
        url: "../login/sessionCheck.php",
        type: "GET",
        dataType: 'json',
        success: function(response){
            console.log(response);
            
            if (!response['response']) {
                window.location.replace("https://chuntutors.com/login/index.html");
            }
        },
        error: function(error){
            console.log(error);

            $('.server-error-message').css('display', 'block');
            window.location.replace("https://chuntutors.com/login/index.html");
        }
    });


    // Acquire lesson history
    $.ajax({
        url: "../dashboard/lessonHistory.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);

            if (response.length == 0) {
                $('.lesson-card-container').html("<div class='row'><div class='col fst-italic text-center'>No previous lesson history.</div></div>");
                return;
            }

            for (let i = 0; i < response.length; i++) {
                // Style date
                let dateArray = response[i]["date"].split(" ")[0].split("-");
                let dateFormat = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

                let month = dateFormat.getMonth() + 1;
                let date = dateFormat.getDate();

                const dayMap = {
                    0: "Sun",
                    1: "Mon",
                    2: "Tue",
                    3: "Wed",
                    4: "Thur",
                    5: "Fri",
                    6: "Sat"
                };  
                let day = dayMap[dateFormat.getDay()];


                // Style time
                let timeArray = response[i]["date"].split(" ")[1].split(":");

                let ampm;
                let hours;
                if (timeArray[0] == 0) {
                    ampm = "am";
                    hours = "12";
                } else if (timeArray[0] >= 1 && timeArray[0] <= 11) {
                    ampm = "am";
                    hours = parseInt(timeArray[0]);
                } else if (timeArray[0] == 12) {
                    ampm = "pm";
                    hours = "12";
                } else {
                    ampm = "pm";
                    hours = timeArray[0] - 12;
                }
                
                let minutes = timeArray[1];


                // Style name
                let nameArray = response[i]["tutorName"].split(" ");

                let firstName = nameArray[0];
                let lastInitial = nameArray[nameArray.length - 1].charAt(0);


                // Style HTML and place here with response data
                $('.lesson-card-container').append(`
                    <div class="row mt-1 mx-2 mb-3 py-3 lesson-element">
                        <div class="col-2">
                            ` + day + " " + month + "/" + date + `
                        </div>
                        <div class="col-auto">
                            <div>` + firstName + " " + lastInitial + "." + `</div>
                            <div class="text-muted">` + parseFloat(response[i]["length"]) + ` hour lesson</div>
                        </div>
                        <div class="col text-end text-muted fst-italic">
                            ` + response[i]["topics"] + `
                        </div>

                        <div class="mt-4 lesson-further-details">
                            <div class='row mb-5'>
                                <div class="col-4">
                                    <span class="fw-bold">Start Time: </span>
                                    <span class="fst-italic">` + hours + ":" + minutes + ampm + ` PST</span>
                                </div>
                                <div class="col-8">
                                    <span class="fw-bold">Tutor's Comments: </span>
                                    <span class="fst-italic">` + response[i]["comments"] + `</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }

            // Attach on click to the lesson elements
            $('.lesson-element').on("click", function() {
                if ($(this).children('.lesson-further-details').css("display") === "none") {
                    $(this).children('.lesson-further-details').css("display", "block");
                } else {
                    $(this).children('.lesson-further-details').css("display", "none");
                }
            })

        },
        error: function(error) {
            console.log(error);

            $('.server-error-message').css("display", "block");
        }
    })


})