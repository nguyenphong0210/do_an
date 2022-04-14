function gettime() {
	setInterval(function () {
		d = new Date();
		n = d.toLocaleString();
		document.getElementById("time").innerHTML = n;
		thoigian = n;
	}, 1000);
}
function load() {
	gettime();
	report_display();
}
// Hàm chức năng chuyển trang
function fn_ScreenChange(scr_1, scr_2)
{
    document.getElementById(scr_1).style.visibility = "visible"; // Hiên thị trang được chọn
    document.getElementById(scr_2).style.visibility = "hidden"; // Ẩn trang 1
}
// Hàm chức năng nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2)
{
document.getElementById(button1).style.zIndex='1'; // Hiển nút 1
document.getElementById(button2).style.zIndex='0'; // Ẩn nút 2
}
// Tag Edit
var tag_Edit_Enable = false;
// Hàm báo đang sửa dữ liệu
function fn_Edditing(){
fn_DataEdit("btt_Save", "btt_Edit")
tag_Edit_Enable = true;
document.getElementById("tbx_setpoint").disabled = false;
}
function fn_Start(){
    var tag_start_data = 1;
    setTag('start',tag_start_data);
    delayInMilliseconds = 800;
    var tag_start_data = 0;
    setTag('start',tag_start_data);
    document.getElementById("tbx_start").disabled = true;
    alert('He thong da bat!!');
}
function fn_Stop(){
    var tag_stop_data = 1;
    setTag('stop',tag_stop_data);
    delayInMilliseconds = 800;
    var tag_stop_data = 0;
    setTag('stop',tag_stop_data);
    document.getElementById("tbx_stop").disabled = true;
    alert('He thong da tat!');
}
// Hàm báo đã sửa dữ liệu
function fn_Saving(){
    fn_DataEdit("btt_Edit", "btt_Save")
    tag_Edit_Enable = false;
    // Set giá trị tag
    var tag_setpoint_data = document.getElementById("tbx_setpoint").value;
    setTag('setpoint',tag_setpoint_data);
    document.getElementById("tbx_setpoint").disabled = true;
    alert('Dữ liệu đã được lưu!');
    }
    
// Hàm chức năng ghi giá trị tag
function setTag(tag,val) {
    var tag_Link = '"Web_Comm".' + tag;
    var url = "IO.html";
    sdata = tag_Link + '=' + val;
    $.post(url, sdata, function (result2) { });
    }
// Hàm chức năng đọc giá trị tag
function IOField(ObjectID, tag) {
    url = "IO.html";
    $.getJSON(url, function (result) {
    document.getElementById(ObjectID).value = result[tag];
    });
    }
// HIỂN THỊ DỮ LIỆU LÊN IO FIELD
setInterval(function () {
    if(tag_Edit_Enable == false){
    // IO Field - Màn hình chính (Actual value)
    IOField("tbx_analog_in", "analog_in");
    IOField("tbx_nhiet_do", "nhiet_do");
    IOField("tbx_setpoint", "setpoint");
    IOField("tbx_start_system", "start_system");
    }
    // Hien thi symbol
    fn_SymbolStatus('Pump_1', 'Pump1', 'start_system')
}, 1000);
    
function fn_SymbolStatus(ObjectID, SymName, Tag)
{
    var imglink_0 = "images/Symbol/" + SymName + "_0.png";
    var imglink_1 = "images/Symbol/" + SymName + "_1.png";
    url = "IO.html";
    $.getJSON(url, function (result) {
        if (result[Tag] == 0)
        {
            document.getElementById(ObjectID).src = imglink_0;
        }
        else if (result[Tag] == 1)
        {
            document.getElementById(ObjectID).src = imglink_1;
        }
        });
}
