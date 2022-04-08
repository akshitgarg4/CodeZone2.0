const data = require("../models/data");

const sanitizer = require("sanitizer");

module.exports.save = async function(req, res){
  let newData = await data.create({
    title: req.body.fileName,
    description: req.body.fileDescription,
    data: req.body.data,
    supervisor: req.user._id,
  });
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
  let allData = await data.find({supervisor: req.user._id});
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
  
  
  if(record.supervisor.toString() !== req.user._id){
    return res.status(403).json({
      data: null,
      success: false,
      message: "Not allowed",
    });
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