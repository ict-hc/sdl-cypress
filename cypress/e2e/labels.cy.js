import "./common.js";

describe("E2E Labels", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New label", function () {
    cy.wait(500);
    cy.visit("/labels");
    cy.url().should("include", "/labels");
    cy.wait(500);

    // navigate to add label page
    cy.get(".flex-none > .ant-btn").click();

    const code = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code"
    );

    const description = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_description"
    );

    const label = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_label"
    );

    code.click().type("LABEL_EXAMPLE_1");
    description.click().type("LABEL_EXAMPLE_1");
    label.click().type(`^XA
      ^FX Refer to: https://labelary.com/viewer.html
      ^CF0,60
      ^FO60,50^FDSteelco S.p.A. ^FS
      ^CF0,30
      ^XZ`);

    // save
    cy.get("#topbar button")
      .should("be.visible")
      .eq(1)
      .contains("Save")
      .click();

    // assert the label was created
    cy.get('[title="LABEL_EXAMPLE_1"]').should("be.visible");
  });

  it("Edit label", function () {
    cy.get('[title="LABEL_EXAMPLE_1"]')
      .parent()
      .find("button")
      .eq(0)
      .contains("Edit")
      .as("editButton");

    cy.get("@editButton").click();

    const code = cy.get(
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code"
    );

    code.clear().type("LABEL_EXAMPLE_2");

    cy.get("#topbar button")
      .eq(1)
      .contains("Save")
      .should("be.visible")
      .click();

    cy.visit("/labels");
    cy.get('[title="LABEL_EXAMPLE_2"]').should("be.visible");
  });

  it("Delete label", function () {
    cy.get('[title="LABEL_EXAMPLE_2"]')
      .parent()
      .find("button")
      .eq(1)
      .contains("Delete")
      .as("deleteButton");

    cy.get("@deleteButton").click();

    cy.get(".ant-popconfirm-buttons > .ant-btn-primary > span").click();
    cy.get('[title="LABEL_EXAMPLE_2"]').should("not.exist");
  });
});
