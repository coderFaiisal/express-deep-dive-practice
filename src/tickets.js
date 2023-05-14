const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }).call(this);
  }

  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    writeFile(this[tickets]);
    return ticket;
  }

  createBulk(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    writeFile(this[tickets]);
    return result;
  }

  find() {
    return this[tickets];
  }
  findById(id) {
    const ticket = this[tickets].find((ticket) => ticket.id === id);
    return ticket;
  }
  findByUsername(username) {
    const userTickets = this[tickets].filter(
      (ticket) => ticket.username === username
    );
    return userTickets;
  }
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    if (ticket) {
      ticket.username = ticketBody.username ?? ticket.username;
      ticket.price = ticketBody.price ?? ticket.price;
    }
    writeFile(this[tickets]);
    return ticket;
  }

  updateBulk(username, ticketBody) {
    const userTickets = this.findByUsername(username);
    const updatedTickets = userTickets.map((ticket) =>
      this.updateById(ticket.id, ticketBody)
    );
    writeFile(this[tickets]);
    return userTickets;
  }

  deleteById(ticketId) {
    const index = this[tickets].findIndex((ticket) => ticket.id === ticketId);
    if (index === -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  deleteBulk(username) {
    const userTickets = this.findByUsername(username);
    if (userTickets.length === 0) {
      return false;
    } else {
      const deletedResults = userTickets.map((ticket) =>
        this.deleteById(ticket.id)
      );
      return true;
    }
  }

  draw(winnerCount) {
    const winnerIndexes = new Array(winnerCount);

    let winnerIndex = 0;
    while (winnerIndex < winnerCount) {
      let ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexes.includes(ticketIndex)) {
        winnerIndexes[winnerIndex++] = ticketIndex;
        continue;
      }
    }

    const winners = winnerIndexes.map((index) => this[tickets][index]);
    return winners;
  }
}

const ticketCollection = new TicketCollection();

module.exports = ticketCollection;
