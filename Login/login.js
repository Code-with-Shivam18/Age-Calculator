const inputBox = document.querySelector("#Email");

// 1. Create message container
const msg = document.createElement("span");
msg.classList.add("validation-msg");

// 2. Insert it inside <div class="email"> right under <input>
inputBox.after(msg);

// 3. Email validation regex
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// global variable for otp.......
let generatedOtp = null;

// 4. Input listener
inputBox.addEventListener("input", function () {
  const value = inputBox.value.trim();

  if (value === "") {
    msg.innerText = "";
    inputBox.classList.remove("valid", "invalid");
  } else if (pattern.test(value)) {
    msg.innerText = "✓ Valid email format";
    msg.style.color = "#16a34a";
    inputBox.classList.add("valid");
    inputBox.classList.remove("invalid");
  } else {
    msg.innerText = "✕ Invalid email format";
    msg.style.color = "#dc2626";
    inputBox.classList.add("invalid");
    inputBox.classList.remove("valid");
  }
});

// ....................................onclick.apply.............................
function sendOtp(event) {
  const OtpBtn = document.querySelector("#Otp");
  const userinput = inputBox.value.trim();

  // Validate email before sending
  if (!userinput || !pattern.test(userinput)) {
    alert("Please enter a valid email address.");
    return;
  }

  //  Disable button while sending OTP....
  OtpBtn.innerText = "Sending...";
  OtpBtn.disabled = true;

  //...............................Random OTP genrator........
  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  emailjs
    .send(
      "service_v3b9hbt",
      "template_ku8tr9s",
      {
        to_email: userinput,
        otp: generatedOtp,
      },
      "wBiejS95zLuZJguiI", //public key
    )
    .then(() => {
      alert("OTP send successfully!");
    })
    .catch((error) => {
      console.error("Emailjs error", error);
      alert("Otp not sent,Please retry");
    })
    .finally(() => {
      OtpBtn.innerText = "Resend Otp";
      OtpBtn.disabled = false;
    });
}
