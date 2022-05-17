const { expect } = require("chai");

describe("Library contract", () => {
  let owner, add1, add2, library, libraryFactory;
  beforeEach(async () => {
    [owner, add1, add2] = await ethers.getSigners();
    libraryFactory = await ethers.getContractFactory("Library");

    library = await libraryFactory.deploy();
  });

  describe("Add Book", () => {
    it("should add books correctly", async () => {
      await library.addBook("GodItachi", 1996, "Stephen Hawkings", false);

      const add = await library.bookToOwner(0);
      const name = await library.bookList(0);

      expect(add).to.equal(owner.address);
      expect(name.name).to.equal("GodItachi");
    });

    it("should return the booklist of the books that are finished", async () => {
      await library.addBook("book1", 2000, "Geroge R. martin", true);
      await library.addBook("book2", 1998, "undefined", true);

      const isFinished = await library.getfinishedBook();
      const finished_length = isFinished.length;

      expect(finished_length).to.equal(2);
    });

    it("should set the book to finished", async () => {
      await library.addBook("new reader", 1996, "himself", false);

      const len = await library.bookList.length;
      const finish = await library.setFinished(0, true);
      const isTrue = await library.bookList(0);
      expect(len).to.be.equal(0);
      expect(isTrue.finished).to.equal(true);
    });
  });
  describe("Emitting events", () => {
    it("Should emit the events correctly", async () => {
      await expect(library.addBook("name", 1993, "author", false))
        .to.emit(library, "AddBook")
        .withArgs(owner.address, 0);

        await expect(library.setFinished(0, true)).to.emit(library, 'SetFinished').withArgs(0, true);
    });
  });
});
