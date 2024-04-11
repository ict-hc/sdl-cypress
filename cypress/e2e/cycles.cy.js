import "./common.js";

describe("E2E Cycles", function () {
  before(() => {
    cy.makeLogin("admin", "Steelc0.");
  });

  it("Assert machines to be greater than 0", function () {
    cy.get(
      "#page-home .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title"
    )
      .parent()
      .parent()
      .parent()
      .then(($list) => {
        return $list.length;
      })
      .as("machinesLength");

    cy.get("@machinesLength").should("be.greaterThan", 0);
  });

  it("If machines are greater than 5, reduce the length to the first 5", function () {
    if (Number(this.machinesLength) > 5) {
      this.machinesLength = 5;
    }
  });

  it("Test Navigation to Cycles", function () {
    for (let i = 0; i < this.machinesLength; i++) {
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

      cy.get("body").then(($body) => {
        // Check if the element exists in the body
        if (
          $body.find(
            `:nth-child(${
              i + 1
            }) > .ant-card > .ant-card-body button [aria-label='profile']`
          ).length
        ) {
          cy.wait(500);
          // Navigate to cycles
          cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
            .find("button")
            .eq(3)
            .contains("Cycles")
            .click();

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
    }
  });
});
