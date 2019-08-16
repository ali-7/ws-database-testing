const tape = require("tape");

const { dbBuild } = require("../server/database/config/build");
const { getData } = require("../server/database/queries/getData");
const { postData } = require("../server/database/queries/postData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape("test getData query", t => {

  const firstUser = {
    id: 1,
    name: "Ali",
    location: "Gaza"
  };

  dbBuild()
    .then(() => {
      getData()
        .then(res => {
          t.deepEqual(res.rows[0], firstUser, "should be equal to firstUser obj");
          t.equal(res.rows[0].name, "Ali", "First name should be Ali");
          t.end();
        })
        .catch(err => t.error(err));
    })
    .catch(err => t.error(err));
});

tape("test postData query", t => {

  const newUser = {
    name: "John Doe",
    location: "Palestine"
  };

  dbBuild()
    .then(() => {
      postData(newUser)
        .then(() => {
          getData()
            .then(res => {
              t.equal(res.rows[3].name, "John Doe", "name should be John Doe");
              t.end();
            })
            .catch(err => t.error(err));
        })
        .catch(err => t.error(err));
    })
    .catch(err => t.error(err));
});

tape.onFinish(() => process.exit(0));
