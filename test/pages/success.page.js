

const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SuccessPage extends Page {
    /**
     * define selectors using getter methods
     */
    get successMsg() {
        return $("div.status.alert.alert-success").getText();
    }


}

module.exports = new SuccessPage();
