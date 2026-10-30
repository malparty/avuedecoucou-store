describe('Order many photos', () => {
  it('Displays the order recaps', () => {
    cy.visit('/');

    // Photo links selector
    cy.get('[data-testid=photo-grid]').get('[data-testid=photo-link]').as('links');

    // Select the first photo
    cy.get('@links').first().click();
    cy.url().should('include', '/photo/ambiance_polaire_sur_gerardmer');
    cy.contains('Ambiance polaire sur Gérardmer');
    // Default: glossy paper, 45x30cm
    cy.contains('80EUR');

    // Change format
    cy.contains('90x60cm').click();
    cy.contains('125EUR');

    // Change support
    cy.contains('Acrylique').click();
    cy.contains('320EUR');

    // Add to cart
    cy.contains('Ajouter au panier').click();
    cy.contains('Bravo, votre photo est dans le panier!');

    // Continue shopping
    cy.contains('Continuer les achats').click();

    // Select the last photo
    cy.get('@links').last().click();
    cy.url().should('include', '/photo/route_des_cretes_printemps');

    // Add to cart
    cy.contains('Ajouter au panier').click();

    // Continue shopping
    cy.contains('Continuer les achats').click();

    // Select the previous photo
    cy.contains('PRECEDENTE').click();
    cy.url().should('include', '/photo/miracle_au_christ_du_galtz');

    // Change the size
    cy.contains('105x70cm').click();
    cy.contains('135EUR');

    // Change the support
    cy.contains('Dibond').click();
    cy.contains('320EUR');

    // Add to cart
    cy.contains('Ajouter au panier').click();

    // Checkout now
    cy.contains('Placer la commande maintenant').click();
    cy.url().should('include', '/cart');

    // Recaps of the current cart:
    cy.contains('3 photos dans le panier');
    cy.contains('720EUR');

    // Add 2 more of the first photo
    cy.get('[data-testid=cart-item__increment]').first().click();
    cy.contains('1040EUR');
    cy.get('[data-testid=cart-item__increment]').first().click();
    cy.contains('1360EUR');

    // Remove the last photo
    cy.contains('Miracle au Christ du Galtz');
    cy.get('[data-testid=cart-item__decrement]').last().click();
    cy.contains('Miracle au Christ du Galtz').should('not.exist');
  });
});