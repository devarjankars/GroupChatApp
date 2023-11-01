const CronJob = require("cron").CronJob;
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
const Chat = require("../Models/chat");
const ArchivedChat = require("../Models/ArchivedChat");

const job = new CronJob("0 0 * * *", function () {
  // Runs at midnight every day
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
  Chat.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.lt]: yesterday,
      },
    },
  }).then((chats) => {
    ArchivedChat.bulkCreate(chats).then(() => {
      Chat.destroy({
        where: {
          createdAt: {
            [Sequelize.Op.lt]: yesterday,
          },
        },
      });
    });
  });
});

module.exports = job;