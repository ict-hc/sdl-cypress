Cypress.Commands.add("makeLogin", function (username, password) {
  // Clear the local storage
  cy.clearLocalStorage();

  cy.visit("/login");
  cy.log("We are ready, let's login!");
  cy.wait(1000);

  const userInput =
    ".ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > #login-form_username";
  const passwordInput =
    ".ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > #login-form_password";

  cy.get(userInput).click();
  cy.get(userInput).type(username);

  cy.get(passwordInput).click();
  cy.get(passwordInput).type(password, { sensitive: true });

  cy.get('form[id="loginForm"]').submit();

  cy.wait(1000);

  cy.get(".loginContainer .containerCenter").find("button").eq(0).click();

  cy.url().should("not.include", "/login");
});
