//global variables
let spans = document.querySelectorAll(".hamburger span"),
  hamburger = document.querySelector(".hamburger"),
  nav = document.querySelector(".navbar"),
  bookmark = document.getElementById("bookmark"),
  isMark = false,
  seclectioModal = document.querySelector(".selection-modal"),
  succeededModal = document.querySelector(".succeeded-modal"),
  blackEditionBtn = document.getElementById("select-black-edition"),
  bamboStandBtn = document.getElementById("select-bamboo-stand"),
  blackEdition = document.getElementById("black-edition"),
  bamboStand = document.getElementById("bamboo-stand"),
  inputs = document.querySelectorAll(".selection-modal .pledge input"),
  labels = document.querySelectorAll(".selection-modal .label label"),
  backedCount = (document.getElementById("backed-count").innerHTML = 89914),
  totalBacks = (document.getElementById("total-backs").innerHTML = 5007),
  customPrice = document.querySelectorAll(".input input");

const classes = ["span1", "span2", "span3"];

//show navbar and animate hambuger icon function
const showNav = () => {
  hamburger.classList.toggle("animate");
  count = -1;
  spans.forEach((span) => {
    count++;
    span.classList.toggle(classes[count]);
  });
  nav.classList.toggle("showNav");
};
hamburger.addEventListener("click", showNav);

//toggle bookmark button
const bookmarkProject = () => {
  isMark = !isMark;
  let svgPath = document.querySelector("#bookmark svg path"),
    svgCircle = document.querySelector("#bookmark svg circle"),
    bookmarked = document.querySelector("#bookmark span");
  if (isMark) {
    svgCircle.style.fill = "#147b74";
    svgPath.style.fill = "#fff";
    bookmarked.innerHTML = "Bookmarked";
  } else {
    svgCircle.style.fill = "#2F2F2F";
    svgPath.style.fill = "#B1B1B1";
    bookmarked.innerHTML = "Bookmark";
  }
};
bookmark.addEventListener("click", bookmarkProject);

//selcted pledge function
const selectedPledge = () => {
  for (let i = 0; i < inputs.length - 1; i++) {
    const input = inputs[i];
    if (input.getAttribute("type") === "radio") {
      if (input.checked) {
        if (input.getAttribute("data-available") === "true") {
          input.parentElement.parentElement.classList.add("selected-pledge");
        }
      } else {
        input.parentElement.parentElement.classList.remove("selected-pledge");
      }
    }
  }
};
for (let i = 0; i < labels.length - 1; i++) {
  const label = labels[i];
  label.onclick = function () {
    for (let x = 0; x < labels.length; x++) {
      const parent = labels[x].parentElement.parentElement;
      parent.classList.remove("selected-pledge");
    }
    label.parentElement.parentElement.classList.add("selected-pledge");
  };
}

function openSelectedPledge() {
  seclectioModal.classList.add("show-selection-modal");
  selectedPledge();
}
//scroll window to selected pledge
function scrollWindow(pledge) {
  window.scrollTo({
    top: pledge.getBoundingClientRect().top + window.scrollY,
    behavior: "smooth",
  });
}
bamboStandBtn.onclick = function () {
  bamboStand.checked = true;
  openSelectedPledge();
  scrollWindow(bamboStand);
};
blackEditionBtn.onclick = function () {
  blackEdition.checked = true;
  openSelectedPledge();
  scrollWindow(blackEdition);
};
function openModal() {
  seclectioModal.classList.add("show-selection-modal");
}
function closeModal() {
  seclectioModal.classList.remove("show-selection-modal");
}
//foramt counting and price numbers
function formatNumbers() {
  document.getElementById("backed-count").innerHTML =
    Intl.NumberFormat().format(Number(backedCount));
  document.getElementById("total-backs").innerHTML =
    new Intl.NumberFormat().format(Number(totalBacks));
}
formatNumbers();

function submitPledge() { //update progress bar width and calc price that add in pledge and updated number of backer
  let progresCount = 200;
  let progresBar = document.querySelector(".progress-bar .empty");
  progresBar.style.width = `calc(100% - ${(progresCount += 5)}px)`;
  customPrice.forEach((el) => {
    backedCount += Number(el.value);
  });
  totalBacks -= 1;
  formatNumbers();
  seclectioModal.classList.remove("show-selection-modal");
  succeededModal.style.display = "block";
}
