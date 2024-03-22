import "./common.js";

describe("E2E Dashboard", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Assert machines to be greater than 0", function () {
    cy.get(
      "#page-home > div > div > main > div.ant-col.ant-col-24.p-4.css-dev-only-do-not-override-gl5c52 > div > div"
    )
      .should("be.visible")
      .children()
      .then(($list) => {
        return $list.length;
      })
      .as("machinesLength");

    cy.get("@machinesLength").should("be.greaterThan", 0);
    cy.log(this.machinesLength);
  });

  it("Test Navigation to Online", function () {
    for (let i = 0; i < this.machinesLength; i++) {
      cy.wait(500);
      cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
        .find("button")
        .eq(1)
        .click();
      cy.wait(1000);
      cy.url().should("include", "/online");
      cy.go("back");
    }
  });

  it("Test Navigation to Edit", function () {
    for (let i = 0; i < this.machinesLength; i++) {
      cy.wait(500);
      cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
        .find("button")
        .eq(2)
        .click();

      cy.wait(1000);
      cy.url().should("include", "/machines");

      cy.go("back");
    }
  });

  it("Test Navigation to Cycles", function () {
    for (let i = 0; i < this.machinesLength; i++) {
      cy.wait(500);
      cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
        .find("button")
        .eq(3)
        .click();

      cy.wait(1000);
      cy.url().should("include", "/cycles");
      cy.go("back");
    }
  });
});
