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
        floorActionUp.setAttribute("class", `floor-action-btn`);
        floorActionUp.setAttribute("data-lift-num", i);
        floorActions.appendChild(floorActionUp)

        floorActionUp.addEventListener("click", () => {
            liftSimulation(i);
        });

        const floorActionDown = document.createElement("button")
        floorActionDown.innerText = `Down`
        floorActionDown.setAttribute("class", `floor-action-btn`);
        floorActionDown.setAttribute("data-lift-num", i);
        floorActions.appendChild(floorActionDown)

        floorActionDown.addEventListener("click", () => {
            liftSimulation(i);
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

const liftSimulation = (location) => {
    console.log({ location });

    const lift = document.getElementById("lift")
    const floorSelected = document.querySelector(`#floor-${location}`)



}