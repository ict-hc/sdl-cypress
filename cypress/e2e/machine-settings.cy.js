import "./common.js";

describe("E2E Machine Settings", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Create New Machine", function () {
    cy.log("Machine does not exist. Creating it now...");
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

  it("Add Settings to the machine", function () {
    cy.wait(1000);

    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
      .parent()
      .parent()
      .parent()
      .find(".editBtn")
      .click();

    cy.wait(1000);

    const machineSelector =
      "div.rc-virtual-list div.ant-select-item.ant-select-item-option div.ant-select-item-option-content";

    cy.get("#selectedKey").click();
    cy.get(machineSelector).eq(0).click();
    cy.get("#selectorValue").type("user");
    cy.get("#machine-settings > .ant-card-body button").eq(0).click();
    cy.wait(500);

    cy.get("#selectedKey").click();
    cy.get(machineSelector).eq(1).click();
    cy.get("#selectorValue").type("password");
    cy.get("#machine-settings > .ant-card-body button").eq(0).click();
    cy.wait(500);

    cy.get("#selectedKey").click();
    cy.get(machineSelector).eq(2).click();
    cy.get("#selectorValue").type("oldPassword");
    cy.get("#machine-settings > .ant-card-body button").eq(0).click();
    cy.wait(500);

    cy.get("#topbar button")
      .should("be.visible")
      .eq(2)
      .contains("Save")
      .click();

    cy.wait(1000);
  });

  it("Go back and enter in the machine details again", function () {
    cy.go("back");
    cy.wait(1000);

    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
      .parent()
      .parent()
      .parent()
      .find(".editBtn")
      .click();
  });

  it("Assert that settings have been added", function () {
    cy.wait(2000);
    cy.get('[data-row-key="mipUser"] > :nth-child(2) > .ant-input').should(
      "have.value",
      "user"
    );

    cy.get('[data-row-key="mipPassword"] > :nth-child(2) > .ant-input').should(
      "have.value",
      "password"
    );

    cy.get(
      '[data-row-key="mipOldPassword"] > :nth-child(2) > .ant-input'
    ).should("have.value", "oldPassword");
  });

  it("Delete the machine", function () {
    cy.go("back");

    cy.wait(1000);
    // navigate to machines page
    cy.get(".ant-card-head-title")
      .contains("MACHINE_EXAMPLE_1")
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
    cy.get(".ant-card-head-title").should("not.contain", "MACHINE_EXAMPLE_1");
  });
});
