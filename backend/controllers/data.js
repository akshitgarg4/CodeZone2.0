const data = require("../models/data");
const groups = require("../models/groups");
const sanitizer = require("sanitizer");
const User = require("../models/user");
const { sendMail } = require("./email");

module.exports.save = async function (req, res) {
  let newData = await data.create({
    title: req.body.fileName,
    description: req.body.fileDescription,
    data: [],
    coordinator: req.user._id,
  });
  let DataFromExcel = req.body.data;
  for (let index = 0; index < DataFromExcel.length; index++) {
    let newGroup = await groups.create({
      GroupNumber: DataFromExcel[index]["S.No."],
      students: [
        DataFromExcel[index]["Student A"],
        DataFromExcel[index]["Student B"],
        DataFromExcel[index]["Student C"],
        DataFromExcel[index]["Student D"],
        DataFromExcel[index]["Student E"],
      ],
      SID: [
        DataFromExcel[index]["SID A"],
        DataFromExcel[index]["SID B"],
        DataFromExcel[index]["SID C"],
        DataFromExcel[index]["SID D"],
        DataFromExcel[index]["SID E"],
      ],
      mentor: await User.findOne({
        name: DataFromExcel[index]["Faculty Mentor"],
      }),

      midSemesterMarks: {
        mentor: {
          presentation: [0, 0, 0, 0, 0],
          viva: [0, 0, 0, 0, 0],
          implementation: [0, 0, 0, 0, 0],
          interaction: [0, 0, 0, 0, 0],
          remarks: ["", "", "", "", ""],
        },
      },
      endSemesterMarks: {
        mentor: {
          presentation: [0, 0, 0, 0, 0],
          viva: [0, 0, 0, 0, 0],
          implementation: [0, 0, 0, 0, 0],
          interaction: [0, 0, 0, 0, 0],
          remarks: ["", "", "", "", ""],
        },
      },
      totalMarks: {
        midSemester: [0, 0, 0, 0, 0],
        endSemester: [0, 0, 0, 0, 0],
        totalMarks: [0, 0, 0, 0, 0],
      },
    });

    newGroup = await newGroup.save();

    newData.data.push(newGroup);
  }
  newData = await newData.save();
  if (newData) {
    return res.status(201).json({
      data: await data
        .findById(newData._id)
        .populate(
          "coordinator evaluators data",
          "name GroupNumber students SID mentor mentor_name"
        ),
      success: true,
      message: "Upload Successful",
    });
  } else {
    return res.status(400).json({
      data: null,
      success: false,
      message: "Upload Unsuccessful",
    });
  }
};

module.exports.fetch = async function (req, res) {
  let previousData = [];
  let allData = await data
    .find({ coordinator: req.user._id })
    .populate(
      "coordinator evaluators data",
      "name GroupNumber students SID mentor mentor_name"
    );
  for (let index = 0; index < allData.length; index++) {
    let currentData = {
      number: allData[index]._id,
      fileName: allData[index].title,
      description: allData[index].description,
      dateUploaded: allData[index].updatedAt,
      timeUploaded: allData[index].updatedAt,
      data: allData[index].data,
    };

    previousData.push(currentData);
  }
  return res.status(200).json({
    data: previousData,
    success: true,
    message: "Data fetch Successful",
  });
};

module.exports.delete = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }

  if (record.coordinator.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  for (let index = 0; index < record.data.length; index++) {
    let groupID = record.data[index];
    await groups.findByIdAndDelete(groupID);
  }
  await data.findByIdAndDelete(record._id);
  record = await data.findById(sanitizer.escape(req.params.record_id));
  if (record) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Failed",
    });
  }
  return res.status(200).json({
    data: null,
    success: true,
    message: "Record Deleted",
  });
};

module.exports.sendLinkMentors = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (record.coordinator.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  let mentors = {};
  for (let index = 0; index < record.data.length; index++) {
    let groupID = record.data[index];
    let group = await groups.findById(groupID);
    let user = await User.findById(group.mentor);
    mentors[user.email] = user._id;
  }
  console.log("Mail Sent To:");
  let results = [];
  let subject = "Major Project Evaluation - Mentor";

  let text =
    "Link for entering marks:\n" +
    "http://localhost:3000/mentor/" +
    sanitizer.escape(req.params.record_id);
  for (const [teacherEmail, teacherID] of Object.entries(mentors)) {
    results.push(
      await sendMail(teacherEmail, subject, text + "\n\n\nCoordinator\n")
    );
    console.log(teacherEmail);
  }
  console.log("All Mails Sent");
  return res.status(200).json({
    data: results,
    success: true,
    message: "Mails sent",
  });
};

module.exports.addEvaluators = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (record.coordinator.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  for (let index = 0; index < req.body.evaluators.length; index++) {
    let evaluator = await User.findOne({ name: req.body.evaluators[index] });
    if (record.evaluators.includes(evaluator._id)) {
      continue;
    }
    record.evaluators.push(evaluator);
    for (let group = 0; group < record.data.length; group++) {
      // console.log(evaluator._id,"EE");
      let currentGroup = await groups.findById(record.data[group]);
      currentGroup.midSemesterMarks[evaluator._id.toString()] = {
        presentation: [0, 0, 0, 0, 0],
        viva: [0, 0, 0, 0, 0],
        implementation: [0, 0, 0, 0, 0],
      };
      currentGroup.endSemesterMarks[evaluator._id] = {
        presentation: [0, 0, 0, 0, 0],
        viva: [0, 0, 0, 0, 0],
        implementation: [0, 0, 0, 0, 0],
        report: [0, 0, 0, 0, 0],
      };
      await currentGroup.markModified("endSemesterMarks");
      await currentGroup.markModified("midSemesterMarks");
      currentGroup = await currentGroup.save();
    }
  }
  record = await record.save();
  if (!record) {
    return res.status(500).json({
      data: record,
      success: false,
      message: "Failed",
    });
  }
  return res.status(201).json({
    data: record,
    success: true,
    message: "Evaluators added",
  });
};

module.exports.fetchEvaluatorsList = async function (req, res) {
  let users = await User.find({ evaluator: true });
  let evaluatorList = [];
  for (let index = 0; index < users.length; index++) {
    evaluatorList.push(users[index].name);
  }
  return res.status(201).json({
    data: evaluatorList,
    success: true,
    message: "Evaluator List",
  });
};

module.exports.sendLinkEvaluators = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (record.coordinator.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  let finalEvaluators = req.body.finalEvaluators;
  let recipients = {};
  for (let index = 0; index < finalEvaluators.length; index++) {
    let user = await User.findOne({ name: finalEvaluators[index] });
    if (user) {
      recipients[user.email] = user._id;
    }
  }

  console.log("Mail Sent To:");
  let results = [];
  let subject = "Major Project Evaluation - Evaluator";
  let text =
    "Link for entering marks:\n" +
    "http://localhost:3000/evaluator/" +
    sanitizer.escape(req.params.record_id);
  for (const [teacherEmail, teacherID] of Object.entries(recipients)) {
    results.push(
      await sendMail(teacherEmail, subject, text + "\n\n\nCoordinator\n")
    );
    console.log(teacherEmail);
  }
  console.log("All Mails Sent");
  return res.status(200).json({
    data: results,
    success: true,
    message: "Mails sent",
  });
};

module.exports.fetchStudentMarks = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (record.coordinator.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  let groupsInData = record.data;
  let studentMarks = [];
  let evaluatorNames = {
    evaluator_1: "evaluator_1",
  };
  for (let index = 0; index < groupsInData.length; index++) {
    let group = await groups.findById(groupsInData[index]);
    for (let studentNumber = 0; studentNumber < 5; studentNumber++) {
      let currentStudent = {
        groupID: group._id,
        studentID: studentNumber,
        GroupNumber: group.GroupNumber,
        mentor: group.mentor_name,
        name: group.students[studentNumber],
        sid: group.SID[studentNumber],
        grade: group.grade[studentNumber],
        groupRemarks: group.groupRemarks,
        midSemesterMarks: {
          evaluator_1: {},
        },
        endSemesterMarks: {
          evaluator_1: {},
        },
        totalMarks: {
          endSemester: group.totalMarks.endSemester[studentNumber],
          midSemester: group.totalMarks.midSemester[studentNumber],
          totalMarks: group.totalMarks.totalMarks[studentNumber],
        },
      };

      for (let [faculty, marks] of Object.entries(group.midSemesterMarks)) {
        if (faculty === "mentor") {
          currentStudent.midSemesterMarks["mentor"] = {
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
            interaction: marks.interaction[studentNumber],
            remarks: marks.remarks[studentNumber],
          };
        } else {
          let evaluator = await User.findById(faculty);
          if (!(evaluator.name in evaluatorNames)) {
            evaluatorNames[evaluator.name] =
              "evaluator_" + Object.keys(evaluatorNames).length;
          }
          currentStudent.midSemesterMarks[evaluatorNames[evaluator.name]] = {
            evaluatorID: evaluator._id,
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
          };
        }
      }
      for (let [faculty, marks] of Object.entries(group.endSemesterMarks)) {
        if (faculty === "mentor") {
          currentStudent.endSemesterMarks["mentor"] = {
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
            interaction: marks.interaction[studentNumber],
            remarks: marks.remarks[studentNumber],
          };
        } else {
          let evaluator = await User.findById(faculty);
          currentStudent.endSemesterMarks[evaluatorNames[evaluator.name]] = {
            evaluatorID: evaluator._id,
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
            report: marks.report[studentNumber],
          };
        }
      }
      studentMarks.push(currentStudent);
    }
  }

  let reversedEvaluatorName = {};
  for (let [name, alias] of Object.entries(evaluatorNames)) {
    reversedEvaluatorName[alias] = name === alias ? "" : name;
  }
  return res.status(200).json({
    data: {
      studentMarks: studentMarks,
      evaluator: reversedEvaluatorName,
    },
    success: true,
    message: "Marks Fetched",
  });
};

module.exports.fetchStudentMarksMentor = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  let groupsInData = record.data;
  let studentMarks = [];
  for (let index = 0; index < groupsInData.length; index++) {
    let group = await groups.findById(groupsInData[index]);
    if (group.mentor_name !== req.user.name) {
      continue;
    }
    let currentGroup = {
      groupID: group._id,
      GroupNumber: group.GroupNumber,
      mentor: group.mentor_name,
      students: [],
      groupRemarks: group.groupRemarks,
    };
    for (let studentNumber = 0; studentNumber < 5; studentNumber++) {
      let currentStudent = {
        studentID: studentNumber,
        name: group.students[studentNumber],
        sid: group.SID[studentNumber],
        grade: group.grade[studentNumber],
        midSemesterMarks: {},
        endSemesterMarks: {},
        totalMarks: {
          endSemester: group.totalMarks.endSemester[studentNumber],
          midSemester: group.totalMarks.midSemester[studentNumber],
          totalMarks: group.totalMarks.totalMarks[studentNumber],
        },
      };
      for (let [faculty, marks] of Object.entries(group.midSemesterMarks)) {
        if (faculty === "mentor") {
          currentStudent.midSemesterMarks["mentor"] = {
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
            interaction: marks.interaction[studentNumber],
            remarks: marks.remarks[studentNumber],
          };
        }
      }
      for (let [faculty, marks] of Object.entries(group.endSemesterMarks)) {
        if (faculty === "mentor") {
          currentStudent.endSemesterMarks["mentor"] = {
            presentation: marks.presentation[studentNumber],
            viva: marks.viva[studentNumber],
            implementation: marks.implementation[studentNumber],
            interaction: marks.interaction[studentNumber],
            remarks: marks.remarks[studentNumber],
          };
        }
      }
      currentGroup.students.push(currentStudent);
    }

    studentMarks.push(currentGroup);
  }

  return res.status(200).json({
    data: studentMarks,
    success: true,
    message: "MArks Fetched for mentor",
  });
};

module.exports.saveStudentMarksMentor = async function (req, res) {
  let group = await groups.findById(sanitizer.escape(req.params.group_id));
  if (!group) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Group not found",
    });
  }
  if (group.mentor.toString() !== req.user._id) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not mentor of this group",
    });
  }
  group.midSemesterMarks.mentor = req.body.midSemesterMarks;
  group.endSemesterMarks.mentor = req.body.endSemesterMarks;

  await group.markModified("endSemesterMarks");
  await group.markModified("midSemesterMarks");
  group = await group.save();

  return res.status(200).json({
    data: group,
    success: true,
    message: "Marks saved for group: " + group.GroupNumber,
  });
};

module.exports.fetchAllStudentsEvaluator = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (!record.evaluators.includes(req.user._id)) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  let responseData = await data
    .findById(sanitizer.escape(req.params.record_id))
    .select("data -_id")
    .populate({
      path: "data",
      select: "GroupNumber students SID mentor mentor_name",
    });
  return res.status(200).json({
    data: responseData.data,
    success: true,
    number: sanitizer.escape(req.params.record_id),
    fileName: record.title,
    description: record.description,
    dateUploaded: record.createdAt,
    timeUploaded: record.createdAt,
    message: "Data Fetched",
  });
};

module.exports.fetchGroupEvaluator = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  if (!record.evaluators.includes(req.user._id)) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  let groupID = record.data[sanitizer.escape(req.params.groupNumber) - 1];
  if (!groupID) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Group not found",
    });
  }
  let studentMarks = [];

  let group = await groups.findById(groupID);

  let currentGroup = {
    groupID: group._id,
    GroupNumber: group.GroupNumber,
    mentor: group.mentor_name,
    students: [],
    groupRemarks: group.groupRemarks,
  };
  for (let studentNumber = 0; studentNumber < 5; studentNumber++) {
    let currentStudent = {
      studentID: studentNumber,
      name: group.students[studentNumber],
      sid: group.SID[studentNumber],
      grade: group.grade[studentNumber],
      midSemesterMarks: {},
      endSemesterMarks: {},
      totalMarks: {
        endSemester: group.totalMarks.endSemester[studentNumber],
        midSemester: group.totalMarks.midSemester[studentNumber],
        totalMarks: group.totalMarks.totalMarks[studentNumber],
      },
    };
    for (let [faculty, marks] of Object.entries(group.midSemesterMarks)) {
      if (faculty === req.user._id) {
        currentStudent.midSemesterMarks["evaluator"] = {
          presentation: marks.presentation[studentNumber],
          viva: marks.viva[studentNumber],
          implementation: marks.implementation[studentNumber],
        };
      }
    }
    for (let [faculty, marks] of Object.entries(group.endSemesterMarks)) {
      if (faculty === req.user._id) {
        currentStudent.endSemesterMarks["evaluator"] = {
          presentation: marks.presentation[studentNumber],
          viva: marks.viva[studentNumber],
          implementation: marks.implementation[studentNumber],
          report: marks?.report?.[studentNumber],
        };
      }
    }
    currentGroup.students.push(currentStudent);
  }

  studentMarks.push(currentGroup);

  return res.status(200).json({
    data: studentMarks,
    success: true,
    message: "MArks Fetched for Evaluator",
  });
};

module.exports.saveStudentMarksEvaluator = async function (req, res) {
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if (!record) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  let group = await groups.findById(sanitizer.escape(req.params.group_id));
  if (!group) {
    return res.status(404).json({
      data: null,
      success: false,
      message: "Group not found",
    });
  }
  if (!record.evaluators.includes(req.user._id)) {
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  group.midSemesterMarks[req.user._id] = req.body.midSemesterMarks;
  group.endSemesterMarks[req.user._id] = req.body.endSemesterMarks;

  await group.markModified("endSemesterMarks");
  await group.markModified("midSemesterMarks");
  group = await group.save();

  return res.status(200).json({
    data: group,
    success: true,
    message: "Marks saved for group: " + group.GroupNumber,
  });
};
