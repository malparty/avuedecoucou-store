describe('Order many photos', () => {
  it('Displays the order recaps', () => {
    cy.visit('/');

    // Photo links selector
    cy.get('[data-testid=photo-grid]').get('[data-testid=photo-link]').as('links');

    // Select the first photo
    cy.get('@links').first().click();

    // Add to cart
    cy.contains('Ajouter au panier').click();

    // Checkout now
    cy.contains('Placer la commande maintenant').click();
    cy.url().should('include', '/cart');

    cy.get('[data-testid=checkout-form').first().within(() => {
      cy.contains('Utiliser la même adresse').click();

      // Trigger required fields errors
      cy.contains('Placer la commande').click();

      // Required field errors
      cy.get('label[for=firstName]').contains('champ obligatoire');
      cy.get('label[for=lastName]').contains('champ obligatoire');
      cy.get('label[for=email]').contains('champ obligatoire');
      cy.get('label[for=phone]').contains('champ obligatoire');

      cy.get('label[for=shippingAddress]').contains('champ obligatoire');
      cy.get('label[for=shippingCity]').contains('champ obligatoire');
      cy.get('label[for=shippingPostalCode]').contains('champ obligatoire');

      cy.get('label[for=invoiceAddress]').contains('champ obligatoire');
      cy.get('label[for=invoiceCity]').contains('champ obligatoire');
      cy.get('label[for=invoicePostalCode]').contains('champ obligatoire');

      // Fill fields
      cy.get('input[name=firstName]').type('Dora');
      cy.get('input[name=lastName]').type('Mountis');
      cy.get('input[name=email]').type('dora@mountis.com');
      cy.get('input[name=phone]').type('0123456789');

      cy.get('input[name=shippingAddress]').type('42 avenue street');
      cy.get('input[name=shippingCity]').type('Simcity');
      cy.get('input[name=shippingPostalCode]').type('01234');

      cy.get('input[name=invoiceAddress]').type('99 wall street');
      cy.get('input[name=invoiceCity]').type('New York');
      cy.get('input[name=invoicePostalCode]').type('01234');

      // Send

      // Assert the order recaps
    });
  });
});