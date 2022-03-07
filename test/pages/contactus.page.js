

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactUsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return  $('[name="name"]')
    }
    get inputEmail() {
        return  $('[name="email"]')
    }

    get inputSubject() {
        return  $('[name="subject"]')
    }
    get inputFileUpload() {
        return  $('[name="upload_file"]')
    }


    get inputMessage() {
        return $('#message');
    }

    get btnSubmit() {
        return $('input[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and pass
     * word
     */
    async contactUs (username,email,subject,message) {
        await this.inputUsername.setValue(username);
        await this.inputEmail.setValue(email);
        await this.inputSubject.setValue(subject);
        await this.inputMessage.setValue(message);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('contact_us');
    }
}

module.exports = new ContactUsPage();
