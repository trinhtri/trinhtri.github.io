/*

Template: Sam Martin - Personal Vcard Resume HTML Template
Author: potenzaglobalsolutions.com
Version: 1.0
Design and Developed by: potenzaglobalsolutions.com

NOTE:  

*/

(function ($) {
    "use strict";

    /*************************
          Add calendar Events
    *************************/
    var events = [];

    var Datevalues = $('#datepickerValue').html();
    if (Datevalues != '' && Datevalues != null && Datevalues != "") {
        var DateArray = Datevalues.replace(/,@\s*$/, "");
        events = DateArray.split(',@');

        events.forEach(function (part, index) {
            var tempArr = [];
            tempArr = part.toString().split(',#');
            events[index] = { Title: tempArr[1], Date: new Date(tempArr[0]) };
        });
    } else {
        var currentDate = new Date();
        var day = currentDate.getDate() + 1
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var tomorrow = month + "-" + day + "-" + year

        events = [{ Title: "Fill Calendar Availablity", Date: new Date(tomorrow) }];
        //Default Values - Unused
        //var event = [ { Title: "On Leave", Date: new Date("03/26/2017") },{ Title: "On Leave", Date: new Date("03/28/2017") }];
    }

    $("#datepicker").datepicker({
        dateFormat: 'DD, d MM, yy',
        beforeShowDay: function (date) {

            var result = [true, '', null];
            var matching = $.grep(events, function (event) {
                return event.Date.valueOf() === date.valueOf();
            });

            if (matching.length) {
                result = [true, 'highlight', null];
            }
            var date = $(this).datepicker('getDate');
            $('#day').html($.datepicker.formatDate('DD', date));
            $('#mnt').html($.datepicker.formatDate('MM', date));
            $('#date').html($.datepicker.formatDate('d', date));
            return result;
        },
        onSelect: function (dateText) {
            var date,
                selectedDate = new Date(dateText),
                i = 0,
                event = null;

            while (i < events.length && !event) {
                date = events[i].Date;

                if (selectedDate.valueOf() === date.valueOf()) {
                    event = events[i];
                }
                i++;
            }
            if (event) {
                alert(event.Title);
            }
        }
    });


})(jQuery);