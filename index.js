const express = require('express');
const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(3030, () => {
    console.log('server is running...')
});

app.post('/generateQR', (req, res) => {
    const amount = parseFloat(_.get(req, ["body", "amount"]));
    const promptpay = _.get(req, ["body", "promptpay"]);
    const payload = generatePayload(promptpay, { amount });
    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }
    QRCode.toDataURL(payload, option, (err, url) => {
        if(err) {
            console.log('generate fail');
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Error'+err
            });
        } else {
            return res.status(200).json({
                resCode: 200,
                resMessage: 'Success',
                resResult: url
            });
        }
    });
});

module.exports = server;
