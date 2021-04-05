const intersection = document.querySelector(".intersection");
const approaches = document.querySelector(".approaches-container");
const intersectionPlusIcon = document.querySelector(".intersection-plus");
const departures = document.querySelectorAll(".departures-container");
const approachChildren = document.querySelectorAll(".approach-children");

// intersection logic
intersection.addEventListener("click", function() {
  toggle(intersection, "intersection-selected");
  toggle(approaches, "hide");

  // collapse all intersections 
  if (!intersection.classList.contains("intersection-selected")) {
    intersectionPlusIcon.classList.remove("intersection-plus-selected");
    collapseAllIntersections();
    changeAllSign("+")
    const text = intersectionPlusIcon.firstChild;
    text.nodeValue = '++';
  }
});

intersectionPlusIcon.addEventListener("click", function() {
  toggle(intersectionPlusIcon, "intersection-plus-selected");
  const text = intersectionPlusIcon.firstChild;

  if (text.nodeValue === '++') {
    approaches.classList.remove("hide");
    intersection.classList.add("intersection-selected");
    expandAllIntersections();
    changeAllSign("-")
  } else {
    approaches.classList.add("hide");
    intersection.classList.remove("intersection-selected");
    collapseAllIntersections();
    changeAllSign("+")
  }

  text.nodeValue = text.nodeValue === '++' ? "--" : "++";
});

// logic for approaches
document.querySelectorAll(".approach").forEach(function(item) {
  item.addEventListener("click", function() {
    const selectedApproach = document.querySelector(`#${this.id}`)
    const approach = selectedApproach.querySelector('.approach-children');
    toggle(approach, "approach-selected");

    const approachPlusMinusIcon = approach.querySelector(".approach-plus-minus").firstChild;
    approachPlusMinusIcon.nodeValue = approachPlusMinusIcon.nodeValue === "+" ? "-" : "+";

    const departures = selectedApproach.querySelector(".departures-container");
    toggle(departures, "hide");
  });
});

// Helper functions
function toggle(elem, style) {
  if (elem.classList.contains(style)) {
    elem.classList.remove(style);
  } else {
    elem.classList.add(style);
  }
}

function expandAllIntersections() {
  document.querySelectorAll(".approach-children").forEach(function(approach) {
    if (!approach.classList.contains("approach-selected")) {
      approach.classList.add("approach-selected");
    }
  });

  document.querySelectorAll(".departures-container").forEach(function(depature) {
    if (depature.classList.contains("hide")) {
      depature.classList.remove("hide");
    }
  });
}

function collapseAllIntersections() {
  document.querySelectorAll(".approach-children").forEach(function(approach) {
    if (approach.classList.contains("approach-selected")) {
      approach.classList.remove("approach-selected");
    }
  });

  document.querySelectorAll(".departures-container").forEach(function(depature) {
    if (!depature.classList.contains("hide")) {
      depature.classList.add("hide");
    }
  });
}

function changeAllSign(sign) {
  const approachPlusMinusIcon = document.querySelectorAll(".approach-plus-minus");
  approachPlusMinusIcon.forEach(function(item) {
    value = item.firstChild;
    value.nodeValue = sign;
  });
}
