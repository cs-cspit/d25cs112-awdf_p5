const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    completed: {
        type: Boolean,
        default: false
    },

    priority: {
        type: String,
        enum: {
            values: ["low", "medium", "high"],
            message: "`{VALUE}` is not a valid enum value for path `priority`."
        },
        default: "medium"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook: automatically trims whitespace from title (Supplementary Problem 2)
taskSchema.pre("save", function (next) {
    if (this.title) {
        this.title = this.title.trim();
    }
    next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
