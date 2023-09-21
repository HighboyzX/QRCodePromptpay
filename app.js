$(document).ready(function(){
    initiallize();
});
function initiallize(){
    initialEvent();
}
function initialEvent(){
    $( "#btnGenerate" ).on( "click", function(){
        validation();
    });
    $( "#btnClear" ).on( "click", function(){
        clearData();
    });
}
function validation(){
    const promptpayVal = $('#promptpay').val();
    const amountVal = parseFloat($("#amount").val());

    if(!promptpayVal && !amountVal){
        alert('กรุณากรอกหมายเลขพร้อมเพย์ และจำนวนเงิน!!');
    } else if(!promptpayVal){
        alert('กรุณากรอกหมายเลขพร้อมเพย์!!');
    } else if(!amountVal){
        alert('กรุณากรอกจำนวนเงิน!!');
    } else {
        generateQRCode();
    }
}
function clearData(){
    $('#promptpay').val('');
    $("#amount").val('');
    $("#imageQRCode").attr('src', 'https://www.thai-frozen.or.th/Content/Images/empty-img.png');
    $('#promptpayText').text('');
    $('#amountText').text('');
}
function generateQRCode(){
    const promptpayVal = $('#promptpay').val();
    const amountVal = parseFloat($("#amount").val());
    $.ajax({
        method: 'post',
        url: 'https://victorious-puce-gloves.cyclic.cloud/generateQR',
        data: {
            promptpay: promptpayVal,
            amount: amountVal
        }, success: function(res) {
            $("#imageQRCode").attr('src', res.resResult);
            $('#promptpayText').text(promptpayVal);
            $('#amountText').text(amountVal);
        }, error: function(err) {
            console.log('[err]: ',err)
        }
    });
}