Cypress.Commands.add("makeLogin", function (username, password) {
  // Clear the local storage
  cy.clearLocalStorage();

  cy.visit("/login");

  const userInput =
    ".ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > #login-form_username";
  const passwordInput =
    ".ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > #login-form_password";
  const loginButton = "button#loginButton";

  cy.get(userInput).click();
  cy.get(userInput).type(username);

  cy.get(passwordInput).click();
  cy.get(passwordInput).type(password, { sensitive: true });

  cy.get(loginButton).should("be.visible").click();
  cy.url().should("not.include", "/login");
});
