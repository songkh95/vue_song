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

router.get('/mail', function (req, res) {
  let customer_email = req.query.customer_email;
  let customer_name = req.query.customer_name;
  let customer_company = req.query.customer_company;
  let customer_local = req.query.customer_local;
  let first_results = req.query.first_results;
  let customer_phone = req.query.customer_phone;
  let customer_date = req.query.customer_date;
  let customer_content = req.query.customer_content;
  let option_select = req.query.option_select;

  const mailOptions = {
    from: customer_email,
    to: "songkh95@gmail.com",
    subject: `큐레이션 견적서 - 이름: ${customer_name} / `,
    text: `
    - 이름: ${customer_name}
    - 회사명: ${customer_company}
    - 지역: ${customer_local}
    - 연락처: ${customer_phone}
    - 설치 날짜: ${customer_date}
    - 내용: ${customer_content}
    - 옵션: ${option_select}
    - 질문지 결과: ${first_results}
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