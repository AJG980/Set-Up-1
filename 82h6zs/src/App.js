import React, { useState } from "react";

const KazooQuiz = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [responses, setResponses] = useState({
    name: "",
    availability: [],
    selectedTasks: [],
    newTask: null,
  });

  // Actual time slots from your schedule
  const timeSlots = [
    "Thursday AM (9am-12pm)",
    "Thursday PM (12pm-5pm)",
    "Thursday Evening (5pm-10pm)",
    "Friday AM (9am-12pm)",
  ];

  // Full task list from your documents
  const tasks = {
    "Thursday AM": [
      {
        id: 1,
        name: "Unload vans into Yellow 24",
        team: "Resources",
        people: 4,
        duration: "2 hours",
      },
      {
        id: 2,
        name: "Set up resources room",
        team: "Resources",
        people: 2,
        duration: "30 mins",
      },
      {
        id: 3,
        name: "Create resource purchase sheet online",
        team: "Resources",
        people: 1,
        duration: "10 mins",
      },
      {
        id: 4,
        name: "Equipment to green",
        team: "Families",
        people: 3,
        duration: "1 hour",
      },
      {
        id: 5,
        name: "Check arrival of ordered items",
        team: "Commerce",
        people: 1,
        duration: "2 hours",
      },
      {
        id: 6,
        name: "Obtain session room and master keys",
        team: "Site",
        people: 1,
        duration: "15 mins",
      },
    ],
    "Thursday PM": [
      {
        id: 7,
        name: "Check tech in session rooms",
        team: "Resources",
        people: 2,
        duration: "30 mins",
      },
      {
        id: 8,
        name: "Place presenter tech information",
        team: "Resources",
        people: 2,
        duration: "30 mins",
      },
      {
        id: 9,
        name: "Set up radio repeater",
        team: "Resources",
        people: 1,
        duration: "1 hour",
      },
      {
        id: 10,
        name: "Login and test laptops",
        team: "Registration",
        people: 1,
        duration: "30 mins",
      },
      {
        id: 11,
        name: "Sort room keys",
        team: "Registration",
        people: 3,
        duration: "4 hours",
      },
      {
        id: 12,
        name: "Sorting badges with room keys",
        team: "Participant Care",
        people: 4,
        duration: "3 hours",
      },
      {
        id: 13,
        name: "Set up wellbeing helpdesk",
        team: "Participant Care",
        people: 2,
        duration: "30 mins",
      },
      {
        id: 14,
        name: "Set up mincha denominations",
        team: "Shabbat",
        people: 1,
        duration: "1 hour",
      },
      {
        id: 15,
        name: "Collect vases from ikea",
        team: "Shabbat",
        people: 1,
        duration: "1.5 hours",
      },
      {
        id: 16,
        name: "Flowers, Eco-Limmud Mascot",
        team: "Decor",
        people: 3,
        duration: "2 hours",
      },
    ],
    "Thursday Evening": [
      {
        id: 17,
        name: "3 x laptops to registration",
        team: "Resources",
        people: 1,
        duration: "20 mins",
      },
      {
        id: 18,
        name: "Set up wellbeing hub",
        team: "Participant Care",
        people: 2,
        duration: "1 hour",
      },
      {
        id: 19,
        name: "Set up presenter helpdesk",
        team: "Programming",
        people: 1,
        duration: "30 mins",
      },
      {
        id: 20,
        name: "Assemble high chairs and travel cots",
        team: "Families",
        people: 2,
        duration: "2 hours",
      },
      {
        id: 21,
        name: "Havdalah spice bags",
        team: "Shabbat",
        people: 3,
        duration: "20 mins",
      },
      {
        id: 22,
        name: "Table decor - eucalyptus vases",
        team: "Shabbat",
        people: 2,
        duration: "20 mins",
      },
      {
        id: 23,
        name: "Alcohol sort and iZettle setup",
        team: "Commerce",
        people: 2,
        duration: "1 hour",
      },
      {
        id: 24,
        name: "Setup recycling bins",
        team: "Site",
        people: 1,
        duration: "1 hour",
      },
    ],
    "Friday AM": [
      {
        id: 25,
        name: "Priority Seating signs onto chairs",
        team: "Participant Care",
        people: 3,
        duration: "2 hours",
      },
      {
        id: 26,
        name: "Shabbat oneg setup",
        team: "Shabbat",
        people: 2,
        duration: "1 hour",
      },
      {
        id: 27,
        name: "Bar handover from Hilton",
        team: "Commerce",
        people: 1,
        duration: "1 hour",
      },
      {
        id: 28,
        name: "Coffee shop handover from Hilton",
        team: "Commerce",
        people: 1,
        duration: "1 hour",
      },
      {
        id: 29,
        name: "Finish setup of Bar",
        team: "Commerce",
        people: 3,
        duration: "2 hours",
      },
      {
        id: 30,
        name: "Move furniture around in bar area",
        team: "Site",
        people: 2,
        duration: "30 mins",
      },
      {
        id: 31,
        name: "Hilton fire / evacuation training",
        team: "Site",
        people: 1,
        duration: "1 hour",
      },
    ],
  };

  // Group tasks by team for easy filtering
  const teams = [
    "Resources",
    "Registration",
    "Participant Care",
    "Families",
    "Shabbat",
    "Commerce",
    "Site",
    "Programming",
    "Decor",
  ];

  const handleTaskSelect = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const renderTasks = (timeSlot) => {
    const slotTasks = tasks[timeSlot];
    return slotTasks
      .filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.team.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((task) => (
        <div
          key={task.id}
          onClick={() => handleTaskSelect(task.id)}
          style={{
            padding: "1rem",
            margin: "0.5rem 0",
            borderRadius: "0.5rem",
            backgroundColor: selectedTasks.includes(task.id)
              ? "#DBEAFE"
              : "#F3F4F6",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ fontWeight: "bold" }}>{task.name}</h4>
              <p style={{ fontSize: "0.875rem", color: "#4B5563" }}>
                Team: {task.team}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                👥 {task.people} people • ⏱️ {task.duration}
              </p>
            </div>
            {selectedTasks.includes(task.id) && (
              <span style={{ color: "#2563EB", fontSize: "1.5rem" }}>✓</span>
            )}
          </div>
        </div>
      ));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Welcome to Festival Setup!
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Let's get you signed up to help make this festival amazing! 🎉
            </p>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={responses.name}
                onChange={(e) =>
                  setResponses({ ...responses, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #D1D5DB",
                }}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              When are you available?
            </h2>
            {timeSlots.map((slot) => (
              <div
                key={slot}
                onClick={() => {
                  const newAvailability = responses.availability.includes(slot)
                    ? responses.availability.filter((s) => s !== slot)
                    : [...responses.availability, slot];
                  setResponses({ ...responses, availability: newAvailability });
                }}
                style={{
                  padding: "1rem",
                  margin: "0.5rem 0",
                  borderRadius: "0.5rem",
                  backgroundColor: responses.availability.includes(slot)
                    ? "#DBEAFE"
                    : "#F3F4F6",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>🕒 {slot}</span>
                  {responses.availability.includes(slot) && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Available Tasks
            </h2>
            <input
              type="text"
              placeholder="Search tasks or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #D1D5DB",
                marginBottom: "1rem",
              }}
            />
            {responses.availability.map((slot) => {
              const timeSlot = slot.split(" (")[0];
              return (
                <div key={slot}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      margin: "1rem 0",
                    }}
                  >
                    {slot}
                  </h3>
                  {renderTasks(timeSlot)}
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "32rem", margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Festival Setup Party! 🎉
          </h1>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: "0.5rem",
              borderRadius: "9999px",
              backgroundColor: isPlaying ? "#93C5FD" : "#E5E7EB",
              border: "none",
              cursor: "pointer",
            }}
          >
            🎵
          </button>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "0.5rem",
                    flexGrow: 1,
                    margin: "0 0.25rem",
                    borderRadius: "9999px",
                    backgroundColor: i <= step ? "#3B82F6" : "#E5E7EB",
                    transition: "all 0.5s",
                  }}
                />
              ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6B7280",
            }}
          >
            Step {step + 1} of 5
          </p>
        </div>

        {renderStep()}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          {step > 0 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              style={{
                padding: "0.5rem 1rem",
                color: "#4B5563",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => setStep((prev) => prev + 1)}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3B82F6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              marginLeft: "auto",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default KazooQuiz;
