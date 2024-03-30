describe('Order many photos', () => {
  it('Displays the order recaps', () => {
    cy.visit('/');

    // Photo links selector
    cy.get('[data-testid=photo-grid]').get('[data-testid=photo-link]').as('links');

    // Select the first photo
    cy.get('@links').first().click();
    cy.url().should('include', '/photo/aube_automne_sur_la_route_des_vins');
    cy.contains('Aube d\'automne sur la Route des Vins');


    // Change support

    // Change size

    // Add to cart

    // Continue shopping

    // Select the last photo

    // Add to cart

    // Continue shopping

    // Select the previous photo

    // Change the size

    // Change the support

    // Add to cart

    // Checkout now

    // Add 2 more of the first photo

    // Remove the last photo

    // Fill the form

    // Send

    // Assert the order recaps
  });
});