import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'
import { AddAdress } from '../../page-objects/AddAdress'

test.describe('Address Test', () =>{
    let homePage: HomePage
    let addAddress: AddAdress
    let createAccount: CreateAccountPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            addAddress = new AddAdress(page)
            createAccount = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
            // Only create an account for tests that require it
        if (test.info().title !== 'check search fail - invalid postal/ZIP code') {
            await createAccount.createAccount('Ajla', 'Hadzovic', 'nesto@hotmail.com', 'nesto_123_nesto', '11/02/2000', true)
        }
        })
    
        test('check adding address success test', async ({page})=>{
            //await createAccount.createAccount('Ajla', 'Hadzovic', 'ajla_success@hotmail.com', 'nesto_123_nesto', '11/02/2000', true);
            await addAddress.addAddress('a', 'a', 'a', 'a', 'a', '18888', '101010', 'Colorado' )
            await addAddress.assertSuccessMessage()
        })
        
        test('check test fail - invalid postal/ZIP code', async ({ page }) => {
            // Use different account info for the second test
            await createAccount.createAccount('Test', 'User', 'test_user_1@example.com', 'nesto_123_nesto', '01/01/1990', true)
    
            // Perform search with invalid ZIP code
            await addAddress.addAddress('a', 'a', 'a', 'a', 'a', '7722aa', '101010', 'Colorado')
    
            // Check if the error message is displayed
            await expect(addAddress.errorMes).toContainText('Invalid postcode - should')
        })
    

        // test('check seach fail', async ({page})=>{
        //     await homePage.assertAdvancedSearch()
        //     await advancedSearch.Search('Hamza', 'MT44', 'bla bla bla','','20','30')
        //     await advancedSearch.assertSuccessMessage()
        // })


    })