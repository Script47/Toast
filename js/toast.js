(function ($) {
    const TOAST_CONTAINER_HTML = '<div id="toast-container" aria-live="polite" aria-atomic="true"></div>';
    const TOAST_WRAPPER_HTML = '<div id="toast-wrapper"></div>';

    $.toast = function (opts) {
        if (!$('#toast-container').length) {
            $('body').prepend(TOAST_CONTAINER_HTML);

            $('#toast-container').append(TOAST_WRAPPER_HTML);
        }

        let bg_header_class = '',
            fg_header_class = '',
            fg_subtitle = 'text-muted',
            fg_dismiss = '',
            title = typeof opts === 'object' ? opts.title || '' : arguments[0] || 'Notice!',
            subtitle = typeof opts === 'object' ? opts.subtitle || '' : arguments[1] || '',
            content = typeof opts === 'object' ? opts.content || '' : arguments[2] || '',
            type = typeof opts === 'object' ? opts.type || '' : arguments[3] || 'info',
            delay = typeof opts === 'object' ? opts.delay || 3000 : arguments[4] || 3000;

        switch (type) {
            case 'info':
                bg_header_class = 'bg-info';
                fg_header_class = 'text-white';
                fg_subtitle = 'text-white';
                fg_dismiss = 'text-white';
                break;

            case 'success':
                bg_header_class = 'bg-success';
                fg_header_class = 'text-white';
                fg_subtitle = 'text-white';
                fg_dismiss = 'text-white';
                break;

            case 'warning':
            case 'warn':
                bg_header_class = 'bg-warning';
                fg_header_class = 'text-white';
                fg_subtitle = 'text-white';
                fg_dismiss = 'text-white';
                break;

            case 'error':
            case 'danger':
                bg_header_class = 'bg-danger';
                fg_header_class = 'text-white';
                fg_subtitle = 'text-white';
                fg_dismiss = 'text-white';
                break;
        }

        let delay_or_autohide = '';
        if (delay === -1) {
            delay_or_autohide = 'data-autohide="false"';
        } else {
            delay_or_autohide = 'data-delay="' + delay + '"';
        }

        let html = '';
        html += '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ' + delay_or_autohide + '>';
        html += '<div class="toast-header ' + bg_header_class + ' ' + fg_header_class + '">';
        html += '<strong class="mr-auto">' + title + '</strong>';
        html += '<small class="' + fg_subtitle + '">' + subtitle + '</small>';
        html += '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
        html += '<span aria-hidden="true" class="' + fg_dismiss + '">&times;</span>';
        html += '</button>';
        html += '</div>';

        if (content !== '') {
            html += '<div class="toast-body">'
            html += content
            html += '</div>';
        }

        html += '</div>';

        $('#toast-wrapper').append(html);
        $('#toast-wrapper .toast:last').toast('show');
    }
}(jQuery));