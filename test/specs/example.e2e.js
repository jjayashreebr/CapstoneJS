const ContactUsPage = require("../pages/contactus.page");
const SuccessPage = require("../pages/success.page");
const fs=require('fs')
let credentials = JSON.parse(fs.readFileSync('test/testData/TestData.json'))
let invalidCredentials = JSON.parse(fs.readFileSync('test/testData/TestInValidEmailData.json'))

describe("AutomationExercise Contactus form automation", () => {
  invalidCredentials.forEach( ({username,email,subject,message})=> {
  it("verify whether contact us form with invalid email field gives proper validation message", async () => {
    await ContactUsPage.open();

    await ContactUsPage.contactUs(
      username,
      email,
      subject,
      message
    );

    var msg = await browser.execute(
      "return arguments[0].validationMessage;",
      await ContactUsPage.inputEmail
    );
    console.log("****************" + msg);
    expect(msg).toHaveText("Please include an '@' in the email address.");
  });})

  credentials.forEach( ({username,email,subject,message})=> {
  it("verify contact us form with valid entries", async () => {
    await ContactUsPage.open();

    await ContactUsPage.contactUs(
      username,
      email,
      subject,
      message
    );

    const alertText = await browser.getAlertText();

    console.log("Text is : " + alertText);
    await browser.acceptAlert();
    expect(await browser).toHaveTitleContaining("Contact");

    expect(await SuccessPage.successMsg).toHaveText(
      "Success! Your details have been submitted successfully."
    );
  })})

  it("verify contact us form with upload file entries", async () => {
    await ContactUsPage.open();

    await ContactUsPage.inputUsername.setValue("JJ");
    await ContactUsPage.inputEmail.setValue("jj@j.com");
    await ContactUsPage.inputSubject.setValue("hello");
    await ContactUsPage.inputMessage.setValue("how are you");

    const path = require("path");
    const filePath = path.join(__dirname, "/dummy.txt");
    console.log("***********" + filePath);
    const remoteFilePath = await browser.uploadFile(filePath);
    await ContactUsPage.inputFileUpload.setValue(remoteFilePath);
    //await browser.pause(10000);

    await ContactUsPage.btnSubmit.click();

    const alertText = await browser.getAlertText();

    console.log("Text is : " + alertText);
    await browser.acceptAlert();
    expect(await browser).toHaveTitleContaining("Contact");

    expect(await SuccessPage.successMsg).toHaveText(
      "Success! Your details have been submitted successfully."
    );
  });
});
