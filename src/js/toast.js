/**
 * @author Script47 (https://github.com/Script47/Toast)
 * @description Toast - A Bootstrap 4.2+ jQuery plugin for the toast component
 * @version 1.0.0
 **/
(function ($) {
    const TOAST_CONTAINER_HTML = `<div id="toast-container" class="toast-container" aria-live="polite" aria-atomic="true"></div>`;

    $.toastDefaults = {
        position: 'top-right',
        dismissible: true,
        stackable: true,
        style: {
            toast: '',
            info: '',
            success: '',
            warning: '',
            error: '',
        }
    };

    let toastRunningCount = 1;

    function handleEvents() {
        $('body').on('hidden.bs.toast', '.toast', function () {
            $(this).remove();
        });
    }

    function render(opts) {
        /** No container, create our own **/
        if (!$('#toast-container').length) {
            const position = ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes($.toastDefaults.position) ? $.toastDefaults.position : 'top-right';

            $('body').prepend(TOAST_CONTAINER_HTML);
            $('#toast-container').addClass(position);
        }

        let toastContainer = $('#toast-container');
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
        let globalToastStyles = $.toastDefaults.style.toast;

        if (typeof opts.dismissible !== 'undefined') {
            dismissible = opts.dismissible;
        }

        switch (type) {
            case 'info':
                classes.header.bg = $.toastDefaults.style.info || 'bg-info';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                break;

            case 'success':
                classes.header.bg = $.toastDefaults.style.success || 'bg-success';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                break;

            case 'warning':
                classes.header.bg = $.toastDefaults.style.warning || 'bg-warning';
                classes.header.fg = $.toastDefaults.style.warning || 'text-white';
                break;

            case 'error':
                classes.header.bg = $.toastDefaults.style.error || 'bg-danger';
                classes.header.fg = $.toastDefaults.style.error || 'text-white';
                break;
        }

        html = `<div id="${id}" class="toast ${globalToastStyles}" role="alert" aria-live="assertive" aria-atomic="true" ${delayOrAutohide}>`;
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
            toastContainer.find('.toast').each(function () {
                $(this).remove();
            });

            toastContainer.append(html);
            toastContainer.find('.toast:last').toast('show');
        } else {
            toastContainer.append(html);
            toastContainer.find('.toast:last').toast('show');
        }
    }

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
