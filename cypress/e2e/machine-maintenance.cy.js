import "./common.js";

describe("E2E Machine Maintenance", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New Machine", function () {
    cy.wait(1000);
    cy.visit("/machines/new");
    cy.url().should("include", "/machines/new");
    cy.wait(1000);

    this.code =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_code";
    this.address =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_address";
    this.machineType = "#main-form_machineType";
    this.port =
      ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-input-wrap > #main-form_port";
    this.serial =
      ".ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > #main-form_serial";
    this.pointer =
      ".ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-input-wrap > #main-form_pointer";
    this.area = "#rc_select_2";
    this.label = "#rc_select_3";
    this.labelPrinter = "#rc_select_4";

    cy.get(this.code).click().type("MACHINE_EXAMPLE_1");
    cy.get(this.address).click().type("127.0.0.1");

    cy.get(this.machineType).type("BP100");
    cy.get("[title = 'BP100']").click();

    cy.get(this.port).click().type("80");
    cy.get(this.serial).click().type("2301710EE104A");

    cy.get(this.area).click();
    cy.get("[title = 'A01 - Default Area']").click();

    cy.get(this.label).click();
    cy.get("[title = 'A01 - Default label']").click();

    cy.get(this.labelPrinter).click();
    cy.get("[title = 'A01']").click();

    cy.get(this.pointer).type("1");

    cy.get("#topbar button")
      .should("be.visible")
      .eq(1)
      .contains("Save")
      .click();
  });

  it("Make sure machine has been created", function () {
    cy.wait(1000);
    cy.get(".ant-card-head-title").contains("MACHINE_EXAMPLE_1");
  });

  it.only("Add Machine to Maintenance", function () {
    cy.visit("/machines/");
    cy.wait(1000);
    // Get the maintenance button
    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
      .parent()
      .parent()
      .find("button")
      .click();
  });

  it("Make sure machine has been added to maintenance", function () {
    cy.wait(1000);
    cy.get(".ant-card-head-title").contains("MACHINE_EXAMPLE_1");
  });
});
