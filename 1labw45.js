$(function () {
    var dateTime = null;

    var createMsgList = function (result) {
        for (var i = 0; i < result.length; i++) {
            var list = ('');
            dateTime = result[i].datetime;
            var date = new Date(dateTime);
            date = moment(dateTime).format('llll');
            list = $('<li>' + date + ' / / ' + result[i].author + ' says : : ' + result[i].message + '</li>');
            $('#chatBox').append(list);
        }
        return dateTime;
    };

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.post('http://146.185.154.90:8000/messages', {message: $('#message').val(), author: $('#author').val()});

    });
    var interval = function (dateTime) {
        setInterval(function () {
            $.get('http://146.185.154.90:8000/messages?datetime=' + dateTime, (function (result2) {
                if (result2.length > 0) {
                    createMsgList(result2);
                    dateTime = result2[result2.length - 1].datetime;
                    return dateTime;
                }
            }))
        }, 3000)
    };

    $.get('http://146.185.154.90:8000/messages', function (result) {
        return result;
    }).then(createMsgList).then(interval).catch(function (reason) {
        console.log('Произошла ошибка в загрузке сообщений. Код ошибки: ' + reason.status)
    });
});