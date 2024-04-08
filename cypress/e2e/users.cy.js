import "./common.js";

describe("E2E Users", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create new user", function () {
    cy.wait(500);
    cy.visit("/users/new");
    cy.url().should("include", "/users");
    cy.wait(500);

    const username =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_username";
    const password =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_password";
    const firstName =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_firstName";
    const lastName =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_lastName";
    const email =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_email";
    const phoneNumber =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #user-form_phoneNumber";

    cy.get(username).click().type("testUser");
    cy.get(password).click().type("password");
    cy.get(firstName).click().type("Test");
    cy.get(lastName).click().type("User");
    cy.get(email).click().type("hola@test.com");
    cy.get(phoneNumber).click().type("123456789");

    const userSelector =
      "div.rc-virtual-list div.ant-select-item.ant-select-item-option div.ant-select-item-option-content";
    cy.get("#add-group-to-user .ant-select-selector").click();
    cy.get(userSelector).eq(0).click();

    cy.get("#topbar button")
      .eq(0)
      .contains("Save")
      .should("be.visible")
      .click();
  });

  it("Assert that the user has been created", function () {
    cy.get('[title="hola@test.com"]').should("be.visible");
  });

  it("Add password to user", function () {
    cy.wait(500);
    cy.visit("/users/");
    cy.get('[title="hola@test.com"]')
      .parent()
      .find(".row-buttons > .ant-btn")
      .click();

    cy.get("#topbar button").eq(0).click();

    cy.get("#password-form_password").click().type("password");

    cy.get(
      ".ant-modal-content .ant-modal-footer > .ant-btn-primary > span"
    ).click();

    cy.get("#topbar button")
      .eq(1)
      .contains("Save")
      .should("be.visible")
      .click();
  });

  it("Delete the user", function () {
    cy.wait(500);
    cy.visit("/users/");

    cy.get('[title="hola@test.com"]')
      .parent()
      .find(".row-buttons > .ant-btn")
      .click();

    cy.get("#topbar .anticon-caret-right").click();

    cy.get("#topbar button").eq(2).click();

    cy.get(
      ".ant-modal-content .ant-modal-footer > .ant-btn-primary > span"
    ).click();
  });
});
