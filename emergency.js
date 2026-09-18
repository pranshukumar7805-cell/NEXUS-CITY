// ==========================================
// NEXUS CITY — EMERGENCY & HOSPITAL SYSTEM
// Phase 4
// ==========================================

let emergencySystem = {
    active: false,
    incident: null,
    ambulances: [],
    totalBeds: 50,
    occupiedBeds: 18,
    resolved: 0
};

const emergencyTypes = [
    "Road Accident",
    "Medical Emergency",
    "Fire Alarm"
];

const emergencyLocations = [
    "Central Road",
    "North District",
    "East Business Zone",
    "Market Road",
    "School Road",
    "South District"
];

function createEmergency() {

    if (typeof aiActive !== "undefined" && !aiActive) {
        console.log("AI Autonomy is paused.");
        return;
    }

    if (emergencySystem.active) return;

    const type =
        emergencyTypes[
            Math.floor(Math.random() * emergencyTypes.length)
        ];

    const location =
        emergencyLocations[
            Math.floor(Math.random() * emergencyLocations.length)
        ];

    emergencySystem.active = true;

    emergencySystem.incident = {
        type: type,
        location: location,
        status: "Emergency detected",
        time: new Date().toLocaleTimeString()
    };

    console.log(
        "🚨 NEXUS CITY EMERGENCY:",
        type,
        "at",
        location
    );

    addEmergencyLog(
        "🚨 " + type + " detected at " + location
    );

    dispatchAmbulance();
}

function dispatchAmbulance() {

    const ambulance = {
        id: "AMB-" +
            String(emergencySystem.ambulances.length + 1)
                .padStart(3, "0"),

        status: "Dispatched",

        location:
            emergencySystem.incident.location,

        destination: "NEXUS CITY Hospital"
    };

    emergencySystem.ambulances.push(ambulance);

    addEmergencyLog(
        "🚑 " + ambulance.id +
        " dispatched to " +
        ambulance.location
    );

    if (emergencySystem.occupiedBeds < emergencySystem.totalBeds) {

        emergencySystem.occupiedBeds++;

        addEmergencyLog(
            "🏥 Hospital preparing emergency bed"
        );

    } else {

        addEmergencyLog(
            "⚠️ Hospital capacity reached"
        );
    }

    updateEmergencyPanel();

    setTimeout(() => {

        if (!emergencySystem.active) return;

        ambulance.status = "At Hospital";

        if (emergencySystem.incident) {
            emergencySystem.incident.status =
                "Patient under treatment";
        }

        addEmergencyLog(
            "🏥 " + ambulance.id +
            " reached hospital"
        );

        updateEmergencyPanel();

    }, 5000);

    setTimeout(() => {

        if (!emergencySystem.active) return;

        ambulance.status = "Available";

        emergencySystem.resolved++;

        if (emergencySystem.occupiedBeds > 0) {
            emergencySystem.occupiedBeds--;
        }

        addEmergencyLog(
            "✅ Emergency resolved"
        );

        emergencySystem.active = false;
        emergencySystem.incident = null;

        updateEmergencyPanel();

    }, 12000);
}

function addEmergencyLog(message) {

    console.log(
        "[CITY BRAIN]",
        message
    );

    const log =
        document.getElementById("eventLog");

    if (log) {

        const item =
            document.createElement("div");

        item.textContent =
            new Date().toLocaleTimeString() +
            " — " +
            message;

        log.prepend(item);

        while (log.children.length > 12) {
            log.removeChild(log.lastChild);
        }
    }
}

function updateEmergencyPanel() {

    const status =
        document.getElementById("emergencyStatus");

    const beds =
        document.getElementById("hospitalBeds");

    const ambulance =
        document.getElementById("ambulanceStatus");

    if (status) {

        if (emergencySystem.active) {

            status.textContent =
                "🚨 ACTIVE";

        } else {

            status.textContent =
                "🟢 CLEAR";
        }
    }

    if (beds) {

        beds.textContent =
            emergencySystem.occupiedBeds +
            " / " +
            emergencySystem.totalBeds;
    }

    if (ambulance) {

        const activeAmbulances =
            emergencySystem.ambulances
                .filter(a => a.status !== "Available")
                .length;

        ambulance.textContent =
            activeAmbulances;
    }
}


// Automatically generate a simulated emergency
// approximately every 25–40 seconds.

function startEmergencySimulation() {

    const delay =
        25000 +
        Math.random() * 15000;

    setTimeout(() => {

        if (
            typeof aiActive === "undefined" ||
            aiActive
        ) {

            createEmergency();
        }

        startEmergencySimulation();

    }, delay);
}


// Start the emergency simulation
startEmergencySimulation();


// Initial display
setTimeout(updateEmergencyPanel, 500);
window.createEmergency = createEmergency;

const emergencyButton = document.getElementById("emergencyBtn");

if (emergencyButton) {
    emergencyButton.addEventListener("click", function () {
        createEmergency();
    });
}
