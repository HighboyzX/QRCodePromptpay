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
    $('.divEl').remove();
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

            const divElPromtpay = $('<div></div>').addClass('divEl');
            const divElAmount = $('<div></div>').addClass('divEl');
            const labelPromtpay = $('<label></label>').text('บัญชีพร้อมเพย์ : ');
            const labelAmount = $('<label></label>').text('จำนวนเงิน : ');
            const spanBaht = $('<span></span>').text(' บาท');
            const spanPromtpay = $('<span></span>').text(promptpayVal).css('color','blue');
            const spanAmount = $('<span></span>').text(amountVal).css('color','blue');
            labelPromtpay.append(spanPromtpay);
            labelAmount.append(spanAmount);
            labelAmount.append(spanBaht);
            divElPromtpay.append(labelPromtpay);
            divElAmount.append(labelAmount);

            const textGroup = $('#text-group');
            textGroup.append(divElPromtpay);
            textGroup.append(divElAmount);

        }, error: function(err) {
            console.log('[err]: ',err)
        }
    });
}