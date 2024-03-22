import "./common.js";

describe("E2E Cycles", function () {
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

  it("Test Navigation to Cycles", function () {
    for (let i = 0; i < this.machinesLength; i++) {
      cy.wait(1000);
      cy.get(
        `:nth-child(${
          i + 1
        }) > .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title`
      )
        .invoke("text")
        .then((text) => {
          const machineCode = text.trim();
          cy.wrap(machineCode).as("machineCode");
        });
      cy.wait(1000);

      // Navigate to cycles
      cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
        .find("button")
        .eq(3)
        .click();
      cy.wait(1000);

      // Get the breadcrumb text and assert
      cy.get(".breadcrumb-nav-element")
        .should("be.visible")
        .invoke("text")
        .then((text) => {
          cy.get("@machineCode").then((code) => {
            cy.wrap(text).should("include", code);
          });
        });

      cy.go("back");
      cy.url().should("not.include", "/cycles");
    }
  });
});
