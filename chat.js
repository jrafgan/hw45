$(function () {
    var endpointURL = 'http://146.185.154.90:8000/messages';
    var datetime;
    $.get(endpointURL)
        .then(printAllMessages)
        .catch(function (reason) { console.log('Произошла ошибка в загрузке сообщений. Код ошибки: ' + reason.status); });

    function printAllMessages(list) {
        printMsg(list);
        datetime = list[list.length - 1].datetime;
        setInterval(function(){
            $.get('http://146.185.154.90:8000/messages?datetime=' + datetime).then(function(result) {
                if (result.length > 0){
                    printMsg(result);
                    datetime = result.pop().datetime;
                }
            });
        }, 3000);
    }
    function printMsg(msgList) {
        for (var i = 0; i < msgList.length; i++) {
            var msg = msgList[i];
            var date = new Date(msg.datetime);
            console.log(date);
            var li = $('<li class="message-list"><span class="datetime">' + date.toDateString() + ' ' + date.toLocaleTimeString() + '</span><span class="author">' + msg.author + '</span><span class="message">' + msg.message + '</span></li>');
            $('#chatBox').append(li);
        }
    }

});