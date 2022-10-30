describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.signUp({
      name: "Aisha Rooble",
      username: "A-Rooble",
      password: "password123",
    });
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("A-Rooble");
      cy.get("#password").type("password123");
      cy.get("#login-button").click();

      cy.contains("Aisha Rooble logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("A-Rooble");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "A-Rooble", password: "password123" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("First class tests");
      cy.get("#author").type("Robert C. Martin");
      cy.get("#url").type(
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
      );

      cy.contains("create").click();

      cy.contains("First class tests");
    });
  });

  describe("Logged in & created blogs", function () {
    beforeEach(function () {
      cy.login({ username: "A-Rooble", password: "password123" });

      cy.createBlog({
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      });
      cy.createBlog({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      });
    });

    it("User can like a blog", function () {
      cy.contains("view").click();
      cy.get("#noOfLikes").contains("likes 0");
      cy.get(".likeButton").eq(0).click();
      cy.get("#noOfLikes").contains("likes 1");
    });

    it("User can delete own blog", function () {
      cy.contains("view").click();
      cy.contains("First class tests").should("exist");
      cy.contains("remove").click();
      cy.contains("First class tests").should("not.exist");
    });

    it("User can't delete others' blogs", function () {
      cy.contains("view").click();
      cy.contains("remove").should("exist");
      cy.contains("Log Out").click();

      cy.signUp({
        name: "Aisha Rooble",
        username: "Aisha-R",
        password: "password123",
      });

      cy.login({ username: "Aisha-R", password: "password123" });

      cy.contains("view").click();
      cy.contains("remove").should("not.exist");
    });

    it("Blog sorted in order of most likes", function () {
      cy.get(".blog").eq(1).contains("view").click();
      cy.get(".likeButton").eq(1).click().wait(2000);
      cy.get(".blog").eq(0).contains("Canonical string reduction");
      cy.get(".blog").eq(1).contains("view").click();
      cy.get(".likeButton").eq(1).click().wait(2000);
      cy.get(".likeButton").eq(1).click().wait(2000);
      cy.get(".blog").eq(0).contains("First class tests");
    });
  });
});
