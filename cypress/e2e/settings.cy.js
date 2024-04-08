import "./common.js";

describe("E2E Settings", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Insert General Settings", function () {
    cy.wait(500);
    cy.visit("/settings");
    cy.get(".ant-collapse-item").eq(0).click();
    const dropdownSelector =
      "div.rc-virtual-list div.ant-select-item.ant-select-item-option div.ant-select-item-option-content";

    const language = cy.get(".ant-form-item-control-input-content").eq(0);
    const autoSaveFolder = cy.get(".ant-form-item-control-input-content").eq(1);
    const secondaryAutoSaveFolder = cy
      .get(".ant-form-item-control-input-content")
      .eq(2);
    // const autoSaveTXT = cy.get(".ant-form-item-control-input-content").eq(3);
    // const autoSaveXML = cy.get(".ant-form-item-control-input-content").eq(4);
    // const autoSavePDF = cy.get(".ant-form-item-control-input-content").eq(5);
    // const autoSaveSplitDocumentsForMachineType = cy
    //   .get(".ant-form-item-control-input-content")
    //   .eq(6);
    // const fileTimestampType = cy
    //   .get(".ant-form-item-control-input-content")
    //   .eq(7);
    // const fileTimestamp = cy.get(".ant-form-item-control-input-content").eq(8);
    // const measureUnit = cy.get(".ant-form-item-control-input-content").eq(9);

    language.click();
    // Select spanish
    cy.get(dropdownSelector).eq(2).click();
    autoSaveFolder.clear().type("/tmp");
    secondaryAutoSaveFolder.clear().type("/secondary-tmp");

    // @todo: Validate switchers
    // if() [true, false] autoSaveTXT.should("have.class", "ant-switch-on");
    // click() to on
    // else 
    // click() to off
  });
});
