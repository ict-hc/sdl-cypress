import "./common.js";

describe("E2E Printers", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New printer", function () {
    cy.wait(500);
    cy.visit("/printers");
    cy.url().should("include", "/printers");
    cy.wait(500);

    // navigate to add printer page
    cy.get(".flex-none > .ant-btn").click();

    const code = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code"
    );

    const address = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_address"
    );

    const port = cy.get(
      ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-input-wrap > #main-form_port"
    );

    const active = cy.get(
      ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-checkbox-wrapper > .ant-checkbox > #main-form_default"
    );

    code.click().type("PRINTER_EXAMPLE_1");
    address.click().type("127.0.0.1");
    port.click().type("80");

    // save
    cy.get("#topbar button").should("be.visible").click();

    // assert the printer was created
    cy.get('[title="PRINTER_EXAMPLE_1"]').should("be.visible");
  });

  it("Edit printer", function () {
    cy.get('[title="PRINTER_EXAMPLE_1"]')
      .parent()
      .find("button")
      .eq(0)
      .contains("Edit")
      .as("editButton");

    cy.get("@editButton").click();

    const code = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code"
    );

    code.clear().type("PRINTER_EXAMPLE_2");

    cy.get("#topbar button").should("be.visible").click();
    cy.visit("/printers");
    cy.get('[title="PRINTER_EXAMPLE_2"]').should("be.visible");
  });

  it("Delete printer", function () {
    cy.get('[title="PRINTER_EXAMPLE_2"]')
      .parent()
      .find("button")
      .eq(1)
      .contains("Delete")
      .as("deleteButton");

    cy.get("@deleteButton").click();

    cy.get(".ant-popconfirm-buttons > .ant-btn-primary > span").click();
    cy.get('[title="PRINTER_EXAMPLE_2"]').should("not.exist");
  });
});
