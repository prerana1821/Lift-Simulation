const generate = document.getElementById("get-floors-lifts")
const userActions = document.getElementById("user-actions")
const playground = document.getElementById("playground")

/**
 * Generate floors and user actions for each floor
 * 
 * @param {number} noOfFloors 
 */

const generateFloors = (noOfFloors) => {

    for (let i = noOfFloors; i > 0; i--) {

        const floor = document.createElement("div")
        floor.classList.add("floor");
        floor.setAttribute("id", `floor-${i}`);

        const floorInside = document.createElement("div")
        floorInside.classList.add("floor-inside");
        floor.appendChild(floorInside)

        const floorActions = document.createElement("div")
        floorActions.classList.add("floor-actions");
        floorInside.appendChild(floorActions)

        const floorActionUp = document.createElement("button")
        floorActionUp.innerHTML = '<img src="./assets/up.png" />';
        floorActionUp.classList.add("floor-action-btn");
        if (i != noOfFloors) {
            floorActions.appendChild(floorActionUp)
        }
        floorActionUp.addEventListener("click", () => {
            liftSimulationEngine(i - 1);
        });

        const floorActionDown = document.createElement("button")
        floorActionDown.innerHTML = '<img src="./assets/down.png" />';
        floorActionDown.classList.add("floor-action-btn");
        if (i != 1) {
            floorActions.appendChild(floorActionDown)
        }
        floorActionDown.addEventListener("click", () => {
            liftSimulationEngine(i - 1);
        });

        const floorNumber = document.createElement("h2")
        floorNumber.classList.add("floor-number");
        floorNumber.innerText = `Floor ${i}`
        floorInside.appendChild(floorNumber)

        playground.appendChild(floor)
    }

}

/**
 * Generates lifts
 * 
 * @param {number} noOfLifts 
 */

const generateLifts = (noOfLifts) => {

    const multipleLifts = document.createElement("div")
    multipleLifts.classList.add("multiple-lifts");

    for (let i = 0; i < noOfLifts; i++) {

        const lift = document.createElement("div")
        lift.classList.add("lift");
        lift.setAttribute("data-status", "free");
        lift.setAttribute("data-lift-num", "0");

        const leftDoor = document.createElement("div")
        leftDoor.classList.add("left-door");
        lift.appendChild(leftDoor)

        const rightDoor = document.createElement("div")
        rightDoor.classList.add("right-door");
        lift.appendChild(rightDoor)

        multipleLifts.appendChild(lift)
    }

    const firstFloor = document.getElementById("floor-1")
    firstFloor.appendChild(multipleLifts)

}

const generateLiftsAndFloors = (e) => {
    e.preventDefault();

    let floors = document.getElementById("floors");
    let lifts = document.getElementById("lifts");

    if (floors.value == "" || lifts.value == "") {
        alert("Ensure you input a value in both fields.");
    } else {
        userActions.style.display = "none";
        generateFloors(+floors.value)
        generateLifts(+lifts.value)

    }

    floors.value = "";
    lifts.value = "";
}

generate.addEventListener("submit", generateLiftsAndFloors)

let callQueue = [];

/**
 * 
 * @returns {Element | undefined} Free lift
 */

const findFreeLift = () => {
    const liftElements = Array.from(document.querySelectorAll(".lift"));
    return liftElements.find((lift) => lift.dataset.status === "free");
}

/**
 * Engine to check whether the lift the free & whether to open doors or move lift up or down.
 * 
 * @param {number} location 
 */

const liftSimulationEngine = (location) => {
    const freeLift = findFreeLift();
    if (freeLift) {
        if (+freeLift.dataset.liftNum === location) {
            openDoors(freeLift, location);
        } else {
            moveLift(freeLift, location);
        }
    } else {
        callQueue.push(location);
    }
}

/**
 * Sets status attribute to busy and calculates the distance between two floors.
 * 
 * @param {Element} lift 
 * @param {number} destinationFloor 
 * @returns {number} distance
 */

const setStateGetDist = (lift, destinationFloor) => {
    lift.setAttribute("data-status", "busy");
    console.log({ dist: +lift.dataset.liftNum - destinationFloor })
    return Math.abs(+lift.dataset.liftNum - destinationFloor);
}

/**
 * 
 * @param {Element} lift 
 * @returns {Object} containing left door and right door element 
 */

const doorAnimations = (lift) => {
    const leftDoor = lift.querySelector('.left-door');
    const rightDoor = lift.querySelector('.right-door');
    return { leftDoor, rightDoor };
};

/**
 * Opens doors
 * 
 * @param {Element} lift 
 * @param {number} destinationFloor 
 */

const openDoors = (lift, destinationFloor) => {
    const distance = setStateGetDist(lift, destinationFloor)
    const { leftDoor, rightDoor } = doorAnimations(lift)

    setTimeout(() => {
        leftDoor.classList.add("left-door--animation");
        rightDoor.classList.add("right-door--animation");
    }, distance * 2000 + 500);

    setTimeout(() => {
        leftDoor.classList.remove("left-door--animation");
        rightDoor.classList.remove("right-door--animation");
        lift.setAttribute("data-status", "free");
        lift.setAttribute("data-lift-num", destinationFloor);
    }, distance * 2000 + 3000);
}

/**
 * Moves lifts up or down
 * 
 * @param {Element} lift 
 * @param {number} destinationFloor 
 */

const moveLift = (lift, destinationFloor) => {
    const distance = setStateGetDist(lift, destinationFloor)

    console.log({ distance });
    console.log(`translateY(-${6.5 * destinationFloor}rem)`);
    console.log(`all ${distance * 2}s linear`);

    lift.style.transform = `translateY(-${6.5 * destinationFloor}rem)`;
    lift.style.transition = `all ${distance * 2}s linear`;
    openDoors(lift, destinationFloor);
    setTimeout(() => {
        if (callQueue.length > 0) {
            moveLift(lift, callQueue[0]);
            callQueue.shift();
        }
    }, distance * 2000 + 3000);
}