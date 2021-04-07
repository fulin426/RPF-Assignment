// selected all the intersections in list
const intersections = document.querySelectorAll('.intersection-parent');

intersections.forEach(function(intersection) {
  const selected = document.querySelector(`#${intersection.id}`);
  // Insert the selected intersection based on ID
  handleLogic(selected);
});

function handleLogic(selected) {
  const intersection = selected.querySelector(".intersection");
  const approaches = selected.querySelector(".approaches-container");
  const intersectionPlusIcon = selected.querySelector(".intersection-plus");

  // intersection logic
  intersection.addEventListener("click", function () {
    toggle(intersection, "intersection-selected");
    toggle(approaches, "hide");

    // collapse all intersections if intersection tab is closed
    if (!intersection.classList.contains("intersection-selected")) {
      intersectionPlusIcon.classList.remove("intersection-plus-selected");
      collapseAllIntersections();
      changeAllIntersectionSign("+");
      const text = intersectionPlusIcon.firstChild;
      text.nodeValue = "++";
    }
  });

  intersectionPlusIcon.addEventListener("click", function () {
    toggle(intersectionPlusIcon, "intersection-plus-selected");
    const text = intersectionPlusIcon.firstChild;

    if (text.nodeValue === "++") {
      approaches.classList.remove("hide");
      intersection.classList.add("intersection-selected");
      expandAllIntersections();
      changeAllIntersectionSign("-");
    } else {
      approaches.classList.add("hide");
      intersection.classList.remove("intersection-selected");
      collapseAllIntersections();
      changeAllIntersectionSign("+");
    }

    text.nodeValue = text.nodeValue === "++" ? "--" : "++";
  });

  // logic for approaches
  selected.querySelectorAll(".approach").forEach(function (item) {
    item.addEventListener("click", function () {
      const selectedApproach = document.querySelector(`#${this.id}`);
      const approach = selectedApproach.querySelector(".approach-children");
      toggle(approach, "approach-selected");

      const approachPlusMinusIcon = approach.querySelector(".approach-plus-minus").firstChild;
      approachPlusMinusIcon.nodeValue = approachPlusMinusIcon.nodeValue === "+" ? "-" : "+";

      const departures = selectedApproach.querySelector(".departures-container");
      toggle(departures, "hide");
    });
  });
}

// Helper functions
function toggle(elem, style) {
  if (elem.classList.contains(style)) {
    elem.classList.remove(style);
  } else {
    elem.classList.add(style);
  }
}

function expandAllIntersections() {
  document.querySelectorAll(".approach-children")
  .forEach(function (approach) {
    if (!approach.classList.contains("approach-selected")) {
      approach.classList.add("approach-selected");
    }
  });

  document
    .querySelectorAll(".departures-container")
    .forEach(function (depature) {
      if (depature.classList.contains("hide")) {
        depature.classList.remove("hide");
      }
    });
}

function collapseAllIntersections() {
  document.querySelectorAll(".approach-children")
  .forEach(function (approach) {
    if (approach.classList.contains("approach-selected")) {
      approach.classList.remove("approach-selected");
    }
  });

  document
    .querySelectorAll(".departures-container")
    .forEach(function (depature) {
      if (!depature.classList.contains("hide")) {
        depature.classList.add("hide");
      }
    });
}

function changeAllIntersectionSign(sign) {
  const approachPlusMinusIcon = document.querySelectorAll(".approach-plus-minus");
  approachPlusMinusIcon.forEach(function (item) {
    value = item.firstChild;
    value.nodeValue = sign;
  });
}
