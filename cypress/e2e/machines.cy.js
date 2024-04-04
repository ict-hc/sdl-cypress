import "./common.js";

describe("E2E Machines", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New Machine", function () {
    cy.wait(500);
    cy.visit("/machines/new");
    cy.url().should("include", "/machines/new");
    cy.wait(500);

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

    cy.get(this.code).click().type("MACHINE_EXAMPLE_1");
    cy.get(this.address).click().type("127.0.0.1");
    cy.get(this.machineType).type("BP100");
    cy.get("[title = 'BP100']").click();
    cy.get(this.port).click().type("80");
    cy.get(this.serial).click().type("2301710EE104A");
    cy.get(this.pointer).click().type("1");

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

  it("Edit the machine", function () {
    cy.wait(1000);
    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
      .parent()
      .parent()
      .parent()
      .find(".editBtn")
      .click();

    cy.wait(1000);

    cy.get(this.code).clear();
    cy.get(this.code).type("MACHINE_EXAMPLE_1_CHANGED");

    cy.get(this.address).clear();
    cy.get(this.address).type("192.168.1.1");

    cy.get(this.port).clear();
    cy.get(this.port).type("8080");

    cy.get(this.serial).clear();
    cy.get(this.serial).type("SERIAL_CHANGED");

    cy.get("#topbar button")
      .should("be.visible")
      .eq(2)
      .contains("Save")
      .click();

    cy.wait(1000);
  });

  it("Make sure machine has been edited", function () {
    cy.wait(1000);
    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
      .parent()
      .parent()
      .parent()
      .find(".editBtn")
      .click();

    // Verify updated values.
    cy.get(this.code)
      .invoke("val")
      .should("equal", "MACHINE_EXAMPLE_1_CHANGED");
    cy.get(this.address).invoke("val").should("equal", "192.168.1.1");
    cy.get(this.port).invoke("val").should("equal", "8080");
    cy.get(this.serial).invoke("val").should("equal", "SERIAL_CHANGED");

    cy.go("back");
  });

  it("Delete the machine", function () {
    cy.wait(1000);
    // navigate to machines page
    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1_CHANGED")
      .parent()
      .parent()
      .parent()
      .find(".editBtn")
      .click();

    cy.get("#topbar .anticon-caret-right").click();

    cy.get(".flex > .ant-btn-dangerous").click();

    cy.get(
      ".ant-modal-content .ant-modal-footer > .ant-btn-primary > span"
    ).click();
  });

  it("Make sure machine has been deleted", function () {
    cy.wait(1000);
    cy.get(".ant-card-head-title").should(
      "not.contain",
      "MACHINE_EXAMPLE_1_CHANGED"
    );
  });
});
