import { Component } from '@Core/component';
import { screen, fireEvent, waitFor } from '@testing-library/react';

export class AddCartItemForm extends Component {
    protected selectors = {
        nameInput: './/input[@data-testid="input-name"]',
        priceInput: './/input[@data-testid="input-class"]',
        quantityInput: './/input[@data-testid="input-quantity"]',
        createButton: './/button[text()="Create"]',
    };

    public async fillForm(name: string, price: number, quantity: number): Promise<void> {
        const nameInput = screen.getByTestId(this.selectors.nameInput);
        const priceInput = screen.getByTestId(this.selectors.priceInput);
        const quantityInput = screen.getByTestId(this.selectors.quantityInput);

        await waitFor(() => {
            fireEvent.change(nameInput, { target: { value: name } });
            fireEvent.change(priceInput, { target: { value: price.toString() } });
            fireEvent.change(quantityInput, { target: { value: quantity.toString() } });
        });
    }

    public async clickCreateButton(): Promise<void> {
        const createButton = screen.getByText('Create');
        await waitFor(() => fireEvent.click(createButton));
    }
}