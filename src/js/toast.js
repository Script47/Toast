/**
 * @author Script47 (https://github.com/Script47/Toast)
 * @description Toast - A Bootstrap 5.0+ jQuery plugin for the toast component
 * @version 1.2.0
 **/
(function ($) {

    const TOAST_CONTAINER_HTML = `<div id="toast-container" class="toast-container" aria-live="polite" aria-atomic="true"></div>`;

    const supportedPositions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];

    $.toastDefaults = {
        position: 'top-right',
        dismissible: true,
        stackable: true,
        pauseDelayOnHover: true,
        style: {
            toast: '',
            info: '',
            success: '',
            warning: '',
            error: '',
        }
    };

    $('body').on('hidden.bs.toast', '.toast', function () {
        $(this).remove();
    });

    let toastRunningCount = 1;

    function render(opts) {
        /** No container, create our own **/

        const position = supportedPositions.includes(opts.position) ? opts.position : $.toastDefaults.position;

        if (!$('#toast-container-'+position).length) {

            let html_toast_container = TOAST_CONTAINER_HTML.replace('id="toast-container"', 'id="toast-container-'+position+'"');

            $('body').prepend(html_toast_container);

            $('#toast-container-'+position).addClass(position);
        }

        let toastContainer = $('#toast-container-'+position);
        let html = '';
        let classes = {
            header: {
                fg: '',
                bg: ''
            },
            subtitle: 'text-white',
            dismiss: ''
        };

        let id = opts.id || `toast-${toastRunningCount}`;
        let type = opts.type;
        let title = opts.title;
        let subtitle = opts.subtitle;
        let content = opts.content;
        let img = opts.img;
        let delayOrAutohide = opts.delay ? `data-delay="${opts.delay}"` : `data-autohide="false"`;
        let hideAfter = ``;
        let dismissible = $.toastDefaults.dismissible;
        let globalToastStyles = $.toastDefaults.style.toast;
        let paused = false;

        if (typeof opts.dismissible !== 'undefined') {
            dismissible = opts.dismissible;
        }

        switch (type) {
            case 'info':
                classes.header.bg = $.toastDefaults.style.info || 'bg-info';
                classes.header.fg = $.toastDefaults.style.info || 'text-dark'; //sara3
                classes.subtitle = 'text-dark';
                break;

            case 'success':
                classes.header.bg = $.toastDefaults.style.success || 'bg-success';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                classes.dismiss = 'btn-close-white';
                break;

            case 'warning':
                classes.header.bg = $.toastDefaults.style.warning || 'bg-warning';
                classes.header.fg = $.toastDefaults.style.warning || 'text-dark';
                classes.subtitle = 'text-dark';
                break;

            case 'error':
                classes.header.bg = $.toastDefaults.style.error || 'bg-danger';
                classes.header.fg = $.toastDefaults.style.error || 'text-white';
                classes.dismiss = 'btn-close-white';
                break;

            case 'primary':
                classes.header.bg = $.toastDefaults.style.info || 'bg-primary';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                classes.dismiss = 'btn-close-white';
                break;

            case 'secondary':
                classes.header.bg = $.toastDefaults.style.info || 'bg-secondary';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                classes.dismiss = 'btn-close-white';
                break;

            case 'light':
                classes.header.bg = $.toastDefaults.style.info || 'bg-light';
                classes.header.fg = $.toastDefaults.style.info || 'text-dark';
                break;

            case 'dark':
                classes.header.bg = $.toastDefaults.style.info || 'bg-dark';
                classes.header.fg = $.toastDefaults.style.info || 'text-white';
                classes.dismiss = 'btn-close-white';
                break;
        }

        if ($.toastDefaults.pauseDelayOnHover && opts.delay) {
            delayOrAutohide = `data-autohide="false"`;
            hideAfter = `data-hide-after="${Math.floor(Date.now() / 1000) + (opts.delay / 1000)}"`;
        }


        // setup the size of the toast (only if toast_width < window_width)
        let toast_width = (opts.width !== undefined && opts.width !== null && Number.isInteger(opts.width)) ? opts.width : null;
        let style = ((toast_width !== null) && (toast_width < $(window).width())) ? 'style="width:'+toast_width+'px"' : '';


        html = `<div ${style} id="${id}" class="toast ${globalToastStyles}" role="alert" aria-live="assertive" aria-atomic="true" ${delayOrAutohide} ${hideAfter}>`;

        html += `<div class="toast-header ${classes.header.bg} ${classes.header.fg}">`;

        if (img) {
            html += `<img src="${img.src}" class="me-2 ${img.class || ''}" alt="${img.alt || 'Image'}">`;
        }

        html += `<strong class="me-auto">${title}</strong>`;

        if (subtitle) {
            html += `<small class="${classes.subtitle}">${subtitle}</small>`;
        }

        if(dismissible) {
            html += `<button type="button" style="color:red !important" class="btn-close ${classes.dismiss}" data-bs-dismiss="toast" aria-label="Close"></button>`;
        }

        html += `</div>`;

        if (content) {
            html += `<div class="toast-body">
                        ${content}
                    </div>`;
        }

        html += `</div>`;

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

        if ($.toastDefaults.pauseDelayOnHover) {
            setTimeout(function () {
                if (!paused) {
                    $(`#${id}`).toast('hide');
                }
            }, opts.delay);

            $('body').on('mouseover', `#${id}`, function () {
                paused = true;
            });

            $(document).on('mouseleave', '#' + id, function () {
                const current = Math.floor(Date.now() / 1000),
                    future = parseInt($(this).data('hideAfter'));

                paused = false;

                if (current >= future) {
                    $(this).toast('hide');
                }
            });
        }

        toastRunningCount++;
    }

    /**
     * Show a snack
     * @param type
     * @param title
     * @param delay
     */
    $.snack = function (type, title, delay, width) {
        return render({
            type,
            title,
            delay,
            width
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
