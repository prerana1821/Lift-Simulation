const generate = document.getElementById("get-floors-lifts")
const userActions = document.getElementById("user-actions")
const playground = document.getElementById("playground")

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
        floorActionUp.innerText = `Up`
        floorActionUp.classList.add("floor-action-btn");
        console.log(i);
        if (i != noOfFloors) {
            floorActions.appendChild(floorActionUp)
        }
        floorActionUp.addEventListener("click", () => {
            liftSimulationEngine(i - 1);
        });

        const floorActionDown = document.createElement("button")
        floorActionDown.innerText = `Down`
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

const findFreeLift = () => {
    const liftElements = Array.from(document.querySelectorAll(".lift"));
    return liftElements.find((lift) => lift.dataset.status === "free");
}

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

const setStateGetDist = (lift, destinationFloor) => {
    lift.setAttribute("data-status", "busy");
    return Math.abs(+lift.dataset.liftNum - destinationFloor);

}

const openDoors = (lift, destinationFloor) => {
    const distance = setStateGetDist(lift, destinationFloor)

    setTimeout(() => {
        lift.setAttribute("data-status", "free");
        lift.setAttribute("data-current", destinationFloor);
    }, distance * 2000 + 3000);
}

const moveLift = (lift, destinationFloor) => {
    const distance = setStateGetDist(lift, destinationFloor)

    lift.style.transform = `translateY(-${6.4 * destinationFloor}rem)`;
    lift.style.transition = `all ${distance * 2}s linear`;
    openDoors(lift, destinationFloor);
    setTimeout(() => {
        if (callQueue.length > 0) {
            moveLift(lift, callQueue[0]);
            callQueue.shift();
        }
    }, distance * 2000 + 3000);
}