const data = require("../models/data");
const groups = require("../models/groups");
const sanitizer = require("sanitizer");
const User = require("../models/user");

module.exports.save = async function(req, res){
  let newData = await data.create({
    title: req.body.fileName,
    description: req.body.fileDescription,
    data: [],
    coordinator: req.user._id,
  });
  let DataFromExcel = req.body.data;
  for(let index = 0; index < DataFromExcel.length; index++){
    // console.log(DataFromExcel[index]);
    let newGroup = await groups.create({
      GroupNumber: DataFromExcel[index]["S.No."],
      student_1: DataFromExcel[index]["Student A"],
      student_1_SID: DataFromExcel[index]["SID A"],
      student_2: DataFromExcel[index]["Student B"],
      student_2_SID: DataFromExcel[index]["SID B"],
      student_3: DataFromExcel[index]["Student C"],
      student_3_SID: DataFromExcel[index]["SID C"],
      student_4: DataFromExcel[index]["Student D"],
      student_4_SID: DataFromExcel[index]["SID D"],
      student_5: DataFromExcel[index]["Student E"],
      student_5_SID: DataFromExcel[index]["SID E"],
      mentor: await User.findOne({name: DataFromExcel[index]["Faculty Mentor"]}),
    })
    newGroup = await newGroup.save();
    newData.data.push(newGroup);
  }
  newData = await newData.save();
  if(newData){
    return res.status(201).json({
      data: newData,
      success: true,
      message: "Upload Successful",
    });
  } else{
    return res.status(400).json({
      data: null,
      success: false,
      message: "Upload Unsuccessful",
    });
  }
};
module.exports.fetch = async function(req, res){
  let previousData = [];
  let allData = await data.find({coordinator: req.user._id});
  for(let index = 0; index < allData.length; index++){
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


module.exports.delete = async function(req, res){
  let record = await data.findById(sanitizer.escape(req.params.record_id));
  if( !record){
    return res.status(404).json({
      data: null,
      success: false,
      message: "Record not found",
    });
  }
  
  
  if(record.coordinator.toString() !== req.user._id){
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
  }
  for(let index = 0; index < record.data.length; index++){
    let groupID = record.data[index];
    await groups.findByIdAndDelete(groupID);
  }
  await data.findByIdAndDelete(record._id);
  record = await data.findById(sanitizer.escape(req.params.record_id));
  if(record){
    return res.status(500).json({
      data: null,
      success: false,
      message: "Failed",
    });
  }
  return res.status(500).json({
    data: null,
    success: true,
    message: "Record Deleted",
  });
};