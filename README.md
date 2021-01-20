# Toast - A Bootstrap 5.0 jQuery plugin

-   [About](#about)
-   [Updates](#updates)
-   [Usage](#usage)
    -   [Live Example](https://romantic-wozniak-01d0b4.netlify.app/)
-   [Contributing](#contributing)
    -   [Contributors](#contributors)

## About

As of **Bootstrap 4.2**, [toasts](https://getbootstrap.com/docs/4.2/components/toasts/) have been introduced and the aim of this plugin is to make them easier to use. (original)

## Updates

As Bootstrap was updated to version 5.0(beta), the usage of the toast component changed. So, we fixed some code that was not compatible with Bootstrap 4 and added some new features.

-   Bootstrap Core updated to 5.0(beta)
-   Deleted incompatible codes and fixed
-   jQuery updated to latest version
-   Icon and more background colors are supported
-   Minor code errors and mistakes fixed

## Usage

### Global Variables (or default values)

Modify the global variables to apply specific rules/styles to all your toasts.

```js
// default option values
$.toastDefaults = {
    position: "top-right",
    dismissible: true,
    stackable: true, // stackable & pauseDelayOnHover options are incompatible
    pauseDelayOnHover: false,
    style: {
        // user custom style classname
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
```

### Initializing Global Variables

| Option Name                       | Type    | Description                                                                                                                            | Values                                                                                                                                  |
| :-------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| $.toastDefaults.position          | String  | Set toast & snack position from the container(or viewport).                                                                            | 'top-right' \| 'top-center' \| 'top-left' \| 'bottom-right' \| 'bottom-center' \| 'bottom-left' (middle option currently not-supported) |
| $.toastDefaults.dismissible       | Boolean | Enables toast & snack dismissible with dismiss button.                                                                                 | true \| false                                                                                                                           |
| $.toastDefaults.stackable         | Boolean | Enables toast & snack stackable. (not compatible with 'pauseDelayOnHover' option.)                                                     | true \| false                                                                                                                           |
| $.toastDefaults.pauseDelayOnHover | Boolean | Enables toast & snack to stop auto-hide when hover mouse pointer on specific toast or snack. (not compatible with 'stackable' option.) | true \| false                                                                                                                           |

```js
// plugin initializing function
$.toastInit = function (opts) {
    const { position, dismissible, stackable, pauseDelayOnHover } = opts;

    // set values
    $.toastDefaults.position = position ?? $.toastDefaults.position;
    $.toastDefaults.dismissible =
        dismissible ?? $.toastDefaults.dismissible;
    $.toastDefaults.stackable = stackable ?? $.toastDefaults.stackable;
    $.toastDefaults.pauseDelayOnHover =
        pauseDelayOnHover ?? $.toastDefaults.pauseDelayOnHover;

    // check incompatible variables
    if ($.toastDefaults.stackable) {
        $.toastDefaults.pauseDelayOnHover = false;
    } else {
        $.toastDefaults.pauseDelayOnHover = true;
    }
};
```

```js
// initializing example in sample.html
$.toastInit({
    position: "bottom-center",
    dismissible: true,
    stackable: true, // stackable & pauseDelayOnHover options are incompatible
    pauseDelayOnHover: false,
});
```

---

### Snack (customized toast)

![snack-img](http://soya.moe:463/CDN/snack.png)

```js
$.snack = function (type, content, delay) {
    return render({
        type,
        content,
        delay,
    });
};
```

**Note:** The final argument `delay` is omittable (optional). If omitted, the toast will remain forever.

### Toast

![toast-img](http://soya.moe:463/CDN/toast.png)

```js
$.toast({
    type: type,
    title: title,
    subtitle: "11 mins ago",
    content: content,
    delay: 5000,
    icon: "fab fa-github", // font-awesome6 icon class
    img: {
        src: IMG_URL,
        alt: "Image",
    },
});
```

**Note:** The 'icon' and 'img' options are compatible but not recommended to use them together.

---

### Live Example (from Netlify)

[Live Demo](https://romantic-wozniak-01d0b4.netlify.app/)

![live-demo](http://soya.moe:463/CDN/live-demo.png)

---

## Contributing

Feel free to contribute in any of the ways outlined:

-   Submit issues/pull requests
-   Tell us how you're using this plugin in _your_ project

[@Script47/Toast](https://github.com/Script47/Toast)

### Contributors

Thanks to all contributors.

[@yuiopna](https://github.com/yuiopna), [@shd5632](https://github.com/shd5632), [@Phudal](https://github.com/Phudal)
