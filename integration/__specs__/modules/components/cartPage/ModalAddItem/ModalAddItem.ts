
import { Component } from '@Core/component';
import { screen } from '@testing-library/react';
import { AddCartItemForm } from '@Components/cartPage/cartList/cartItem/addCartItemForm'

export class ModalAddItem extends Component {
    protected selectors = {
        modalContent: './/div[@data-testid="modal-inside"]',
        nameInput: './/input[@data-testid="input-name"]',
        priceInput: './/input[@data-testid="input-class"]',
        quantityInput: './/input[@data-testid="input-quantity"]',
        createButton: './/button[text()="Create"]',
    };

    public isModalDisplayed(): boolean {
      
        return screen.getByTestId(this.selectors.modalContent) !== null;
    }

    public getAddCartItemForm(): AddCartItemForm {
        return new AddCartItemForm(); 
    }
}
