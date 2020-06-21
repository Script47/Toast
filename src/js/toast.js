/**
 * @author Script47 (https://github.com/Script47/Toast)
 * @description Toast - A Bootstrap 4.2+ jQuery plugin for the toast component
 * @version 1.0.0
 **/
(function ($) {
    const TOAST_CONTAINER_HTML = `<div id="toast-container" class="toast-container" aria-live="polite" aria-atomic="true">
            <div class="toast-wrapper"></div>
        </div>`;

    $.toastDefaults = {
        container: null,
        dismissible: true,
        stackable: true
    };

    let toastRunningCount = 1;

    function handleEvents() {
        $('body').on('hidden.bs.toast', '.toast', function () {
            $(this).remove();
        });
    }

    function render(opts) {
        /** No container, create our own **/
        if (!$.toastDefaults.container && !$('#toast-container').length) {
            $('body').prepend(TOAST_CONTAINER_HTML);
        }

        let toastContainer = $.toastDefaults.container || $('#toast-container');
        let toastWrapper = toastContainer.find('.toast-wrapper');
        let html = '';
        let classes = {
            header: {
                fg: '',
                bg: ''
            },
            subtitle: 'text-white',
            dismiss: 'text-white'
        };
        let id = `toast-${toastRunningCount}`;
        let type = opts.type;
        let title = opts.title;
        let subtitle = opts.subtitle;
        let content = opts.content;
        let img = opts.img;
        let delayOrAutohide = opts.delay ? `data-delay="${opts.delay}"` : `data-autohide="false"`;
        let dismissible = $.toastDefaults.dismissible;

        if (typeof opts.dismissible !== 'undefined') {
            dismissible = opts.dismissible;
        }

        switch (type) {
            case 'info':
                classes.header.bg = 'bg-info';
                classes.header.fg = 'text-white';
                break;

            case 'success':
                classes.header.bg = 'bg-success';
                classes.header.fg = 'text-white';
                break;

            case 'warning':
            case 'warn':
                classes.header.bg = 'bg-warning';
                classes.header.fg = 'text-white';
                break;

            case 'error':
            case 'danger':
                classes.header.bg = 'bg-danger';
                classes.header.fg = 'text-white';
                break;
        }

        html = `<div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ${delayOrAutohide}>`;
        html += `<div class="toast-header ${classes.header.bg} ${classes.header.fg}">`;

        if (img) {
            html += `<img src="${img.src}" class="mr-2 ${img.class || ''}" alt="${img.alt || 'Image'}">`;
        }

        html += `<strong class="mr-auto">${title}</strong>`;

        if (subtitle) {
            html += `<small class="${classes.subtitle}">${subtitle}</small>`;
        }

        if (dismissible) {
            html += `<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true" class="${classes.dismiss}">&times;</span>
                    </button>`;
        }

        html += `</div>`;

        if (content) {
            html += `<div class="toast-body">
                        ${content}
                    </div>`;
        }

        html += `</div>`;

        handleEvents(toastContainer);

        toastRunningCount++;

        if (!$.toastDefaults.stackable) {
            toastWrapper.find('.toast').each(function () {
                $(this).toast('hide');
            });

            toastWrapper.append(html);

            /** If a toast is already present, delay displaying it to prevent display glitch **/
            if (toastWrapper.find('.toast').length > 1) {
                console.log('delay...');

                setTimeout(() => toastWrapper.find('.toast:last').toast('show'), 125);
            } else {
                toastWrapper.find('.toast:last').toast('show');
            }
        } else {
            toastWrapper.append(html);
            toastWrapper.find('.toast:last').toast('show');
        }
    }

    /**
     * Show a snack
     * @param title
     * @param type
     * @param delay
     */
    $.snack = function (title, type, delay) {
        return render({
            title,
            type,
            delay
        });
    }

    /**
     * Show a toast
     * @param opts
     */
    $.toast = function (opts) {
        return render(opts);
    }
}(jQuery));
