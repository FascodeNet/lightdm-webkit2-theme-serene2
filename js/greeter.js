
var selectedUser = null;
var msg= new Array();
msg[0]="パスワードを入力しEnterを押すかログインボタンをクリックしてください";
msg[1]="ログイン処理中";
msg[2]="Enterキーまたはクリックでログイン画面に進むことができます";
var w_day = new Array(7);
w_day[0] = "日曜日";
w_day[1] = "月曜日";
w_day[2] = "火曜日";
w_day[3] = "水曜日";
w_day[4] = "木曜日";
w_day[5] = "金曜日";
w_day[6] = "土曜日";

$(function () {
    $("#loginScreen").css("opacity","0");
    $("#loadScreen").css("opacity","0");
    time()
	for (i in lightdm.users)
	{
		user = lightdm.users[i];
		// var imageSrc = user.image.length > 0 ? user.image : 'img/default.png';
		// var li = '<li id="' + user.name + '">' +
		// 	'<a href="#' + user.name + '" onclick="login(\'' + user.name + '\')">' +
		// 	'<span>' + user.display_name + '</span>' + 
		// 	'<img src="' + imageSrc + '" alt="' + user.display_name + '" > ' +
		// 	'</a>' +
        // 	'</li>';
        var dom = $("#id").html()+'<option value="'+user.name+'" onclick="login(\'' + user.name + '\')">'+user.display_name +'</option>';
        $("#id").html(dom);
	}

    setInterval(function () {
        time()
    },1000)
    $("body").on("click",function(){
        if($("#submit").is(':focus')){
            $("#password").blur();
            $("#time").css("opacity","0");
            $("#catchCopy").css("opacity","0");
            $("#loginScreen").css("opacity","0");
            $("#loadScreen").css("opacity","1");
            $("#message").text(msg[1])
            submitPassword();
        }
        else if($("#loginScreen").css('opacity')=="0"){
            $("#password").focus();
            $("#password").select();
            $("body").addClass("blur");
            $("#time").css("opacity","0");
            $("#catchCopy").css("opacity","0");
            $("#loadScreen").css("opacity","0");
            $("#loginScreen").css("opacity","1");
            $("#message").text(msg[0])
            relogin()

        }
    });

	$(document).keypress(function(e) {
        
		if (e.which == 13) {
            relogin()
            if($("#loginScreen").css('opacity')=="1"){
                $("#password").blur();
                $("#time").css("opacity","0");
                $("#catchCopy").css("opacity","0");
                $("#loginScreen").css("opacity","0");
                $("#loadScreen").css("opacity","1");
                $("#message").text(msg[1])
                submitPassword();
            }else{
                $("#password").focus();
                $("#password").select();
                $("body").addClass("blur");
                $("#time").css("opacity","0");
                $("#catchCopy").css("opacity","0");
                $("#loadScreen").css("opacity","0");
                $("#loginScreen").css("opacity","1");
                $("#message").text(msg[0])
            }
        }
        
    });
    
	$(document).keyup(function(e) {
        if (e.keyCode == 27) { // 'Escape' char
            if ($("#loadScreen").css('opacity')=="1") {
                $("#password").focus();
                $("#password").select();
                $("body").addClass("blur");
                $("#time").css("opacity","0");
                $("#catchCopy").css("opacity","0");
                $("#loadScreen").css("opacity","0");
                $("#loginScreen").css("opacity","1");
                $("#message").text(msg[0])
            }else{
                $("#password").blur();
                $("body").removeClass("blur");
                $("#time").css("opacity","1");
                $("#catchCopy").css("opacity","1");
                $("#loginScreen").css("opacity","0");
                $("#loadScreen").css("opacity","0");
                $("#message").text(msg[2])
            }
            relogin()
		}
	});
	
});
function set2(num) {
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
}
function time() {
    
    var nowTime = new Date();
    var nowHour = set2(nowTime.getHours());
    var nowMin  = set2(nowTime.getMinutes());
    var nowSec  = set2(nowTime.getSeconds());
    var nowday = w_day[nowTime.getDay()];
    var nowYYYY = nowTime.getFullYear();
    var nowMM = nowTime.getMonth()+1;
    var nowDD = nowTime.getDate();

    $("#time").html(nowYYYY + "/" + nowMM + "/" + nowDD + " " + nowday + "<br>" + nowHour + ":" + nowMin + ":" + nowSec);
}
function relogin() {
    lightdm.cancel_authentication();
	return true;
}
function login(id){
	lightdm.start_authentication(id);
}
function submitPassword()
{

	lightdm.start_authentication($('#id').val());
    setTimeout(function () {
        lightdm.provide_secret($('#password').val())
        setTimeout(function () {
            relogin()
            $("#password").focus();
            $("#password").select();
            $("body").addClass("blur");
            $("#time").css("opacity","0");
            $("#catchCopy").css("opacity","0");
            $("#loadScreen").css("opacity","0");
            $("#loginScreen").css("opacity","1");
            $("#message").text(msg[0])
        },500)
    },500);
}
function authentication_complete() {
	if (lightdm.is_authenticated) {
		lightdm.login (lightdm.authentication_user, lightdm.default_session);
	}
	else {
	}
}