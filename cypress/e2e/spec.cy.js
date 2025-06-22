describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');
    cy.get('[data-cy=todos-list] > li')
      .dblclick();
    cy.get('[data-cy=edit-todo-input]')
      .clear()
      .type('Estudar Cypress Avançado{enter}');
    cy.get('[data-cy=todos-list] > li')
      .should('have.text', 'Estudar Cypress Avançado');
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Ler documentação{enter}');
    cy.get('[data-cy=toggle-todo-checkbox]')
      .click()
      .should('be.checked');
    cy.get('[data-cy=toggle-todo-checkbox]')
      .click()
      .should('not.be.checked');
  });

  it('Não adiciona tarefa vazia', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('{enter}');
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
});