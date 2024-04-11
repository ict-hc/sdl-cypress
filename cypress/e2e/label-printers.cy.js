import "./common.js";

describe("E2E Label Printers", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New label printer", function () {
    cy.wait(500);
    cy.visit("/label-printers");
    cy.url().should("include", "/label-printers");
    cy.wait(500);

    // navigate to add label page
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

    code.click().type("LABEL_PRINTER_EXAMPLE_1");
    address.click().type("127.0.0.1");
    port.click().type("80");

    // area selection
    // cy.get("#main-form_area").click();
    // cy.get("[title = 'Default']").click();

    // default printer?
    // cy.get(
    //   ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-checkbox-wrapper > .ant-checkbox > #main-form_default"
    // ).click();

    // cy.get(
    //   ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-checkbox-wrapper > .ant-checkbox > #main-form_default"
    // ).check("on");

    // save
    cy.get("#topbar button")
      .eq(0)
      .contains("Save")
      .should("be.visible")
      .click();

    // assert the label was created
    cy.get('[title="LABEL_PRINTER_EXAMPLE_1"]').should("be.visible");
  });

  it("Edit label printer", function () {
    cy.wait(500);
    cy.get('[title="LABEL_PRINTER_EXAMPLE_1"]')
      .parent()
      .find("button")
      .eq(0)
      .contains("Edit")
      .as("editButton");

    cy.get("@editButton").click();

    const code = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code"
    );

    code.clear().type("LABEL_PRINTER_EXAMPLE_2");

    cy.get("#topbar button")
      .eq(0)
      .should("be.visible")
      .contains("Update")
      .click();

    cy.visit("/label-printers");
    cy.get('[title="LABEL_PRINTER_EXAMPLE_2"]').should("be.visible");
  });

  it("Delete label printer", function () {
    cy.wait(500);
    cy.get('[title="LABEL_PRINTER_EXAMPLE_2"]')
      .parent()
      .find("button")
      .eq(1)
      .contains("Delete")
      .as("deleteButton");

    cy.get("@deleteButton").click();

    cy.get(".ant-popconfirm-buttons > .ant-btn-primary > span").click();
    cy.get('[title="LABEL_PRINTER_EXAMPLE_2"]').should("not.exist");
  });
});
