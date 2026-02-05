document.addEventListener("DOMContentLoaded", () => {
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", () => {
    // Year
    const y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // FAQ smooth open + close
    document.querySelectorAll(".faq details").forEach((details) => {
        const summary = details.querySelector("summary");
        const content = details.querySelector("p");
        if (!summary || !content) return;

        // initial state
        content.style.maxHeight = details.open ? `${content.scrollHeight}px` : "0px";
        content.style.opacity = details.open ? "1" : "0";

        summary.addEventListener("click", (e) => {
            e.preventDefault();

            const isOpen = details.hasAttribute("open");

            if (isOpen) {
                const h = content.scrollHeight;

                // lock current open state
                content.style.maxHeight = `${h}px`;
                content.style.opacity = "1";
                content.style.marginTop = "10px";

                requestAnimationFrame(() => {
                    content.style.maxHeight = "0px";
                    content.style.opacity = "0";
                    content.style.marginTop = "0px"; // <-- animate margin away during close
                });

                const onEnd = (ev) => {
                    if (ev.propertyName !== "max-height") return;
                    content.removeEventListener("transitionend", onEnd);
                    details.removeAttribute("open");
                };

                content.addEventListener("transitionend", onEnd);
                return;
            } else {
                // OPEN
                details.setAttribute("open", "");
                content.style.maxHeight = `${content.scrollHeight}px`;
                content.style.opacity = "1";
            }
        });

        // keep height correct on resize
        window.addEventListener("resize", () => {
            if (details.hasAttribute("open")) {
                content.style.maxHeight = `${content.scrollHeight}px`;
            }
        });
    });
});
