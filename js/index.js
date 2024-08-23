const adviceIdElement = document.querySelector(".advice-id");
const adviceElement = document.querySelector(".advice");
const btnGetAdvice = document.querySelector(".btn-get-advice");
const loader = document.querySelector(".loader");

function showLoading(isLoading) {
  loader.style.display = isLoading ? "grid" : "none";
  adviceElement.classList.toggle("hidden", isLoading);
}

btnGetAdvice.addEventListener("click", async () => {
  const url = "https://api.adviceslip.com/advice";
  showLoading(true);
  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });

    const responseData = await response.json();

    adviceElement.innerText = `"${responseData.slip.advice}"`;
    adviceIdElement.innerText = `ADVICE # ${responseData.slip.id}`;

    console.log(responseData);
  } catch (error) {
    console.error(error);
  } finally {
    showLoading(false);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const divider = document.querySelector(".divider");
  const desktopScreen = 1024;
  // SVGs as strings
  const svgDesktop = `
        <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                <g transform="translate(212)" fill="#CEE3E9">
                  <rect width="6" height="16" rx="3" />
                  <rect x="14" width="6" height="16" rx="3" />
                </g>
              </g>
            </svg>
    `;

  const svgMobile = `
        <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
                <g transform="translate(138)" fill="#CEE3E9">
                  <rect width="6" height="16" rx="3" />
                  <rect x="14" width="6" height="16" rx="3" />
                </g>
              </g>
            </svg>
    `;

  // Function to set SVG based on window width
  function updateSVG() {
    if (window.innerWidth < desktopScreen) {
      divider.innerHTML = svgMobile;
    } else {
      divider.innerHTML = svgDesktop;
    }
  }

  // Initial call to set the SVG based on the current window size
  updateSVG();

  // Listen to window resize event
  window.addEventListener("resize", updateSVG);
});
