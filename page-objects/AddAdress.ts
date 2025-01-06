import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class AddAdress extends AbstractPage {
    readonly addAdressLink: Locator
    readonly alias: Locator
    readonly company: Locator
    readonly address: Locator
    readonly addressComplement: Locator
    readonly city: Locator
    readonly state: Locator
    readonly zip: Locator
    readonly country: Locator
    readonly phone: Locator
    readonly dataPrivacyCheckbox: Locator;
    readonly newsletterCheckbox: Locator;
    readonly termsAdnConditionsCheckbox: Locator;
    readonly recieveOffersCheckbox: Locator;
    readonly selectMRCheckbox: Locator;
    readonly selectMRSCheckbox: Locator;

    readonly saveButton: Locator;
    readonly succeseMes: Locator
    readonly errorMes: Locator


    constructor(page: Page) {
        super(page)
        this.addAdressLink = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Add first address' })
        this.alias = page.frameLocator('iframe[name="framelive"]').getByLabel('Alias')
        this.company = page.frameLocator('iframe[name="framelive"]').getByLabel('Company')
        this.address = page.frameLocator('iframe[name="framelive"]').getByLabel('Address', { exact: true })
        this.addressComplement = page.frameLocator('iframe[name="framelive"]').getByLabel('Address Complement')
        this.city = page.frameLocator('iframe[name="framelive"]').getByLabel('City')
        this.state = page.frameLocator('iframe[name="framelive"]').getByLabel('State')
        this.zip = page.frameLocator('iframe[name="framelive"]').getByLabel('Zip/Postal Code')
        this.country = page.frameLocator('iframe[name="framelive"]').getByLabel('Country')
        this.phone = page.frameLocator('iframe[name="framelive"]').getByLabel('Phone')
        this.dataPrivacyCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel('\n              Customer data privacyThe personal data you provide is used to an');
        this.newsletterCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel('\n              Sign up for our newsletterYou may unsubscribe at any moment. For');
        

        this.saveButton=page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: 'Save' })
        this.succeseMes = page.frameLocator('iframe[name="framelive"]').getByRole('alert')
        this.errorMes=page.locator('iframe[name="framelive"]').contentFrame().getByText('Invalid postcode - should')
    }

    async addAddress(alias: string, company: string, address: string, addressComplement: string, city: string, zip: string, phone: string, option1: string) {
        await this.addAdressLink.click();
        await this.alias.waitFor({ state: 'visible' }); 
        await this.alias.type(alias)
        await this.company.type(company);
        await this.address.type(address)
        await this.addressComplement.type(addressComplement)
        await this.city.type(city)
        await this.zip.type(zip)
        await this.phone.type(phone)
        await this.state.click()
        await this.select(option1)
        await this.saveButton.click()
 
    }


    async assertSuccessMessage() {
        await expect(this.succeseMes).toBeVisible()
    }

    /*// Assertion method for email already registered error
    async assertAlreadyExistsMessage() {
        await expect(this.alreadyExistsMessage).toContainText('The email is already used,')
    }

    // Assertion method for required fields missing error
    async assertinvalidFormat() {
        await expect(this.invalidFormat).toContainText('Invalid format.')
    }*/

    public async select(option: string) {
        const element = this.page.frameLocator('iframe[name="framelive"]')
        .locator('#field-id_state');
        await element.selectOption({ label: option });
    }
}
