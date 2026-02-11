import Page from "./page";
import "dotenv/config";
import { faker } from "@faker-js/faker";

class SalesforceLeadCreationPage extends Page {
  leadDetails = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number({ style: "international" }),
    companyName: faker.lorem.words(2),
    email: faker.internet.email().toLowerCase(),
  };

  get appLauncherButton() {
    return $(".slds-icon-waffle");
  }

  get appSearchInput() {
    return $('[placeholder="Search apps and items..."]');
  }

  get userNavigationMenu() {
    return $('[title="Show Navigation Menu"]');
  }

  get leadMenu() {
    return $('[data-itemid="Lead"]');
  }

  get leadMenuButton() {
    return $(".selectedListItem");
  }

  get leadHeader() {
    return $('h1[class="slds-var-p-right_x-small"]');
  }

  get newLeadButton() {
    return $('[title="New"][role="button"]');
  }

  get expandSidebar() {
    return $(
      '[class="slds-button slds-button_icon split-toggle slds-split-view__toggle-button slds-is-closed slds-button_icon-xx-small slds-button_icon-border"]',
    );
  }

  get salutaionInput() {
    return $('[name="salutation"]');
  }

  get selectSalutation() {
    return $('[data-value="Ms."]');
  }

  get firstNameInput() {
    return $('[name="firstName"]');
  }

  get lastNameInput() {
    return $('[name="lastName"]');
  }

  get phoneInput() {
    return $('[name="Phone"]');
  }

  get companyInput() {
    return $('[name="Company"]');
  }

  get emailInput() {
    return $('[name="Email"]');
  }

  get leadSourceInput() {
    return $('button[aria-label="Lead Source"]');
  }

  get leadSourceValue() {
    return $('[data-value="Web"]');
  }

  get leadStatus() {
    return $('[data-value="Open - Not Contacted"] > span');
  }

  get saveButton() {
    return $('[name="SaveEdit"]');
  }

  get refreshButton() {
    return $('[data-key="refresh"]');
  }

  get firstLeadInTable() {
    return $('div[role="GridCell"] a[tabindex="0"]');
  }

  get detailsTab() {
    return $('//a[text()="Details"]');
  }

  get leadName() {
    return $('lightning-formatted-name[slot="outputField"]');
  }

  get leadPhone() {
    return $(
      'records-output-phone[data-output-element-id="output-field"] > lightning-formatted-phone > [href^="tel:"]',
    );
  }

  get leadCompanySourceStatus() {
    return $$(
      'lightning-formatted-text[data-output-element-id="output-field"][slot="outputField"]',
    );
  }

  get leadEmail() {
    return $$('[href^="mailto:"]');
  }

  get markAsComplete() {
    return $(
      '[class="slds-button slds-button_brand slds-path__mark-complete stepAction current uiButton"]',
    );
  }

  get accountName() {
    return $(
      '[class="createPanelExpanded"] [class="uiInput uiInputText uiInput--default uiInput--input"] > input[type="text"][class=" input"]',
    );
  }

  get contactAndOpportunityName() {
    return $$(
      '[class="createPanelCollapsed"] > [class="slds-button slds-button_neutral slds-button_stretch transparentButton"]',
    );
  }

  get convertedStatus() {
    return $('[id^="combobox-button-"] > span[part="input-button-value"]');
  }

  get convertButton() {
    return $(
      '[class="targetingSpan slds-var-m-left_x-small runtime_sales_leadConvertModalFooter"] > [type="button"][class="slds-button slds-button_brand"]',
    );
  }

  async switchToSalesConsoleOrg(): Promise<void> {
    await browser.pause(3500);
    console.log("app launcher clicked");
    await this.appLauncherButton.click();
    console.log("sales console searched");
    await this.appSearchInput.setValue("Sales Console");
    console.log("Press enter");
    await browser.keys("Enter");
    await browser.pause(5000);
  }

  async leadCreation(): Promise<void> {
    console.log("User navigation menu clicked");
    await this.userNavigationMenu.click();
    console.log("Lead menu clicked");
    await this.leadMenu.click();
    console.log("Lead menu button clicked");
    await this.leadMenuButton.click();
    console.log("Waiting for the lead header to be displayed");
    await this.leadHeader.waitForDisplayed();
    console.log("Checking the lead header is displayed");
    await expect(this.leadHeader).toBeDisplayed();
    console.log("New lead button clicked");
    await this.newLeadButton.click();
    console.log("Expanding the sidebar if it's not already expanded");
    await this.expandSidebar.waitForDisplayed({ timeout: 10000 });
    const isExpanded = await this.expandSidebar.getAttribute("aria-expanded");
    if (isExpanded === "false") {
      await this.expandSidebar.click();
    }
    console.log("Selecting salutation");
    await this.salutaionInput.click();
    console.log("Salutation selected");
    await this.selectSalutation.click();
    console.log("Entering first name");
    await this.firstNameInput.setValue(this.leadDetails.firstName);
    console.log("Entering last name");
    await this.lastNameInput.setValue(this.leadDetails.lastName);
    console.log("Entering phone number");
    await this.phoneInput.setValue(this.leadDetails.phone);
    console.log("Entering company name");
    await this.companyInput.setValue(this.leadDetails.companyName);
    console.log("Entering email");
    await this.emailInput.setValue(this.leadDetails.email);
    console.log("Scrolling lead source into view");
    await this.leadSourceInput.scrollIntoView();
    console.log("Clicking lead source");
    await this.leadSourceInput.click();
    console.log("Clicking lead source value");
    await this.leadSourceValue.click();
    console.log("Scrolling lead status into view");
    await this.leadStatus.scrollIntoView();
    console.log("Checking lead status");
    await expect(this.leadStatus).toHaveText("Open - Not Contacted");
    console.log("Saving the lead");
    await this.saveButton.click();
  }
  async validateLeadDetails(): Promise<void> {
    console.log("Waiting for the page to load");
    await browser.pause(3500);
    console.log("Refreshing");
    await this.refreshButton.click();
    console.log("Waiting for first lead");
    await this.firstLeadInTable.waitForDisplayed();
    console.log("Click first lead");
    await this.firstLeadInTable.click();
    console.log("reloading the page");
    await browser.refresh();
    console.log("Wait for the page to open");
    await browser.pause(4000);
    console.log("waiting for the lead to open");
    await this.detailsTab.waitForDisplayed({ timeout: 20000 });
    await browser.pause(4000);
    console.log("Click details tab");
    await this.detailsTab.click();
    console.log("waiting for the details to load");
    await this.leadName.waitForDisplayed({ timeout: 10000 });
    console.log("Checking name");
    console.log(
      `Ms. ${this.leadDetails.firstName} ${this.leadDetails.lastName}`,
      await this.leadName.getText(),
    );
    await expect(this.leadName).toHaveText(
      `Ms. ${this.leadDetails.firstName} ${this.leadDetails.lastName}`,
    );
    console.log("Checking phone");
    await expect(this.leadPhone).toHaveText(this.leadDetails.phone);
    console.log("Checking company");
    await expect(this.leadCompanySourceStatus[0]).toHaveText(
      this.leadDetails.companyName,
    );
    console.log("Checking source");
    await expect(this.leadCompanySourceStatus[2]).toHaveText("Web");

    console.log("Checking status");
    await expect(this.leadCompanySourceStatus[4]).toHaveText(
      "Open - Not Contacted",
    );
    console.log("Checking email");
    expect((await this.leadEmail[1].getText()).toLowerCase()).toEqual(
      this.leadDetails.email,
    );
    console.log("Checking email 2");
    expect((await this.leadEmail[1].getText()).toLowerCase()).toEqual(
      this.leadDetails.email,
    );
  }

  async convertToOpportunity(): Promise<void> {
    console.log("Waiting for the element to be clickable");
    await this.markAsComplete.waitForClickable({ timeout: 20000 });
    console.log("Clicking on mark as complete");
    await this.markAsComplete.execute((el) => el.click());
    console.log("Waiting for the next page to load");
    await browser.pause(4000);
    console.log("Waiting for the element to be clickable");
    await this.markAsComplete.waitForClickable({ timeout: 20000 });
    console.log("Clicking on mark as complete");
    await this.markAsComplete.execute((el) => el.click());
    console.log("Waiting for the next page to load");
    await browser.pause(4000);
    console.log("Waiting for the element to be clickable");
    await this.markAsComplete.waitForClickable({ timeout: 20000 });
    console.log("Clicking on mark as complete");
    await this.markAsComplete.execute((el) => el.click());
    console.log("Waiting for the next page to load");
    await browser.pause(4000);
    console.log("Checking the account name");
    expect(await this.accountName.getValue()).toEqual(
      this.leadDetails.companyName,
    );
    console.log("Scrolling the opportunity into view");
    await this.contactAndOpportunityName[0].scrollIntoView();
    console.log("Checking the contact name");
    expect(await this.contactAndOpportunityName[0].getText()).toContain(
      `Ms. ${this.leadDetails.firstName} ${this.leadDetails.lastName}`,
    );
    console.log("Checking the opportunity name");
    expect(this.contactAndOpportunityName[1]).toContain(
      this.leadDetails.companyName,
    );
    console.log("Checking the converted status");
    expect(await this.convertedStatus.getText()).toContain(
      "Closed - Converted",
    );
    console.log("Scrolling the convert button into view");
    await this.convertButton.scrollIntoView();
    console.log("Clicking on convert");
    await this.convertButton.click();
  }
}

export default new SalesforceLeadCreationPage();
