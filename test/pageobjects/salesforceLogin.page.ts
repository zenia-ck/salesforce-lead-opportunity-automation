import Page from "./page";
import { TOTP } from "totp-generator";
import "dotenv/config";

class SalesforceLoginPage extends Page {
  get userName() {
    return $('[id="username"]');
  }

  get password() {
    return $('[id="password"]');
  }

  get submitButton() {
    return $('[name="Login"]');
  }

  get verifyHeader() {
    return $('[id="header"]');
  }

  get verifyOTPInput() {
    return $('[id="tc"]');
  }

  get verifyButton() {
    return $('[id="save"]');
  }

  get appLauncherButton() {
    return $(".slds-icon-waffle");
  }

  get salesforceLogo() {
    return $$("div.slds-global-header__logo");
  }

  async login({
    usernameText,
    passwordText,
  }: {
    usernameText: string;
    passwordText: string;
  }): Promise<void> {
    await this.userName.setValue(usernameText);
    await this.password.setValue(passwordText);
    await this.submitButton.click();
    await this.verifyHeader.waitForDisplayed();
    await expect(this.verifyButton).toBeDisplayed();
  }

  async generateOTP(): Promise<void> {
    const { otp } = await TOTP.generate(process.env.MFA_SECRET_KEY!);
    await this.verifyOTPInput.setValue(otp);
    await this.verifyButton.click();
    await browser.pause(5000);
    await this.appLauncherButton.waitForDisplayed({ timeout: 30000 });
    await expect(this.appLauncherButton).toBeDisplayed();
    await this.salesforceLogo[0].waitForDisplayed();
    await expect(this.salesforceLogo[0]).toBeDisplayed();
    await this.salesforceLogo[0].waitForDisplayed();
    await expect(this.salesforceLogo[0]).toBeDisplayed();
  }

  open() {
    return super.open("https://login.salesforce.com");
  }
}

export default new SalesforceLoginPage();
