/**
 * @origin author Script47 (https://github.com/Script47/Toast)
 * @author SoyaNyan (https://github.com/SoyaNyan/Toast)
 * @description Toast - A Bootstrap 5.0 jQuery plugin for the toast component
 * @version 2.0.0
 **/
(function ($) {
    const TOAST_CONTAINER_HTML = `<div id="toast-container" class="toast-container" aria-live="polite" aria-atomic="true"></div>`;

    // default option values
    $.toastDefaults = {
        position: "top-right",
        dismissible: true,
        stackable: true, // stackable & pauseDelayOnHover options are incompatible
        pauseDelayOnHover: false,
        style: {
            toast: "",
            info: "",
            success: "",
            warning: "",
            error: "",
            primary: "",
            secondary: "",
            light: "",
            dark: "",
        },
    };

    // This event is fired when the toast has finished being hidden from the user.
    $("body").on("hidden.bs.toast", ".toast", () => {
        $(this).remove();
    });

    // unique id for each toast and snack
    let toastRunningCount = 1;

    function render(opts) {
        /** No container, create our own **/
        if (!$("#toast-container").length) {
            // if not exists
            const position = ["top-right", "top-left", "top-center", "bottom-right", "bottom-left", "bottom-center"].includes($.toastDefaults.position) ? $.toastDefaults.position : "top-right";

            $("body").prepend(TOAST_CONTAINER_HTML);
            $("#toast-container").addClass(position);
        }

        // template options
        const toastContainer = $("#toast-container");
        const classes = {
            header: {
                fg: "",
                bg: "",
            },
            subtitle: "text-white",
            dismiss: "text-white",
        };
        let html = "";

        // toast options
        let id = opts.id || `toast-${toastRunningCount}`;
        let type = opts.type;
        let title = opts.title;
        let subtitle = opts.subtitle;
        let content = opts.content;
        let img = opts.img;
        let icon = opts.icon;
        let delayOrAutohide = opts.delay ? `data-bs-delay="${opts.delay}"` : `data-bs-autohide="false"`;
        let hideAfter = ``;
        let dismissible = $.toastDefaults.dismissible;
        let globalToastStyles = $.toastDefaults.style.toast;
        let paused = false;

        if (typeof opts.dismissible !== "undefined") {
            dismissible = opts.dismissible;
        }

        // check style classes
        switch (type) {
            case "info":
                classes.header.bg = $.toastDefaults.style.info || "bg-info";
                classes.header.fg = $.toastDefaults.style.info || "text-white";
                break;

            case "success":
                classes.header.bg = $.toastDefaults.style.success || "bg-success";
                classes.header.fg = $.toastDefaults.style.info || "text-white";
                break;

            case "warning":
                classes.header.bg = $.toastDefaults.style.warning || "bg-warning";
                classes.header.fg = $.toastDefaults.style.warning || "text-white";
                break;

            case "error":
                classes.header.bg = $.toastDefaults.style.error || "bg-danger";
                classes.header.fg = $.toastDefaults.style.error || "text-white";
                break;

            case "primary":
                classes.header.bg = $.toastDefaults.style.error || "bg-primary";
                classes.header.fg = $.toastDefaults.style.error || "text-white";
                break;

            case "secondary":
                classes.header.bg = $.toastDefaults.style.error || "bg-secondary";
                classes.header.fg = $.toastDefaults.style.error || "text-white";
                break;

            case "light":
                classes.header.bg = $.toastDefaults.style.error || "bg-light";
                classes.header.fg = $.toastDefaults.style.error || "text-secondary";
                break;

            case "dark":
                classes.header.bg = $.toastDefaults.style.error || "bg-dark";
                classes.header.fg = $.toastDefaults.style.error || "text-white";
                break;
        }

        // check delay options
        if ($.toastDefaults.pauseDelayOnHover && opts.delay) {
            delayOrAutohide = `data-bs-autohide="false"`;
            hideAfter = `data-hide-after="${Math.floor(Date.now() / 1000) + opts.delay / 1000}"`;
        }

        // prepare html
        html = `<div id="${id}" class="toast ${globalToastStyles}" role="alert" aria-live="assertive" aria-atomic="true" ${delayOrAutohide} ${hideAfter}>`;
        html += `<div class="toast-header ${classes.header.bg} ${classes.header.fg}">`;

        if (img) {
            html += `<img src="${img.src}" class="rounded me-2 ${img.class || ""}" alt="${img.alt || "Toast Image"}">`;
        }

        if (icon) {
            html += `<i class="${icon} mr-2"></i>&nbsp;`;
        }
        html += `<strong class="me-auto">${title}</strong>`;

        if (subtitle) {
            html += `<small class="${classes.subtitle}">${subtitle}</small>`;
        }

        if (dismissible) {
            html += `<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`;
        }

        html += `</div>`;

        if (content) {
            html += `<div class="toast-body">
                        ${content}
                    </div>`;
        }

        html += `</div>`;

        // check stackable option
        if (!$.toastDefaults.stackable) {
            toastContainer.find(".toast").each(function () {
                $(this).remove();
            });

            toastContainer.append(html);
            toastContainer.find(".toast:last").toast("show");
        } else {
            toastContainer.append(html);
            toastContainer.find(".toast:last").toast("show");
        }

        // hover delay action
        if ($.toastDefaults.pauseDelayOnHover) {
            setTimeout(function () {
                if (!paused) {
                    $(`#${id}`).toast("hide");
                }
            }, opts.delay);

            $("body").on("mouseover", `#${id}`, () => {
                paused = true;
            });

            $(document).on("mouseleave", "#" + id, () => {
                const current = Math.floor(Date.now() / 1000),
                    future = parseInt($("#" + id).data("hideAfter"), 10);

                paused = false;

                if (current >= future) {
                    $("#" + id).toast("hide");
                }
            });
        }

        toastRunningCount++;
    }

    /**
     * Set default option values
     * @param opts
     */
    $.toastInit = function (opts) {
        const { position, dismissible, stackable, pauseDelayOnHover } = opts;

        // set values
        $.toastDefaults.position = position ?? $.toastDefaults.position;
        $.toastDefaults.dismissible = dismissible ?? $.toastDefaults.dismissible;
        $.toastDefaults.stackable = stackable ?? $.toastDefaults.stackable;
        $.toastDefaults.pauseDelayOnHover = pauseDelayOnHover ?? $.toastDefaults.pauseDelayOnHover;

        // check incompatible variables
        if ($.toastDefaults.stackable) {
            $.toastDefaults.pauseDelayOnHover = false;
        } else {
            $.toastDefaults.pauseDelayOnHover = true;
        }
    };

    /**
     * Show a snack
     * @param type
     * @param title
     * @param delay
     */
    $.snack = function (type, title, delay) {
        return render({
            type,
            title,
            delay,
        });
    };

    /**
     * Show a toast
     * @param opts
     */
    $.toast = function (opts) {
        return render(opts);
    };
})(jQuery);
