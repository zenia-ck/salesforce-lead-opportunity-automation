import "dotenv/config";
import SalesforceLoginPage from "../pageobjects/salesforceLogin.page";
import SalesforceLeadCreationPage from "../pageobjects/leadCreation.page";

describe("Lead Creation, conversion and validation in salesforce", () => {
  it("Login with the salesforce user ad", async () => {
    await SalesforceLoginPage.open();
    await SalesforceLoginPage.login({
      usernameText: process.env.SALESFORCE_USERNAME!,
      passwordText: process.env.SALESFORCE_PASSWORD!,
    });
    await SalesforceLoginPage.generateOTP();
  });
  it("Create a new lead with the required fields", async () => {
    await SalesforceLeadCreationPage.switchToSalesConsoleOrg();
    await SalesforceLeadCreationPage.leadCreation();
  });
  it("Validate the lead details", async () => {
    await SalesforceLeadCreationPage.validateLeadDetails();
  });
  it("Convert the lead to opportunity", async () => {
    await SalesforceLeadCreationPage.convertToOpportunity();
  });
});
