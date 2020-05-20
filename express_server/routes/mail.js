const nodemailer = require('nodemailer');
const router = require('express').Router();

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "songkh95@gmail.com",
      pass: "skhgood123@"
  },
  tls: {
      rejectUnauthorized: false
  }
});

router.post('/:id', function (req, res) {
  let customer_email = req.body.customer_email;
  let customer_name = req.body.customer_name;
  let customer_company = req.body.customer_company;
  let customer_local = req.body.customer_local;
  let first_results = req.body.first_results;
  
  const mailOptions = {
    from: customer_email,
    to: "songkh95@gmail.com",
    subject: `큐레이션 견적서 - 이름: ${customer_name} / `,
    text: `
    - 이름: ${customer_name}
    - 회사명: ${customer_company}
    - 지역: ${customer_local}
    - 질문지 결과: ${first_results.name}
    `
  };
  
    //전송 시작!
    smtpTransport.sendMail(mailOptions, function(error, info){
      if (error) {
          //에러
          console.log(error);
      }
      //전송 완료
      console.log("Finish sending email : " + info.response);        
      smtpTransport.close()
  })

});

module.exports = router;