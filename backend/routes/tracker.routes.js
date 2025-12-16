// const express = require("express");
// const router = express.Router();

// const Tracker = require("../Tracker"); // model
// const auth = require("../middleware"); // JWT guard
// router.post("/", auth, async (req, res) => {
//   console.log("REQ USER:", req.userId);
//   console.log("REQ BODY:", req.body);

//   const entry = await Tracker.create({
//     userId: req.userId,
//     ...req.body
//   });

//   res.json(entry);
// });


// // CREATE tracker entry (per user)
// router.post("/", auth, async (req, res) => {
//   try {
//     const entry = await Tracker.create({
//       userId: req.userId,   // 🔑 WHO owns this data
//       ...req.body           // 📦 actual tracker content
//     });

//     res.json(entry);
//   } catch (err) {
//     res.status(500).json({ msg: "Failed to save tracker" });
//   }
// });

// // GET tracker entries (only for this user)
// router.get("/", auth, async (req, res) => {
//   const data = await Tracker.find({ userId: req.userId });
//   res.json(data);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");
const auth = require("../middleware");

// Create or update tracker entry
router.post("/", auth, async (req, res) => {
  try {
    const { day, leetcode, ecommerce, extra, sleep, wake, thoughts } = req.body;
    
    // Check if entry exists for this user and day
    let tracker = await Tracker.findOne({ userId: req.userId, day });
    
    if (tracker) {
      // Update existing entry
      tracker.leetcode = leetcode || tracker.leetcode;
      tracker.ecommerce = ecommerce || tracker.ecommerce;
      tracker.extra = extra || tracker.extra;
      tracker.sleep = sleep || tracker.sleep;
      tracker.wake = wake || tracker.wake;
      tracker.thoughts = thoughts || tracker.thoughts;
      
      await tracker.save();
      res.json(tracker);
    } else {
      // Create new entry
      tracker = new Tracker({
        userId: req.userId,
        day,
        leetcode: leetcode || [],
        ecommerce: ecommerce || [],
        extra: extra || [],
        sleep: sleep || "",
        wake: wake || "",
        thoughts: thoughts || ""
      });
      
      await tracker.save();
      res.status(201).json(tracker);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get tracker data for a specific day
router.get("/:day", auth, async (req, res) => {
  try {
    const tracker = await Tracker.findOne({
      userId: req.userId,
      day: req.params.day
    });
    
    if (!tracker) {
      return res.status(404).json({ msg: "No data found for this day" });
    }
    
    res.json(tracker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all tracker data for current user
router.get("/", auth, async (req, res) => {
  try {
    const trackers = await Tracker.find({ userId: req.userId }).sort({ day: 1 });
    res.json(trackers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete tracker entry
router.delete("/:day", auth, async (req, res) => {
  try {
    const tracker = await Tracker.findOneAndDelete({
      userId: req.userId,
      day: req.params.day
    });
    
    if (!tracker) {
      return res.status(404).json({ msg: "No data found for this day" });
    }
    
    res.json({ msg: "Entry deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;