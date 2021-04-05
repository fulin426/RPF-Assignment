const intersection = document.querySelector(".intersection");
const approaches = document.querySelector(".approaches-container");
const intersectionPlusIcon = document.querySelector(".intersection-plus");
const departures = document.querySelectorAll(".departures-container")

// intersection logic
intersection.addEventListener("click", function() {
  toggle(intersection, "intersection-selected");
  toggle(approaches, "hide");
});

intersectionPlusIcon.addEventListener("click", function() {
  toggle(intersectionPlusIcon, "intersection-plus-selected");
  approaches.classList.remove("hide");

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
    elem.classList.remove(style)
  } else {
    elem.classList.add(style);
  }
}
