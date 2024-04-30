describe('Order many photos', () => {
  it('Displays the order recaps', () => {
    cy.visit('/');

    // Photo links selector
    cy.get('[data-testid=photo-grid]').get('[data-testid=photo-link]').as('links');

    // Select the first photo
    cy.get('@links').first().click();
    cy.url().should('include', '/photo/aube_automne_sur_la_route_des_vins');
    cy.contains('Aube d\'automne sur la Route des Vins');
    cy.contains('140EUR');

    // Change format
    cy.contains('90x60mm').click();
    cy.contains('190EUR');

    // Change support
    cy.contains('Acrylique').click();
    cy.contains('290EUR');

    // Add to cart
    cy.contains('Ajouter au panier').click();
    cy.contains('Bravo, votre photo est dans le panier!');

    // Continue shopping
    cy.contains('Continuer les achats').click();

    // Select the last photo
    cy.get('@links').last().click();
    cy.url().should('include', '/photo/levant_bernoises');

    // Add to cart
    cy.contains('Ajouter au panier').click();

    // Continue shopping
    cy.contains('Continuer les achats').click();

    // Select the previous photo
    cy.contains('PRECEDENTE').click();
    cy.url().should('include', '/photo/pleine_lune_hiver_hohneck');

    // Change the size
    cy.contains('105x70mm').click();
    cy.contains('270EUR');

    // Change the support
    cy.contains('Dibond').click();
    cy.contains('300EUR');

    // Add to cart
    cy.contains('Ajouter au panier').click();

    // Checkout now
    cy.contains('Placer la commande maintenant').click();
    cy.url().should('include', '/cart');

    // Recaps of the current cart:
    cy.contains('3 photos dans le panier');
    cy.contains('730EUR');

    // Add 2 more of the first photo
    cy.get('[data-testid=cart-item__increment]').first().click();
    cy.contains('1020EUR');
    cy.get('[data-testid=cart-item__increment]').first().click();
    cy.contains('1310EUR');

    // Remove the last photo
    cy.contains('Pleine lune d\'hiver au Hohneck');
    cy.get('[data-testid=cart-item__decrement]').last().click();
    cy.contains('Pleine lune d\'hiver au Hohneck').should('not.exist');
  });
});