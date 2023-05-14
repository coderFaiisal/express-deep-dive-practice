const {
  sellBulkTickets,
  sellSingleTicket,
  findAll,
  findById,
  findByUserName,
  updateById,
  updateByUserName,
  deleteById,
  deleteByUsername,
  drawWinners,
} = require("./controller");

const router = require("express").Router();

router.get("/t/:id", findById);
router.put("/t/:id", updateById);
router.delete("/t/:id", deleteById);
// router.route("/t/:id").get(findById).put(updateById).delete(deleteById);

router.get("/u/:username", findByUserName);
router.put("/u/:username", updateByUserName);
router.delete("/u/:username", deleteByUsername);
// router.route("/u/:username").get(findByUserName).put(updateByUserName).delete(deleteByUsername);

router.post("/bulk", sellBulkTickets);
router.get("/draw", drawWinners);

router.get("/", findAll);
router.post("/", sellSingleTicket);
// router.route("/").get(findAll).post(sellSingleTicket);

module.exports = router;
