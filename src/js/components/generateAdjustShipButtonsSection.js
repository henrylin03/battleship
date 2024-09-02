export default function generateAdjustShipButtonsSection() {
  const BUTTONS_ARRAY = [
    {
      functionality: "randomise",
      icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-shuffle"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 4l3 3l-3 3" />
            <path d="M18 20l3 -3l-3 -3" />
            <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
            <path
              d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"
            />
          </svg>`,
    },
    {
      functionality: "reset",
      icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>`,
    },
    {
      functionality: "rotate",
      icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>`,
    },
  ];
  const section = document.createElement("section");
  section.id = "adjust-ship-buttons";

  BUTTONS_ARRAY.forEach((buttonObject) => {
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.id = `${buttonObject.functionality}-button`;
    buttonElement.innerHTML = buttonObject.icon;

    section.appendChild(buttonElement);
  });

  return section;
}
