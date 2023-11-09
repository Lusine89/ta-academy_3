import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v2/id/get';

describe('UHC-1-int', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(async () => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
        await cartPage.fulfill(); 
    });

    afterAll(() => {
        cartPage.destroy();
    });

    test('Add New Cart Item and Verify Total Price', async () => {
        const cartListBefore = await cartPage.getCartList();
        const cartItemsBefore = await cartListBefore.getCartItems();

        const modalAddItem = await cartPage.OpenModalAddItem();
        expect(modalAddItem.isModalDisplayed()).toBeTruthy();

        const addCartItemForm = modalAddItem.getAddCartItemForm();
        await addCartItemForm.fillForm('My first item', 25, 2);

        const cartListAfter = await cartPage.getCartList();
        const cartItemsAfter = await cartListAfter.getCartItems();
        const lastItem = cartItemsAfter[cartItemsAfter.length - 1];

       
        const totalPriceAfterAdding = await lastItem.getPriceForAll();

        
        expect(totalPriceAfterAdding).toBe(25 * 2); 
       
        expect(cartItemsAfter.length).toBe(cartItemsBefore.length + 1);
    });

    test('Delete Last Added Item', async () => {
        const cartListBefore = await cartPage.getCartList();
        const cartItemsBefore = await cartListBefore.getCartItems();

      
        const lastItem = cartItemsBefore[cartItemsBefore.length - 1];
        await lastItem.delete();

        const cartListAfter = await cartPage.getCartList();
        const cartItemsAfter = await cartListAfter.getCartItems();

       
        expect(cartItemsAfter.length).toBe(cartItemsBefore.length - 1);
    });
});

