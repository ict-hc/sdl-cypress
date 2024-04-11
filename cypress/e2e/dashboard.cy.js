import "./common.js";

describe("E2E Dashboard", function () {
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

  it("If machines are greater than 5, reduce the length to the first 5 ", function () {
    if (Number(this.machinesLength) > 5) {
      this.machinesLength = 5;
    }
  });

  it("Test Navigation to Online", function () {
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
        if (
          $body.find(
            `:nth-child(${
              i + 1
            }) > .ant-card > .ant-card-body button [aria-label='dashboard']`
          ).length
        ) {
          cy.wait(500);
          // Navigate to online
          cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
            .find("button")
            .eq(1)
            .contains("Online")
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

          cy.url().should("include", "/online");
          cy.go("back");
        }
      });
    }
  });

  it("Test Navigation to Edit", function () {
    for (let i = 0; i < this.machinesLength; i++) {
      cy.wait(500);
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
        if (
          $body.find(
            `:nth-child(${
              i + 1
            }) > .ant-card > .ant-card-body button [aria-label='edit']`
          ).length
        ) {
          cy.wait(500);
          // Navigate to edit
          cy.get(`:nth-child(${i + 1}) > .ant-card > .ant-card-body`)
            .find("button")
            .eq(2)
            .contains("Edit")
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

          cy.url().should("include", "/machines");
          cy.go("back");
        }
      });
    }
  });
});
