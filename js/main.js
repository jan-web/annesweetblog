let articles = document.querySelectorAll(".articles__card");
let filter = document.querySelector(".select-css");
const commentsTextarea = document.getElementById("comments-textarea");
const formButton = document.querySelector(".form__button");
const form = document.querySelector("form");
const like = document.getElementById("like");
const socialLikesCounter = document.querySelector(".social_likes-counter");
const messages = document.querySelector(".messages");
const commentsDataName = document.getElementById("comments__data-name");

if (filter) {
  filter.onchange = function () {
    for (let article of articles) {
      if (article.dataset.category !== filter.value && filter.value !== "all") {
        article.classList.add("hidden");
      } else {
        article.classList.remove("hidden");
      }
    }
  };
}

function rightLengthText() {
  let length = commentsTextarea.value.length;
  if (length < 20 || length > 60) {
    if (!commentsTextarea.classList.contains("red")) {
      commentsTextarea.classList.add("red");
      formButton.setAttribute("disabled", true);
    }
  } else {
    if (commentsTextarea.classList.contains("red")) {
      commentsTextarea.classList.remove("red");
      formButton.removeAttribute("disabled");
    }
  }
}

formButton.addEventListener("click", function () {
  rightLengthText();
  commentsTextarea.oninput = function () {
    rightLengthText();
  };
});
form.onsubmit = (e) => {
  e.preventDefault();
  const newMessage = document.createElement("div");
  newMessage.classList.add("messages__block_new");
  newMessage.innerHTML = `
	<div class="messages__block">
		<img src="img/articles/messages/message-foto3.jpg" alt="foto1" class="message_foto">
		<span class="title title_messages">${commentsDataName.value}</span>
	</div>
	<p>${commentsTextarea.value}</p>
	`;
  messages.prepend(newMessage);
  form.reset();
};

like.addEventListener("click", () => {
  if (like.getAttribute("active")) {
    like.removeAttribute("active");
    socialLikesCounter.textContent = Number(socialLikesCounter.textContent) - 1;
  } else {
    like.setAttribute("active", true);
    socialLikesCounter.textContent = Number(socialLikesCounter.textContent) + 1;
  }
});
