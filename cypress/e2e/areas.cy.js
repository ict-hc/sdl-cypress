import "./common.js";

describe("E2E Areas", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New area", function () {
    cy.wait(500);
    cy.visit("/areas/add");
    cy.url().should("include", "/areas");
    cy.wait(500);

    this.code = "#main-form_code";
    this.description = "#main-form_description";
    this.label = "#rc_select_1";
    this.labelPrinter = "#rc_select_2";

    cy.get(this.code).click().type("AREA_EXAMPLE_1");
    cy.get(this.description).click().type("AREA_DESCRIPTION_1");

    cy.get(this.label).click();
    cy.get("[title = 'A01 - Default label']").click();

    cy.get(this.labelPrinter).click();
    cy.get("[title = 'A01']").click();

    // @todo: fix errors
    cy.get("#topbar button")
      .should("be.visible")
      .eq(0)
      .contains("Save")
      .click();
  });

  it("Make sure the area has been created", function () {
    cy.visit("/areas/");
    cy.get('[title="AREA_EXAMPLE_1"]').should("exist");
  });
});
