import express from "express";
import Resource from "../models/Resource.js";
import Event from "../models/Event.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// ==================== FACULTY ROUTES ====================

// Create a new resource (Faculty & Student Organization)
router.post("/resources", authenticateToken, async (req, res) => {
  try {
    // Check if user is faculty or organization
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can create resources" });
    }

    const { title, url, description, hashtags } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const resource = new Resource({
      title,
      url,
      description: description || "",
      hashtags: hashtags || [],
      createdBy: req.user._id,
      createdByName: req.user.name,
    });

    await resource.save();
    res.status(201).json({ message: "Resource created successfully", resource });
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ message: "Failed to create resource", error: error.message });
  }
});

// Create a new event (Faculty & Student Organization)
router.post("/events", authenticateToken, async (req, res) => {
  try {
    // Check if user is faculty or organization
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can create events" });
    }

    const { title, date, location, description, hashtags } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const event = new Event({
      title,
      date,
      location: location || "",
      description: description || "",
      hashtags: hashtags || [],
      createdBy: req.user._id,
      createdByName: req.user.name,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
});

// Update a resource (Faculty & Student Organization - own resources)
router.put("/resources/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can update resources" });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Allow only the creator to update
    if (resource.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own resources" });
    }

    const { title, url, description, hashtags } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    resource.title = title;
    resource.url = url;
    resource.description = description || "";
    resource.hashtags = hashtags || [];

    await resource.save();
    res.json({ message: "Resource updated successfully", resource });
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ message: "Failed to update resource", error: error.message });
  }
});

// Delete a resource (Faculty & Student Organization - own resources)
router.delete("/resources/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can delete resources" });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Allow only the creator to delete
    if (resource.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own resources" });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ message: "Failed to delete resource", error: error.message });
  }
});

// Update an event (Faculty & Student Organization - own events)
router.put("/events/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can update events" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Allow only the creator to update
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own events" });
    }

    const { title, date, location, description, hashtags } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    event.title = title;
    event.date = date;
    event.location = location || "";
    event.description = description || "";
    event.hashtags = hashtags || [];

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
});

// Delete an event (Faculty & Student Organization - own events)
router.delete("/events/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== "Faculty" && req.user.userType !== "Student Organization") {
      return res.status(403).json({ message: "Only faculty or student organizations can delete events" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Allow only the creator to delete
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own events" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
});

// ==================== STUDENT ROUTES ====================

// Get all resources (optionally filter by hashtag)
router.get("/resources", authenticateToken, async (req, res) => {
  try {
    const { hashtag } = req.query;
    
    let query = {};
    if (hashtag) {
      query.hashtags = hashtag; // Filter by hashtag
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json({ resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: "Failed to fetch resources", error: error.message });
  }
});

// Get all events (optionally filter by hashtag)
router.get("/events", authenticateToken, async (req, res) => {
  try {
    const { hashtag } = req.query;
    
    let query = {};
    if (hashtag) {
      query.hashtags = hashtag; // Filter by hashtag
    }

    const events = await Event.find(query).sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
});

// Get all unique hashtags from resources and events
router.get("/hashtags", authenticateToken, async (req, res) => {
  try {
    const resources = await Resource.find({}, { hashtags: 1 });
    const events = await Event.find({}, { hashtags: 1 });

    const allHashtags = new Set();
    resources.forEach((r) => r.hashtags.forEach((tag) => allHashtags.add(tag)));
    events.forEach((e) => e.hashtags.forEach((tag) => allHashtags.add(tag)));

    res.json({ hashtags: Array.from(allHashtags).sort() });
  } catch (error) {
    console.error("Error fetching hashtags:", error);
    res.status(500).json({ message: "Failed to fetch hashtags", error: error.message });
  }
});

export default router;

